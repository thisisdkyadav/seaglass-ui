# Dropdown menu

Actions in a menu: icons, shortcuts, checkable items, radio groups and submenus.

```tsx
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "seaglass-ui";
```

Built on the Radix Dropdown Menu primitive (https://www.radix-ui.com/primitives/docs/components/dropdown-menu) — the same keyboard and ARIA behaviour.

## DropdownMenuItem props

Also applies to CheckboxItem, RadioItem and SubTrigger.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `icon` | `ReactNode` |  |  |
| `shortcut` | `string` |  | Shown on the right, e.g. "mod+d". Display only. |
| `description` | `ReactNode` |  | Muted second line. |
| `tone` | `"danger"` |  | Destructive action. |
| `inset` | `boolean` |  | Align with items that have icons. |
| `onSelect` | `(e: Event) => void` |  |  |

## Keyboard

- **Enter / Space / ↓** — Open
- **↑ ↓** — Move
- **→ / ←** — Open / close submenu
- **A–Z** — Jump to item
- **Esc** — Close

## Examples

### Actions and submenus

```tsx
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator,
  DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent, Button,
} from "seaglass-ui";
import { ChevronDown, Copy, ClipboardPaste, PenLine, Share, Link, Mail, Trash2 } from "lucide-react";

export default function Basic() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button tone="clear" iconEnd={<ChevronDown />}>Actions</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem icon={<Copy />} shortcut="mod+c">Copy</DropdownMenuItem>
        <DropdownMenuItem icon={<ClipboardPaste />} shortcut="mod+v">Paste</DropdownMenuItem>
        <DropdownMenuItem icon={<PenLine />} description="Rename the selected file" shortcut="F2">Rename</DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger icon={<Share />}>Share</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem icon={<Link />}>Copy link</DropdownMenuItem>
            <DropdownMenuItem icon={<Mail />}>Email</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem icon={<Trash2 />} tone="danger" shortcut="mod+backspace">Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

Rendered HTML:

```html
<button type="button" data-tone="clear" data-depth="md" data-interactive="" data-variant="pebble" data-size="md" class="sg-button sg-pebble" id="radix-id" aria-haspopup="menu" aria-expanded="false" data-state="closed">
<span class="sg-button-label">Actions</span>
<span class="sg-button-icon" aria-hidden="true">
<svg class="lucide lucide-chevron-down" aria-hidden="true">…</svg>
</span>
</button>
```

### Checkable and radio items

```tsx
import { useState } from "react";
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator,
  DropdownMenuCheckboxItem, DropdownMenuRadioGroup, DropdownMenuRadioItem, Button,
} from "seaglass-ui";
import { Columns3 } from "lucide-react";

export default function Checkable() {
  const [columns, setColumns] = useState({ status: true, total: true, notes: false });
  const [sort, setSort] = useState("newest");
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button tone="clear" icon={<Columns3 />}>View</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Columns</DropdownMenuLabel>
        {(Object.keys(columns) as Array<keyof typeof columns>).map((key) => (
          <DropdownMenuCheckboxItem
            key={key}
            checked={columns[key]}
            onCheckedChange={(v) => setColumns((c) => ({ ...c, [key]: v === true }))}
            onSelect={(e) => e.preventDefault()}
          >
            {key[0].toUpperCase() + key.slice(1)}
          </DropdownMenuCheckboxItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Sort by</DropdownMenuLabel>
        <DropdownMenuRadioGroup value={sort} onValueChange={setSort}>
          <DropdownMenuRadioItem value="newest">Newest first</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="oldest">Oldest first</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="total">Highest total</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

Rendered HTML:

```html
<button type="button" data-tone="clear" data-depth="md" data-interactive="" data-variant="pebble" data-size="md" class="sg-button sg-pebble" id="radix-id" aria-haspopup="menu" aria-expanded="false" data-state="closed">
<span class="sg-button-icon" aria-hidden="true">
<svg class="lucide lucide-columns3 lucide-columns-3" aria-hidden="true">…</svg>
</span>
<span class="sg-button-label">View</span>
</button>
```
