# Radio group

One choice from a few.

```tsx
import { RadioGroup, Radio } from "seaglass-ui";
```

Built on the Radix Radio Group primitive (https://www.radix-ui.com/primitives/docs/components/radio-group) — the same keyboard and ARIA behaviour.

## RadioGroup props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value · defaultValue · onValueChange` | `string` |  | Selected value. |
| `orientation` | `"vertical" \| "horizontal"` | `"vertical"` | Also sets arrow-key direction. |
| `tone` | `Tone` | `"periwinkle"` | Sea-glass tint. Semantic names map onto tints. |
| `disabled` | `boolean` |  |  |

## Radio props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` (required) | `string` |  |  |
| `label` | `ReactNode` |  |  |
| `description` | `ReactNode` |  |  |
| `disabled` | `boolean` |  |  |

## Keyboard

- **Tab** — Move into / out of the group
- **↑ ↓ ← →** — Move and select

## Examples

### With descriptions

```tsx
import { RadioGroup, Radio } from "seaglass-ui";

export default function Basic() {
  return (
    <RadioGroup defaultValue="card" aria-label="Payment method">
      <Radio value="card" label="Card" description="Visa, Mastercard, Amex" />
      <Radio value="bank" label="Bank transfer" />
      <Radio value="crypto" label="Crypto" disabled />
    </RadioGroup>
  );
}
```

Rendered HTML:

```html
<div role="radiogroup" aria-required="false" dir="ltr" data-tone="periwinkle" class="sg-radio-group" aria-label="Payment method" tabindex="-1" style="outline:none">
<label class="sg-choice">
<button type="button" role="radio" aria-checked="true" data-state="checked" value="card" class="sg-radio" tabindex="-1" data-radix-collection-item="">
<span data-state="checked" class="sg-radio-indicator">
</span>
</button>
<input type="radio" aria-hidden="true" tabindex="-1" style="position:absolute;pointer-events:none;opacity:0;margin:0;transform:translateX(-100%)" checked="" value="card"/>
<span class="sg-choice-text">
<span class="sg-choice-label">Card</span>
<span class="sg-choice-description">Visa, Mastercard, Amex</span>
</span>
</label>
<label class="sg-choice">
<button type="button" role="radio" aria-checked="false" data-state="unchecked" value="bank" class="sg-radio" tabindex="-1" data-radix-collection-item="">
</button>
<input type="radio" aria-hidden="true" tabindex="-1" style="position:absolute;pointer-events:none;opacity:0;margin:0;transform:translateX(-100%)" value="bank"/>
<span class="sg-choice-text">
<span class="sg-choice-label">Bank transfer</span>
</span>
</label>
<label class="sg-choice" data-disabled="">
<button type="button" role="radio" aria-checked="false" data-state="unchecked" data-disabled="" disabled="" value="crypto" class="sg-radio" tabindex="-1" data-radix-collection-item="">
</button>
<input type="radio" aria-hidden="true" disabled="" tabindex="-1" style="position:absolute;pointer-events:none;opacity:0;margin:0;transform:translateX(-100%)" value="crypto"/>
<span class="sg-choice-text">
<span class="sg-choice-label">Crypto</span>
</span>
</label>
</div>
```

### Horizontal

```tsx
import { RadioGroup, Radio } from "seaglass-ui";

export default function Horizontal() {
  return (
    <RadioGroup defaultValue="m" orientation="horizontal" tone="lilac" aria-label="Size">
      <Radio value="s" label="Small" />
      <Radio value="m" label="Medium" />
      <Radio value="l" label="Large" />
    </RadioGroup>
  );
}
```

Rendered HTML:

```html
<div role="radiogroup" aria-required="false" aria-orientation="horizontal" dir="ltr" data-tone="lilac" class="sg-radio-group" aria-label="Size" tabindex="-1" data-orientation="horizontal" style="outline:none">
<label class="sg-choice">
<button type="button" role="radio" aria-checked="false" data-state="unchecked" value="s" class="sg-radio" tabindex="-1" data-orientation="horizontal" data-radix-collection-item="">
</button>
<input type="radio" aria-hidden="true" tabindex="-1" style="position:absolute;pointer-events:none;opacity:0;margin:0;transform:translateX(-100%)" value="s"/>
<span class="sg-choice-text">
<span class="sg-choice-label">Small</span>
</span>
</label>
<label class="sg-choice">
<button type="button" role="radio" aria-checked="true" data-state="checked" value="m" class="sg-radio" tabindex="-1" data-orientation="horizontal" data-radix-collection-item="">
<span data-state="checked" class="sg-radio-indicator">
</span>
</button>
<input type="radio" aria-hidden="true" tabindex="-1" style="position:absolute;pointer-events:none;opacity:0;margin:0;transform:translateX(-100%)" checked="" value="m"/>
<span class="sg-choice-text">
<span class="sg-choice-label">Medium</span>
</span>
</label>
<label class="sg-choice">
<button type="button" role="radio" aria-checked="false" data-state="unchecked" value="l" class="sg-radio" tabindex="-1" data-orientation="horizontal" data-radix-collection-item="">
</button>
<input type="radio" aria-hidden="true" tabindex="-1" style="position:absolute;pointer-events:none;opacity:0;margin:0;transform:translateX(-100%)" value="l"/>
<span class="sg-choice-text">
<span class="sg-choice-label">Large</span>
</span>
</label>
</div>
```
