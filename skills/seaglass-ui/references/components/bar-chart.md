# Bar chart

Every bar is its own small pebble.

```tsx
import { BarChart } from "seaglass-ui";
```

## BarChart props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `data` (required) | `{ label, value }[]` |  |  |
| `height` | `number` | `170` |  |
| `tone` | `Tone` | `"amber"` | Sea-glass tint. Semantic names map onto tints. |
| `highlight` | `"max" \| number` | `"max"` | Bar drawn in a deeper tint. |
| `format` | `(v: number) => string` |  | Tooltip and label format. |

## Accessibility

- Rendered as a list with each bar's label and value for screen readers.

## Examples

### Weekly revenue

```tsx
import { BarChart } from "seaglass-ui";

const data = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((label, i) => ({ label, value: [4200, 5100, 4700, 6800, 7900, 6100, 3900][i] }));

export default function Basic() {
  return (
    <div style={{ width: "min(560px, 100%)" }}>
      <BarChart data={data} format={(v) => `$${v.toLocaleString()}`} />
    </div>
  );
}
```

Rendered HTML:

```html
<div style="width:min(560px, 100%)">
<div class="sg-bars" style="height:198px" role="img" aria-label="Mon: $4,200, Tue: $5,100, Wed: $4,700, Thu: $6,800, Fri: $7,900, Sat: $6,100, Sun: $3,900">
<div class="sg-bars-col">
<span class="sg-pebble sg-bar" data-tone="amber" data-depth="sm" style="height:90.37974683544303px" title="Mon: $4,200">
</span>
<span class="sg-bars-label">Mon</span>
</div>
<div class="sg-bars-col">
<span class="sg-pebble sg-bar" data-tone="amber" data-depth="sm" style="height:109.74683544303798px" title="Tue: $5,100">
</span>
<span class="sg-bars-label">Tue</span>
</div>
<div class="sg-bars-col">
<span class="sg-pebble sg-bar" data-tone="amber" data-depth="sm" style="height:101.1392405063291px" title="Wed: $4,700">
</span>
<span class="sg-bars-label">Wed</span>
</div>
<div class="sg-bars-col">
<span class="sg-pebble sg-bar" data-tone="amber" data-depth="sm" style="height:146.32911392405063px" title="Thu: $6,800">
</span>
<span class="sg-bars-label">Thu</span>
</div>
<div class="sg-bars-col">
<span class="sg-pebble sg-bar" data-tone="rose" data-depth="sm" style="height:170px" title="Fri: $7,900">
</span>
<span class="sg-bars-label">Fri</span>
</div>
<div class="sg-bars-col">
<span class="sg-pebble sg-bar" data-tone="amber" data-depth="sm" style="height:131.26582278481013px" title="Sat: $6,100">
</span>
<span class="sg-bars-label">Sat</span>
</div>
<div class="sg-bars-col">
<span class="sg-pebble sg-bar" data-tone="amber" data-depth="sm" style="height:83.9240506329114px" title="Sun: $3,900">
</span>
<span class="sg-bars-label">Sun</span>
</div>
</div>
</div>
```
