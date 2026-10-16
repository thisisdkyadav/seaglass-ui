# seaglass-ui

## 0.2.0

### Minor Changes

- b4ead8c: Accessibility pass, verified with axe in a real browser on every docs page in both themes.
  
  - `--sg-ink-muted` and `--sg-ink-faint` are darker in light and dark themes so all text meets WCAG AA (4.5:1). Inactive tabs are slightly more opaque for the same reason.
  - `Slider` forwards `aria-label` / `aria-labelledby` to its thumb, which is the element with `role="slider"`.
  - New props: `CardHeader titleAs` (heading level), `SidebarInset as` (`"main"` or `"div"`), and `aria-label` on `Breadcrumbs`, `Pagination` and `SidebarNav`.
  - `DateRangePicker` accepts `invalid` and `id` and picks them up from `Field`, like `DatePicker`.
  - Named popovers for `Combobox`, `DatePicker` and `DateRangePicker`; `Progress` is labelled by its label; avatar status dots and the breadcrumb ellipsis have accessible names; `CommandSeparator` is hidden from assistive tech.
- 3b86fc9: New components:
  
  - `Alert`: inline info, success, warning and error messages, with actions and dismiss.
  - `Toggle`, `ToggleGroup`, `ToggleGroupItem`: pressed-state buttons, alone or as single / multiple groups.
  - `NumberInput`: numeric field with steppers, keyboard stepping, clamping, step snapping and `Intl` formatting (currency, percent).
  - `ScrollArea`: slim glass scrollbars over native scrolling.
  - `Text`, `Heading`, `Link`: the type scale as components. Heading separates level from size.
  - `Stack`, `Grid`: layout on the spacing scale. `Grid minColumnWidth` reflows without media queries.
  
  New tokens: `--sg-space-10`, `--sg-space-12`, `--sg-text-3xl`, `--sg-weight-bold`.
- 4ac085d: Right-to-left support. `ThemeProvider` takes `dir="rtl"`, which sets `dir` on `<html>` and passes the direction to every component. New `DirectionProvider` and `useDirection` exports cover RTL sections inside an LTR page.
  
  - The stylesheet uses logical properties throughout (`margin-inline-start`, `inset-inline-end`, `text-align: start`, logical radii), so layout mirrors by itself.
  - Breadcrumb, pagination, calendar, sub-menu and tree chevrons mirror. Switch thumbs, the sidebar drawer and indeterminate progress move along the reading direction.
  - Calendar arrow keys, the sidebar tree, its resize handle and rail tooltips / flyouts follow the direction.
  - The lamp does not move: shadows and highlights are the same in both directions. `Sheet` sides and `Toaster` positions stay physical.

## 0.1.0

First public release: about 40 accessible React components (forms, overlays, menus, command
palette, data table, date pickers and a sidebar app shell) in one frosted sea-glass material,
with a warm dark mode, design tokens and a docs site.
