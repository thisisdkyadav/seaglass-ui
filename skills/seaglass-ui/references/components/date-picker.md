# Date picker

A calendar, a single-date picker and a range picker with presets.

```tsx
import { Calendar, DatePicker, DateRangePicker } from "seaglass-ui";
```

## Calendar props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `mode` | `"single" \| "range"` | `"single"` |  |
| `value · defaultValue · onValueChange` | `Date \| null  ·  { from, to }` |  |  |
| `month · defaultMonth · onMonthChange` | `Date` |  | Month on show. |
| `min · max` | `Date` |  |  |
| `isDisabled` | `(d: Date) => boolean` |  | Disable individual days. |
| `weekStartsOn` | `0–6` | `1` | 0 is Sunday. |
| `numberOfMonths` | `1 \| 2` | `1` |  |
| `locale` | `string` |  | Any Intl locale. |

## DatePicker props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value · defaultValue · onValueChange` | `Date \| null` |  |  |
| `placeholder` | `string` | `"Pick a date"` |  |
| `format` | `Intl.DateTimeFormatOptions` | `{ dateStyle: "medium" }` |  |
| `size · disabled · invalid` | `—` |  |  |
| `min · max · isDisabled · weekStartsOn · locale` | `—` |  | Passed to Calendar. |

## DateRangePicker props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value · defaultValue · onValueChange` | `{ from: Date \| null; to: Date \| null }` |  |  |
| `placeholder` | `string` | `"Pick dates"` |  |
| `presets` | `{ label, range: () => DateRange }[]` |  | Quick ranges beside the calendar. |
| `size · disabled · invalid · id` | `—` |  | Inside a Field, id and invalid come from the field. |

## Keyboard

- **← → ↑ ↓** — Day / week
- **PgUp / PgDn** — Month
- **Shift + PgUp / Shift + PgDn** — Year
- **Home / End** — Start / end of week
- **Enter / Space** — Select

## Examples

### Calendar

```tsx
import { useState } from "react";
import { Calendar } from "seaglass-ui";

export default function CalendarExample() {
  const [date, setDate] = useState<Date | null>(new Date());
  return <Calendar value={date} onValueChange={setDate} />;
}
```

Rendered HTML:

