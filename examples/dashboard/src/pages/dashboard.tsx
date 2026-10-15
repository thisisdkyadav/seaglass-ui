import { useMemo, useState } from "react";
import {
  Stat, Card, CardHeader, BarChart, DataTable, Badge, Avatar, AvatarGroup, Button, SegmentedControl, DateRangePicker,
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, IconButton,
  AlertDialog, toast, type Column, type DateRange,
} from "seaglass";
import { orders, weekly, team, money, type Order } from "../data";

const I = (name: string) => <span className="ms">{name}</span>;
const statusTone = { Paid: "mint", Pending: "amber", Refunded: "lilac", Failed: "coral" } as const;
const dateFmt = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });

export const orderColumns: Column<Order>[] = [
  { id: "id", header: "Order", accessor: (r) => r.id, sortable: true, cell: (r) => <b className="pg-mono">{r.id}</b>, width: 110 },
  {
    id: "customer", header: "Customer", accessor: (r) => r.customer, sortable: true,
    cell: (r) => <span className="pg-cell"><Avatar name={r.customer} size="sm" /><span><b>{r.customer}</b><small>{r.email}</small></span></span>,
  },
  { id: "date", header: "Date", accessor: (r) => r.date, sortable: true, cell: (r) => dateFmt.format(r.date), searchable: false },
  { id: "status", header: "Status", accessor: (r) => r.status, sortable: true, cell: (r) => <Badge tone={statusTone[r.status]} dot>{r.status}</Badge> },
  { id: "items", header: "Items", accessor: (r) => r.items, sortable: true, align: "right", searchable: false },
  { id: "total", header: "Total", accessor: (r) => r.total, sortable: true, align: "right", cell: (r) => <b>{money(r.total)}</b>, searchable: false },
];

export function Overview() {
  const [period, setPeriod] = useState("7d");
  return (
    <>
      <div className="pg-title">
        <div><h1>Good morning, Ava</h1><p>Here's what's happening in the shop today.</p></div>
        <SegmentedControl variant="joined" aria-label="Period" value={period} onValueChange={setPeriod}
          options={[{ value: "24h", label: "24h" }, { value: "7d", label: "7 days" }, { value: "30d", label: "30 days" }, { value: "12m", label: "12 months" }]} />
      </div>

      <section className="pg-grid pg-cols-4">
        <Stat tone="periwinkle" label="Revenue" icon={I("payments")} value="$48,295" delta="+12.4%" data={[12, 18, 15, 22, 19, 27, 31, 29, 36]} />
        <Stat tone="seafoam" label="Orders" icon={I("shopping_bag")} value="1,284" delta="+4.1%" data={[30, 28, 35, 33, 40, 38, 44, 47, 45]} />
        <Stat tone="amber" label="Avg. order" icon={I("sell")} value="$37.61" delta="−2.3%" data={[40, 42, 39, 41, 38, 37, 39, 36, 37]} />
        <Stat tone="lilac" label="Visitors" icon={I("group")} value="23.9k" delta="+18%" data={[8, 12, 10, 15, 14, 19, 22, 21, 26]} />
      </section>

      <section className="pg-grid pg-cols-3-1">
        <Card>
          <CardHeader title="Sales this week" description="Revenue per day, highlighted at the peak" actions={<Badge tone="mint" dot>Live</Badge>} />
          <BarChart data={weekly} format={(v) => money(v)} />
        </Card>
        <Card tone="sand">
          <CardHeader title="Team" description="5 people · 3 online" actions={<AvatarGroup max={3} size="sm">{team.map((t) => <Avatar key={t.name} name={t.name} />)}</AvatarGroup>} />
          <ul className="pg-feed">
            {team.slice(0, 4).map((t, i) => (
              <li key={t.name}>
                <Avatar name={t.name} size="sm" status={t.status} />
                <div><p><b>{t.name.split(" ")[0]}</b> {["shipped 14 orders", "refunded #10471", "updated the catalogue", "replied to 6 tickets"][i]}</p><small>{[4, 12, 35, 58][i]} min ago</small></div>
              </li>
            ))}
          </ul>
        </Card>
      </section>

      <Card>
        <CardHeader title="Recent orders" description="The latest 6 orders across all channels"
          actions={<Button variant="soft" tone="clear" size="sm" iconEnd={I("arrow_forward")} onClick={() => { location.hash = "#/orders"; }}>View all</Button>} />
        <DataTable aria-label="Recent orders" searchable={false} pageSize={0} data={orders.slice(0, 6)} columns={orderColumns} getRowId={(r) => r.id} />
      </Card>
    </>
  );
}

