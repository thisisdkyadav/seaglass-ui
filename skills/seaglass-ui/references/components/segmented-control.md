# Segmented control

A row of mutually exclusive options. Separate pebbles, or one pebble with a white chip.

```tsx
import { SegmentedControl } from "seaglass-ui";
```

Built on the Radix Toggle Group primitive (https://www.radix-ui.com/primitives/docs/components/toggle-group) — the same keyboard and ARIA behaviour.

## SegmentedControl props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `options` (required) | `{ value, label, icon?, disabled? }[]` |  |  |
| `value · defaultValue · onValueChange` | `string` |  |  |
| `variant` | `"separate" \| "joined"` | `"separate"` |  |
| `tone` | `Tone` | `"mint" · joined: "clear"` | Sea-glass tint. Semantic names map onto tints. |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` |  |
| `showCheck` | `boolean` | `true` | Check mark on the selected pebble (separate variant). |
| `aria-label` | `string` |  | Name for the group. |

## Keyboard

- **↑ ↓ ← →** — Move and select

## Examples

### Separate

Each option is its own pebble; the selected one fills with colour.

```tsx
import { SegmentedControl } from "seaglass-ui";
import { LayoutGrid, List, Map } from "lucide-react";

export default function Separate() {
  return (
    <SegmentedControl
      aria-label="View"
      defaultValue="grid"
      tone="periwinkle"
      options={[
        { value: "grid", label: "Grid", icon: <LayoutGrid size={18} /> },
        { value: "list", label: "List", icon: <List size={18} /> },
        { value: "map", label: "Map", icon: <Map size={18} /> },
      ]}
    />
  );
}
```

Rendered HTML:

```html
<div dir="ltr" role="radiogroup" data-tone="periwinkle" data-variant="separate" data-size="md" class="sg-segmented" aria-label="View" tabindex="-1" style="outline:none">
<button type="button" data-state="on" role="radio" aria-checked="true" data-tone="periwinkle" data-depth="md" data-interactive="" class="sg-segment sg-pebble" tabindex="-1" data-radix-collection-item="">
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
<path d="M5 12.5l4.5 4.5L19 7.5">
</path>
</svg>
<svg class="lucide lucide-layout-grid" aria-hidden="true">…</svg>
<span>Grid</span>
</button>
<button type="button" data-state="off" role="radio" aria-checked="false" data-tone="periwinkle" data-depth="md" data-interactive="" class="sg-segment sg-pebble" tabindex="-1" data-radix-collection-item="">
<svg class="lucide lucide-list" aria-hidden="true">…</svg>
<span>List</span>
</button>
<button type="button" data-state="off" role="radio" aria-checked="false" data-tone="periwinkle" data-depth="md" data-interactive="" class="sg-segment sg-pebble" tabindex="-1" data-radix-collection-item="">
<svg class="lucide lucide-map" aria-hidden="true">…</svg>
<span>Map</span>
</button>
</div>
```

### Joined

One pebble, with a white chip resting on the selection.

```tsx
import { SegmentedControl } from "seaglass-ui";

export default function Joined() {
  return (
    <SegmentedControl
      aria-label="Period"
      variant="joined"
      defaultValue="7d"
      options={[
        { value: "24h", label: "24h" },
        { value: "7d", label: "7 days" },
        { value: "30d", label: "30 days" },
        { value: "12m", label: "12 months" },
      ]}
    />
  );
}
```

Rendered HTML:

```html
<div dir="ltr" role="radiogroup" data-tone="clear" data-variant="joined" data-size="md" data-depth="md" class="sg-segmented sg-pebble" aria-label="Period" tabindex="-1" style="outline:none">
<button type="button" data-state="off" role="radio" aria-checked="false" class="sg-segment" tabindex="-1" data-radix-collection-item="">
<span>24h</span>
</button>
<button type="button" data-state="on" role="radio" aria-checked="true" class="sg-segment sg-chip-surface" tabindex="-1" data-radix-collection-item="">
<span>7 days</span>
</button>
<button type="button" data-state="off" role="radio" aria-checked="false" class="sg-segment" tabindex="-1" data-radix-collection-item="">
<span>30 days</span>
</button>
<button type="button" data-state="off" role="radio" aria-checked="false" class="sg-segment" tabindex="-1" data-radix-collection-item="">
<span>12 months</span>
</button>
</div>
```
