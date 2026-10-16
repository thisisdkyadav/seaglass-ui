# Badge

Small status labels and counts.

```tsx
import { Badge, Count } from "seaglass-ui";
```

## Badge props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"soft" \| "pebble" \| "outline" \| "solid"` | `"soft"` | soft: tinted wash · pebble: tiny raised stone · outline · solid: deep ink fill. |
| `tone` | `Tone` | `"neutral"` | Sea-glass tint. Semantic names map onto tints. |
| `size` | `"sm" \| "md"` | `"md"` |  |
| `dot` | `boolean` | `false` | A coloured dot before the label. |
| `icon` | `ReactNode` |  | Icon before the label. |

## Count props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` (required) | `number` |  | The number. |
| `max` | `number` | `99` | Above this, shows "max+". |
| `tone` | `Tone` | `"rose"` | Sea-glass tint. Semantic names map onto tints. |

## Examples

### Variants

```tsx
import { Badge } from "seaglass-ui";

export default function Variants() {
  return (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
      <Badge tone="mint" dot>Paid</Badge>
      <Badge tone="amber" dot>Pending</Badge>
      <Badge tone="coral">Failed</Badge>
      <Badge tone="lilac" variant="pebble">Pebble</Badge>
      <Badge tone="periwinkle" variant="outline">Outline</Badge>
      <Badge tone="periwinkle" variant="solid">Solid</Badge>
      <Badge size="sm">Small</Badge>
    </div>
  );
}
```

Rendered HTML:

```html
<div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center">
<span data-tone="mint" data-variant="soft" data-size="md" class="sg-badge">
<span class="sg-badge-dot" aria-hidden="true">
</span>Paid</span>
<span data-tone="amber" data-variant="soft" data-size="md" class="sg-badge">
<span class="sg-badge-dot" aria-hidden="true">
</span>Pending</span>
<span data-tone="coral" data-variant="soft" data-size="md" class="sg-badge">Failed</span>
<span data-tone="lilac" data-variant="pebble" data-size="md" data-depth="xs" class="sg-badge sg-pebble">Pebble</span>
<span data-tone="periwinkle" data-variant="outline" data-size="md" class="sg-badge">Outline</span>
<span data-tone="periwinkle" data-variant="solid" data-size="md" class="sg-badge">Solid</span>
<span data-tone="neutral" data-variant="soft" data-size="sm" class="sg-badge">Small</span>
</div>
```

### Count

A numeric pill. max caps it, e.g. 99+.

```tsx
import { Count } from "seaglass-ui";

export default function Counts() {
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Count value={4} tone="periwinkle" />
      <Count value={12} />
      <Count value={240} tone="clear" />
      <Count value={1200} max={999} tone="amber" />
    </div>
  );
}
```

Rendered HTML:

```html
<div style="display:flex;gap:12px;align-items:center">
<span data-tone="periwinkle" class="sg-count">4</span>
<span data-tone="rose" class="sg-count">12</span>
<span data-tone="clear" class="sg-count">99+</span>
<span data-tone="amber" class="sg-count">999+</span>
</div>
```
