# Context menu

The same menu, opened with a right-click or long-press.

```tsx
import { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem } from "seaglass-ui";
```

Built on the Radix Context Menu primitive (https://www.radix-ui.com/primitives/docs/components/context-menu) — the same keyboard and ARIA behaviour.

## ContextMenuItem props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `icon · shortcut · description · tone · inset` | `—` |  | As on DropdownMenuItem. |

## Keyboard

- **Shift + F10** — Open
- **↑ ↓** — Move
- **Esc** — Close

## Examples

### Right-click the area

```tsx
import { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem, ContextMenuSeparator } from "seaglass-ui";
import { RefreshCw, Bookmark, Code } from "lucide-react";

export default function Basic() {
  return (
    <ContextMenu>
      <ContextMenuTrigger
        style={{ display: "grid", placeItems: "center", width: "min(420px, 100%)", height: 150, borderRadius: 22, border: "2px dashed var(--sg-line)", color: "var(--sg-ink-muted)" }}
      >
        Right-click (or long-press) here
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem icon={<RefreshCw />} shortcut="mod+r">Reload</ContextMenuItem>
        <ContextMenuItem icon={<Bookmark />} shortcut="mod+d">Bookmark</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem icon={<Code />}>Inspect</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
```

Rendered HTML:

```html
<span data-state="closed" style="-webkit-touch-callout:none;display:grid;place-items:center;width:min(420px, 100%);height:150px;border-radius:22px;border:2px dashed var(--sg-line);color:var(--sg-ink-muted)">Right-click (or long-press) here</span>
```
