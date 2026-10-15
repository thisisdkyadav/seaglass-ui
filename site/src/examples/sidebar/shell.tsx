import { useState } from "react";
import {
  SidebarProvider, Sidebar, SidebarHeader, SidebarFooter, SidebarInset, SidebarTrigger, SidebarSearch, SidebarNav,
  SidebarButton, SidebarExpandedOnly, Avatar, Pebble, type NavSection,
} from "seaglass-ui";
import { LayoutDashboard, ShoppingBag, Inbox, Settings, LifeBuoy, Droplet, ChevronsUpDown } from "lucide-react";

const sections: NavSection[] = [
  {
    id: "main",
    items: [
      { id: "overview", label: "Overview", icon: <LayoutDashboard size={20} /> },
      {
        id: "sales", label: "Sales", icon: <ShoppingBag size={20} />, badge: 12,
        children: [
          { id: "orders", label: "Orders", badge: 12 },
          { id: "invoices", label: "Invoices" },
          { id: "returns", label: "Returns", children: [
            { id: "returns-open", label: "Open", badge: 3, badgeTone: "amber" },
            { id: "returns-done", label: "Resolved" },
          ] },
        ],
      },
      { id: "inbox", label: "Inbox", icon: <Inbox size={20} />, badge: 4, badgeTone: "periwinkle" },
    ],
  },
  {
    id: "pinned", title: "Pinned",
    items: [
      { id: "q4", label: "Q4 launch", dot: "coral" },
      { id: "brand", label: "Brand refresh", dot: "seafoam", tag: "new" },
    ],
  },
  {
    id: "workspace", title: "Workspace",
    items: [
      { id: "settings", label: "Settings", icon: <Settings size={20} />, children: [
        { id: "general", label: "General" },
        { id: "billing", label: "Billing", tag: "pro" },
      ] },
      { id: "help", label: "Help", icon: <LifeBuoy size={20} /> },
    ],
  },
];

// In your app, leave hotkeys on: "[" or mod+b collapses, "/" searches.
// They are off here so they don't fight with this site's own sidebar.
export default function Shell() {
  const [active, setActive] = useState("orders");
  return (
    <SidebarProvider storageKey={false} hotkeys={false} searchHotkey={false} defaultOpen={["sales"]} className="demo-shell">
      <Sidebar>
        <SidebarHeader>
          <SidebarButton
            media={<Pebble tone="aqua" depth="sm" radius="15px" style={{ width: 44, height: 44, display: "grid", placeItems: "center" }}><Droplet size={20} /></Pebble>}
            title="Tidepool"
            subtitle="Studio workspace"
            end={<ChevronsUpDown size={18} />}
            railLabel="Tidepool"
          />
          <SidebarExpandedOnly><SidebarTrigger /></SidebarExpandedOnly>
        </SidebarHeader>
        <SidebarSearch />
        <SidebarNav sections={sections} activeId={active} onNavigate={(item) => setActive(item.id)} />
        <SidebarFooter>
          <SidebarButton media={<Avatar name="Ava Thompson" size="sm" tone="lilac" status="online" />} title="Ava Thompson" subtitle="ava@tidepool.co" railLabel="Ava Thompson" />
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <Collapser />
        <h3 style={{ margin: 0 }}>{active}</h3>
        <p style={{ margin: 0, color: "var(--sg-ink-muted)" }}>
          Drag the sidebar's right edge to resize, collapse it to a rail, hover rail groups for flyouts.
        </p>
      </SidebarInset>
    </SidebarProvider>
  );
}

function Collapser() {
  return <div><SidebarTrigger variant="pebble" /></div>;
}
