# Progress & Spinner

A sunken track filled with a pebble, and a spinner for indeterminate waits.

```tsx
import { Progress, Spinner } from "seaglass-ui";
```

Built on the Radix Progress primitive (https://www.radix-ui.com/primitives/docs/components/progress) — the same keyboard and ARIA behaviour.

## Progress props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `number \| null` |  | 0–max. Undefined or null is indeterminate. |
| `max` | `number` | `100` |  |
| `tone` | `Tone` | `"aqua"` | Sea-glass tint. Semantic names map onto tints. |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` |  |
| `label` | `ReactNode` |  | Label row above the bar. |
| `showValue` | `boolean` | `false` | Show the value in the label row. |
| `formatValue` | `(value, max) => ReactNode` | `percent` |  |

## Spinner props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | `number` | `18` | Pixels. |
| `label` | `string` | `"Loading"` | Accessible name. |

## Examples

### Progress

Leave value undefined for an indeterminate bar.

```tsx
import { useEffect, useState } from "react";
import { Progress } from "seaglass-ui";

export default function Basic() {
  const [value, setValue] = useState(20);
  useEffect(() => {
    const t = setInterval(() => setValue((v) => (v >= 100 ? 10 : v + 7)), 700);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{ display: "grid", gap: 22, width: "min(420px, 100%)" }}>
      <Progress value={value} tone="periwinkle" label="Uploading assets" showValue />
      <Progress value={68} tone="aqua" size="sm" label="Storage" showValue formatValue={() => "6.8 / 10 GB"} />
      <Progress value={null} tone="lilac" label="Syncing" />
    </div>
  );
}
```

Rendered HTML:

```html
<div style="display:grid;gap:22px;width:min(420px, 100%)">
<div class="sg-progress-field">
<div class="sg-progress-row">
<span id="id">Uploading assets</span>
<span class="sg-progress-value">20%</span>
</div>
<div aria-valuemax="100" aria-valuemin="0" aria-valuenow="20" aria-valuetext="20%" role="progressbar" data-state="loading" data-value="20" data-max="100" data-tone="periwinkle" data-size="md" aria-labelledby="id" class="sg-progress sg-well">
<div data-state="loading" data-value="20" data-max="100" class="sg-progress-fill" style="width:20%">
</div>
</div>
</div>
<div class="sg-progress-field">
<div class="sg-progress-row">
<span id="id">Storage</span>
<span class="sg-progress-value">6.8 / 10 GB</span>
</div>
<div aria-valuemax="100" aria-valuemin="0" aria-valuenow="68" aria-valuetext="68%" role="progressbar" data-state="loading" data-value="68" data-max="100" data-tone="aqua" data-size="sm" aria-labelledby="id" class="sg-progress sg-well">
<div data-state="loading" data-value="68" data-max="100" class="sg-progress-fill" style="width:68%">
</div>
</div>
</div>
<div class="sg-progress-field">
<div class="sg-progress-row">
<span id="id">Syncing</span>
</div>
<div aria-valuemax="100" aria-valuemin="0" role="progressbar" data-state="indeterminate" data-max="100" data-tone="lilac" data-size="md" aria-labelledby="id" class="sg-progress sg-well">
<div data-state="indeterminate" data-max="100" class="sg-progress-fill" data-indeterminate="">
</div>
</div>
</div>
</div>
```

### Spinner

```tsx
import { Spinner } from "seaglass-ui";

export default function Spinners() {
  return (
    <div style={{ display: "flex", gap: 22, alignItems: "center" }}>
      <Spinner size={16} />
      <Spinner />
      <Spinner size={28} label="Loading results" />
    </div>
  );
}
```

Rendered HTML:

```html
<div style="display:flex;gap:22px;align-items:center">
<svg class="sg-spinner" width="16" height="16" viewBox="0 0 24 24" role="status" aria-label="Loading">
<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-opacity=".2" stroke-width="3">
</circle>
<path d="M12 3a9 9 0 0 1 9 9" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round">
</path>
</svg>
<svg class="sg-spinner" width="18" height="18" viewBox="0 0 24 24" role="status" aria-label="Loading">
<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-opacity=".2" stroke-width="3">
</circle>
<path d="M12 3a9 9 0 0 1 9 9" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round">
</path>
</svg>
<svg class="sg-spinner" width="28" height="28" viewBox="0 0 24 24" role="status" aria-label="Loading results">
<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-opacity=".2" stroke-width="3">
</circle>
<path d="M12 3a9 9 0 0 1 9 9" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round">
</path>
</svg>
</div>
```
