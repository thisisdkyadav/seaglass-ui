# Sidebar

An app shell: collapsible to a rail, resizable, searchable, multi-level, and a drawer on phones.

SidebarProvider lays out the shell and remembers its state. SidebarNav takes your sections as data and handles nested groups, keyboard navigation, rail flyouts and search. This very site is built with it.

```tsx
import { SidebarProvider, Sidebar, SidebarHeader, SidebarSearch, SidebarNav, SidebarFooter, SidebarInset, SidebarTrigger } from "seaglass-ui";
```

## SidebarProvider props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `collapsed · defaultCollapsed · onCollapsedChange` | `boolean` |  | Rail mode. |
| `storageKey` | `string \| false` | `"sg-sidebar"` | Remember collapsed state, width and open groups. |
| `hotkeys` | `string[] \| false` | `["[", "mod+b"]` | Toggle the rail. |
| `searchHotkey` | `string \| false` | `"/"` | Focus the search. |
| `mobileBreakpoint` | `number` | `900` | Below this width it becomes a drawer. |
| `defaultWidth · minWidth · maxWidth` | `number` | `264 · 220 · 420` | Expanded width in px. |
| `defaultOpen` | `string[]` |  | Group ids open on first visit. |

## Sidebar props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `tone` | `Tone` | `"clear"` | Sea-glass tint. Semantic names map onto tints. |
| `resizable` | `boolean` | `true` | Drag the edge; double-click to reset. |
| `aria-label` | `string` | `"Main navigation"` |  |

## SidebarNav props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `sections` (required) | `NavSection[]` |  | { id, title?, items, collapsible? } |
| `activeId` | `string` |  | The current item; its parents open automatically. |
| `onNavigate` | `(item: NavItem) => void` |  | A leaf was chosen. |
| `renderLink` | `(item, props) => ReactNode` |  | Use your router's link. Spread props onto it. |
| `aria-label` | `string` | `"Sections"` | Name for the nav landmark. |

## SidebarInset props

The page beside the sidebar.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `"main" \| "div"` | `"main"` | Use "div" when the inset is not the page's main content. |

## NavItem props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `id · label` (required) | `string` |  |  |
| `icon` | `ReactNode` |  |  |
| `href` | `string` |  |  |
| `badge · badgeTone` | `ReactNode · Tone` |  | Count on the right. |
| `tag` | `string` |  | A small uppercase tag, e.g. "new". |
| `dot` | `Tone` |  | A coloured dot instead of an icon. |
| `children` | `NavItem[]` |  | Nested items, any depth. |
| `keywords` | `string[]` |  | Extra search terms. |

## SidebarButton props

Workspace switchers and account buttons that work in both modes.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `media` (required) | `ReactNode` |  | Avatar or logo. |
| `title` (required) | `ReactNode` |  |  |
| `subtitle` | `ReactNode` |  |  |
| `end` | `ReactNode` |  | Trailing glyph. |
| `railLabel` | `string` |  | Tooltip in rail mode. |

## useSidebar() props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `collapsed · setCollapsed · toggle` | `—` |  |  |
| `isMobile · mobileOpen · setMobileOpen` | `—` |  |  |

## Keyboard

