import { forwardRef, useMemo, useState, type ReactNode } from "react";
import { cx } from "../lib/cx";
import { ArrowDown, ArrowUp, ChevronsUpDown, SearchIcon } from "../lib/icons";
import { useControllableState } from "../hooks/use-controllable-state";
import { Checkbox } from "./checkbox";
import { Input } from "./field";
import { Pagination } from "./breadcrumbs";

/* ---------- Table: styled, semantic primitives ---------- */
export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> { density?: "compact" | "normal" | "relaxed"; stickyHeader?: boolean }
export const Table = forwardRef<HTMLTableElement, TableProps>(function Table({ density = "normal", stickyHeader, className, ...rest }, ref) {
  return (
    <div className="sg-table-wrap">
      <table ref={ref} data-density={density} data-sticky={stickyHeader ? "" : undefined} className={cx("sg-table", className)} {...rest} />
    </div>
  );
});
export const THead = (p: React.HTMLAttributes<HTMLTableSectionElement>) => <thead {...p} />;
export const TBody = (p: React.HTMLAttributes<HTMLTableSectionElement>) => <tbody {...p} />;
export const TR = forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement> & { selected?: boolean }>(function TR({ selected, ...p }, ref) {
  return <tr ref={ref} data-selected={selected ? "" : undefined} aria-selected={selected || undefined} {...p} />;
});
export const TH = ({ align, className, ...p }: React.ThHTMLAttributes<HTMLTableCellElement> & { align?: "left" | "right" | "center" }) => <th data-align={align} className={className} {...p} />;
export const TD = ({ align, className, ...p }: React.TdHTMLAttributes<HTMLTableCellElement> & { align?: "left" | "right" | "center" }) => <td data-align={align} className={className} {...p} />;

/* ---------- DataTable: sorting, search, selection, pagination ---------- */
export interface Column<T> {
  id: string;
  header: ReactNode;
  /** Value used for sorting and searching. */
  accessor?: (row: T) => string | number | Date | null | undefined;
  /** How to draw the cell; defaults to the accessor's value. */
  cell?: (row: T) => ReactNode;
  sortable?: boolean;
  align?: "left" | "right" | "center";
  width?: number | string;
  /** Leave out of the global search. */
  searchable?: boolean;
}
export interface SortState { id: string; dir: "asc" | "desc" }

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  getRowId: (row: T) => string;
  /** Rows per page; 0 shows everything. Default 10. */
  pageSize?: number;
  /** Adds checkboxes and a select-all. */
  selectable?: boolean;
  selected?: string[];
  onSelectedChange?: (ids: string[]) => void;
  sort?: SortState | null;
  defaultSort?: SortState | null;
  onSortChange?: (s: SortState | null) => void;
  /** Show the search field. */
  searchable?: boolean;
  searchPlaceholder?: string;
  /** Extra controls in the toolbar (filters, tabs, buttons). */
  toolbar?: ReactNode;
  /** Shown in place of the toolbar while rows are selected. */
  bulkActions?: (selected: string[], clear: () => void) => ReactNode;
  onRowClick?: (row: T) => void;
  empty?: ReactNode;
  density?: TableProps["density"];
  className?: string;
  "aria-label"?: string;
}

const cmp = (a: unknown, b: unknown) => {
  if (a == null) return b == null ? 0 : 1;
  if (b == null) return -1;
  if (a instanceof Date && b instanceof Date) return a.getTime() - b.getTime();
  if (typeof a === "number" && typeof b === "number") return a - b;
  return String(a).localeCompare(String(b), undefined, { numeric: true, sensitivity: "base" });
};

