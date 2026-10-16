import { Tabs, TabsList, Tab, TabsContent } from "seaglass-ui";

export default function Variants() {
  return (
    <div style={{ display: "grid", gap: 28 }}>
      <Tabs defaultValue="all" variant="chips">
        <TabsList>
          <Tab value="all">All</Tab>
          <Tab value="open" count={12}>Open</Tab>
          <Tab value="closed">Closed</Tab>
          <Tab value="draft" disabled>Drafts</Tab>
        </TabsList>
        {["all", "open", "closed", "draft"].map((v) => <TabsContent key={v} value={v} className="site-muted">Showing {v} issues.</TabsContent>)}
      </Tabs>
      <Tabs defaultValue="traffic" variant="line" tone="periwinkle">
        <TabsList>
          <Tab value="traffic">Traffic</Tab>
          <Tab value="sales">Sales</Tab>
          <Tab value="funnels">Funnels</Tab>
        </TabsList>
        {["traffic", "sales", "funnels"].map((v) => <TabsContent key={v} value={v} className="site-muted">The {v} report.</TabsContent>)}
      </Tabs>
    </div>
  );
}
