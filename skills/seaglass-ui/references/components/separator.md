# Separator

A hairline between content, optionally with a label.

```tsx
import { Separator } from "seaglass-ui";
```

Built on the Radix Separator primitive (https://www.radix-ui.com/primitives/docs/components/separator) — the same keyboard and ARIA behaviour.

## Separator props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` |  |
| `label` | `ReactNode` |  | Text in the middle of the line. |
| `decorative` | `boolean` | `true` | When false, announced as a separator. |

## Examples

### Horizontal, labelled and vertical

```tsx
import { Separator } from "seaglass-ui";

export default function Basic() {
  return (
    <div style={{ display: "grid", gap: 20, width: "min(420px, 100%)" }}>
      <span>Account</span>
      <Separator />
      <Separator label="or continue with" />
      <div style={{ display: "flex", gap: 14, height: 24, alignItems: "center" }}>
        <span>Docs</span><Separator orientation="vertical" /><span>Components</span><Separator orientation="vertical" /><span>Themes</span>
      </div>
    </div>
  );
}
```

Rendered HTML:

```html
<div style="display:grid;gap:20px;width:min(420px, 100%)">
<span>Account</span>
<div data-orientation="horizontal" role="separator" class="sg-separator">
</div>
<div class="sg-separator-labeled" role="separator" aria-orientation="horizontal">
<span>or continue with</span>
</div>
<div style="display:flex;gap:14px;height:24px;align-items:center">
<span>Docs</span>
<div data-orientation="vertical" aria-orientation="vertical" role="separator" class="sg-separator">
</div>
<span>Components</span>
<div data-orientation="vertical" aria-orientation="vertical" role="separator" class="sg-separator">
</div>
<span>Themes</span>
</div>
</div>
```
