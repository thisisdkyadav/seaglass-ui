import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { Popover as P } from "radix-ui";
import { cx } from "../lib/cx";
import { CalendarIcon, ChevronLeft, ChevronRight } from "../lib/icons";
import { useControllableState } from "../hooks/use-controllable-state";
import { useFieldControlProps } from "./field";

/* ---------- date helpers (local time, day precision) ---------- */
const day = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const addDays = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
const addMonths = (d: Date, n: number) => {
  const t = new Date(d.getFullYear(), d.getMonth() + n, 1);
  return new Date(t.getFullYear(), t.getMonth(), Math.min(d.getDate(), new Date(t.getFullYear(), t.getMonth() + 1, 0).getDate()));
};
export const sameDay = (a?: Date | null, b?: Date | null) => !!a && !!b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
const key = (d: Date) => `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;

export interface DateRange { from: Date | null; to: Date | null }

interface CalendarBase {
  /** Month on show (controlled). */
  month?: Date;
  defaultMonth?: Date;
  onMonthChange?: (m: Date) => void;
  min?: Date;
  max?: Date;
  /** Return true to disable a day. */
  isDisabled?: (d: Date) => boolean;
  /** 0 = Sunday, 1 = Monday. Default 1. */
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  locale?: string;
  /** Months side by side. */
  numberOfMonths?: 1 | 2;
  className?: string;
}
export interface CalendarSingleProps extends CalendarBase { mode?: "single"; value?: Date | null; defaultValue?: Date | null; onValueChange?: (d: Date | null) => void }
export interface CalendarRangeProps extends CalendarBase { mode: "range"; value?: DateRange; defaultValue?: DateRange; onValueChange?: (r: DateRange) => void }
export type CalendarProps = CalendarSingleProps | CalendarRangeProps;

/**
 * Keyboard: arrows move a day / week, PageUp/PageDown a month (+Shift a year),
 * Home/End the week, Enter or Space selects.
 */
export function Calendar(props: CalendarProps) {
  const { min, max, isDisabled, weekStartsOn = 1, locale, numberOfMonths = 1, className } = props;
  const range = props.mode === "range";
  const [single, setSingle] = useControllableState<Date | null>({
    value: range ? undefined : (props as CalendarSingleProps).value,
    defaultValue: range ? null : (props as CalendarSingleProps).defaultValue ?? null,
    onChange: range ? undefined : (props as CalendarSingleProps).onValueChange,
  });
  const [rng, setRng] = useControllableState<DateRange>({
    value: range ? (props as CalendarRangeProps).value : undefined,
    defaultValue: range ? (props as CalendarRangeProps).defaultValue ?? { from: null, to: null } : { from: null, to: null },
    onChange: range ? (props as CalendarRangeProps).onValueChange : undefined,
  });
  const anchor = (range ? rng.from : single) ?? day(new Date());
  const [month, setMonth] = useControllableState<Date>({ value: props.month, defaultValue: props.defaultMonth ?? new Date(anchor.getFullYear(), anchor.getMonth(), 1), onChange: props.onMonthChange });
  const [focus, setFocus] = useState<Date>(anchor);
  const [hover, setHover] = useState<Date | null>(null);
  const grid = useRef<HTMLDivElement>(null);
  // the roving tab stop: the focused day if it is on show, else the same date in the first visible month
  const mi = (d: Date) => d.getFullYear() * 12 + d.getMonth();
  const onShow = mi(focus) >= mi(month) && mi(focus) < mi(month) + numberOfMonths;
  const cur = onShow ? focus : new Date(month.getFullYear(), month.getMonth(), Math.min(focus.getDate(), new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate()));
  const wantFocus = useRef(false);

  const disabled = (d: Date) => (!!min && d < day(min)) || (!!max && d > day(max)) || !!isDisabled?.(d);
  const fmt = useMemo(() => ({
    month: new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" }),
    weekday: new Intl.DateTimeFormat(locale, { weekday: "short" }),
    full: new Intl.DateTimeFormat(locale, { dateStyle: "full" }),
  }), [locale]);
  const weekdays = Array.from({ length: 7 }, (_, i) => fmt.weekday.format(new Date(2024, 0, 7 + ((i + weekStartsOn) % 7))));

  useEffect(() => {
    if (!wantFocus.current) return;
    wantFocus.current = false;
    grid.current?.querySelector<HTMLButtonElement>(`[data-key="${key(focus)}"]`)?.focus();
  }, [focus, month]);

  const moveFocus = (d: Date) => {
    wantFocus.current = true;
    setFocus(d);
    const first = new Date(month.getFullYear(), month.getMonth(), 1);
    const last = new Date(month.getFullYear(), month.getMonth() + numberOfMonths, 0);
    if (d < first || d > last) setMonth(new Date(d.getFullYear(), d.getMonth() - (d > last ? numberOfMonths - 1 : 0), 1));
  };

  const select = (d: Date) => {
    if (disabled(d)) return;
    setFocus(d);
    if (!range) { setSingle(sameDay(d, single) ? null : d); return; }
    if (!rng.from || rng.to) setRng({ from: d, to: null });
    else if (d < rng.from) setRng({ from: d, to: rng.from });
    else setRng({ from: rng.from, to: d });
  };

  const onKey = (e: KeyboardEvent) => {
    const map: Record<string, () => Date> = {
      ArrowLeft: () => addDays(cur, -1), ArrowRight: () => addDays(cur, 1),
      ArrowUp: () => addDays(cur, -7), ArrowDown: () => addDays(cur, 7),
      PageUp: () => addMonths(cur, e.shiftKey ? -12 : -1), PageDown: () => addMonths(cur, e.shiftKey ? 12 : 1),
      Home: () => addDays(cur, -((cur.getDay() - weekStartsOn + 7) % 7)),
      End: () => addDays(cur, 6 - ((cur.getDay() - weekStartsOn + 7) % 7)),
    };
    if (map[e.key]) { e.preventDefault(); moveFocus(map[e.key]()); }
    else if ((e.key === "Enter" || e.key === " ") && (e.target as HTMLElement).dataset.key) { e.preventDefault(); select(cur); }
  };

  const today = day(new Date());
  const rangeEnd = range ? rng.to ?? (rng.from && hover && hover > rng.from ? hover : null) : null;

  const renderMonth = (m: Date, idx: number) => {
    const first = new Date(m.getFullYear(), m.getMonth(), 1);
    const start = addDays(first, -((first.getDay() - weekStartsOn + 7) % 7));
    const days = Array.from({ length: 42 }, (_, i) => addDays(start, i));
    return (
      <div className="sg-calendar-month" key={idx}>
        <div className="sg-calendar-head">
          {idx === 0 ? <button type="button" className="sg-calendar-nav" aria-label="Previous month" onClick={() => setMonth(addMonths(month, -1))}><ChevronLeft width={16} height={16} /></button> : <span />}
          <span className="sg-calendar-title" aria-live="polite">{fmt.month.format(m)}</span>
          {idx === numberOfMonths - 1 ? <button type="button" className="sg-calendar-nav" aria-label="Next month" onClick={() => setMonth(addMonths(month, 1))}><ChevronRight width={16} height={16} /></button> : <span />}
        </div>
        <div role="grid" className="sg-calendar-grid" aria-label={fmt.month.format(m)}>
          <div role="row" className="sg-calendar-row">
            {weekdays.map((w) => <span role="columnheader" key={w} className="sg-calendar-weekday" aria-label={w}>{w.slice(0, 2)}</span>)}
          </div>
          {Array.from({ length: 6 }, (_, r) => (
            <div role="row" className="sg-calendar-row" key={r}>
              {days.slice(r * 7, r * 7 + 7).map((d) => {
                const outside = d.getMonth() !== m.getMonth();
                const sel = range ? sameDay(d, rng.from) || sameDay(d, rng.to) : sameDay(d, single);
                const inRange = range && rng.from && rangeEnd && d > rng.from && d < rangeEnd;
                const isFocus = sameDay(d, cur) && !outside;
                return (
                  <span role="gridcell" key={key(d)} aria-selected={sel || undefined} className="sg-calendar-cell" data-in-range={inRange ? "" : undefined}
                    data-range-start={range && sameDay(d, rng.from) && rangeEnd ? "" : undefined} data-range-end={range && sameDay(d, rangeEnd) ? "" : undefined}>
                    {!outside && (
                      <button
                        type="button"
                        data-key={key(d)}
                        tabIndex={isFocus ? 0 : -1}
                        disabled={disabled(d)}
                        aria-label={fmt.full.format(d)}
                        aria-current={sameDay(d, today) ? "date" : undefined}
                        data-selected={sel ? "" : undefined}
                        data-tone={sel ? "periwinkle" : undefined}
                        data-depth={sel ? "xs" : undefined}
                        className={cx("sg-calendar-day", sel && "sg-pebble")}
                        onClick={() => select(d)}
                        onMouseEnter={() => setHover(d)}
                        onFocus={() => setFocus(d)}
                      >
                        {d.getDate()}
                      </button>
                    )}
                  </span>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div ref={grid} className={cx("sg-calendar", className)} onKeyDown={onKey} onMouseLeave={() => setHover(null)}>
      {Array.from({ length: numberOfMonths }, (_, i) => renderMonth(addMonths(new Date(month.getFullYear(), month.getMonth(), 1), i), i))}
    </div>
  );
}

/* ---------- DatePicker ---------- */
export interface DatePickerProps extends Omit<CalendarSingleProps, "mode" | "className"> {
  placeholder?: string;
  format?: Intl.DateTimeFormatOptions;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  invalid?: boolean;
  id?: string;
  className?: string;
  "aria-label"?: string;
}

export function DatePicker({ placeholder = "Pick a date", format = { dateStyle: "medium" }, size = "md", disabled, invalid, id, className, value, defaultValue, onValueChange, locale, ...cal }: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useControllableState<Date | null>({ value, defaultValue: defaultValue ?? null, onChange: onValueChange });
  const control = useFieldControlProps({ id, disabled, "aria-invalid": invalid });
  const f = useMemo(() => new Intl.DateTimeFormat(locale, format), [locale, format]);
  return (
    <P.Root open={open} onOpenChange={setOpen}>
      <P.Trigger id={control.id} disabled={control.disabled} aria-label={cal["aria-label"]} aria-invalid={control["aria-invalid"]} aria-describedby={control["aria-describedby"]} data-size={size} className={cx("sg-select-trigger sg-well", className)}>
        <CalendarIcon className="sg-select-lead" width={17} height={17} />
        {date ? <span>{f.format(date)}</span> : <span className="sg-combobox-placeholder">{placeholder}</span>}
      </P.Trigger>
      <P.Portal>
        <P.Content className="sg-popover sg-pebble sg-popover-surface" data-tone="clear" data-depth="md" data-padding="sm" sideOffset={8} align="start">
          <Calendar {...cal} locale={locale} value={date} onValueChange={(d) => { setDate(d); if (d) setOpen(false); }} />
        </P.Content>
      </P.Portal>
    </P.Root>
  );
}

export interface DateRangePickerProps extends Omit<CalendarRangeProps, "mode" | "className" | "numberOfMonths"> {
  placeholder?: string;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  className?: string;
  "aria-label"?: string;
  /** Quick ranges shown beside the calendar. */
  presets?: Array<{ label: string; range: () => DateRange }>;
}

export function DateRangePicker({ placeholder = "Pick dates", size = "md", disabled, className, value, defaultValue, onValueChange, locale, presets, ...cal }: DateRangePickerProps) {
  const [open, setOpen] = useState(false);
  const [r, setR] = useControllableState<DateRange>({ value, defaultValue: defaultValue ?? { from: null, to: null }, onChange: onValueChange });
  const f = useMemo(() => new Intl.DateTimeFormat(locale, { month: "short", day: "numeric" }), [locale]);
  return (
    <P.Root open={open} onOpenChange={setOpen}>
      <P.Trigger disabled={disabled} aria-label={cal["aria-label"]} data-size={size} className={cx("sg-select-trigger sg-well", className)}>
        <CalendarIcon className="sg-select-lead" width={17} height={17} />
        {r.from ? <span>{f.format(r.from)} – {r.to ? f.format(r.to) : "…"}</span> : <span className="sg-combobox-placeholder">{placeholder}</span>}
      </P.Trigger>
      <P.Portal>
        <P.Content className="sg-popover sg-pebble sg-popover-surface sg-range-popover" data-tone="clear" data-depth="md" data-padding="sm" sideOffset={8} align="start">
          {presets && (
            <div className="sg-range-presets">
              {presets.map((p) => <button type="button" key={p.label} className="sg-menu-item" onClick={() => { setR(p.range()); setOpen(false); }}>{p.label}</button>)}
            </div>
          )}
          <Calendar {...cal} mode="range" numberOfMonths={2} locale={locale} value={r} onValueChange={(x) => { setR(x); if (x.from && x.to) setOpen(false); }} />
        </P.Content>
      </P.Portal>
    </P.Root>
  );
}
