# Data table

Sorting, search, selection, bulk actions and pagination, from columns and rows.

```tsx
import { DataTable, type Column } from "seaglass-ui";
```

## DataTable<T> props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `data` (required) | `T[]` |  |  |
| `columns` (required) | `Column<T>[]` |  |  |
| `getRowId` (required) | `(row: T) => string` |  |  |
| `pageSize` | `number` | `10` | 0 shows everything. |
| `selectable` | `boolean` | `false` | Checkboxes and select-all. |
| `selected · onSelectedChange` | `string[]` |  | Controlled selection. |
| `sort · defaultSort · onSortChange` | `{ id, dir } \| null` |  |  |
| `searchable · searchPlaceholder` | `boolean · string` |  | Search box in the toolbar. |
| `toolbar` | `ReactNode` |  | Extra controls in the toolbar. |
| `bulkActions` | `(ids, clear) => ReactNode` |  | Replaces the toolbar while rows are selected. |
| `onRowClick` | `(row: T) => void` |  |  |
| `empty` | `ReactNode` |  |  |
| `density` | `"compact" \| "normal" \| "relaxed"` |  |  |

## Column<T> props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `id · header` (required) | `string · ReactNode` |  |  |
| `accessor` | `(row) => string \| number \| Date \| null` |  | Used to sort and search. |
| `cell` | `(row) => ReactNode` |  | How to draw it. Defaults to the accessor value. |
| `sortable` | `boolean` |  |  |
| `searchable` | `boolean` | `true` | Include in the search. |
| `align · width` | `—` |  |  |

## Accessibility

- Sortable headers are buttons and set aria-sort.
- Row checkboxes are named after the row.

## Examples

### Orders

Select rows to see bulk actions. Click headers to sort.

```tsx
import { DataTable, Avatar, Badge, Button, toast, type Column } from "seaglass-ui";
import { Truck, Trash2 } from "lucide-react";

interface Order { id: string; customer: string; date: Date; status: "Paid" | "Pending" | "Refunded"; total: number }

const names = ["Ava Thompson", "Leo Martins", "Mia Chen", "Noah Patel", "Isla Romero", "Kai Nakamura", "Zara Okafor", "Ethan Brooks", "Maya Singh", "Oscar Lindqvist", "Lena Fischer", "Ravi Kumar"];
const statuses = ["Paid", "Paid", "Pending", "Paid", "Refunded"] as const;
const orders: Order[] = names.flatMap((customer, i) => [0, 1].map((k) => ({
  id: `#${10500 - i * 2 - k}`,
  customer,
  date: new Date(2026, 9, 15 - i, 9 + k * 4),
  status: statuses[(i + k) % statuses.length],
  total: Math.round(((i * 37 + k * 53) % 400) * 100 + 2499) / 100,
})));

const tone = { Paid: "mint", Pending: "amber", Refunded: "lilac" } as const;

const columns: Column<Order>[] = [
  { id: "id", header: "Order", accessor: (r) => r.id, sortable: true, cell: (r) => <b>{r.id}</b> },
  {
    id: "customer", header: "Customer", accessor: (r) => r.customer, sortable: true,
    cell: (r) => <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}><Avatar name={r.customer} size="sm" />{r.customer}</span>,
  },
  { id: "date", header: "Date", accessor: (r) => r.date, sortable: true, searchable: false, cell: (r) => r.date.toLocaleDateString("en-GB", { day: "numeric", month: "short" }) },
  { id: "status", header: "Status", accessor: (r) => r.status, sortable: true, cell: (r) => <Badge size="sm" dot tone={tone[r.status]}>{r.status}</Badge> },
  { id: "total", header: "Total", accessor: (r) => r.total, sortable: true, align: "right", searchable: false, cell: (r) => `$${r.total.toFixed(2)}` },
];

