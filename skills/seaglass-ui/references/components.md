# Components

One file per component in `components/`. Each has the import, the props, and every docs example as React source plus the static HTML it renders to (closed overlays show only their trigger; open menus, dialogs and popovers are portalled to <body> at runtime).

## Foundations

- [Pebble](components/pebble.md) — The material every surface is made of: a frosted, domed stone that casts a soft shadow.
- [Theme](components/theme.md) — Light paper, or a dim warm room lit by one lamp. Persisted, system-aware and toggleable.

## Layout

- [Stack & Grid](components/stack-grid.md) — Rows, columns and grids on the spacing scale, without writing CSS.
- [Scroll area](components/scroll-area.md) — A scroll container with slim glass scrollbars that keep native scrolling.

## Primitives

- [Button](components/button.md) — A raised pebble that lifts on hover and sinks when pressed. Plus soft, ghost and link variants.
- [Badge](components/badge.md) — Small status labels and counts.
- [Avatar](components/avatar.md) — A picture, or initials on a pebble, with an optional presence dot.
- [Card](components/card.md) — A large pebble for grouping content, with a header, body and footer.
- [Text, Heading & Link](components/typography.md) — Body text, headings and links on the type scale.
- [Alert](components/alert.md) — An inline message about the page or a section: info, success, warning or an error.
- [Kbd](components/kbd.md) — Keyboard keys and combos, rendered with the right symbols for the platform.
- [Separator](components/separator.md) — A hairline between content, optionally with a label.
- [Skeleton](components/skeleton.md) — Placeholder shapes that shimmer while content loads.
- [Progress & Spinner](components/progress.md) — A sunken track filled with a pebble, and a spinner for indeterminate waits.
- [Empty state](components/empty-state.md) — What to show when there is nothing to show.

## Forms

- [Field & Input](components/field.md) — Sunken text fields with labels, hints and errors wired up for you.
- [Checkbox](components/checkbox.md) — A small pebble that fills with a check. Supports indeterminate.
- [Radio group](components/radio-group.md) — One choice from a few.
- [Switch](components/switch.md) — An on/off toggle: a sunken track with a white chip.
- [Slider](components/slider.md) — Pick a value or a range by dragging a pebble along a sunken track.
- [Number input](components/number-input.md) — A numeric field with − and + steppers, keyboard stepping and locale-aware formatting.
- [Toggle & Toggle group](components/toggle.md) — Buttons that stay pressed, alone or in a group: bold, alignment, filters.
- [Segmented control](components/segmented-control.md) — A row of mutually exclusive options. Separate pebbles, or one pebble with a white chip.
- [Select](components/select.md) — Choose one option from a list in a frosted popover.
- [Combobox](components/combobox.md) — A searchable select, single or multiple, with optional create.
- [Date picker](components/date-picker.md) — A calendar, a single-date picker and a range picker with presets.

## Overlays

- [Tooltip](components/tooltip.md) — A short label on hover or focus, with an optional shortcut.
- [Popover & Hover card](components/popover.md) — Floating frosted panels: click for a popover, hover for a preview card.
- [Dropdown menu](components/dropdown-menu.md) — Actions in a menu: icons, shortcuts, checkable items, radio groups and submenus.
- [Context menu](components/context-menu.md) — The same menu, opened with a right-click or long-press.
- [Dialog](components/dialog.md) — A modal pebble over a soft scrim.
- [Sheet](components/sheet.md) — A dialog that slides in from an edge.
- [Alert dialog](components/alert-dialog.md) — Confirm a destructive action. Waits for async confirms with a spinner.
- [Toast](components/toast.md) — Brief notifications, called from anywhere with toast().
- [Command](components/command.md) — Fuzzy-searchable command lists, inline or as a ⌘K palette.

## Navigation

- [Tabs](components/tabs.md) — Switch between views. A pebble tray with a white chip, plain chips or an underline.
- [Accordion & Collapsible](components/accordion.md) — Fold content away. Joined in one pebble, or as separate stones.
- [Breadcrumbs](components/breadcrumbs.md) — Where you are, with long trails collapsed into a menu.
- [Pagination](components/pagination.md) — Move through pages of results.
- [Sidebar](components/sidebar.md) — An app shell: collapsible to a rail, resizable, searchable, multi-level, and a drawer on phones.

## Data display

- [Table](components/table.md) — Styled table parts for when you want full control of the markup.
- [Data table](components/data-table.md) — Sorting, search, selection, bulk actions and pagination, from columns and rows.
- [Stat & Sparkline](components/stat.md) — A headline number with its change and a tiny trend line.
- [Bar chart](components/bar-chart.md) — Every bar is its own small pebble.

## Utilities

- [Hooks](components/hooks.md) — The hooks the components use, exported for your own code.
