# Select

Choose one option from a list in a frosted popover.

```tsx
import { Select, SelectItem, SelectSeparator } from "seaglass-ui";
```

Built on the Radix Select primitive (https://www.radix-ui.com/primitives/docs/components/select) — the same keyboard and ARIA behaviour.

## Select props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `options` | `(SelectOption \| { label, options })[]` |  | Flat options or labelled groups. Or pass <SelectItem> children. |
| `value · defaultValue · onValueChange` | `string` |  |  |
| `placeholder` | `ReactNode` |  |  |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` |  |
| `invalid` | `boolean` |  |  |
| `disabled` | `boolean` |  |  |
| `aria-label` | `string` |  | Needed when not inside a Field. |

## Keyboard

- **Space / Enter / ↓** — Open
- **↑ ↓** — Move
- **A–Z** — Jump to a matching option
- **Esc** — Close

## Examples

### Basic

```tsx
import { Field, Select } from "seaglass-ui";

export default function Basic() {
  return (
    <div style={{ width: "min(320px, 100%)" }}>
      <Field label="Currency">
        <Select
          placeholder="Choose a currency"
          options={[
            { value: "usd", label: "US dollar" },
            { value: "eur", label: "Euro" },
            { value: "gbp", label: "Pound sterling" },
            { value: "jpy", label: "Japanese yen", disabled: true },
          ]}
        />
      </Field>
    </div>
  );
}
```

Rendered HTML:

```html
<div style="width:min(320px, 100%)">
<div class="sg-field" data-orientation="vertical">
<label class="sg-label sg-field-label" for="sg-field-id">Currency</label>
<div class="sg-field-control">
<button type="button" role="combobox" aria-expanded="false" aria-autocomplete="none" dir="ltr" data-state="closed" data-placeholder="" id="sg-field-id" data-size="md" class="sg-select-trigger sg-well">
<span style="pointer-events:none">Choose a currency</span>
<span aria-hidden="true" class="sg-select-icon">
<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
<path d="M6 9.5l6 6 6-6">
</path>
</svg>
</span>
</button>
<select aria-hidden="true" tabindex="-1" style="position:absolute;border:0;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);white-space:nowrap;word-wrap:normal">
<option value="" selected="">
</option>
</select>
</div>
</div>
</div>
```

### Groups, icons and descriptions

```tsx
import { Field, Select } from "seaglass-ui";

export default function Groups() {
  return (
    <div style={{ width: "min(320px, 100%)" }}>
      <Field label="Plan">
        <Select
          defaultValue="pro"
          options={[
            { label: "Monthly", options: [
              { value: "starter", label: "Starter", description: "$9 / month" },
              { value: "pro", label: "Pro", description: "$29 / month" },
            ] },
            { label: "Yearly", options: [
              { value: "team", label: "Team", description: "$290 / year" },
            ] },
          ]}
        />
      </Field>
    </div>
  );
}
```

Rendered HTML:

```html
<div style="width:min(320px, 100%)">
<div class="sg-field" data-orientation="vertical">
<label class="sg-label sg-field-label" for="sg-field-id">Plan</label>
<div class="sg-field-control">
<button type="button" role="combobox" aria-expanded="false" aria-autocomplete="none" dir="ltr" data-state="closed" id="sg-field-id" data-size="md" class="sg-select-trigger sg-well">
<span style="pointer-events:none">
</span>
<span aria-hidden="true" class="sg-select-icon">
<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
<path d="M6 9.5l6 6 6-6">
</path>
</svg>
</span>
</button>
<select aria-hidden="true" tabindex="-1" style="position:absolute;border:0;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);white-space:nowrap;word-wrap:normal">
</select>
</div>
</div>
</div>
```
