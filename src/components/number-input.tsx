import { forwardRef, useMemo, useState, type InputHTMLAttributes, type ReactNode } from "react";
import { cx } from "../lib/cx";
import { MinusIcon, PlusIcon } from "../lib/icons";
import { useControllableState } from "../hooks/use-controllable-state";
import { useFieldControlProps } from "./field";

type NativeProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "value" | "defaultValue" | "onChange" | "type" | "min" | "max" | "step">;

export interface NumberInputProps extends NativeProps {
  value?: number | null;
  defaultValue?: number | null;
  /** Called with the parsed, clamped number, or null when the field is emptied. */
  onValueChange?: (value: number | null) => void;
  min?: number;
  max?: number;
  /** Arrow keys and the buttons change the value by this much. @default 1 */
  step?: number;
  /** Shift + arrows and Page Up / Page Down. @default step × 10 */
  largeStep?: number;
  /** How the value is shown when the field is not being edited, e.g. { style: "currency", currency: "EUR" }. */
  format?: Intl.NumberFormatOptions;
  /** Locale for formatting and parsing. Defaults to the browser's. */
  locale?: string;
  size?: "sm" | "md" | "lg";
  invalid?: boolean;
  /** Icon or text inside the field, before the value. */
  leading?: ReactNode;
  /** Hide the − and + buttons. Arrow keys still work. */
  hideSteppers?: boolean;
  incrementLabel?: string;
  decrementLabel?: string;
}

function separators(locale?: string) {
  const parts = new Intl.NumberFormat(locale).formatToParts(11111.1);
  return { group: parts.find((p) => p.type === "group")?.value ?? ",", decimal: parts.find((p) => p.type === "decimal")?.value ?? "." };
}

const decimals = (n: number) => (String(n).split(".")[1] ?? "").length;

/**
 * A numeric text field with − and + steppers. Typing is free-form; the value is parsed,
 * clamped and rounded to the step when the field loses focus or Enter is pressed.
 */
export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(function NumberInput(
  {
    value, defaultValue = null, onValueChange, min, max, step = 1, largeStep, format, locale, size = "md", invalid, leading,
    hideSteppers, incrementLabel = "Increase", decrementLabel = "Decrease", name, className, style, onBlur, onFocus, onKeyDown, ...rest
  }, ref,
) {
  const [current, setCurrent] = useControllableState<number | null>({ value, defaultValue, onChange: onValueChange });
  const [draft, setDraft] = useState<string | null>(null);
  const control = useFieldControlProps({ ...rest, "aria-invalid": invalid || rest["aria-invalid"] });
  const sep = useMemo(() => separators(locale), [locale]);
  const places = Math.max(decimals(step), decimals(min ?? 0));
  const formatter = useMemo(
    () => new Intl.NumberFormat(locale, format ?? { maximumFractionDigits: Math.max(places, 20) }),
    [locale, format, places],
  );
  const plain = useMemo(() => new Intl.NumberFormat(locale, { useGrouping: false, maximumFractionDigits: 20 }), [locale]);

  const clamp = (n: number) => Math.min(max ?? Infinity, Math.max(min ?? -Infinity, n));
  const round = (n: number) => Number(n.toFixed(places));
  // Snap to the nearest step counted from min (or 0), then clamp.
  const snap = (n: number) => { const o = min ?? 0; return round(clamp(o + Math.round((n - o) / step) * step)); };
  const commit = (n: number | null) => setCurrent(n == null || Number.isNaN(n) ? null : snap(n));
  const parse = (text: string): number | null => {
    const cleaned = text.split(sep.group).join("").replace(sep.decimal, ".").replace(/[^\d.eE+-]/g, "");
    if (cleaned.trim() === "" || cleaned === "-") return null;
    const n = Number(cleaned);
    return Number.isNaN(n) ? current : n;
  };
  const nudge = (delta: number) => {
    const base = draft != null ? parse(draft) : current;
    const next = round(clamp((base ?? min ?? 0) + delta));
    setCurrent(next);
    if (draft != null) setDraft(plain.format(next));
  };

  const disabled = control.disabled;
  const readOnly = rest.readOnly;
  const big = largeStep ?? step * 10;
  const shown = draft ?? (current == null ? "" : formatter.format(current));

  return (
    <div
      className={cx("sg-input sg-number-input sg-well", className)}
      style={style}
      data-size={size}
      data-invalid={control["aria-invalid"] ? "" : undefined}
      data-disabled={disabled ? "" : undefined}
    >
      {leading && <span className="sg-input-adorn" aria-hidden>{leading}</span>}
      <input
        ref={ref}
        type="text"
        inputMode={places > 0 || (min ?? 0) < 0 ? "decimal" : "numeric"}
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
        role="spinbutton"
        aria-valuenow={current ?? undefined}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuetext={current == null ? undefined : formatter.format(current)}
        className="sg-input-el"
        value={shown}
        {...rest}
        {...control}
        onChange={(e) => setDraft(e.target.value)}
        onFocus={(e) => { setDraft(current == null ? "" : plain.format(current)); onFocus?.(e); }}
        onBlur={(e) => { if (draft != null) commit(parse(draft)); setDraft(null); onBlur?.(e); }}
        onKeyDown={(e) => {
          onKeyDown?.(e);
          if (e.defaultPrevented || readOnly) return;
          const k = e.key;
          if (k === "ArrowUp" || k === "ArrowDown") { e.preventDefault(); nudge((k === "ArrowUp" ? 1 : -1) * (e.shiftKey ? big : step)); }
          else if (k === "PageUp" || k === "PageDown") { e.preventDefault(); nudge((k === "PageUp" ? 1 : -1) * big); }
          else if (k === "Home" && min != null) { e.preventDefault(); commit(min); setDraft(plain.format(min)); }
          else if (k === "End" && max != null) { e.preventDefault(); commit(max); setDraft(plain.format(max)); }
          else if (k === "Enter" && draft != null) { const n = parse(draft); commit(n); setDraft(n == null ? "" : plain.format(snap(n))); }
        }}
      />
      {name && <input type="hidden" name={name} value={current ?? ""} />}
      {!hideSteppers && (
        <span className="sg-number-steppers">
          <button
            type="button" tabIndex={-1} className="sg-number-step" aria-label={decrementLabel}
            disabled={disabled || readOnly || (min != null && current != null && current <= min)}
            onPointerDown={(e) => e.preventDefault()} onClick={() => nudge(-step)}
          ><MinusIcon width={14} height={14} strokeWidth={2.2} /></button>
          <button
            type="button" tabIndex={-1} className="sg-number-step" aria-label={incrementLabel}
            disabled={disabled || readOnly || (max != null && current != null && current >= max)}
            onPointerDown={(e) => e.preventDefault()} onClick={() => nudge(step)}
          ><PlusIcon width={14} height={14} /></button>
        </span>
      )}
    </div>
  );
});
