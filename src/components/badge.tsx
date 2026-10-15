import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cx } from "../lib/cx";
import type { Tone } from "../lib/types";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
  /** soft: tinted wash with an inner glow (default) · pebble: a tiny raised stone · outline · solid: deep ink fill */
  variant?: "soft" | "pebble" | "outline" | "solid";
  size?: "sm" | "md";
  /** A coloured dot before the label. */
  dot?: boolean;
  icon?: ReactNode;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { tone = "neutral", variant = "soft", size = "md", dot, icon, className, children, ...rest }, ref,
) {
  return (
    <span
      ref={ref}
      data-tone={tone}
      data-variant={variant}
      data-size={size}
      data-depth={variant === "pebble" ? "xs" : undefined}
      className={cx("sg-badge", variant === "pebble" && "sg-pebble", className)}
      {...rest}
    >
      {dot && <span className="sg-badge-dot" aria-hidden />}
      {icon && <span className="sg-badge-icon" aria-hidden>{icon}</span>}
      {children}
    </span>
  );
});

export interface CountProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
  /** Cap the number, e.g. max 99 shows "99+". */
  max?: number;
  value: number;
}

/** A small numeric counter for nav items, tabs and icons. */
export const Count = forwardRef<HTMLSpanElement, CountProps>(function Count({ tone = "rose", max = 99, value, className, ...rest }, ref) {
  return (
    <span ref={ref} data-tone={tone} className={cx("sg-count", className)} {...rest}>
      {value > max ? `${max}+` : value}
    </span>
  );
});
