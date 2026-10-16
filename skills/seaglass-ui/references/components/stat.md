# Stat & Sparkline

A headline number with its change and a tiny trend line.

```tsx
import { Stat, Sparkline } from "seaglass-ui";
```

## Stat props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label · value` (required) | `ReactNode` |  |  |
| `delta` | `ReactNode` |  | e.g. "+12.5%". |
| `trend` | `"up" \| "down"` | `from delta` | Good or bad news. |
| `data` | `number[]` |  | Sparkline values. |
| `icon` | `ReactNode` |  |  |
| `tone` | `Tone` | `"periwinkle"` | Sea-glass tint. Semantic names map onto tints. |

## Sparkline props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `data` (required) | `number[]` |  |  |
| `width · height` | `number` | `96 · 34` |  |
| `area` | `boolean` | `false` | Fill under the line. |
| `strokeWidth` | `number` | `2.4` |  |

## Examples

### Stats

The arrow follows the delta's sign; trend says whether that's good (mint) or bad (coral).

```tsx
import { Stat } from "seaglass-ui";
import { Wallet, ShoppingBag, Users } from "lucide-react";

// The arrow follows the number; the colour says whether it's good news.
export default function Basic() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 24, width: "100%" }}>
      <Stat tone="periwinkle" label="Revenue" icon={<Wallet />} value="$48,295" delta="+12.4%" data={[12, 18, 15, 22, 19, 27, 31, 29, 36]} />
      <Stat tone="seafoam" label="Orders" icon={<ShoppingBag />} value="1,284" delta="+4.1%" data={[30, 28, 35, 33, 40, 38, 44, 47, 45]} />
      <Stat tone="rose" label="Bounce rate" icon={<Users />} value="38.1%" delta="+3.0%" trend="down" data={[30, 32, 31, 35, 36, 37, 38]} />
    </div>
  );
}
```

Rendered HTML:

```html
<div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(200px, 1fr));gap:24px;width:100%">
<div data-tone="periwinkle" data-depth="lg" class="sg-stat sg-pebble">
<div class="sg-stat-head">
<span class="sg-stat-icon" aria-hidden="true">
<svg class="lucide lucide-wallet" aria-hidden="true">…</svg>
</span>
<span>Revenue</span>
</div>
<div class="sg-stat-value">$48,295</div>
<div class="sg-stat-foot">
<span class="sg-delta" data-trend="up">
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
<path d="M12 19V5M6 11l6-6 6 6">
</path>
</svg>+12.4%</span>
<svg class="sg-sparkline" width="96" height="34" viewBox="0 0 96 34" aria-hidden="true">
<path d="M0.0 31.6 L12.0 24.3 L24.0 27.9 L36.0 19.4 L48.0 23.1 L60.0 13.3 L72.0 8.5 L84.0 10.9 L96.0 2.4" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" opacity=".75">
</path>
</svg>
</div>
</div>
<div data-tone="seafoam" data-depth="lg" class="sg-stat sg-pebble">
<div class="sg-stat-head">
<span class="sg-stat-icon" aria-hidden="true">
<svg class="lucide lucide-shopping-bag" aria-hidden="true">…</svg>
</span>
<span>Orders</span>
</div>
<div class="sg-stat-value">1,284</div>
<div class="sg-stat-foot">
<span class="sg-delta" data-trend="up">
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
<path d="M12 19V5M6 11l6-6 6 6">
</path>
</svg>+4.1%</span>
<svg class="sg-sparkline" width="96" height="34" viewBox="0 0 96 34" aria-hidden="true">
<path d="M0.0 28.5 L12.0 31.6 L24.0 20.8 L36.0 23.9 L48.0 13.2 L60.0 16.2 L72.0 7.0 L84.0 2.4 L96.0 5.5" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" opacity=".75">
</path>
</svg>
</div>
</div>
<div data-tone="rose" data-depth="lg" class="sg-stat sg-pebble">
<div class="sg-stat-head">
<span class="sg-stat-icon" aria-hidden="true">
<svg class="lucide lucide-users" aria-hidden="true">…</svg>
</span>
<span>Bounce rate</span>
</div>
<div class="sg-stat-value">38.1%</div>
<div class="sg-stat-foot">
<span class="sg-delta" data-trend="down">
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
<path d="M12 19V5M6 11l6-6 6 6">
</path>
</svg>+3.0%</span>
<svg class="sg-sparkline" width="96" height="34" viewBox="0 0 96 34" aria-hidden="true">
<path d="M0.0 31.6 L16.0 24.3 L32.0 27.9 L48.0 13.3 L64.0 9.7 L80.0 6.0 L96.0 2.4" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" opacity=".75">
</path>
</svg>
</div>
</div>
</div>
```

### Sparkline

```tsx
import { Sparkline } from "seaglass-ui";

export default function SparklineExample() {
  return (
    <div style={{ display: "flex", gap: 32, alignItems: "center", color: "hsl(234 45% 50%)" }}>
      <Sparkline data={[3, 5, 4, 7, 6, 9, 8, 11]} />
      <Sparkline data={[9, 7, 8, 5, 6, 4, 5, 3]} area width={140} height={44} />
    </div>
  );
}
```

Rendered HTML:

```html
<div style="display:flex;gap:32px;align-items:center;color:hsl(234 45% 50%)">
<svg class="sg-sparkline" width="96" height="34" viewBox="0 0 96 34" aria-hidden="true">
<path d="M0.0 31.6 L13.7 24.3 L27.4 27.9 L41.1 17.0 L54.9 20.6 L68.6 9.7 L82.3 13.3 L96.0 2.4" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" opacity=".75">
</path>
</svg>
<svg class="sg-sparkline" width="140" height="44" viewBox="0 0 140 44" aria-hidden="true">
<path d="M0.0 2.4 L20.0 15.5 L40.0 8.9 L60.0 28.5 L80.0 22.0 L100.0 35.1 L120.0 28.5 L140.0 41.6 L140 44 L0 44Z" fill="currentColor" opacity=".12">
</path>
<path d="M0.0 2.4 L20.0 15.5 L40.0 8.9 L60.0 28.5 L80.0 22.0 L100.0 35.1 L120.0 28.5 L140.0 41.6" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" opacity=".75">
</path>
</svg>
</div>
```
