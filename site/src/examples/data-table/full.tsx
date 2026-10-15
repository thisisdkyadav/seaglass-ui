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
