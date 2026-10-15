# Sea Glass UI

A React component library built on the **sea glass** design language: every surface is a
frosted, tumbled-glass pebble resting on white paper, lit by one fixed lamp at the top left.
For the full design rationale, see [DESIGN.md](DESIGN.md).

```bash
npm run build && npm pack          # not on npm yet — install the tarball or link the folder
npm i ../seaglass-ui/seaglass-ui-0.1.0.tgz
```

```tsx
import "seaglass-ui/styles.css";
import { ThemeProvider, Toaster, Button, toast } from "seaglass-ui";

export function App() {
  return (
    <ThemeProvider>
      <Button tone="primary" onClick={() => toast.success("Saved")}>Save</Button>
      <Toaster />
    </ThemeProvider>
  );
}
```

## Architecture

- **React components, directly.** No vanilla core with wrappers on top. React is the target, and
  controlled state, refs, portals and SSR all stay simple.
- **Behaviour from [Radix](https://www.radix-ui.com/)** (`radix-ui`) and **[cmdk](https://cmdk.paco.me/)**.
  Focus trapping, roving focus, typeahead, collision-aware positioning and ARIA come from
  battle-tested primitives.
- **Styling is plain CSS.** It uses `sg-*` classes, `data-*` state attributes and `--sg-*` custom
  properties. This layer has no framework in it, so a Vue or Svelte port (on Reka UI or Bits UI)
  could reuse the stylesheet as-is.
- **One material.** `.sg-pebble` plus a tone (`--h/--s/--l`) and a depth (shadow length) build
  every raised surface. Inputs are sunken `.sg-well`s. Active states are white `.sg-chip-surface`s.
- The built stylesheet sits in `@layer seaglass`, so any unlayered CSS in your app overrides it
  without specificity fights.
- The output is ESM + CJS with one file per module (tree-shakeable), marked `"use client"`, with typings.

## Components

| Group | Components |
| --- | --- |
| Foundation | `ThemeProvider` / `useTheme`, `Pebble`, tones, depths |
| Primitives | `Button`, `IconButton`, `ButtonGroup`, `Badge`, `Count`, `Avatar`, `AvatarGroup`, `Card` (+ `Header/Body/Footer`), `Kbd`, `Separator`, `Skeleton`, `Progress`, `Spinner`, `EmptyState`, `VisuallyHidden` |
| Forms | `Field` (wires label, description and error ids), `Label`, `Input`, `Textarea` (auto-resize), `Checkbox`, `RadioGroup`/`Radio`, `Switch`, `Slider`, `SegmentedControl`, `Select`, `Combobox` (single/multi, groups, create), `Calendar`, `DatePicker`, `DateRangePicker` |
| Overlays | `Tooltip`, `Popover`, `HoverCard`, `DropdownMenu*`, `ContextMenu*` (icons, shortcuts, checkbox/radio items, sub-menus), `Dialog*`, `Sheet*`, `AlertDialog`, `toast()` + `Toaster`, `Command*`, `CommandPalette` |
| Navigation | `Tabs` (pebble/chips/line), `Accordion`, `Collapsible`, `Breadcrumbs`, `Pagination`, `Sidebar*` |
| Data | `Table`/`TR`/`TH`/`TD`, `DataTable` (sort, search, select, bulk actions, pagination), `Stat`, `Sparkline`, `BarChart` |
| Hooks | `useHotkeys`, `useControllableState`, `useMediaQuery`, `usePersistedState` |

### Sidebar

The `SidebarProvider` / `Sidebar` / `SidebarNav` set is a complete app shell:

- A data-driven, multi-level nav (`NavSection[]` / `NavItem[]`) with icons, badges, tags, colour
  dots and keywords.
- Foldable sections and nested groups, with the active page's ancestors opened automatically.
- A rail mode: tooltips on leaves, and hover/click flyouts with nested sub-menus for groups.
- Drag-to-resize (double-click resets it). Collapsed state, width and open groups persist to
  `localStorage`.
- Below 900px it becomes a modal drawer.
- `renderLink` plugs in any router.

## Keyboard

| Keys | Action |
| --- | --- |
| `[` or `Ctrl/⌘ B` | Collapse / expand the sidebar (opens the drawer on mobile) |
| `/` | Filter the sidebar nav; `Enter` opens the first match, `↓` moves into the nav, `Esc` clears |
| `↑ ↓ Home End` · `→ ←` | Move through nav items · open/close groups (in the nav) |
| `Ctrl/⌘ K` | Command palette |
| `Shift D` | Toggle light / dark |
| `F8` | Focus the toast region |
| `Esc` | Close any overlay |
| Arrows, `PageUp/Down` (+`Shift` = year), `Home/End` | Move around the calendar |

Every hotkey can be changed or turned off through props (`hotkeys`, `searchHotkey`, `hotkey`, `toggleHotkey`).
Hotkeys skip text fields unless they ask not to.

## Theming

```css
:root { --sg-font: "Inter", sans-serif; --sg-radius-lg: 22px; --sg-focus: hsl(160 60% 40%); }
.my-brand { --h: 200; --s: 70%; --l: 84%; }   /* any pebble, any tint */
```

Dark mode is a warm, dim room lit by one lamp (`<html data-sg-theme="dark">`). `ThemeProvider`
handles it, along with the system preference and persistence.

## Develop

```bash
npm run dev        # playground: gallery + dashboard on http://localhost:5310
npm test           # vitest + Testing Library
npm run typecheck
npm run build      # dist/: ESM, CJS, .d.ts and seaglass.css
```
