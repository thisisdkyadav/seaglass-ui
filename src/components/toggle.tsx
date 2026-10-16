import { forwardRef, type ReactNode } from "react";
import { Toggle as T, ToggleGroup as TG } from "radix-ui";
import { cx } from "../lib/cx";
import type { Size, Tone } from "../lib/types";

export interface ToggleProps extends React.ComponentPropsWithoutRef<typeof T.Root> {
  tone?: Tone;
  size?: Size;
  /** ghost: no surface until pressed (default) · soft: a tinted wash that deepens when pressed */
  variant?: "ghost" | "soft";
  /** Icon before the label. */
  icon?: ReactNode;
}

/** A button that stays pressed: bold, italic, pin, mute. Sets aria-pressed. */
export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(function Toggle(
  { tone = "clear", size = "md", variant = "ghost", icon, className, children, ...rest }, ref,
) {
  return (
    <T.Root
      ref={ref}
      data-tone={tone}
      data-size={size}
      data-variant={variant}
      className={cx("sg-toggle", children == null && "sg-toggle-icon-only", className)}
      {...rest}
    >
      {icon && <span className="sg-toggle-icon" aria-hidden>{icon}</span>}
      {children}
    </T.Root>
  );
});

type ToggleGroupBase = {
  tone?: Tone;
  size?: Size;
  variant?: "ghost" | "soft";
  /** joined: one tray, items share edges (default) · separate: spaced out */
  layout?: "joined" | "separate";
  className?: string;
  children: ReactNode;
};
export type ToggleGroupProps = ToggleGroupBase & (
  | Omit<React.ComponentPropsWithoutRef<typeof TG.Root> & { type: "single" }, keyof ToggleGroupBase>
  | Omit<React.ComponentPropsWithoutRef<typeof TG.Root> & { type: "multiple" }, keyof ToggleGroupBase>
);

/**
 * A row of toggles. type="single" behaves like a radio group that can be emptied;
 * type="multiple" lets any combination be pressed. Arrow keys move between items.
 */
export const ToggleGroup = forwardRef<HTMLDivElement, ToggleGroupProps>(function ToggleGroup(
  { tone = "clear", size = "md", variant = "ghost", layout = "joined", className, ...rest }, ref,
) {
  return (
    <TG.Root
      ref={ref}
      data-tone={tone}
      data-size={size}
      data-variant={variant}
      data-layout={layout}
      className={cx("sg-toggle-group", layout === "joined" && "sg-well", className)}
      {...(rest as React.ComponentPropsWithoutRef<typeof TG.Root>)}
    />
  );
});

export interface ToggleGroupItemProps extends React.ComponentPropsWithoutRef<typeof TG.Item> {
  icon?: ReactNode;
}

export const ToggleGroupItem = forwardRef<HTMLButtonElement, ToggleGroupItemProps>(function ToggleGroupItem(
  { icon, className, children, ...rest }, ref,
) {
  return (
    <TG.Item ref={ref} className={cx("sg-toggle", children == null && "sg-toggle-icon-only", className)} {...rest}>
      {icon && <span className="sg-toggle-icon" aria-hidden>{icon}</span>}
      {children}
    </TG.Item>
  );
});
