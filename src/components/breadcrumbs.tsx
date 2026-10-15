import { Fragment, type ReactNode } from "react";
import { cx } from "../lib/cx";
import { ChevronLeft, ChevronRight, MoreIcon } from "../lib/icons";

export interface Crumb { label: ReactNode; href?: string; onClick?: () => void }

export interface BreadcrumbsProps {
  items: Crumb[];
  /** Collapse the middle when there are more than this many. */
  maxItems?: number;
  separator?: ReactNode;
  /** Render links with your router: (crumb, children) => <Link to={crumb.href}>{children}</Link> */
  renderLink?: (crumb: Crumb, children: ReactNode) => ReactNode;
  className?: string;
}

export function Breadcrumbs({ items, maxItems = 5, separator, renderLink, className }: BreadcrumbsProps) {
  const collapse = items.length > maxItems;
  const shown: Array<Crumb | "…"> = collapse ? [items[0], "…", ...items.slice(-(maxItems - 2))] : items;
  return (
    <nav aria-label="Breadcrumb" className={cx("sg-breadcrumbs", className)}>
      <ol>
        {shown.map((c, i) => {
          const last = i === shown.length - 1;
          return (
            <Fragment key={i}>
              <li className="sg-crumb">
                {c === "…" ? <span className="sg-crumb-ellipsis" aria-label="More"><MoreIcon width={16} height={16} /></span>
                  : last ? <span aria-current="page">{c.label}</span>
                  : renderLink && c.href ? renderLink(c, c.label)
                  : c.href ? <a href={c.href} onClick={c.onClick}>{c.label}</a>
                  : c.onClick ? <button type="button" onClick={c.onClick}>{c.label}</button>
                  : <span>{c.label}</span>}
              </li>
              {!last && <li className="sg-crumb-sep" aria-hidden>{separator ?? <ChevronRight width={14} height={14} />}</li>}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}

export interface PaginationProps {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  /** Pages shown either side of the current one. */
  siblings?: number;
  className?: string;
}

/** 1-based. Collapses long ranges into ellipses: 1 … 4 5 6 … 20 */
export function Pagination({ page, pageCount, onPageChange, siblings = 1, className }: PaginationProps) {
  const range: Array<number | "…"> = [];
  const lo = Math.max(2, page - siblings), hi = Math.min(pageCount - 1, page + siblings);
  range.push(1);
  if (lo > 2) range.push("…");
  for (let p = lo; p <= hi; p++) range.push(p);
  if (hi < pageCount - 1) range.push("…");
  if (pageCount > 1) range.push(pageCount);
  return (
    <nav aria-label="Pagination" className={cx("sg-pagination", className)}>
      <button type="button" className="sg-page" disabled={page <= 1} onClick={() => onPageChange(page - 1)} aria-label="Previous page"><ChevronLeft width={16} height={16} /></button>
      {range.map((p, i) =>
        p === "…" ? <span key={"e" + i} className="sg-page-ellipsis">…</span>
          : <button type="button" key={p} className={cx("sg-page", p === page && "sg-chip-surface")} aria-current={p === page ? "page" : undefined} onClick={() => onPageChange(p)}>{p}</button>,
      )}
      <button type="button" className="sg-page" disabled={page >= pageCount} onClick={() => onPageChange(page + 1)} aria-label="Next page"><ChevronRight width={16} height={16} /></button>
    </nav>
  );
}
