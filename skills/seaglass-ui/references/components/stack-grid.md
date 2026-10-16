# Stack & Grid

Rows, columns and grids on the spacing scale, without writing CSS.

Numeric gaps map to the --sg-space-* scale (1 = 4px … 12 = 48px); any CSS length also works. Grid with minColumnWidth reflows by itself, so most layouts need no media queries.

```tsx
import { Stack, Grid } from "seaglass-ui";
```

## Stack props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `direction` | `"column" \| "row" \| "column-reverse" \| "row-reverse"` | `"column"` |  |
| `gap` | `Space` | `3` | A step on the spacing scale (0–12) or any CSS length. |
| `align` | `"start" \| "center" \| "end" \| "stretch" \| "baseline"` |  | align-items |
| `justify` | `"start" \| "center" \| "end" \| "between" \| "around" \| "evenly"` |  | justify-content |
| `wrap` | `boolean` | `false` |  |
| `asChild` | `boolean` | `false` | Style the child element instead of rendering a div. |
| `...props` | `HTMLAttributes<HTMLDivElement>` |  | Everything else is passed to the underlying element. |

## Grid props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `columns` | `number \| string` |  | A column count, or a grid-template-columns value. |
| `minColumnWidth` | `number \| string` |  | Fit as many columns of at least this width as there is room for. |
| `gap · rowGap` | `Space` | `4` |  |
| `align` | `"start" \| "center" \| "end" \| "stretch" \| "baseline"` |  |  |
| `asChild` | `boolean` | `false` |  |

## Examples

### Stack

A column by default. Rows can wrap, and justify spreads them out.

```tsx
import { Button, Pebble, Stack } from "seaglass-ui";

const box = { padding: "14px 18px", fontSize: 13, fontWeight: 600 };

export default function StackExample() {
  return (
    <Stack gap={5} style={{ width: "min(520px, 100%)" }}>
      <Stack direction="row" gap={2} wrap>
        <Pebble tone="aqua" depth="sm" style={box}>One</Pebble>
        <Pebble tone="mint" depth="sm" style={box}>Two</Pebble>
        <Pebble tone="lilac" depth="sm" style={box}>Three</Pebble>
      </Stack>
      <Stack direction="row" justify="between" align="center">
        <span style={{ fontWeight: 600 }}>3 items selected</span>
        <Stack direction="row" gap={2}>
          <Button variant="ghost">Cancel</Button>
          <Button tone="primary">Archive</Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
```

Rendered HTML:

```html
<div class="sg-stack" style="flex-direction:column;gap:var(--sg-space-5);width:min(520px, 100%)">
<div class="sg-stack" style="flex-direction:row;gap:var(--sg-space-2);flex-wrap:wrap">
<div data-tone="aqua" data-depth="sm" class="sg-pebble" style="padding:14px 18px;font-size:13px;font-weight:600">One</div>
<div data-tone="mint" data-depth="sm" class="sg-pebble" style="padding:14px 18px;font-size:13px;font-weight:600">Two</div>
<div data-tone="lilac" data-depth="sm" class="sg-pebble" style="padding:14px 18px;font-size:13px;font-weight:600">Three</div>
</div>
<div class="sg-stack" style="flex-direction:row;gap:var(--sg-space-3);align-items:center;justify-content:space-between">
<span style="font-weight:600">3 items selected</span>
<div class="sg-stack" style="flex-direction:row;gap:var(--sg-space-2)">
<button type="button" data-tone="clear" data-variant="ghost" data-size="md" class="sg-button">
<span class="sg-button-label">Cancel</span>
</button>
<button type="button" data-tone="primary" data-depth="md" data-interactive="" data-variant="pebble" data-size="md" class="sg-button sg-pebble">
<span class="sg-button-label">Archive</span>
</button>
</div>
</div>
</div>
```

### Responsive grid

As many 140px columns as fit.

```tsx
import { Grid, Pebble } from "seaglass-ui";

const tones = ["periwinkle", "aqua", "seafoam", "mint", "amber", "coral"] as const;

export default function GridExample() {
  return (
    <Grid minColumnWidth={140} gap={4} style={{ width: "100%" }}>
      {tones.map((t) => (
        <Pebble key={t} tone={t} depth="sm" style={{ height: 72, display: "grid", placeItems: "center", fontSize: 13, fontWeight: 600 }}>{t}</Pebble>
      ))}
    </Grid>
  );
}
```

Rendered HTML:

```html
<div class="sg-grid" style="grid-template-columns:repeat(auto-fill, minmax(min(140px, 100%), 1fr));gap:var(--sg-space-4);width:100%">
<div data-tone="periwinkle" data-depth="sm" class="sg-pebble" style="height:72px;display:grid;place-items:center;font-size:13px;font-weight:600">periwinkle</div>
<div data-tone="aqua" data-depth="sm" class="sg-pebble" style="height:72px;display:grid;place-items:center;font-size:13px;font-weight:600">aqua</div>
<div data-tone="seafoam" data-depth="sm" class="sg-pebble" style="height:72px;display:grid;place-items:center;font-size:13px;font-weight:600">seafoam</div>
<div data-tone="mint" data-depth="sm" class="sg-pebble" style="height:72px;display:grid;place-items:center;font-size:13px;font-weight:600">mint</div>
<div data-tone="amber" data-depth="sm" class="sg-pebble" style="height:72px;display:grid;place-items:center;font-size:13px;font-weight:600">amber</div>
<div data-tone="coral" data-depth="sm" class="sg-pebble" style="height:72px;display:grid;place-items:center;font-size:13px;font-weight:600">coral</div>
</div>
```