export default function Full() {
  return (
    <div style={{ width: "100%" }}>
      <DataTable
        aria-label="Orders"
        data={orders}
        columns={columns}
        getRowId={(r) => r.id}
        selectable
        searchable
        searchPlaceholder="Search orders…"
        pageSize={6}
        defaultSort={{ id: "date", dir: "desc" }}
        bulkActions={(ids, clear) => (
          <>
            <Button size="sm" variant="soft" tone="mint" icon={<Truck />} onClick={() => { toast.success(`${ids.length} marked shipped`); clear(); }}>Mark shipped</Button>
            <Button size="sm" variant="soft" tone="coral" icon={<Trash2 />} onClick={() => { toast.error(`${ids.length} deleted`); clear(); }}>Delete</Button>
          </>
        )}
      />
    </div>
  );
}
```

Rendered HTML:

```html
<div style="width:100%">
<div class="sg-data-table">
<div class="sg-data-toolbar">
<div class="sg-input sg-well sg-data-search" data-size="sm">
<span class="sg-input-adorn" aria-hidden="true">
<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
<circle cx="11" cy="11" r="6.5">
</circle>
<path d="M16 16l4 4">
</path>
</svg>
</span>
<input class="sg-input-el" placeholder="Search orders…" aria-label="Search table" value=""/>
</div>
</div>
<div class="sg-table-wrap">
<table data-density="normal" class="sg-table" aria-label="Orders" aria-rowcount="24">
<thead>
<tr>
<th class="sg-table-check">
<button type="button" role="checkbox" aria-checked="false" data-state="unchecked" value="on" data-tone="mint" class="sg-checkbox" aria-label="Select all on this page">
<span data-state="unchecked" class="sg-checkbox-indicator" style="pointer-events:none">
<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
<path d="M5 12.5l4.5 4.5L19 7.5">
</path>
</svg>
</span>
</button>
<input type="checkbox" aria-hidden="true" tabindex="-1" style="position:absolute;pointer-events:none;opacity:0;margin:0;transform:translateX(-100%)" value="on"/>
</th>
<th aria-sort="none">
<button type="button" class="sg-sort">Order<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
<path d="M8 9l4-4 4 4M8 15l4 4 4-4">
</path>
</svg>
</button>
</th>
<th aria-sort="none">
<button type="button" class="sg-sort">Customer<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
<path d="M8 9l4-4 4 4M8 15l4 4 4-4">
</path>
</svg>
</button>
</th>
<th aria-sort="descending">
<button type="button" class="sg-sort" data-active="">Date<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
<path d="M12 5v14M6 13l6 6 6-6">
</path>
</svg>
</button>
</th>
<th aria-sort="none">
<button type="button" class="sg-sort">Status<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
<path d="M8 9l4-4 4 4M8 15l4 4 4-4">
</path>
</svg>
</button>
</th>
<th data-align="right" aria-sort="none">
<button type="button" class="sg-sort">Total<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
<path d="M8 9l4-4 4 4M8 15l4 4 4-4">
</path>
</svg>
</button>
</th>
</tr>
</thead>
<tbody>
<tr>
<td class="sg-table-check">
<button type="button" role="checkbox" aria-checked="false" data-state="unchecked" value="on" data-tone="mint" class="sg-checkbox" aria-label="Select row #10499">
<span data-state="unchecked" class="sg-checkbox-indicator" style="pointer-events:none">
<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
<path d="M5 12.5l4.5 4.5L19 7.5">
</path>
</svg>
</span>
</button>
<input type="checkbox" aria-hidden="true" tabindex="-1" style="position:absolute;pointer-events:none;opacity:0;margin:0;transform:translateX(-100%)" value="on"/>
</td>
<td>
<b>#10499</b>
</td>
<td>
<span style="display:inline-flex;align-items:center;gap:10px">
<span data-tone="coral" data-depth="xs" data-size="sm" data-shape="circle" class="sg-avatar sg-pebble">
</span>Ava Thompson</span>
</td>
<td>15 Oct</td>
<td>
<span data-tone="mint" data-variant="soft" data-size="sm" class="sg-badge">
<span class="sg-badge-dot" aria-hidden="true">
</span>Paid</span>
</td>
<td data-align="right">$77.99</td>
</tr>
<tr>
<td class="sg-table-check">
<button type="button" role="checkbox" aria-checked="false" data-state="unchecked" value="on" data-tone="mint" class="sg-checkbox" aria-label="Select row #10500">
<span data-state="unchecked" class="sg-checkbox-indicator" style="pointer-events:none">
<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
<path d="M5 12.5l4.5 4.5L19 7.5">
</path>
</svg>
</span>
</button>
<input type="checkbox" aria-hidden="true" tabindex="-1" style="position:absolute;pointer-events:none;opacity:0;margin:0;transform:translateX(-100%)" value="on"/>
</td>
<td>
<b>#10500</b>
</td>
<td>
<span style="display:inline-flex;align-items:center;gap:10px">
<span data-tone="coral" data-depth="xs" data-size="sm" data-shape="circle" class="sg-avatar sg-pebble">
</span>Ava Thompson</span>
</td>
<td>15 Oct</td>
<td>
<span data-tone="mint" data-variant="soft" data-size="sm" class="sg-badge">
<span class="sg-badge-dot" aria-hidden="true">
</span>Paid</span>
</td>
<td data-align="right">$24.99</td>
</tr>
<tr>
<td class="sg-table-check">
<button type="button" role="checkbox" aria-checked="false" data-state="unchecked" value="on" data-tone="mint" class="sg-checkbox" aria-label="Select row #10497">
<span data-state="unchecked" class="sg-checkbox-indicator" style="pointer-events:none">
<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
<path d="M5 12.5l4.5 4.5L19 7.5">
</path>
</svg>
</span>
</button>
<input type="checkbox" aria-hidden="true" tabindex="-1" style="position:absolute;pointer-events:none;opacity:0;margin:0;transform:translateX(-100%)" value="on"/>
</td>
<td>
<b>#10497</b>
</td>
<td>
<span style="display:inline-flex;align-items:center;gap:10px">
<span data-tone="sky" data-depth="xs" data-size="sm" data-shape="circle" class="sg-avatar sg-pebble">
</span>Leo Martins</span>
</td>
<td>14 Oct</td>
<td>
<span data-tone="amber" data-variant="soft" data-size="sm" class="sg-badge">
<span class="sg-badge-dot" aria-hidden="true">
</span>Pending</span>
</td>
<td data-align="right">$114.99</td>
</tr>
<tr>
<td class="sg-table-check">
<button type="button" role="checkbox" aria-checked="false" data-state="unchecked" value="on" data-tone="mint" class="sg-checkbox" aria-label="Select row #10498">
<span data-state="unchecked" class="sg-checkbox-indicator" style="pointer-events:none">
<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
<path d="M5 12.5l4.5 4.5L19 7.5">
</path>
</svg>
</span>
</button>
<input type="checkbox" aria-hidden="true" tabindex="-1" style="position:absolute;pointer-events:none;opacity:0;margin:0;transform:translateX(-100%)" value="on"/>
</td>
<td>
<b>#10498</b>
</td>
<td>
<span style="display:inline-flex;align-items:center;gap:10px">
<span data-tone="sky" data-depth="xs" data-size="sm" data-shape="circle" class="sg-avatar sg-pebble">
</span>Leo Martins</span>
</td>
<td>14 Oct</td>
<td>
<span data-tone="mint" data-variant="soft" data-size="sm" class="sg-badge">
<span class="sg-badge-dot" aria-hidden="true">
</span>Paid</span>
</td>
<td data-align="right">$61.99</td>
</tr>
<tr>
<td class="sg-table-check">
<button type="button" role="checkbox" aria-checked="false" data-state="unchecked" value="on" data-tone="mint" class="sg-checkbox" aria-label="Select row #10495">
<span data-state="unchecked" class="sg-checkbox-indicator" style="pointer-events:none">
<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
<path d="M5 12.5l4.5 4.5L19 7.5">
</path>
</svg>
</span>
</button>
<input type="checkbox" aria-hidden="true" tabindex="-1" style="position:absolute;pointer-events:none;opacity:0;margin:0;transform:translateX(-100%)" value="on"/>
</td>
<td>
<b>#10495</b>
</td>
<td>
<span style="display:inline-flex;align-items:center;gap:10px">
<span data-tone="amber" data-depth="xs" data-size="sm" data-shape="circle" class="sg-avatar sg-pebble">
</span>Mia Chen</span>
</td>
<td>13 Oct</td>
<td>
<span data-tone="mint" data-variant="soft" data-size="sm" class="sg-badge">
<span class="sg-badge-dot" aria-hidden="true">
</span>Paid</span>
</td>
<td data-align="right">$151.99</td>
</tr>
<tr>
<td class="sg-table-check">
<button type="button" role="checkbox" aria-checked="false" data-state="unchecked" value="on" data-tone="mint" class="sg-checkbox" aria-label="Select row #10496">
<span data-state="unchecked" class="sg-checkbox-indicator" style="pointer-events:none">
<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
<path d="M5 12.5l4.5 4.5L19 7.5">
</path>
</svg>
</span>
</button>
<input type="checkbox" aria-hidden="true" tabindex="-1" style="position:absolute;pointer-events:none;opacity:0;margin:0;transform:translateX(-100%)" value="on"/>
</td>
<td>
<b>#10496</b>
</td>
<td>
<span style="display:inline-flex;align-items:center;gap:10px">
<span data-tone="amber" data-depth="xs" data-size="sm" data-shape="circle" class="sg-avatar sg-pebble">
</span>Mia Chen</span>
</td>
<td>13 Oct</td>
<td>
<span data-tone="amber" data-variant="soft" data-size="sm" class="sg-badge">
<span class="sg-badge-dot" aria-hidden="true">
</span>Pending</span>
</td>
<td data-align="right">$98.99</td>
</tr>
</tbody>
</table>
</div>
<div class="sg-data-footer">
<span>Showing 1–6 of 24</span>
<nav aria-label="Pagination" class="sg-pagination">
<button type="button" class="sg-page" disabled="" aria-label="Previous page">
<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
<path d="M14.5 6l-6 6 6 6">
</path>
</svg>
</button>
<button type="button" class="sg-page sg-chip-surface" aria-current="page">1</button>
<button type="button" class="sg-page">2</button>
<span class="sg-page-ellipsis">…</span>
<button type="button" class="sg-page">4</button>
<button type="button" class="sg-page" aria-label="Next page">
<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
<path d="M9.5 6l6 6-6 6">
</path>
</svg>
</button>
</nav>
</div>
</div>
</div>
```
