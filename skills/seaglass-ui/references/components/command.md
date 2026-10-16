# Command

Fuzzy-searchable command lists, inline or as a ⌘K palette.

```tsx
import { Command, CommandInput, CommandList, CommandGroup, CommandItem, CommandPalette } from "seaglass-ui";
```

## CommandPalette props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `open · onOpenChange` (required) | `boolean` |  |  |
| `hotkey` | `string \| false` | `"mod+k"` | Toggles it. |
| `placeholder` | `string` | `"Type a command or search…"` |  |
| `empty` | `ReactNode` | `"No results."` | Shown when nothing matches. |
| `footer` | `ReactNode` |  | Defaults to navigation hints. |
| `filter` | `(value, search, keywords?) => number` |  | Custom ranking. |

## CommandItem props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `icon` | `ReactNode` |  |  |
| `shortcut` | `string` |  |  |
| `description` | `ReactNode` |  |  |
| `keywords` | `string[]` |  | Extra search terms. |
| `onSelect` | `(value) => void` |  |  |

## Keyboard

- **⌘ K / Ctrl K** — Open the palette
- **↑ ↓** — Move
- **Enter** — Run
- **Esc** — Close

## Examples

### Inline

```tsx
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandSeparator, Pebble } from "seaglass-ui";
import { Calendar, Smile, Calculator, User, CreditCard, Settings } from "lucide-react";

export default function Inline() {
  return (
    <Pebble tone="clear" style={{ width: "min(440px, 100%)", padding: 12 }}>
      <Command loop>
        <CommandInput placeholder="Type a command or search…" />
        <CommandList>
          <CommandEmpty>No results.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem icon={<Calendar />}>Calendar</CommandItem>
            <CommandItem icon={<Smile />}>Search emoji</CommandItem>
            <CommandItem icon={<Calculator />} disabled>Calculator</CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem icon={<User />} shortcut="mod+p">Profile</CommandItem>
            <CommandItem icon={<CreditCard />} shortcut="mod+b">Billing</CommandItem>
            <CommandItem icon={<Settings />} shortcut="mod+,">Settings</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </Pebble>
  );
}
```

Rendered HTML:

