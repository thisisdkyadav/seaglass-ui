# Field & Input

Sunken text fields with labels, hints and errors wired up for you.

Field generates ids and connects the label, description and error to whatever control is inside it — Input, Textarea, Select, Combobox or a DatePicker.

```tsx
import { Field, Input, Textarea } from "seaglass-ui";
```

## Field props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `ReactNode` |  |  |
| `description` | `ReactNode` |  | Hint under the control. |
| `error` | `ReactNode` |  | Error message. Its presence marks the control invalid. |
| `required` | `boolean` | `false` | Adds a marker and the required attribute. |
| `disabled` | `boolean` | `false` | Disables the control. |
| `orientation` | `"vertical" \| "horizontal"` | `"vertical"` | Label beside the control. |
| `id` | `string` |  | Override the generated control id. |

## Input props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` |  |
| `leading` | `ReactNode` |  | Inside the well, before the value. |
| `trailing` | `ReactNode` |  | Inside the well, after the value. |
| `invalid` | `boolean` |  | Set automatically inside a Field with an error. |
| `...props` | `InputHTMLAttributes<HTMLInputElement>` |  | Everything else is passed to the underlying element. |

## Textarea props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `autoResize` | `boolean` | `false` | Grow with the content. Cap it with a CSS max-height. |
| `invalid` | `boolean` |  |  |

## Accessibility

- Label, description and error are linked with htmlFor and aria-describedby.
- Use useField() to wire up a custom control.

## Examples

### Label, hint and error

Passing error marks the control aria-invalid and links the message.

```tsx
import { useState } from "react";
import { Field, Input } from "seaglass-ui";
import { Mail } from "lucide-react";

// Field wires the label, description and error to its control (ids, aria-describedby, aria-invalid).
export default function Basic() {
  const [email, setEmail] = useState("ava@tidepool");
  const error = email && !/^\S+@\S+\.\S+$/.test(email) ? "Enter a full email address, like ava@tidepool.co" : undefined;
  return (
    <div style={{ width: "min(400px, 100%)" }}>
      <Field label="Email" description="We'll send receipts here." error={error} required>
        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} leading={<Mail size={18} />} />
      </Field>
    </div>
  );
}
```

Rendered HTML:

```html
<div style="width:min(400px, 100%)">
<div class="sg-field" data-orientation="vertical" data-invalid="">
<label class="sg-label sg-field-label" for="sg-field-id">Email<span class="sg-field-required" aria-hidden="true"> *</span>
</label>
<div class="sg-field-control">
<div class="sg-input sg-well" data-size="md" data-invalid="">
<span class="sg-input-adorn" aria-hidden="true">
<svg class="lucide lucide-mail" aria-hidden="true">…</svg>
</span>
<input class="sg-input-el" type="email" id="sg-field-id" required="" aria-invalid="true" aria-describedby="sg-field-id-desc sg-field-id-err" value="ava@tidepool"/>
</div>
</div>
<p id="sg-field-id-desc" class="sg-field-description">We&#x27;ll send receipts here.</p>
<p id="sg-field-id-err" class="sg-field-error" role="alert">Enter a full email address, like ava@tidepool.co</p>
</div>
</div>
```

### Leading and trailing

Icons, text or buttons inside the well.

```tsx
import { Field, Input } from "seaglass-ui";
import { Search } from "lucide-react";

export default function Adornments() {
  return (
    <div style={{ display: "grid", gap: 18, width: "min(400px, 100%)" }}>
      <Input aria-label="Search" type="search" placeholder="Search…" leading={<Search size={18} />} size="sm" />
      <Field label="Store URL">
        <Input defaultValue="tidepool" leading="https://" trailing=".shop" />
      </Field>
      <Field label="Read only" disabled>
        <Input value="Can't touch this" readOnly />
      </Field>
    </div>
  );
}
```

Rendered HTML:

```html
<div style="display:grid;gap:18px;width:min(400px, 100%)">
<div class="sg-input sg-well" data-size="sm">
<span class="sg-input-adorn" aria-hidden="true">
<svg class="lucide lucide-search" aria-hidden="true">…</svg>
</span>
<input class="sg-input-el" aria-label="Search" type="search" placeholder="Search…"/>
</div>
<div class="sg-field" data-orientation="vertical">
<label class="sg-label sg-field-label" for="sg-field-id">Store URL</label>
<div class="sg-field-control">
<div class="sg-input sg-well" data-size="md">
<span class="sg-input-adorn">https://</span>
<input class="sg-input-el" id="sg-field-id" value="tidepool"/>
<span class="sg-input-adorn sg-input-trailing">.shop</span>
</div>
</div>
</div>
<div class="sg-field" data-orientation="vertical" data-disabled="">
<label class="sg-label sg-field-label" for="sg-field-id">Read only</label>
<div class="sg-field-control">
<div class="sg-input sg-well" data-size="md" data-disabled="">
<input class="sg-input-el" readOnly="" id="sg-field-id" disabled="" value="Can&#x27;t touch this"/>
</div>
</div>
</div>
</div>
```

### Textarea

autoResize grows with the content.

```tsx
import { Field, Textarea } from "seaglass-ui";

export default function TextareaExample() {
  return (
    <div style={{ width: "min(400px, 100%)" }}>
      <Field label="Bio" description="Grows as you type.">
        <Textarea autoResize placeholder="A few words about you…" />
      </Field>
    </div>
  );
}
```

Rendered HTML:

```html
<div style="width:min(400px, 100%)">
<div class="sg-field" data-orientation="vertical">
<label class="sg-label sg-field-label" for="sg-field-id">Bio</label>
<div class="sg-field-control">
<textarea class="sg-textarea sg-well" placeholder="A few words about you…" id="sg-field-id" aria-describedby="sg-field-id-desc">
</textarea>
</div>
<p id="sg-field-id-desc" class="sg-field-description">Grows as you type.</p>
</div>
</div>
```
