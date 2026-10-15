import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { Slot } from "radix-ui";
import { cx } from "../lib/cx";
import type { Size, Tone } from "../lib/types";
import { Spinner } from "./spinner";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** pebble: a raised stone (default) · soft: a flat tinted wash · ghost: no surface until hover · link: text only */
  variant?: "pebble" | "soft" | "ghost" | "link";
  tone?: Tone;
  size?: Size;
  /** Icon before the label. */
  icon?: ReactNode;
  /** Icon after the label. */
  iconEnd?: ReactNode;
  /** Shows a spinner, keeps the width, and blocks clicks. */
  loading?: boolean;
  fullWidth?: boolean;
  asChild?: boolean;
}

const DEPTH: Record<Size, string> = { sm: "sm", md: "md", lg: "md" };

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "pebble", tone = "clear", size = "md", icon, iconEnd, loading, fullWidth, asChild, className, children, disabled, type, ...rest }, ref,
) {
  const Comp = asChild ? Slot.Root : "button";
  const pebble = variant === "pebble";
  return (
    <Comp
      ref={ref}
      type={asChild ? undefined : type ?? "button"}
      data-tone={tone}
      data-depth={pebble ? DEPTH[size] : undefined}
      data-interactive={pebble ? "" : undefined}
      data-variant={variant}
      data-size={size}
      data-loading={loading ? "" : undefined}
      aria-busy={loading || undefined}
      disabled={asChild ? undefined : disabled || loading}
      data-disabled={disabled || loading ? "" : undefined}
      className={cx("sg-button", pebble && "sg-pebble", fullWidth && "sg-button-full", className)}
      {...rest}
    >
      {asChild ? children : (
        <>
          {loading && <span className="sg-button-spinner"><Spinner size={size === "sm" ? 14 : 18} /></span>}
          {icon && <span className="sg-button-icon" aria-hidden>{icon}</span>}
          {children != null && children !== false && <span className="sg-button-label">{children}</span>}
          {iconEnd && <span className="sg-button-icon" aria-hidden>{iconEnd}</span>}
        </>
      )}
    </Comp>
  );
});

export interface IconButtonProps extends Omit<ButtonProps, "icon" | "iconEnd" | "fullWidth" | "children"> {
  /** Accessible name — required, since there is no visible label. */
  "aria-label": string;
  children: ReactNode;
  /** circle (default) or rounded square */
  shape?: "circle" | "square";
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { shape = "circle", className, children, ...rest }, ref,
) {
  return (
    <Button ref={ref} className={cx("sg-icon-button", className)} data-shape={shape} {...rest}>
      {children}
    </Button>
  );
});

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Space between buttons. */
  gap?: "sm" | "md" | "lg";
}
export const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(function ButtonGroup({ gap = "md", className, ...rest }, ref) {
  return <div ref={ref} role="group" data-gap={gap} className={cx("sg-button-group", className)} {...rest} />;
});