```html
<div data-tone="clear" data-depth="lg" class="sg-pebble" style="width:min(440px, 100%);padding:12px">
<div tabindex="-1" class="sg-command" cmdk-root="">
<label cmdk-label="" for="radix-id" id="radix-id" style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);white-space:nowrap;border-width:0">
</label>
<div class="sg-command-input sg-well">
<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="sg-command-search">
<circle cx="11" cy="11" r="6.5">
</circle>
<path d="M16 16l4 4">
</path>
</svg>
<input class="sg-command-input-el" placeholder="Type a command or search…" cmdk-input="" autoComplete="off" autoCorrect="off" spellCheck="false" aria-autocomplete="list" role="combobox" aria-expanded="true" aria-controls="radix-id" aria-labelledby="radix-id" id="radix-id" type="text" value=""/>
</div>
<div class="sg-command-list" cmdk-list="" role="listbox" tabindex="-1" aria-label="Suggestions" id="radix-id">
<div cmdk-list-sizer="">
<div class="sg-command-empty" cmdk-empty="" role="presentation">No results.</div>
<div class="sg-command-group" cmdk-group="" role="presentation">
<div cmdk-group-heading="" aria-hidden="true" id="radix-id">Suggestions</div>
<div cmdk-group-items="" role="group" aria-labelledby="radix-id">
<div class="sg-menu-item sg-command-item" id="radix-id" cmdk-item="" role="option" aria-disabled="false" aria-selected="false" data-disabled="false" data-selected="false">
<span class="sg-menu-icon" aria-hidden="true">
<svg class="lucide lucide-calendar" aria-hidden="true">…</svg>
</span>
<span class="sg-menu-text">
<span>Calendar</span>
</span>
</div>
<div class="sg-menu-item sg-command-item" id="radix-id" cmdk-item="" role="option" aria-disabled="false" aria-selected="false" data-disabled="false" data-selected="false">
<span class="sg-menu-icon" aria-hidden="true">
<svg class="lucide lucide-face-slightly-smiling" aria-hidden="true">…</svg>
</span>
<span class="sg-menu-text">
<span>Search emoji</span>
</span>
</div>
<div class="sg-menu-item sg-command-item" id="radix-id" cmdk-item="" role="option" aria-disabled="true" aria-selected="false" data-disabled="true" data-selected="false">
<span class="sg-menu-icon" aria-hidden="true">
<svg class="lucide lucide-calculator" aria-hidden="true">…</svg>
</span>
<span class="sg-menu-text">
<span>Calculator</span>
</span>
</div>
</div>
</div>
<div role="separator" aria-hidden="true" class="sg-menu-separator" cmdk-separator="">
</div>
<div class="sg-command-group" cmdk-group="" role="presentation">
<div cmdk-group-heading="" aria-hidden="true" id="radix-id">Settings</div>
<div cmdk-group-items="" role="group" aria-labelledby="radix-id">
<div class="sg-menu-item sg-command-item" id="radix-id" cmdk-item="" role="option" aria-disabled="false" aria-selected="false" data-disabled="false" data-selected="false">
<span class="sg-menu-icon" aria-hidden="true">
<svg class="lucide lucide-user" aria-hidden="true">…</svg>
</span>
<span class="sg-menu-text">
<span>Profile</span>
</span>
<span class="sg-kbd-combo sg-menu-shortcut" aria-label="mod+p">
<kbd class="sg-kbd">Ctrl</kbd>
<kbd class="sg-kbd">P</kbd>
</span>
</div>
<div class="sg-menu-item sg-command-item" id="radix-id" cmdk-item="" role="option" aria-disabled="false" aria-selected="false" data-disabled="false" data-selected="false">
<span class="sg-menu-icon" aria-hidden="true">
<svg class="lucide lucide-credit-card" aria-hidden="true">…</svg>
</span>
<span class="sg-menu-text">
<span>Billing</span>
</span>
<span class="sg-kbd-combo sg-menu-shortcut" aria-label="mod+b">
<kbd class="sg-kbd">Ctrl</kbd>
<kbd class="sg-kbd">B</kbd>
</span>
</div>
<div class="sg-menu-item sg-command-item" id="radix-id" cmdk-item="" role="option" aria-disabled="false" aria-selected="false" data-disabled="false" data-selected="false">
<span class="sg-menu-icon" aria-hidden="true">
<svg class="lucide lucide-settings" aria-hidden="true">…</svg>
</span>
<span class="sg-menu-text">
<span>Settings</span>
</span>
<span class="sg-kbd-combo sg-menu-shortcut" aria-label="mod+,">
<kbd class="sg-kbd">Ctrl</kbd>
<kbd class="sg-kbd">,</kbd>
</span>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
```

### Palette

A dialog with the command list inside. Opens with ⌘K / Ctrl K by default.

```tsx
import { useState } from "react";
import { CommandPalette, CommandGroup, CommandItem, Button, Kbd, toast } from "seaglass-ui";
import { FileText, Moon, UserPlus, Terminal } from "lucide-react";

// CommandPalette opens with mod+k by default. This demo sets hotkey={false}
// because the docs site already uses mod+k for its own search.
export default function Palette() {
  const [open, setOpen] = useState(false);
  const run = (label: string) => { setOpen(false); toast(label); };
  return (
    <>
      <Button tone="clear" icon={<Terminal />} onClick={() => setOpen(true)}>
        Open palette <Kbd keys="mod+k" />
      </Button>
      <CommandPalette open={open} onOpenChange={setOpen} hotkey={false}>
        <CommandGroup heading="Pages">
          <CommandItem icon={<FileText />} onSelect={() => run("Opened Introduction")}>Introduction</CommandItem>
          <CommandItem icon={<FileText />} onSelect={() => run("Opened Theming")}>Theming</CommandItem>
        </CommandGroup>
        <CommandGroup heading="Actions">
          <CommandItem icon={<Moon />} shortcut="shift+d" onSelect={() => run("Toggled theme")}>Toggle dark mode</CommandItem>
          <CommandItem icon={<UserPlus />} description="Send an invite by email" onSelect={() => run("Invite sent")}>Invite teammate</CommandItem>
        </CommandGroup>
      </CommandPalette>
    </>
  );
}
```

Rendered HTML:

```html
<button type="button" data-tone="clear" data-depth="md" data-interactive="" data-variant="pebble" data-size="md" class="sg-button sg-pebble">
<span class="sg-button-icon" aria-hidden="true">
<svg class="lucide lucide-terminal" aria-hidden="true">…</svg>
</span>
<span class="sg-button-label">Open palette <span class="sg-kbd-combo" aria-label="mod+k">
<kbd class="sg-kbd">Ctrl</kbd>
<kbd class="sg-kbd">K</kbd>
</span>
</span>
</button>
```
