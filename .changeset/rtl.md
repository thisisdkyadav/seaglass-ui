---
"seaglass-ui": minor
---

Right-to-left support. `ThemeProvider` takes `dir="rtl"`, which sets `dir` on `<html>` and passes the direction to every component. New `DirectionProvider` and `useDirection` exports cover RTL sections inside an LTR page.

- The stylesheet uses logical properties throughout (`margin-inline-start`, `inset-inline-end`, `text-align: start`, logical radii), so layout mirrors by itself.
- Breadcrumb, pagination, calendar, sub-menu and tree chevrons mirror. Switch thumbs, the sidebar drawer and indeterminate progress move along the reading direction.
- Calendar arrow keys, the sidebar tree, its resize handle and rail tooltips / flyouts follow the direction.
- The lamp does not move: shadows and highlights are the same in both directions. `Sheet` sides and `Toaster` positions stay physical.
