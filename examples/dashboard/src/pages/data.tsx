import { useState } from "react";
import {
  Card, CardHeader, Tabs, TabsList, Tab, TabsContent, Accordion, AccordionItem, Collapsible, CollapsibleTrigger, CollapsibleContent,
  Breadcrumbs, Pagination, Button, Calendar, Stat, Sparkline, BarChart, Table, TR, TH, TD, Badge, Separator, type DateRange,
} from "seaglass";
import { orders, money } from "../data";

const I = (name: string) => <span className="ms">{name}</span>;

export function Navigation() {
  const [page, setPage] = useState(4);
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="pg-title"><div><h1>Navigation</h1><p>Tabs, accordions, breadcrumbs, pagination. The sidebar on the left is the big one.</p></div></div>
      <div className="pg-grid pg-cols-2">
        <Card>
          <CardHeader title="Tabs" description="pebble · chips · line — arrow keys move between tabs" />
          <Tabs defaultValue="overview">
            <TabsList>
              <Tab value="overview" icon={I("dashboard")}>Overview</Tab>
              <Tab value="activity" icon={I("bolt")} count={8}>Activity</Tab>
              <Tab value="settings" icon={I("settings")}>Settings</Tab>
            </TabsList>
            <TabsContent value="overview"><p className="pg-muted">The active tab is a white chip resting inside the pebble.</p></TabsContent>
            <TabsContent value="activity"><p className="pg-muted">Eight new events since yesterday.</p></TabsContent>
            <TabsContent value="settings"><p className="pg-muted">Settings live here.</p></TabsContent>
          </Tabs>
          <Tabs defaultValue="all" variant="chips">
            <TabsList><Tab value="all">All</Tab><Tab value="open" count={12}>Open</Tab><Tab value="closed">Closed</Tab><Tab value="draft" disabled>Drafts</Tab></TabsList>
          </Tabs>
          <Tabs defaultValue="traffic" variant="line" tone="periwinkle">
            <TabsList><Tab value="traffic">Traffic</Tab><Tab value="sales">Sales</Tab><Tab value="funnels">Funnels</Tab></TabsList>
          </Tabs>
        </Card>
        <Card>
          <CardHeader title="Breadcrumbs & pagination" description="Long trails collapse into an ellipsis" />
          <Breadcrumbs items={[{ label: "Home", href: "#/" }, { label: "Catalogue", href: "#/" }, { label: "Kitchen", href: "#/" }, { label: "Mugs", href: "#/" }, { label: "Sea glass mug" }]} maxItems={4} />
          <Breadcrumbs items={[{ label: "Settings", href: "#/settings" }, { label: "Billing" }]} />
          <Separator />
          <Pagination page={page} pageCount={12} onPageChange={setPage} />
          <Collapsible open={open} onOpenChange={setOpen}>
            <CollapsibleTrigger asChild><Button variant="ghost" tone="clear" iconEnd={I(open ? "expand_less" : "expand_more")}>{open ? "Hide" : "Show"} advanced options</Button></CollapsibleTrigger>
            <CollapsibleContent><p className="pg-muted">Collapsible animates its height with Radix's measured content size.</p></CollapsibleContent>
          </Collapsible>
        </Card>
          <Accordion type="single" collapsible defaultValue="a">
            <AccordionItem value="a" title="What is sea glass?" icon={I("water")}>Frosted pebbles of glass, tumbled smooth by the sea. Here: a UI material.</AccordionItem>
            <AccordionItem value="b" title="Can I use my own colours?" icon={I("palette")}>Yes — every tone is one h/s/l triple. Set --h, --s and --l on any pebble.</AccordionItem>
            <AccordionItem value="c" title="Does it work without React?" icon={I("code")}>The CSS does. Behaviour comes from Radix, so other frameworks need their own port.</AccordionItem>
          </Accordion>
        <Accordion type="multiple" variant="separate" tone="seafoam">
          <AccordionItem value="x" title="Shipping">Free over $50, otherwise $4.90.</AccordionItem>
          <AccordionItem value="y" title="Returns">30 days, no questions asked.</AccordionItem>
        </Accordion>
      </div>
    </>
  );
}

export function DataDisplay() {
  const [range, setRange] = useState<DateRange>({ from: new Date(2026, 9, 6), to: new Date(2026, 9, 12) });
  return (
    <>
      <div className="pg-title"><div><h1>Data display</h1><p>Stats, charts, tables and calendars.</p></div></div>
      <section className="pg-grid pg-cols-4">
        <Stat tone="sky" label="Sessions" value="8,412" delta="+6.2%" data={[5, 7, 6, 9, 8, 11, 12]} />
        <Stat tone="rose" label="Bounce rate" value="38.1%" delta="+3.0%" trend="down" data={[30, 32, 31, 35, 36, 37, 38]} />
        <Stat tone="mint" label="Conversion" value="3.4%" delta="+0.4%" />
        <Stat label="Refunds" value="$1,204" delta="−8%" trend="up" icon={I("undo")} />
      </section>
      <div className="pg-grid pg-cols-2">
        <Card style={{ gridColumn: "1 / -1" }}>
          <CardHeader title="Calendar" description="Range mode, two months. Arrows, PageUp/Down, Home/End." />
          <Calendar mode="range" numberOfMonths={2} value={range} onValueChange={setRange} defaultMonth={new Date(2026, 9, 1)} />
        </Card>
        <Card>
          <CardHeader title="BarChart" description="Each bar is its own small pebble" />
          <BarChart tone="periwinkle" data={["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"].map((m, i) => ({ label: m, value: [32, 41, 38, 52, 47, 61, 58, 66][i] }))} />
        </Card>
        <Card>
          <CardHeader title="Plain table" description="Table, TR, TH, TD for hand-built tables" actions={<Sparkline data={[3, 5, 4, 7, 6, 9, 8]} area />} />
          <Table density="compact">
            <thead><TR><TH>Order</TH><TH>Status</TH><TH align="right">Total</TH></TR></thead>
            <tbody>
              {orders.slice(0, 5).map((o) => (
                <TR key={o.id}><TD className="pg-mono">{o.id}</TD><TD><Badge size="sm" tone={o.status === "Paid" ? "mint" : o.status === "Pending" ? "amber" : "coral"}>{o.status}</Badge></TD><TD align="right">{money(o.total)}</TD></TR>
              ))}
            </tbody>
          </Table>
        </Card>
        <Card tone="aqua">
          <CardHeader title="Tinted card" description="Any surface takes a tone" icon={I("water_drop")} />
          <p style={{ margin: 0 }}>Text on a coloured pebble takes the pebble's own hue, very dark — never plain black.</p>
        </Card>
      </div>
    </>
  );
}
