---
"seaglass-ui": minor
---

Accessibility pass, verified with axe in a real browser on every docs page in both themes.

- `--sg-ink-muted` and `--sg-ink-faint` are darker in light and dark themes so all text meets WCAG AA (4.5:1). Inactive tabs are slightly more opaque for the same reason.
- `Slider` forwards `aria-label` / `aria-labelledby` to its thumb, which is the element with `role="slider"`.
- New props: `CardHeader titleAs` (heading level), `SidebarInset as` (`"main"` or `"div"`), and `aria-label` on `Breadcrumbs`, `Pagination` and `SidebarNav`.
- `DateRangePicker` accepts `invalid` and `id` and picks them up from `Field`, like `DatePicker`.
- Named popovers for `Combobox`, `DatePicker` and `DateRangePicker`; `Progress` is labelled by its label; avatar status dots and the breadcrumb ellipsis have accessible names; `CommandSeparator` is hidden from assistive tech.
