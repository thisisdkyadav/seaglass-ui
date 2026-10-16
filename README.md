# Sea Glass UI

A React component library built on the **sea glass** design language: every surface is a
frosted, tumbled-glass pebble resting on white paper, lit by one fixed lamp at the top left.
For the full design rationale, see [DESIGN.md](DESIGN.md).

**Docs and live examples: https://seaglass.awacxo.com**

```bash
npm install seaglass-ui
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

### Font

The components are designed around [Outfit](https://fonts.google.com/specimen/Outfit). The
stylesheet does not bundle a font, so load it yourself, or set `--sg-font` to your own.

```html
<!-- from Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap" rel="stylesheet" />
```

```ts
// or self-hosted: npm install @fontsource-variable/outfit
import "@fontsource-variable/outfit";
```

With the self-hosted variable font, add `:root { --sg-font: "Outfit Variable", sans-serif; }`.
Without either, the stack falls back to Google Sans, Roboto and then the system UI font.

### Requirements

- **React 18 or 19.** Works in Server Components frameworks. Every module is marked `"use client"`.
- **Browsers:** Chrome / Edge 108+, Firefox 101+, Safari 15.4+ (iOS 15.4+). These are the
  versions that support `@layer` and `dvh` units, which the stylesheet depends on.
- `backdrop-filter` (the frost) and `mask-image` (the sidebar's fades) degrade gracefully. Without
  them, surfaces stay tinted and readable, but are not blurred.
- Text colours meet WCAG AA contrast (4.5:1) in both themes. CI checks this on every docs page.
- **Right-to-left:** `<ThemeProvider dir="rtl">`. Layout uses logical properties, and arrows,
  keyboard handling and inline motion follow the direction. See [the RTL guide](https://seaglass.awacxo.com/docs/rtl).

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
| Layout | `Stack`, `Grid` (responsive with `minColumnWidth`), `ScrollArea` |
| Primitives | `Text`, `Heading`, `Link`, `Alert`, `Button`, `IconButton`, `ButtonGroup`, `Badge`, `Count`, `Avatar`, `AvatarGroup`, `Card` (+ `Header/Body/Footer`), `Kbd`, `Separator`, `Skeleton`, `Progress`, `Spinner`, `EmptyState`, `VisuallyHidden` |
| Forms | `Field` (wires label, description and error ids), `Label`, `Input`, `Textarea` (auto-resize), `Checkbox`, `RadioGroup`/`Radio`, `Switch`, `Slider`, `NumberInput`, `Toggle`, `ToggleGroup`, `SegmentedControl`, `Select`, `Combobox` (single/multi, groups, create), `Calendar`, `DatePicker`, `DateRangePicker` |
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
:root { --sg-font: "Inter", sans-serif; --sg-radius-lg: 16px; --sg-control-md: 36px; --sg-focus: hsl(160 60% 40%); }
.my-brand { --h: 200; --s: 70%; --l: 84%; }   /* any pebble, any tint */
```

Dark mode is a warm, dim room lit by one lamp (`<html data-sg-theme="dark">`). `ThemeProvider`
handles it, along with the system preference and persistence.

## Repository layout

| Path | What it is |
| --- | --- |
| `src/` | The library: components, hooks and the stylesheet (`src/styles`) |
| `tests/` | Vitest + Testing Library |
| `site/` | The public documentation website (Vite + React, built with the library itself) |
| `site/src/content/registry.ts` | One entry per component page: summary, examples, props, keyboard, a11y notes |
| `site/src/examples/<component>/*.tsx` | Live examples. Each file is rendered on its page and its source is shown verbatim |
| `examples/dashboard/` | A full sample app (sales dashboard) built with the library |

To document a new component: add example files under `site/src/examples/<slug>/`, then add an
entry to `registry.ts`. The page, the sidebar link and the search entry are generated from it.

## Develop

```bash
npm run dev                 # docs site on http://localhost:5310
npm run example:dashboard   # sample dashboard app on http://localhost:5311
npm test                    # vitest: unit, keyboard and axe tests in jsdom
npm run typecheck
npm run build               # dist/: ESM, CJS, .d.ts and seaglass.css
npm run lint:pkg            # publint + are-the-types-wrong on the packed package
npm run test:smoke          # installs the packed tarball into a fresh project (after build)
npm run build:site && npm run test:e2e   # axe with colour contrast in Chromium, every route, both themes
```

`test:e2e` uses Playwright's Chromium (`npx playwright install chromium`), or set
`CHROMIUM=/path/to/chrome`.

## Deploy the docs site

The docs live at https://seaglass.awacxo.com, served by a static-assets-only Cloudflare Worker
(`wrangler.jsonc`, Worker `seaglass-ui-docs`, custom domain `seaglass.awacxo.com`).

```bash
npx wrangler login          # once
npm run deploy:site         # build site/dist and deploy it
```

Unknown paths fall back to `index.html` (`not_found_handling: "single-page-application"`), so deep
links like `/components/button` work and the client router takes over.

To host the build elsewhere:

```bash
npm run build:site                              # site/dist, served from /
SITE_BASE=/seaglass-ui/ npm run build:site      # served from a subpath (e.g. GitHub Pages project site)
npm run preview:site                            # serve the build locally (set SITE_BASE here too)
```

The build also writes `404.html` as a copy of the app shell, for static hosts that serve it for
unknown paths.

## License

MIT — see [LICENSE](LICENSE).
