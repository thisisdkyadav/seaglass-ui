---
name: seaglass-ui
description: Build interfaces in the Sea Glass design language — frosted, domed sea-glass "pebbles" on white paper, lit by one fixed lamp at the top left, with a warm dim-room dark mode. Use when the user asks for Sea Glass / seaglass-ui, pebble or frosted sea-glass styling, or to match designs from seaglass.awacxo.com. In React apps it installs and uses the seaglass-ui component library; in any other stack (plain HTML, Vue, Svelte, Angular, Tailwind) it reuses the library's framework-free stylesheet and markup.
license: MIT
metadata:
  homepage: https://seaglass.awacxo.com
  repository: https://github.com/thisisdkyadav/seaglass-ui
  package: seaglass-ui
---

# Sea Glass UI

Every interactive surface is a small, smooth pebble of frosted sea glass resting on white
paper: thick in the middle, rounded down to its edges, matte (never glossy), and casting a
soft shadow down and to the right from one fixed lamp at the top left. Colour lives only in
the pebbles, as pale sun-bleached tints. Dark mode is a dim, warm, sand-brown room, not a
black screen.

The look depends on a layered CSS recipe (textures, rims, flecks, tinted shadows). **Do not
improvise it from the description.** Reuse the library, or its stylesheet, as below.

## 1. Pick the path

| The project is… | Do this |
| --- | --- |
| React 18/19 (Vite, Next.js, Remix, Astro islands…) | **Path A** — install `seaglass-ui` and use its components. Do not hand-write components the library already has. |
| Anything else (HTML, Vue, Svelte, Angular, Solid, server templates, Tailwind) | **Path B** — load the library stylesheet and write the same `sg-*` markup. |
| Must not take the dependency, or needs a custom surface | **Path C** — copy the material recipe from `assets/material.css` + `assets/tokens.css`. |

Before writing UI, read `references/design-language.md` once. Before using a component, open
its page in `references/components/<slug>.md` (index: `references/components.md`). Each page
has the import, every prop, keyboard/a11y notes, and every docs example as React source
**plus the exact HTML it renders to**, which is what Path B copies.

## Path A — React

```bash
npm install seaglass-ui
```

```tsx
// once, at the root (e.g. main.tsx / app/layout.tsx)
import "seaglass-ui/styles.css";
import { ThemeProvider, Toaster } from "seaglass-ui";

export function Root({ children }) {
  return (
    <ThemeProvider>   {/* light/dark, system-aware, persisted; Shift+D toggles; tooltip timing */}
      {children}
      <Toaster />     {/* only if you call toast() */}
    </ThemeProvider>
  );
}
```

On seaglass-ui 0.2.x and older, also wrap `children` in `<TooltipProvider>`, or `Tooltip` throws.

Load the Outfit font (the stylesheet does not bundle one):

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap" rel="stylesheet" />
```

Rules for Path A:

- Compose from the library first: `Card`, `Stack`, `Grid`, `Button`, `Field` + `Input`,
  `Select`, `Tabs`, `DataTable`, `Stat`, `Sidebar*`, `Dialog`, `DropdownMenu`, `toast()`…
  The full list with summaries is in `references/components.md`.
- For a custom raised surface (a tile, a swatch, a logo), use `<Pebble tone depth radius>`,
  not a styled `div`.
- Colour comes from the `tone` prop: `clear` (neutral), `periwinkle`/`primary`,
  `aqua`/`info`, `sky`, `seafoam`, `mint`/`success`, `lilac`, `coral`/`danger`, `rose`,
  `amber`/`warning`, `sand`. A brand tint is `style={{ "--h": 200, "--s": "70%", "--l": "84%" }}`.
- Theme with `--sg-*` custom properties, not by overriding component classes. The stylesheet
  sits in `@layer seaglass`, so any unlayered app CSS wins without `!important`.
- Icons: any React icon set works. The docs use `lucide-react`. Pass icons through the `icon`
  and `iconEnd` props.
- Next.js App Router: every module is already `"use client"`, so components render from
  Server Components without wrappers.

## Path B — any other stack (stylesheet + markup)

1. Get the stylesheet. Use one of:
   - `npm install seaglass-ui`, then import `seaglass-ui/styles.css`. Nothing React-specific
     is loaded from CSS.
   - `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/seaglass-ui/dist/seaglass.css">`
   - Copy `assets/seaglass.css` from this skill into the project.
2. Set up the page: `<html data-sg-theme="light">` (or `"dark"`), `class="sg-root"` on
   `<body>`, the Outfit font, and for dark mode a `<div class="sg-lamp" aria-hidden="true"></div>`
   as the first child of `<body>` (it draws the warm pool of lamp light).