```html
<div class="sg-calendar">
<div class="sg-calendar-month">
<div class="sg-calendar-head">
<button type="button" class="sg-calendar-nav" aria-label="Previous month">
<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
<path d="M14.5 6l-6 6 6 6">
</path>
</svg>
</button>
<span class="sg-calendar-title" aria-live="polite">October 2026</span>
<button type="button" class="sg-calendar-nav" aria-label="Next month">
<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
<path d="M9.5 6l6 6-6 6">
</path>
</svg>
</button>
</div>
<div role="grid" class="sg-calendar-grid" aria-label="October 2026">
<div role="row" class="sg-calendar-row">
<span role="columnheader" class="sg-calendar-weekday" aria-label="Mon">Mo</span>
<span role="columnheader" class="sg-calendar-weekday" aria-label="Tue">Tu</span>
<span role="columnheader" class="sg-calendar-weekday" aria-label="Wed">We</span>
<span role="columnheader" class="sg-calendar-weekday" aria-label="Thu">Th</span>
<span role="columnheader" class="sg-calendar-weekday" aria-label="Fri">Fr</span>
<span role="columnheader" class="sg-calendar-weekday" aria-label="Sat">Sa</span>
<span role="columnheader" class="sg-calendar-weekday" aria-label="Sun">Su</span>
</div>
<div role="row" class="sg-calendar-row">
<span role="gridcell" class="sg-calendar-cell">
</span>
<span role="gridcell" class="sg-calendar-cell">
</span>
<span role="gridcell" class="sg-calendar-cell">
</span>
<span role="gridcell" class="sg-calendar-cell">
<button type="button" data-key="2026-9-1" tabindex="-1" aria-label="Thursday, October 1, 2026" class="sg-calendar-day">1</button>
</span>
<span role="gridcell" class="sg-calendar-cell">
<button type="button" data-key="2026-9-2" tabindex="-1" aria-label="Friday, October 2, 2026" class="sg-calendar-day">2</button>
</span>
<span role="gridcell" class="sg-calendar-cell">
<button type="button" data-key="2026-9-3" tabindex="-1" aria-label="Saturday, October 3, 2026" class="sg-calendar-day">3</button>
</span>
<span role="gridcell" class="sg-calendar-cell">
<button type="button" data-key="2026-9-4" tabindex="-1" aria-label="Sunday, October 4, 2026" class="sg-calendar-day">4</button>
</span>
</div>
<div role="row" class="sg-calendar-row">
<span role="gridcell" class="sg-calendar-cell">
<button type="button" data-key="2026-9-5" tabindex="-1" aria-label="Monday, October 5, 2026" class="sg-calendar-day">5</button>
</span>
<span role="gridcell" class="sg-calendar-cell">
<button type="button" data-key="2026-9-6" tabindex="-1" aria-label="Tuesday, October 6, 2026" class="sg-calendar-day">6</button>
</span>
<span role="gridcell" class="sg-calendar-cell">
<button type="button" data-key="2026-9-7" tabindex="-1" aria-label="Wednesday, October 7, 2026" class="sg-calendar-day">7</button>
</span>
<span role="gridcell" class="sg-calendar-cell">
<button type="button" data-key="2026-9-8" tabindex="-1" aria-label="Thursday, October 8, 2026" class="sg-calendar-day">8</button>
</span>
<span role="gridcell" class="sg-calendar-cell">
<button type="button" data-key="2026-9-9" tabindex="-1" aria-label="Friday, October 9, 2026" class="sg-calendar-day">9</button>
</span>
<span role="gridcell" class="sg-calendar-cell">
<button type="button" data-key="2026-9-10" tabindex="-1" aria-label="Saturday, October 10, 2026" class="sg-calendar-day">10</button>
</span>
<span role="gridcell" class="sg-calendar-cell">
<button type="button" data-key="2026-9-11" tabindex="-1" aria-label="Sunday, October 11, 2026" class="sg-calendar-day">11</button>
</span>
</div>
<div role="row" class="sg-calendar-row">
<span role="gridcell" class="sg-calendar-cell">
<button type="button" data-key="2026-9-12" tabindex="-1" aria-label="Monday, October 12, 2026" class="sg-calendar-day">12</button>
</span>
<span role="gridcell" class="sg-calendar-cell">
<button type="button" data-key="2026-9-13" tabindex="-1" aria-label="Tuesday, October 13, 2026" class="sg-calendar-day">13</button>
</span>
<span role="gridcell" class="sg-calendar-cell">
<button type="button" data-key="2026-9-14" tabindex="-1" aria-label="Wednesday, October 14, 2026" class="sg-calendar-day">14</button>
</span>
<span role="gridcell" class="sg-calendar-cell">
<button type="button" data-key="2026-9-15" tabindex="-1" aria-label="Thursday, October 15, 2026" class="sg-calendar-day">15</button>
</span>
<span role="gridcell" aria-selected="true" class="sg-calendar-cell">
<button type="button" data-key="2026-9-16" tabindex="0" aria-label="Friday, October 16, 2026" aria-current="date" data-selected="" data-tone="periwinkle" data-depth="xs" class="sg-calendar-day sg-pebble">16</button>
</span>
<span role="gridcell" class="sg-calendar-cell">
<button type="button" data-key="2026-9-17" tabindex="-1" aria-label="Saturday, October 17, 2026" class="sg-calendar-day">17</button>
</span>
<span role="gridcell" class="sg-calendar-cell">
<button type="button" data-key="2026-9-18" tabindex="-1" aria-label="Sunday, October 18, 2026" class="sg-calendar-day">18</button>
</span>
</div>
<div role="row" class="sg-calendar-row">
<span role="gridcell" class="sg-calendar-cell">
<button type="button" data-key="2026-9-19" tabindex="-1" aria-label="Monday, October 19, 2026" class="sg-calendar-day">19</button>
</span>
<span role="gridcell" class="sg-calendar-cell">
<button type="button" data-key="2026-9-20" tabindex="-1" aria-label="Tuesday, October 20, 2026" class="sg-calendar-day">20</button>
</span>
<span role="gridcell" class="sg-calendar-cell">
<button type="button" data-key="2026-9-21" tabindex="-1" aria-label="Wednesday, October 21, 2026" class="sg-calendar-day">21</button>
</span>
<span role="gridcell" class="sg-calendar-cell">
<button type="button" data-key="2026-9-22" tabindex="-1" aria-label="Thursday, October 22, 2026" class="sg-calendar-day">22</button>
</span>
<span role="gridcell" class="sg-calendar-cell">
<button type="button" data-key="2026-9-23" tabindex="-1" aria-label="Friday, October 23, 2026" class="sg-calendar-day">23</button>
</span>
<span role="gridcell" class="sg-calendar-cell">
<button type="button" data-key="2026-9-24" tabindex="-1" aria-label="Saturday, October 24, 2026" class="sg-calendar-day">24</button>
</span>
<span role="gridcell" class="sg-calendar-cell">
<button type="button" data-key="2026-9-25" tabindex="-1" aria-label="Sunday, October 25, 2026" class="sg-calendar-day">25</button>
</span>
</div>
<div role="row" class="sg-calendar-row">
<span role="gridcell" class="sg-calendar-cell">
<button type="button" data-key="2026-9-26" tabindex="-1" aria-label="Monday, October 26, 2026" class="sg-calendar-day">26</button>
</span>
<span role="gridcell" class="sg-calendar-cell">
<button type="button" data-key="2026-9-27" tabindex="-1" aria-label="Tuesday, October 27, 2026" class="sg-calendar-day">27</button>
</span>
<span role="gridcell" class="sg-calendar-cell">
<button type="button" data-key="2026-9-28" tabindex="-1" aria-label="Wednesday, October 28, 2026" class="sg-calendar-day">28</button>
</span>
<span role="gridcell" class="sg-calendar-cell">
<button type="button" data-key="2026-9-29" tabindex="-1" aria-label="Thursday, October 29, 2026" class="sg-calendar-day">29</button>
</span>
<span role="gridcell" class="sg-calendar-cell">
<button type="button" data-key="2026-9-30" tabindex="-1" aria-label="Friday, October 30, 2026" class="sg-calendar-day">30</button>
</span>
<span role="gridcell" class="sg-calendar-cell">
<button type="button" data-key="2026-9-31" tabindex="-1" aria-label="Saturday, October 31, 2026" class="sg-calendar-day">31</button>
</span>
<span role="gridcell" class="sg-calendar-cell">
</span>
</div>
<div role="row" class="sg-calendar-row">
<span role="gridcell" class="sg-calendar-cell">
</span>
<span role="gridcell" class="sg-calendar-cell">
</span>
<span role="gridcell" class="sg-calendar-cell">
</span>
<span role="gridcell" class="sg-calendar-cell">
</span>
<span role="gridcell" class="sg-calendar-cell">
</span>
<span role="gridcell" class="sg-calendar-cell">
</span>
<span role="gridcell" class="sg-calendar-cell">
</span>
</div>
</div>
</div>
</div>
```

