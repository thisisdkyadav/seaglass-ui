# Tabs

Switch between views. A pebble tray with a white chip, plain chips or an underline.

```tsx
import { Tabs, TabsList, Tab, TabsContent } from "seaglass-ui";
```

Built on the Radix Tabs primitive (https://www.radix-ui.com/primitives/docs/components/tabs) — the same keyboard and ARIA behaviour.

## Tabs props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"pebble" \| "chips" \| "line"` | `"pebble"` |  |
| `tone` | `Tone` | `"clear"` | Sea-glass tint. Semantic names map onto tints. |
| `value · defaultValue · onValueChange` | `string` |  |  |
| `activationMode` | `"automatic" \| "manual"` | `"automatic"` |  |

## Tab props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` (required) | `string` |  |  |
| `icon` | `ReactNode` |  |  |
| `count` | `ReactNode` |  | A small count after the label. |
| `disabled` | `boolean` |  |  |

## Keyboard

- **← →** — Move between tabs
- **Home / End** — First / last

## Examples

### Pebble

```tsx
import { Tabs, TabsList, Tab, TabsContent } from "seaglass-ui";
import { LayoutDashboard, Zap, Settings } from "lucide-react";

export default function PebbleTabs() {
  return (
    <Tabs defaultValue="overview" style={{ width: "min(460px, 100%)" }}>
      <TabsList>
        <Tab value="overview" icon={<LayoutDashboard />}>Overview</Tab>
        <Tab value="activity" icon={<Zap />} count={8}>Activity</Tab>
        <Tab value="settings" icon={<Settings />}>Settings</Tab>
      </TabsList>
      <TabsContent value="overview">The active tab is a white chip resting inside the pebble.</TabsContent>
      <TabsContent value="activity">Eight new events since yesterday.</TabsContent>
      <TabsContent value="settings">Settings live here.</TabsContent>
    </Tabs>
  );
}
```

Rendered HTML:

```html
<div dir="ltr" data-orientation="horizontal" data-variant="pebble" data-tone="clear" class="sg-tabs" style="width:min(460px, 100%)">
<div role="tablist" aria-orientation="horizontal" data-tone="clear" data-depth="md" class="sg-tabs-list sg-pebble" tabindex="-1" data-orientation="horizontal" style="outline:none">
<button type="button" role="tab" aria-selected="true" aria-controls="radix-id-content-overview" data-state="active" id="radix-id-trigger-overview" class="sg-tab" tabindex="-1" data-orientation="horizontal" data-radix-collection-item="">
<span class="sg-tab-icon" aria-hidden="true">
<svg class="lucide lucide-layout-dashboard" aria-hidden="true">…</svg>
</span>
<span>Overview</span>
</button>
<button type="button" role="tab" aria-selected="false" aria-controls="radix-id-content-activity" data-state="inactive" id="radix-id-trigger-activity" class="sg-tab" tabindex="-1" data-orientation="horizontal" data-radix-collection-item="">
<span class="sg-tab-icon" aria-hidden="true">
<svg class="lucide lucide-zap" aria-hidden="true">…</svg>
</span>
<span>Activity</span>
<span class="sg-tab-count">8</span>
</button>
<button type="button" role="tab" aria-selected="false" aria-controls="radix-id-content-settings" data-state="inactive" id="radix-id-trigger-settings" class="sg-tab" tabindex="-1" data-orientation="horizontal" data-radix-collection-item="">
<span class="sg-tab-icon" aria-hidden="true">
<svg class="lucide lucide-settings" aria-hidden="true">…</svg>
</span>
<span>Settings</span>
</button>
</div>
<div data-state="active" data-orientation="horizontal" role="tabpanel" aria-labelledby="radix-id-trigger-overview" id="radix-id-content-overview" tabindex="0" class="sg-tabs-content" style="animation-duration:0s">The active tab is a white chip resting inside the pebble.</div>
<div data-state="inactive" data-orientation="horizontal" role="tabpanel" aria-labelledby="radix-id-trigger-activity" hidden="" id="radix-id-content-activity" tabindex="0" class="sg-tabs-content">
</div>
<div data-state="inactive" data-orientation="horizontal" role="tabpanel" aria-labelledby="radix-id-trigger-settings" hidden="" id="radix-id-content-settings" tabindex="0" class="sg-tabs-content">
</div>
</div>
```

### Chips and line

```tsx
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
```

Rendered HTML:

```html
<div style="display:grid;gap:28px">
<div dir="ltr" data-orientation="horizontal" data-variant="chips" data-tone="clear" class="sg-tabs">
<div role="tablist" aria-orientation="horizontal" data-tone="clear" data-depth="md" class="sg-tabs-list" tabindex="-1" data-orientation="horizontal" style="outline:none">
<button type="button" role="tab" aria-selected="true" aria-controls="radix-id-content-all" data-state="active" id="radix-id-trigger-all" class="sg-tab" tabindex="-1" data-orientation="horizontal" data-radix-collection-item="">
<span>All</span>
</button>
<button type="button" role="tab" aria-selected="false" aria-controls="radix-id-content-open" data-state="inactive" id="radix-id-trigger-open" class="sg-tab" tabindex="-1" data-orientation="horizontal" data-radix-collection-item="">
<span>Open</span>
<span class="sg-tab-count">12</span>
</button>
<button type="button" role="tab" aria-selected="false" aria-controls="radix-id-content-closed" data-state="inactive" id="radix-id-trigger-closed" class="sg-tab" tabindex="-1" data-orientation="horizontal" data-radix-collection-item="">
<span>Closed</span>
</button>
<button type="button" role="tab" aria-selected="false" aria-controls="radix-id-content-draft" data-state="inactive" data-disabled="" disabled="" id="radix-id-trigger-draft" class="sg-tab" tabindex="-1" data-orientation="horizontal" data-radix-collection-item="">
<span>Drafts</span>
</button>
</div>
<div data-state="active" data-orientation="horizontal" role="tabpanel" aria-labelledby="radix-id-trigger-all" id="radix-id-content-all" tabindex="0" class="sg-tabs-content site-muted" style="animation-duration:0s">Showing all issues.</div>
<div data-state="inactive" data-orientation="horizontal" role="tabpanel" aria-labelledby="radix-id-trigger-open" hidden="" id="radix-id-content-open" tabindex="0" class="sg-tabs-content site-muted">
</div>
<div data-state="inactive" data-orientation="horizontal" role="tabpanel" aria-labelledby="radix-id-trigger-closed" hidden="" id="radix-id-content-closed" tabindex="0" class="sg-tabs-content site-muted">
</div>
<div data-state="inactive" data-orientation="horizontal" role="tabpanel" aria-labelledby="radix-id-trigger-draft" hidden="" id="radix-id-content-draft" tabindex="0" class="sg-tabs-content site-muted">
</div>
</div>
<div dir="ltr" data-orientation="horizontal" data-variant="line" data-tone="periwinkle" class="sg-tabs">
<div role="tablist" aria-orientation="horizontal" data-tone="periwinkle" data-depth="md" class="sg-tabs-list" tabindex="-1" data-orientation="horizontal" style="outline:none">
<button type="button" role="tab" aria-selected="true" aria-controls="radix-id-content-traffic" data-state="active" id="radix-id-trigger-traffic" class="sg-tab" tabindex="-1" data-orientation="horizontal" data-radix-collection-item="">
<span>Traffic</span>
</button>
<button type="button" role="tab" aria-selected="false" aria-controls="radix-id-content-sales" data-state="inactive" id="radix-id-trigger-sales" class="sg-tab" tabindex="-1" data-orientation="horizontal" data-radix-collection-item="">
<span>Sales</span>
</button>
<button type="button" role="tab" aria-selected="false" aria-controls="radix-id-content-funnels" data-state="inactive" id="radix-id-trigger-funnels" class="sg-tab" tabindex="-1" data-orientation="horizontal" data-radix-collection-item="">
<span>Funnels</span>
</button>
</div>
<div data-state="active" data-orientation="horizontal" role="tabpanel" aria-labelledby="radix-id-trigger-traffic" id="radix-id-content-traffic" tabindex="0" class="sg-tabs-content site-muted" style="animation-duration:0s">The traffic report.</div>
<div data-state="inactive" data-orientation="horizontal" role="tabpanel" aria-labelledby="radix-id-trigger-sales" hidden="" id="radix-id-content-sales" tabindex="0" class="sg-tabs-content site-muted">
</div>
<div data-state="inactive" data-orientation="horizontal" role="tabpanel" aria-labelledby="radix-id-trigger-funnels" hidden="" id="radix-id-content-funnels" tabindex="0" class="sg-tabs-content site-muted">
</div>
</div>
</div>
```
