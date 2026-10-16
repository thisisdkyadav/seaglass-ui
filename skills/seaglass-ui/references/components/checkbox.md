# Checkbox

A small pebble that fills with a check. Supports indeterminate.

```tsx
import { Checkbox } from "seaglass-ui";
```

Built on the Radix Checkbox primitive (https://www.radix-ui.com/primitives/docs/components/checkbox) — the same keyboard and ARIA behaviour.

## Checkbox props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `checked` | `boolean \| "indeterminate"` |  | Controlled state. |
| `defaultChecked` | `boolean` |  |  |
| `onCheckedChange` | `(checked) => void` |  |  |
| `label` | `ReactNode` |  | Clickable label to the right. |
| `description` | `ReactNode` |  | Muted line under the label. |
| `tone` | `Tone` | `"mint"` | Sea-glass tint. Semantic names map onto tints. |
| `disabled` | `boolean` |  |  |

## Keyboard

- **Space** — Toggle

## Examples

### Basic

```tsx
import { useState } from "react";
import { Checkbox } from "seaglass-ui";

export default function Basic() {
  const [checked, setChecked] = useState(true);
  return (
    <div style={{ display: "grid", gap: 16 }}>
      <Checkbox label="Email me about new orders" description="At most one email per hour." checked={checked} onCheckedChange={(v) => setChecked(v === true)} />
      <Checkbox label="Weekly summary" tone="periwinkle" />
      <Checkbox label="Some items selected" checked="indeterminate" tone="amber" />
      <Checkbox label="Disabled" disabled />
    </div>
  );
}
```

Rendered HTML:

```html
<div style="display:grid;gap:16px">
<label class="sg-choice">
<button type="button" role="checkbox" aria-checked="true" data-state="checked" value="on" data-tone="mint" class="sg-checkbox">
<span data-state="checked" class="sg-checkbox-indicator" style="pointer-events:none">
<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
<path d="M5 12.5l4.5 4.5L19 7.5">
</path>
</svg>
</span>
</button>
<input type="checkbox" aria-hidden="true" tabindex="-1" style="position:absolute;pointer-events:none;opacity:0;margin:0;transform:translateX(-100%)" checked="" value="on"/>
<span class="sg-choice-text">
<span class="sg-choice-label">Email me about new orders</span>
<span class="sg-choice-description">At most one email per hour.</span>
</span>
</label>
<label class="sg-choice">
<button type="button" role="checkbox" aria-checked="false" data-state="unchecked" value="on" data-tone="periwinkle" class="sg-checkbox">
<span data-state="unchecked" class="sg-checkbox-indicator" style="pointer-events:none">
<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
<path d="M5 12.5l4.5 4.5L19 7.5">
</path>
</svg>
</span>
</button>
<input type="checkbox" aria-hidden="true" tabindex="-1" style="position:absolute;pointer-events:none;opacity:0;margin:0;transform:translateX(-100%)" value="on"/>
<span class="sg-choice-text">
<span class="sg-choice-label">Weekly summary</span>
</span>
</label>
<label class="sg-choice">
<button type="button" role="checkbox" aria-checked="mixed" data-state="indeterminate" value="on" data-tone="amber" class="sg-checkbox">
<span data-state="indeterminate" class="sg-checkbox-indicator" style="pointer-events:none">
<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
<path d="M6 12h12">
</path>
</svg>
</span>
</button>
<input type="checkbox" aria-hidden="true" tabindex="-1" style="position:absolute;pointer-events:none;opacity:0;margin:0;transform:translateX(-100%)" value="on"/>
<span class="sg-choice-text">
<span class="sg-choice-label">Some items selected</span>
</span>
</label>
<label class="sg-choice" data-disabled="">
<button type="button" role="checkbox" aria-checked="false" data-state="unchecked" data-disabled="" disabled="" value="on" data-tone="mint" class="sg-checkbox">
<span data-state="unchecked" data-disabled="" class="sg-checkbox-indicator" style="pointer-events:none">
<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
<path d="M5 12.5l4.5 4.5L19 7.5">
</path>
</svg>
</span>
</button>
<input type="checkbox" aria-hidden="true" disabled="" tabindex="-1" style="position:absolute;pointer-events:none;opacity:0;margin:0;transform:translateX(-100%)" value="on"/>
<span class="sg-choice-text">
<span class="sg-choice-label">Disabled</span>
</span>
</label>
</div>
```
