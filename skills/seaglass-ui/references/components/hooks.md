# Hooks

The hooks the components use, exported for your own code.

```tsx
import { useHotkeys, useControllableState, useMediaQuery, usePersistedState } from "seaglass-ui";
```

## useHotkeys(combo, handler, options?) props

Combos like "mod+k", "shift+d", "[" or "?". mod is ⌘ on Apple and Ctrl elsewhere. Ignored while typing unless enableInInputs.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `enableInInputs` | `boolean` | `false` | Fire inside inputs and contenteditable. |
| `enabled` | `boolean` | `true` |  |
| `preventDefault` | `boolean` | `true` |  |

## useControllableState({ value, defaultValue, onChange }) props

Build components that work controlled or uncontrolled. Returns [value, setValue].

| Prop | Type | Default | Description |
| --- | --- | --- | --- |

## useMediaQuery(query) props

Live boolean for a CSS media query.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |

## usePersistedState(key, initial) props

useState backed by localStorage. Pass key undefined to keep it in memory.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |

## formatHotkey(combo) · matchHotkey(event, combo) · isMac props

The parsing and display helpers Kbd and Tooltip use.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |

## Examples

### useHotkeys

```tsx
import { useState } from "react";
import { useHotkeys, Kbd, Pebble } from "seaglass-ui";

export default function Hotkeys() {
  const [count, setCount] = useState(0);
  const [last, setLast] = useState("—");
  useHotkeys("j", () => { setCount((c) => c + 1); setLast("j"); });
  useHotkeys("k", () => { setCount((c) => c - 1); setLast("k"); });
  useHotkeys("alt+0", () => { setCount(0); setLast("alt+0"); });
  return (
    <Pebble tone="sky" style={{ padding: "22px 28px", display: "grid", gap: 10, minWidth: 260 }}>
      <span>Press <Kbd>J</Kbd> / <Kbd>K</Kbd> to count, <Kbd keys="alt+0" /> to reset.</span>
      <b style={{ fontSize: "2rem" }}>{count}</b>
      <small>Last: {last}</small>
    </Pebble>
  );
}
```

Rendered HTML:

```html
<div data-tone="sky" data-depth="lg" class="sg-pebble" style="padding:22px 28px;display:grid;gap:10px;min-width:260px">
<span>Press <kbd class="sg-kbd">J</kbd> / <kbd class="sg-kbd">K</kbd> to count, <span class="sg-kbd-combo" aria-label="alt+0">
<kbd class="sg-kbd">Alt</kbd>
<kbd class="sg-kbd">0</kbd>
</span> to reset.</span>
<b style="font-size:2rem">0</b>
<small>Last: —</small>
</div>
```
