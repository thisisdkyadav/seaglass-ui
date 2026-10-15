import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { Slot } from "radix-ui";
import { cx } from "../lib/cx";
import type { Depth, Tone } from "../lib/types";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  tone?: Tone;
  depth?: Depth;
  /** Inner spacing. */
  padding?: "none" | "sm" | "md" | "lg";
  /** Lift on hover — for cards that are links or buttons. */
  interactive?: boolean;
  asChild?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { tone = "clear", depth = "lg", padding = "md", interactive, asChild, className, ...rest }, ref,
) {
  const Comp = asChild ? Slot.Root : "div";
  return (
    <Comp
      ref={ref}
      data-tone={tone}
      data-depth={depth}
      data-padding={padding}
      data-interactive={interactive ? "" : undefined}
      className={cx("sg-card sg-pebble", className)}
      {...rest}
    />
  );
});

export interface CardHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  title?: ReactNode;
  description?: ReactNode;
  /** Right-aligned actions (buttons, a menu, a legend). */
  actions?: ReactNode;
  icon?: ReactNode;
}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(function CardHeader(
  { title, description, actions, icon, className, children, ...rest }, ref,
) {
  return (
    <div ref={ref} className={cx("sg-card-header", className)} {...rest}>
      {icon && <span className="sg-card-icon" aria-hidden>{icon}</span>}
      <div className="sg-card-titles">
        {title != null && <h3 className="sg-card-title">{title}</h3>}
        {description != null && <p className="sg-card-description">{description}</p>}
        {children}
      </div>
      {actions && <div className="sg-card-actions">{actions}</div>}
    </div>
  );
});

export const CardBody = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function CardBody({ className, ...rest }, ref) {
  return <div ref={ref} className={cx("sg-card-body", className)} {...rest} />;
});

export const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function CardFooter({ className, ...rest }, ref) {
  return <div ref={ref} className={cx("sg-card-footer", className)} {...rest} />;
});
