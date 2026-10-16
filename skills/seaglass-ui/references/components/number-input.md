# Number input

A numeric field with − and + steppers, keyboard stepping and locale-aware formatting.

Typing is free-form. The value is parsed, clamped to min and max and rounded to the step when the field loses focus or Enter is pressed. When not editing, the value is shown with format, e.g. as a currency.

```tsx
import { NumberInput } from "seaglass-ui";
```

## NumberInput props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value · defaultValue · onValueChange` | `number \| null` |  | null when the field is empty. |
| `min · max` | `number` |  |  |
| `step` | `number` | `1` | Arrow keys and the buttons. Also sets the decimal places kept. |
| `largeStep` | `number` | `step × 10` | Shift + arrows, Page Up and Page Down. |
| `format` | `Intl.NumberFormatOptions` |  | How the value is shown when not editing. |
| `locale` | `string` |  | Formatting and parsing. Defaults to the browser's. |
| `name` | `string` |  | Submits the raw number with forms. |
| `size · disabled · invalid · leading` | `—` |  | As on Input. |
| `hideSteppers` | `boolean` | `false` |  |
| `incrementLabel · decrementLabel` | `string` | `"Increase" · "Decrease"` |  |

## Keyboard

- **↑ / ↓** — Step up or down
- **Shift + ↑ / ↓ · PgUp / PgDn** — Large step
- **Home / End** — Minimum / maximum
- **Enter** — Commit what you typed

## Accessibility

- role="spinbutton" with aria-valuenow, -min, -max and a formatted aria-valuetext.
- The − and + buttons are skipped by Tab; the arrow keys do the same job.

## Examples

### Basic, currency and percent

```tsx
import { useState } from "react";
import { Field, NumberInput } from "seaglass-ui";

export default function Basic() {
  const [qty, setQty] = useState<number | null>(2);
  return (
    <div style={{ display: "grid", gap: 16, width: "min(320px, 100%)" }}>
      <Field label="Quantity" description={`Between 1 and 20. You picked ${qty ?? "nothing"}.`}>
        <NumberInput value={qty} onValueChange={setQty} min={1} max={20} />
      </Field>
      <Field label="Price">
        <NumberInput defaultValue={1249.5} min={0} step={0.01} format={{ style: "currency", currency: "EUR" }} locale="en-IE" />
      </Field>
      <Field label="Opacity">
        <NumberInput defaultValue={0.8} min={0} max={1} step={0.05} largeStep={0.25} format={{ style: "percent" }} size="sm" />
      </Field>
    </div>
  );
}
```

Rendered HTML:

```html
<div style="display:grid;gap:16px;width:min(320px, 100%)">
<div class="sg-field" data-orientation="vertical">
<label class="sg-label sg-field-label" for="sg-field-id">Quantity</label>
<div class="sg-field-control">
<div class="sg-input sg-number-input sg-well" data-size="md">
<input type="text" inputMode="numeric" autoComplete="off" autoCorrect="off" spellCheck="false" role="spinbutton" aria-valuenow="2" aria-valuemin="1" aria-valuemax="20" aria-valuetext="2" class="sg-input-el" id="sg-field-id" aria-describedby="sg-field-id-desc" value="2"/>
<span class="sg-number-steppers">
<button type="button" tabindex="-1" class="sg-number-step" aria-label="Decrease">
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
<path d="M6 12h12">
</path>
</svg>
</button>
<button type="button" tabindex="-1" class="sg-number-step" aria-label="Increase">
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
<path d="M12 6v12M6 12h12">
</path>
</svg>
</button>
</span>
</div>
</div>
<p id="sg-field-id-desc" class="sg-field-description">Between 1 and 20. You picked 2.</p>
</div>
<div class="sg-field" data-orientation="vertical">
<label class="sg-label sg-field-label" for="sg-field-id">Price</label>
<div class="sg-field-control">
<div class="sg-input sg-number-input sg-well" data-size="md">
<input type="text" inputMode="decimal" autoComplete="off" autoCorrect="off" spellCheck="false" role="spinbutton" aria-valuenow="1249.5" aria-valuemin="0" aria-valuetext="€1,249.50" class="sg-input-el" id="sg-field-id" value="€1,249.50"/>
<span class="sg-number-steppers">
<button type="button" tabindex="-1" class="sg-number-step" aria-label="Decrease">
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
<path d="M6 12h12">
</path>
</svg>
</button>
<button type="button" tabindex="-1" class="sg-number-step" aria-label="Increase">
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
<path d="M12 6v12M6 12h12">
</path>
</svg>
</button>
</span>
</div>
</div>
</div>
<div class="sg-field" data-orientation="vertical">
<label class="sg-label sg-field-label" for="sg-field-id">Opacity</label>
<div class="sg-field-control">
<div class="sg-input sg-number-input sg-well" data-size="sm">
<input type="text" inputMode="decimal" autoComplete="off" autoCorrect="off" spellCheck="false" role="spinbutton" aria-valuenow="0.8" aria-valuemin="0" aria-valuemax="1" aria-valuetext="80%" class="sg-input-el" id="sg-field-id" value="80%"/>
<span class="sg-number-steppers">
<button type="button" tabindex="-1" class="sg-number-step" aria-label="Decrease">
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
<path d="M6 12h12">
</path>
</svg>
</button>
<button type="button" tabindex="-1" class="sg-number-step" aria-label="Increase">
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
<path d="M12 6v12M6 12h12">
</path>
</svg>
</button>
</span>
</div>
</div>
</div>
</div>
```
