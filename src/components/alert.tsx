import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cx } from "../lib/cx";
import type { Tone } from "../lib/types";
import { AlertIcon, CheckCircle, InfoIcon, XIcon } from "../lib/icons";

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  tone?: Tone;
  /** soft: a flat tinted wash (default) · pebble: a raised stone */
  variant?: "soft" | "pebble";
  title?: ReactNode;
  /** Replaces the tone's icon. Pass false for none. */
  icon?: ReactNode | false;
  /** Buttons or links under the message. */
  actions?: ReactNode;
  /** Shows a close button. */
  onDismiss?: () => void;
  /** Label for the close button. @default "Dismiss" */
  dismissLabel?: string;
}

const ICON: Partial<Record<Tone, ReactNode>> = {
  success: <CheckCircle />, mint: <CheckCircle />, seafoam: <CheckCircle />,
  warning: <AlertIcon />, amber: <AlertIcon />, danger: <AlertIcon />, coral: <AlertIcon />, rose: <AlertIcon />,
};

/**
 * An inline message about the page or a section of it. Static by default: add role="alert"
 * (urgent) or role="status" (polite) when you insert it in response to something the user did.
 */
export const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  { tone = "info", variant = "soft", title, icon, actions, onDismiss, dismissLabel = "Dismiss", className, children, ...rest }, ref,
) {
  const glyph = icon === false ? null : icon ?? ICON[tone] ?? <InfoIcon />;
  return (
    <div
      ref={ref}
      data-tone={tone}
      data-variant={variant}
      data-depth={variant === "pebble" ? "sm" : undefined}
      className={cx("sg-alert", variant === "pebble" && "sg-pebble", className)}
      {...rest}
    >
      {glyph && <span className="sg-alert-icon" aria-hidden>{glyph}</span>}
      <div className="sg-alert-body">
        {title != null && <p className="sg-alert-title">{title}</p>}
        {children != null && <div className="sg-alert-description">{children}</div>}
        {actions && <div className="sg-alert-actions">{actions}</div>}
      </div>
      {onDismiss && (
        <button type="button" className="sg-alert-close" aria-label={dismissLabel} onClick={onDismiss}>
          <XIcon width={16} height={16} />
        </button>
      )}
    </div>
  );
});
