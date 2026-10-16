# Kbd

Keyboard keys and combos, rendered with the right symbols for the platform.

```tsx
import { Kbd } from "seaglass-ui";
```

## Kbd props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `keys` | `string` |  | A combo like "mod+shift+p". Or pass children for a single key. |

## Examples

### Keys and combos

"mod" shows ⌘ on Apple devices and Ctrl elsewhere.

```tsx
import { Kbd } from "seaglass-ui";

// "mod" renders as ⌘ on Mac and Ctrl elsewhere.
export default function Combos() {
  return (
    <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
      <Kbd keys="mod+k" />
      <Kbd keys="shift+d" />
      <Kbd keys="mod+shift+p" />
      <Kbd keys="[" />
      <Kbd>Esc</Kbd>
    </div>
  );
}
```

Rendered HTML:

```html
<div style="display:flex;gap:16px;align-items:center;flex-wrap:wrap">
<span class="sg-kbd-combo" aria-label="mod+k">
<kbd class="sg-kbd">Ctrl</kbd>
<kbd class="sg-kbd">K</kbd>
</span>
<span class="sg-kbd-combo" aria-label="shift+d">
<kbd class="sg-kbd">Shift</kbd>
<kbd class="sg-kbd">D</kbd>
</span>
<span class="sg-kbd-combo" aria-label="mod+shift+p">
<kbd class="sg-kbd">Ctrl</kbd>
<kbd class="sg-kbd">Shift</kbd>
<kbd class="sg-kbd">P</kbd>
</span>
<span class="sg-kbd-combo" aria-label="[">
<kbd class="sg-kbd">[</kbd>
</span>
<kbd class="sg-kbd">Esc</kbd>
</div>
```