3. Copy the **Rendered HTML** blocks from `references/components/<slug>.md`, keeping the
   classes and `data-*` attributes exactly (`data-tone`, `data-depth`, `data-variant`,
   `data-size`, `data-state`…). State is styled through those attributes. Toggle them from
   your framework, for example `data-state="checked"` or `data-state="active"`, and
   `aria-selected` / `aria-checked` to match.
4. Behaviour (focus traps, roving focus, menus, positioning) is not in the CSS. Use your
   stack's accessible headless library and put the Sea Glass classes on its parts:
   - Vue: Reka UI
   - Svelte: Bits UI / Melt UI
   - Angular: CDK
   - Solid: Kobalte
   - Plain HTML: native `<dialog>`, `<details>`, and the popover attribute

   Match the ARIA shown in the rendered HTML.

Minimal plain-HTML pebble button:

```html
<button type="button" class="sg-button sg-pebble" data-tone="primary" data-depth="md"
        data-interactive data-variant="pebble" data-size="md">
  <span class="sg-button-label">Save</span>
</button>
```

## Path C — rebuild the material

Copy `assets/tokens.css` and `assets/material.css` verbatim. They are self-contained and
give you `.sg-pebble` (raised stone), `.sg-well` (sunken field) and `.sg-chip-surface`
(white chip for selected states), plus the `data-tone` tints and `data-depth` shadow
lengths. Build new components on those three surfaces instead of reinventing them. How the
recipe works:

- `box-shadow` on the element casts two soft shadows down-right. One is warm/cool shade from
  `--sg-shade`, the other is a faint tint of the pebble's own hue.
- `::before` is the body. It stacks a soft-light noise texture (the uneven top), a glow toward
  the lamp, a denser cloudy core and a top-to-bottom body gradient. Inset shadows form the
  domed rim and the bright base lip. It has `blur(1.2px)` and a backdrop blur for the frost.
- `::after` holds the crisp light and dark flecks.
- Everything derives from one tint `--h / --s / --l`. Depth changes `--sx/--sy/--blur`
  (shadow) and `--bx/--by` (rim), so small things cast shorter shadows.
- In Tailwind, keep this as a CSS layer or component class (`@layer components`). Do not
  try to express it in utilities. Utilities are fine for layout and spacing around pebbles.

## Design rules (check every screen against these)

- **Do**
  - Keep outlines straight: regular rounded rectangles or full pills, never wobbly shapes.
  - Use one light direction, from the top left.
  - Give every pebble a shadow.
  - Take colour from the pale tints.
  - Leave white space so shadows have room.
- **Don't**
  - Glossy highlights, sharp reflections, glassmorphism or "liquid glass".
  - Borders as the main edge.
  - Hard or black drop shadows.
  - Saturated colours.
  - Black text on a coloured pebble. Text takes a very dark shade of the pebble's own hue,
    which the CSS does automatically.
  - Light or tilt that follows the cursor.
- **Pick the surface by role.** Raised pebble for buttons, cards, badges and menus. Sunken
  well for inputs, search and tracks. White chip inside a pebble for the selected tab, the
  active nav item and inline actions.
- **Rounding.** Pills for controls, 18–24px corners for cards, circles for avatars and icon
  buttons.
- **Shadow scales with size.** Cards use `depth="lg"`, controls `md`, chips and avatars
  `sm`/`xs`. The library defaults already do this.
- **Charts are pebbles too.** Bars, funnel steps and avatars are each their own small
  pebble. Lines are thin, smooth curves.
- **Type.** Outfit at weights 500–600, slightly tight tracking on headings, tabular numbers
  for figures. Use the size tokens `--sg-text-xs … --sg-text-3xl`.
- **Motion.** Hover lifts a pebble 1px and pressing sinks it, with soft, slightly springy
  easing (`--sg-ease`, `--sg-spring`). Respect `prefers-reduced-motion`, which the
  stylesheet already does.
- **The page is white paper.** Don't put pebbles on coloured or gradient backgrounds. In
  dark mode the page is the warm sand room (`--sg-page`), never `#000`.
- **Accessibility.** Text tokens meet WCAG AA in both themes. Keep `--sg-ink*` for text,
  give icon-only buttons an `aria-label`, and keep the visible focus ring (`--sg-focus-ring`).

## When you are done

Run the app and look at it. Pebbles should read as frosted, softly domed and evenly lit, with
shadows all falling down-right. If something looks flat, it is missing `.sg-pebble`. If it
looks floaty or harsh, the depth is wrong or a custom shadow overrides the recipe. Switch
`data-sg-theme` to `dark` and check again.

Live docs for every component: https://seaglass.awacxo.com/components