export function Orders() {
  const [data, setData] = useState(orders);
  const [status, setStatus] = useState("all");
  const [range, setRange] = useState<DateRange>({ from: null, to: null });
  const [confirm, setConfirm] = useState<string[] | null>(null);
  const shown = useMemo(() => data.filter((o) =>
    (status === "all" || o.status === status) &&
    (!range.from || o.date >= range.from) && (!range.to || o.date <= new Date(range.to.getTime() + 864e5))), [data, status, range]);

  return (
    <>
      <div className="pg-title">
        <div><h1>Orders</h1><p>{data.length} orders · sort, search, select and act in bulk.</p></div>
        <Button tone="primary" icon={I("add")} onClick={() => toast.success("Draft order created", { action: { label: "Open", onClick: () => {} } })}>New order</Button>
      </div>
      <Card>
        <DataTable
          aria-label="Orders"
          data={shown}
          columns={[...orderColumns, {
            id: "actions", header: <span className="sg-visually-hidden">Actions</span>, width: 56,
            cell: (r) => (
              <DropdownMenu>
                <DropdownMenuTrigger asChild><IconButton aria-label={`Actions for ${r.id}`} variant="ghost" tone="clear" size="sm" shape="circle">{I("more_horiz")}</IconButton></DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem icon={I("visibility")}>View order</DropdownMenuItem>
                  <DropdownMenuItem icon={I("local_shipping")} shortcut="s">Mark shipped</DropdownMenuItem>
                  <DropdownMenuItem icon={I("receipt_long")}>Download invoice</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem icon={I("delete")} tone="danger" onSelect={() => setConfirm([r.id])}>Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ),
          }]}
          getRowId={(r) => r.id}
          selectable
          searchable
          searchPlaceholder="Search orders…"
          pageSize={10}
          defaultSort={{ id: "date", dir: "desc" }}
          toolbar={
            <>
              <SegmentedControl variant="joined" size="sm" aria-label="Status" value={status} onValueChange={setStatus}
                options={["all", "Paid", "Pending", "Refunded", "Failed"].map((v) => ({ value: v, label: v === "all" ? "All" : v }))} />
              <DateRangePicker size="sm" value={range} onValueChange={setRange} placeholder="Any date" aria-label="Date range" />
            </>
          }
          bulkActions={(ids, clear) => (
            <>
              <Button size="sm" variant="soft" tone="mint" icon={I("local_shipping")} onClick={() => { toast.success(`${ids.length} orders marked shipped`); clear(); }}>Mark shipped</Button>
              <Button size="sm" variant="soft" tone="coral" icon={I("delete")} onClick={() => setConfirm(ids)}>Delete</Button>
              <Button size="sm" variant="ghost" tone="clear" onClick={clear}>Clear</Button>
            </>
          )}
        />
      </Card>
      <AlertDialog
        open={!!confirm}
        onOpenChange={(o) => !o && setConfirm(null)}
        tone="danger"
        icon={I("delete")}
        title={`Delete ${confirm?.length === 1 ? "this order" : `${confirm?.length} orders`}?`}
        description="Deleted orders are gone for good, along with their invoices."
        confirmLabel="Delete"
        onConfirm={() => {
          const ids = new Set(confirm);
          setData((d) => d.filter((o) => !ids.has(o.id)));
          toast.error(`${ids.size} deleted`, { action: { label: "Undo", onClick: () => setData(orders) } });
        }}
      />
    </>
  );
}