### Date picker

```tsx
import { Field, DatePicker } from "seaglass-ui";

export default function DatePickerExample() {
  return (
    <div style={{ width: "min(300px, 100%)" }}>
      <Field label="Ship date">
        <DatePicker placeholder="Pick a date" min={new Date()} />
      </Field>
    </div>
  );
}
```

Rendered HTML:

```html
<div style="width:min(300px, 100%)">
<div class="sg-field" data-orientation="vertical">
<label class="sg-label sg-field-label" for="sg-field-id">Ship date</label>
<div class="sg-field-control">
<button type="button" aria-haspopup="dialog" aria-expanded="false" data-state="closed" id="sg-field-id" data-size="md" class="sg-select-trigger sg-well">
<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="sg-select-lead">
<rect x="4" y="5.5" width="16" height="14.5" rx="3">
</rect>
<path d="M8 3.5v4M16 3.5v4M4 10h16">
</path>
</svg>
<span class="sg-combobox-placeholder">Pick a date</span>
</button>
</div>
</div>
</div>
```

### Range picker

Two months side by side, with quick presets.

```tsx
import { useState } from "react";
import { Field, DateRangePicker, type DateRange } from "seaglass-ui";

const daysAgo = (n: number) => new Date(Date.now() - n * 864e5);

export default function RangeExample() {
  const [range, setRange] = useState<DateRange>({ from: null, to: null });
  return (
    <div style={{ width: "min(320px, 100%)" }}>
      <Field label="Report period">
        <DateRangePicker
          value={range}
          onValueChange={setRange}
          presets={[
            { label: "Last 7 days", range: () => ({ from: daysAgo(6), to: new Date() }) },
            { label: "Last 30 days", range: () => ({ from: daysAgo(29), to: new Date() }) },
            { label: "Last 90 days", range: () => ({ from: daysAgo(89), to: new Date() }) },
          ]}
        />
      </Field>
    </div>
  );
}
```

Rendered HTML:

```html
<div style="width:min(320px, 100%)">
<div class="sg-field" data-orientation="vertical">
<label class="sg-label sg-field-label" for="sg-field-id">Report period</label>
<div class="sg-field-control">
<button type="button" aria-haspopup="dialog" aria-expanded="false" data-state="closed" id="sg-field-id" data-size="md" class="sg-select-trigger sg-well">
<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="sg-select-lead">
<rect x="4" y="5.5" width="16" height="14.5" rx="3">
</rect>
<path d="M8 3.5v4M16 3.5v4M4 10h16">
</path>
</svg>
<span class="sg-combobox-placeholder">Pick dates</span>
</button>
</div>
</div>
</div>
```
