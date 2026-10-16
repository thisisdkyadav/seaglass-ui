import { forwardRef, useId, type HTMLAttributes, type ReactNode } from "react";
import { Separator as S, Progress as P } from "radix-ui";
import { cx } from "../lib/cx";
import type { Tone } from "../lib/types";
import { formatHotkey } from "../hooks/use-hotkeys";

/* ---------- Kbd ---------- */
export interface KbdProps extends HTMLAttributes<HTMLElement> {
  /** A combo like "mod+k"; rendered with platform symbols. Or pass children. */
  keys?: string;
}
export const Kbd = forwardRef<HTMLElement, KbdProps>(function Kbd({ keys, className, children, ...rest }, ref) {
  if (keys) {
    return (
      <span className={cx("sg-kbd-combo", className)} aria-label={keys}>
        {formatHotkey(keys).map((k, i) => <kbd key={i} className="sg-kbd">{k}</kbd>)}
      </span>
    );
  }
  return <kbd ref={ref} className={cx("sg-kbd", className)} {...rest}>{children}</kbd>;
});

/* ---------- Separator ---------- */
export interface SeparatorProps extends React.ComponentPropsWithoutRef<typeof S.Root> { label?: ReactNode }
export const Separator = forwardRef<HTMLDivElement, SeparatorProps>(function Separator({ className, label, orientation = "horizontal", ...rest }, ref) {
  if (label) {
    return (
      <div className={cx("sg-separator-labeled", className)} role="separator" aria-orientation="horizontal">
        <span>{label}</span>
      </div>
    );
  }
  return <S.Root ref={ref} orientation={orientation} className={cx("sg-separator", className)} {...rest} />;
});

/* ---------- Skeleton ---------- */
export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  width?: number | string;
  height?: number | string;
  /** text: one line · circle · block (default) */
  shape?: "block" | "text" | "circle";
}
export function Skeleton({ width, height, shape = "block", className, style, ...rest }: SkeletonProps) {
  return <div aria-hidden data-shape={shape} className={cx("sg-skeleton", className)} style={{ width, height, ...style }} {...rest} />;
}

/* ---------- Progress / Meter ---------- */
export interface ProgressProps extends Omit<React.ComponentPropsWithoutRef<typeof P.Root>, "value"> {
  /** 0–max. Leave undefined for an indeterminate bar. */
  value?: number | null;
  max?: number;
  tone?: Tone;
  size?: "sm" | "md" | "lg";
  /** Show the label/value row above the bar. */
  label?: ReactNode;
  showValue?: boolean;
  formatValue?: (value: number, max: number) => ReactNode;
}
export const Progress = forwardRef<HTMLDivElement, ProgressProps>(function Progress(
  { value = null, max = 100, tone = "aqua", size = "md", label, showValue, formatValue, className, ...rest }, ref,
) {
  const pct = value == null ? null : Math.max(0, Math.min(100, (value / max) * 100));
  const labelId = useId();
  const named = label != null && !rest["aria-label"] && !rest["aria-labelledby"];
  const bar = (
    <P.Root ref={ref} value={value} max={max} data-tone={tone} data-size={size} aria-labelledby={named ? labelId : undefined} className={cx("sg-progress sg-well", !label && !showValue && className)} {...rest}>
      <P.Indicator className="sg-progress-fill" data-indeterminate={pct == null ? "" : undefined} style={pct == null ? undefined : { width: `${pct}%` }} />
    </P.Root>
  );
  if (!label && !showValue) return bar;
  return (
    <div className={cx("sg-progress-field", className)}>
      <div className="sg-progress-row">
        <span id={labelId}>{label}</span>
        {showValue && value != null && <span className="sg-progress-value">{formatValue ? formatValue(value, max) : `${Math.round(pct!)}%`}</span>}
      </div>
      {bar}
    </div>
  );
});

/* ---------- EmptyState ---------- */
export interface EmptyStateProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  icon?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  tone?: Tone;
}
export function EmptyState({ icon, title, description, actions, tone = "lilac", className, ...rest }: EmptyStateProps) {
  return (
    <div className={cx("sg-empty", className)} {...rest}>
      {icon && <span className="sg-pebble sg-empty-icon" data-tone={tone} data-depth="md">{icon}</span>}
      <h3 className="sg-empty-title">{title}</h3>
      {description && <p className="sg-empty-description">{description}</p>}
      {actions && <div className="sg-empty-actions">{actions}</div>}
    </div>
  );
}

/* ---------- VisuallyHidden ---------- */
export function VisuallyHidden({ children }: { children: ReactNode }) {
  return <span className="sg-visually-hidden">{children}</span>;
}