export function DataTable<T>({
  data, columns, getRowId, pageSize = 10, selectable, selected, onSelectedChange, sort, defaultSort = null, onSortChange,
  searchable = true, searchPlaceholder = "Search…", toolbar, bulkActions, onRowClick, empty = "Nothing to show.", density, className, ...rest
}: DataTableProps<T>) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [sorting, setSorting] = useControllableState<SortState | null>({ value: sort, defaultValue: defaultSort, onChange: onSortChange });
  const [sel, setSel] = useControllableState<string[]>({ value: selected, defaultValue: [], onChange: onSelectedChange });

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    let out = q
      ? data.filter((r) => columns.some((c) => c.searchable !== false && c.accessor && String(c.accessor(r) ?? "").toLowerCase().includes(q)))
      : data;
    const col = sorting && columns.find((c) => c.id === sorting.id);
    if (col?.accessor) {
      const acc = col.accessor;
      out = [...out].sort((a, b) => cmp(acc(a), acc(b)) * (sorting!.dir === "asc" ? 1 : -1));
    }
    return out;
  }, [data, columns, query, sorting]);

  const pages = pageSize ? Math.max(1, Math.ceil(rows.length / pageSize)) : 1;
  const p = Math.min(page, pages);
  const shown = pageSize ? rows.slice((p - 1) * pageSize, p * pageSize) : rows;
  const shownIds = shown.map(getRowId);
  const allOn = shownIds.length > 0 && shownIds.every((id) => sel.includes(id));
  const someOn = shownIds.some((id) => sel.includes(id));

  const toggleSort = (c: Column<T>) =>
    setSorting(!sorting || sorting.id !== c.id ? { id: c.id, dir: "asc" } : sorting.dir === "asc" ? { id: c.id, dir: "desc" } : null);
  const clear = () => setSel([]);

  return (
    <div className={cx("sg-data-table", className)}>
      {(searchable || toolbar || (bulkActions && sel.length > 0)) && (
        <div className="sg-data-toolbar">
          {bulkActions && sel.length > 0 ? (
            <div className="sg-data-bulk" role="toolbar" aria-label="Bulk actions">
              <span className="sg-data-bulk-count"><b>{sel.length}</b> selected</span>
              {bulkActions(sel, clear)}
            </div>
          ) : (
            <>
              {toolbar}
              {searchable && (
                <Input size="sm" className="sg-data-search" leading={<SearchIcon width={16} height={16} />} placeholder={searchPlaceholder} aria-label="Search table"
                  value={query} onChange={(e) => { setQuery(e.target.value); setPage(1); }} />
              )}
            </>
          )}
        </div>
      )}
      <Table density={density} aria-label={rest["aria-label"]} aria-rowcount={rows.length}>
        <thead>
          <tr>
            {selectable && (
              <th className="sg-table-check">
                <Checkbox aria-label="Select all on this page" checked={allOn ? true : someOn ? "indeterminate" : false}
                  onCheckedChange={(v) => setSel(v === true ? [...new Set([...sel, ...shownIds])] : sel.filter((id) => !shownIds.includes(id)))} />
              </th>
            )}
            {columns.map((c) => {
              const s = sorting?.id === c.id ? sorting.dir : null;
              return (
                <th key={c.id} data-align={c.align} style={{ width: c.width }} aria-sort={s ? (s === "asc" ? "ascending" : "descending") : c.sortable ? "none" : undefined}>
                  {c.sortable ? (
                    <button type="button" className="sg-sort" data-active={s ? "" : undefined} onClick={() => toggleSort(c)}>
                      {c.header}
                      {s === "asc" ? <ArrowUp width={14} height={14} /> : s === "desc" ? <ArrowDown width={14} height={14} /> : <ChevronsUpDown width={14} height={14} />}
                    </button>
                  ) : c.header}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {shown.length === 0 ? (
            <tr><td colSpan={columns.length + (selectable ? 1 : 0)} className="sg-table-empty">{empty}</td></tr>
          ) : shown.map((r) => {
            const id = getRowId(r), on = sel.includes(id);
            return (
              <TR key={id} selected={on} data-clickable={onRowClick ? "" : undefined} onClick={onRowClick ? () => onRowClick(r) : undefined}>
                {selectable && (
                  <td className="sg-table-check" onClick={(e) => e.stopPropagation()}>
                    <Checkbox aria-label={`Select row ${id}`} checked={on} onCheckedChange={(v) => setSel(v === true ? [...sel, id] : sel.filter((x) => x !== id))} />
                  </td>
                )}
                {columns.map((c) => (
                  <td key={c.id} data-align={c.align}>{c.cell ? c.cell(r) : String(c.accessor?.(r) ?? "")}</td>
                ))}
              </TR>
            );
          })}
        </tbody>
      </Table>
      {pageSize > 0 && rows.length > 0 && (
        <div className="sg-data-footer">
          <span>Showing {(p - 1) * pageSize + 1}–{(p - 1) * pageSize + shown.length} of {rows.length}</span>
          {pages > 1 && <Pagination page={p} pageCount={pages} onPageChange={setPage} />}
        </div>
      )}
    </div>
  );
}