- **[ / ⌘ B / Ctrl B** — Collapse / expand
- **/** — Search the nav
- **↑ ↓** — Move between items
- **→ / ←** — Open / close a group
- **Home / End** — First / last item

## Accessibility

- Nav items are a tree of links and buttons with aria-expanded and aria-current.
- On phones the sidebar is a modal drawer with a focus trap.

## Examples

### App shell

Contained here; in your app it fills the viewport.

```tsx
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
        <SidebarNav aria-label="Workspace" sections={sections} activeId={active} onNavigate={(item) => setActive(item.id)} />
        <SidebarFooter>
          <SidebarButton media={<Avatar name="Ava Thompson" size="sm" tone="lilac" status="online" />} title="Ava Thompson" subtitle="ava@tidepool.co" railLabel="Ava Thompson" />
        </SidebarFooter>
      </Sidebar>
      <SidebarInset as="div">
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
```

Rendered HTML:

```html
<div class="sg-shell demo-shell" style="--sg-sidebar-width:264px">
<aside aria-label="Main navigation" data-tone="clear" data-depth="lg" data-state="expanded" class="sg-sidebar sg-pebble">
<div class="sg-sidebar-header">
<button type="button" class="sg-sidebar-button">
<span class="sg-sidebar-button-media">
<div data-tone="aqua" data-depth="sm" class="sg-pebble" style="width:44px;height:44px;display:grid;place-items:center;--sg-r:15px">
<svg class="lucide lucide-droplet" aria-hidden="true">…</svg>
</div>
</span>
<span class="sg-sidebar-button-text">
<b>Tidepool</b>
<small>Studio workspace</small>
</span>
<span class="sg-sidebar-button-end" aria-hidden="true">
<svg class="lucide lucide-chevrons-up-down" aria-hidden="true">…</svg>
</span>
</button>
<button type="button" aria-label="Collapse sidebar" aria-expanded="true" class="sg-sidebar-trigger" data-state="closed">
<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
<rect x="3.5" y="4.5" width="17" height="15" rx="3.5">
</rect>
<path d="M9.5 4.5v15">
</path>
</svg>
</button>
</div>
<label class="sg-sidebar-search sg-well">
<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="sg-sidebar-search-icon">
<circle cx="11" cy="11" r="6.5">
</circle>
<path d="M16 16l4 4">
</path>
</svg>
<input type="search" placeholder="Jump to…" aria-label="Filter navigation" autoComplete="off" value=""/>
<kbd class="sg-kbd sg-sidebar-search-kbd">/</kbd>
</label>
<nav class="sg-sidebar-content sg-nav" aria-label="Workspace">
<section class="sg-nav-section">
<div class="sg-fold" data-open="">
<ul class="sg-nav-list" role="list">
<li>
<button type="button" class="sg-nav-item" data-sg-nav-item="">
<span class="sg-nav-icon" aria-hidden="true">
<svg class="lucide lucide-layout-dashboard" aria-hidden="true">…</svg>
</span>
<span class="sg-nav-label">Overview</span>
</button>
</li>
<li data-open="">
<button type="button" data-sg-nav-item="" class="sg-nav-item" data-trail="" aria-expanded="true">
<span class="sg-nav-icon" aria-hidden="true">
<svg class="lucide lucide-shopping-bag" aria-hidden="true">…</svg>
</span>
<span class="sg-nav-label">Sales</span>
<span class="sg-count" data-tone="rose">12</span>
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="sg-nav-chevron">
<path d="M9.5 6l6 6-6 6">
</path>
</svg>
</button>
<div class="sg-fold" data-open="">
<ul class="sg-nav-list sg-nav-sub" role="list">
<li>
<button type="button" class="sg-nav-item" aria-current="page" data-sg-nav-item="" data-active="">
<span class="sg-nav-label">Orders</span>
<span class="sg-count" data-tone="rose">12</span>
</button>
</li>
<li>
<button type="button" class="sg-nav-item" data-sg-nav-item="">
<span class="sg-nav-label">Invoices</span>
</button>
</li>
<li>
<button type="button" data-sg-nav-item="" class="sg-nav-item" aria-expanded="false">
<span class="sg-nav-label">Returns</span>
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="sg-nav-chevron">
<path d="M9.5 6l6 6-6 6">
</path>
</svg>
</button>
<div class="sg-fold" data-folded="">
<ul class="sg-nav-list sg-nav-sub" role="list">
<li>
<button type="button" class="sg-nav-item" data-sg-nav-item="">
<span class="sg-nav-label">Open</span>
<span class="sg-count" data-tone="amber">3</span>
</button>
</li>
<li>
<button type="button" class="sg-nav-item" data-sg-nav-item="">
<span class="sg-nav-label">Resolved</span>
</button>
</li>
</ul>
</div>
</li>
</ul>
</div>
</li>
<li>
<button type="button" class="sg-nav-item" data-sg-nav-item="">
<span class="sg-nav-icon" aria-hidden="true">
<svg class="lucide lucide-inbox" aria-hidden="true">…</svg>
</span>
<span class="sg-nav-label">Inbox</span>
<span class="sg-count" data-tone="periwinkle">4</span>
</button>
</li>
</ul>
</div>
</section>
<section class="sg-nav-section">
<button type="button" class="sg-nav-title" aria-expanded="true">
<span>Pinned</span>
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="sg-nav-title-chevron">
<path d="M6 9.5l6 6 6-6">
</path>
</svg>
</button>
<div class="sg-fold" data-open="">
<ul class="sg-nav-list" role="list">
<li>
<button type="button" class="sg-nav-item" data-sg-nav-item="">
<span class="sg-nav-dot" data-tone="coral">
</span>
<span class="sg-nav-label">Q4 launch</span>
</button>
</li>
<li>
<button type="button" class="sg-nav-item" data-sg-nav-item="">
<span class="sg-nav-dot" data-tone="seafoam">
</span>
<span class="sg-nav-label">Brand refresh</span>
<span class="sg-nav-tag">new</span>
</button>
</li>
</ul>
</div>
</section>
<section class="sg-nav-section">
<button type="button" class="sg-nav-title" aria-expanded="true">
<span>Workspace</span>
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="sg-nav-title-chevron">
<path d="M6 9.5l6 6 6-6">
</path>
</svg>
</button>
<div class="sg-fold" data-open="">
<ul class="sg-nav-list" role="list">
<li>
<button type="button" data-sg-nav-item="" class="sg-nav-item" aria-expanded="false">
<span class="sg-nav-icon" aria-hidden="true">
<svg class="lucide lucide-settings" aria-hidden="true">…</svg>
</span>
<span class="sg-nav-label">Settings</span>
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="sg-nav-chevron">
<path d="M9.5 6l6 6-6 6">
</path>
</svg>
</button>
<div class="sg-fold" data-folded="">
<ul class="sg-nav-list sg-nav-sub" role="list">
<li>
<button type="button" class="sg-nav-item" data-sg-nav-item="">
<span class="sg-nav-label">General</span>
</button>
</li>
<li>
<button type="button" class="sg-nav-item" data-sg-nav-item="">
<span class="sg-nav-label">Billing</span>
<span class="sg-nav-tag">pro</span>
</button>
</li>
</ul>
</div>
</li>
<li>
<button type="button" class="sg-nav-item" data-sg-nav-item="">
<span class="sg-nav-icon" aria-hidden="true">
<svg class="lucide lucide-life-buoy" aria-hidden="true">…</svg>
</span>
<span class="sg-nav-label">Help</span>
</button>
</li>
</ul>
</div>
</section>
</nav>
<div class="sg-sidebar-footer">
<button type="button" class="sg-sidebar-button">
<span class="sg-sidebar-button-media">
<span data-tone="lilac" data-depth="xs" data-size="sm" data-shape="circle" class="sg-avatar sg-pebble">
<span class="sg-avatar-status" data-status="online" role="img" aria-label="Online">
</span>
</span>
</span>
<span class="sg-sidebar-button-text">
<b>Ava Thompson</b>
<small>ava@tidepool.co</small>
</span>
</button>
</div>
<div role="separator" aria-orientation="vertical" aria-label="Resize sidebar" aria-valuenow="264" aria-valuemin="220" aria-valuemax="420" tabindex="0" class="sg-sidebar-resize">
</div>
</aside>
<div class="sg-sidebar-inset">
<div>
<button type="button" aria-label="Collapse sidebar" aria-expanded="true" data-tone="clear" data-depth="sm" data-interactive="" class="sg-sidebar-trigger sg-pebble" data-state="closed">
<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
<rect x="3.5" y="4.5" width="17" height="15" rx="3.5">
</rect>
<path d="M9.5 4.5v15">
</path>
</svg>
</button>
</div>
<h3 style="margin:0">orders</h3>
<p style="margin:0;color:var(--sg-ink-muted)">Drag the sidebar&#x27;s right edge to resize, collapse it to a rail, hover rail groups for flyouts.</p>
</div>
</div>
```
