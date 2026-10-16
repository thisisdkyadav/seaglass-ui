# Combobox

A searchable select, single or multiple, with optional create.

```tsx
import { Combobox } from "seaglass-ui";
```

## Combobox props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `options` (required) | `{ value, label, icon?, description?, group?, keywords?, disabled? }[]` |  |  |
| `multiple` | `boolean` | `false` | Value becomes string[]. |
| `value · defaultValue · onValueChange` | `string \| null  ·  string[]` |  |  |
| `placeholder` | `string` | `"Select…"` |  |
| `searchPlaceholder` | `string` | `"Search…"` |  |
| `empty` | `ReactNode` | `"No matches."` |  |
| `onCreate` | `(query: string) => void` |  | Offer “Create …” when nothing matches. |
| `maxChips` | `number` | `3` | Multiple only. |
| `size · invalid · disabled · aria-label` | `—` |  | As on Select. |

## Keyboard

- **Enter / ↓** — Open
- **A–Z** — Filter
- **↑ ↓** — Move
- **Enter** — Choose
- **Esc** — Close

## Examples

### Single

Options can be grouped and carry icons, descriptions and extra keywords.

```tsx
import { Field, Combobox } from "seaglass-ui";

const countries = ["Australia", "Brazil", "Canada", "Denmark", "France", "Germany", "India", "Japan", "Kenya", "Mexico", "Norway", "Portugal", "Singapore", "Spain", "Sweden", "United Kingdom", "United States"]
  .map((c) => ({ value: c.toLowerCase().replace(/ /g, "-"), label: c, group: c < "M" ? "A – L" : "M – Z" }));

export default function Single() {
  return (
    <div style={{ width: "min(320px, 100%)" }}>
      <Field label="Country" description="Type to filter.">
        <Combobox options={countries} placeholder="Select a country" defaultValue="portugal" />
      </Field>
    </div>
  );
}
```

Rendered HTML:

```html
<div style="width:min(320px, 100%)">
<div class="sg-field" data-orientation="vertical">
<label class="sg-label sg-field-label" for="sg-field-id">Country</label>
<div class="sg-field-control">
<button type="button" aria-haspopup="dialog" aria-expanded="false" data-state="closed" id="sg-field-id" role="combobox" aria-describedby="sg-field-id-desc" data-size="md" class="sg-select-trigger sg-combobox-trigger sg-well">
<span class="sg-combobox-value">Portugal</span>
<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="sg-select-icon">
<path d="M8 9l4-4 4 4M8 15l4 4 4-4">
</path>
</svg>
</button>
</div>
<p id="sg-field-id-desc" class="sg-field-description">Type to filter.</p>
</div>
</div>
```

### Multiple

Chosen values become chips; past maxChips they collapse into +N. onCreate offers to add what was typed.

```tsx
import { useState } from "react";
import { Field, Combobox } from "seaglass-ui";

export default function Multiple() {
  const [options, setOptions] = useState(["design", "launch", "marketing", "research", "urgent"].map((t) => ({ value: t, label: t })));
  const [tags, setTags] = useState(["design", "launch"]);
  return (
    <div style={{ width: "min(360px, 100%)" }}>
      <Field label="Tags" description="Type a new tag to create it.">
        <Combobox
          multiple
          options={options}
          value={tags}
          onValueChange={setTags}
          onCreate={(q) => {
            setOptions((o) => [...o, { value: q, label: q }]);
            setTags((t) => [...t, q]);
          }}
        />
      </Field>
    </div>
  );
}
```

Rendered HTML:

```html
<div style="width:min(360px, 100%)">
<div class="sg-field" data-orientation="vertical">
<label class="sg-label sg-field-label" for="sg-field-id">Tags</label>
<div class="sg-field-control">
<button type="button" aria-haspopup="dialog" aria-expanded="false" data-state="closed" id="sg-field-id" role="combobox" aria-describedby="sg-field-id-desc" data-size="md" class="sg-select-trigger sg-combobox-trigger sg-well">
<span class="sg-combobox-chips">
<span class="sg-combobox-chip sg-chip-surface">design<span role="button" tabindex="-1" aria-label="Remove design">
<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
<path d="M6.5 6.5l11 11M17.5 6.5l-11 11">
</path>
</svg>
</span>
</span>
<span class="sg-combobox-chip sg-chip-surface">launch<span role="button" tabindex="-1" aria-label="Remove launch">
<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
<path d="M6.5 6.5l11 11M17.5 6.5l-11 11">
</path>
</svg>
</span>
</span>
</span>
<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="sg-select-icon">
<path d="M8 9l4-4 4 4M8 15l4 4 4-4">
</path>
</svg>
</button>
</div>
<p id="sg-field-id-desc" class="sg-field-description">Type a new tag to create it.</p>
</div>
</div>
```
