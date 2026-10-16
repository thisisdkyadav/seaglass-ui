import { forwardRef, type ReactNode } from "react";
import { Checkbox as C, RadioGroup as R, Switch as S } from "radix-ui";
import { cx } from "../lib/cx";
import type { Tone } from "../lib/types";
import { CheckIcon, MinusIcon } from "../lib/icons";
import { useFieldControlProps } from "./field";

/* ---------- Checkbox: a small clear stone that turns tinted when checked ---------- */
export interface CheckboxProps extends React.ComponentPropsWithoutRef<typeof C.Root> {
  tone?: Tone;
  /** Inline label after the box (to the right in LTR, left in RTL). */
  label?: ReactNode;
  description?: ReactNode;
}

export const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(function Checkbox(
  { tone = "mint", label, description, className, ...rest }, ref,
) {
  const control = useFieldControlProps(rest);
  const box = (
    <C.Root ref={ref} data-tone={tone} className={cx("sg-checkbox", !label && className)} {...rest} {...control}>
      <C.Indicator className="sg-checkbox-indicator" forceMount>
        {rest.checked === "indeterminate" ? <MinusIcon width={12} height={12} strokeWidth={3} /> : <CheckIcon width={13} height={13} strokeWidth={3} />}
      </C.Indicator>
    </C.Root>
  );
  if (!label) return box;
  return (
    <label className={cx("sg-choice", className)} data-disabled={control.disabled ? "" : undefined}>
      {box}
      <span className="sg-choice-text">
        <span className="sg-choice-label">{label}</span>
        {description && <span className="sg-choice-description">{description}</span>}
      </span>
    </label>
  );
});

/* ---------- RadioGroup ---------- */
export interface RadioGroupProps extends React.ComponentPropsWithoutRef<typeof R.Root> { tone?: Tone }
export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(function RadioGroup({ tone = "periwinkle", className, ...rest }, ref) {
  return <R.Root ref={ref} data-tone={tone} className={cx("sg-radio-group", className)} {...rest} />;
});

export interface RadioProps extends React.ComponentPropsWithoutRef<typeof R.Item> { label?: ReactNode; description?: ReactNode }
export const Radio = forwardRef<HTMLButtonElement, RadioProps>(function Radio({ label, description, className, ...rest }, ref) {
  const item = (
    <R.Item ref={ref} className={cx("sg-radio", !label && className)} {...rest}>
      <R.Indicator className="sg-radio-indicator" />
    </R.Item>
  );
  if (!label) return item;
  return (
    <label className={cx("sg-choice", className)} data-disabled={rest.disabled ? "" : undefined}>
      {item}
      <span className="sg-choice-text">
        <span className="sg-choice-label">{label}</span>
        {description && <span className="sg-choice-description">{description}</span>}
      </span>
    </label>
  );
});

/* ---------- Switch: a sunken track with a white pebble thumb ---------- */
export interface SwitchProps extends React.ComponentPropsWithoutRef<typeof S.Root> {
  tone?: Tone;
  size?: "sm" | "md";
  label?: ReactNode;
  description?: ReactNode;
}
export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(function Switch({ tone = "mint", size = "md", label, description, className, ...rest }, ref) {
  const control = useFieldControlProps(rest);
  const sw = (
    <S.Root ref={ref} data-tone={tone} data-size={size} className={cx("sg-switch", !label && className)} {...rest} {...control}>
      <S.Thumb className="sg-switch-thumb" />
    </S.Root>
  );
  if (!label) return sw;
  return (
    <label className={cx("sg-choice sg-choice-switch", className)} data-disabled={control.disabled ? "" : undefined}>
      <span className="sg-choice-text">
        <span className="sg-choice-label">{label}</span>
        {description && <span className="sg-choice-description">{description}</span>}
      </span>
      {sw}
    </label>
  );
});
