import { forwardRef, type ReactNode } from "react";
import { Dialog as D, AlertDialog as A } from "radix-ui";
import { cx } from "../lib/cx";
import { XIcon } from "../lib/icons";
import type { Tone } from "../lib/types";

/* ---------- Dialog ---------- */
export const Dialog = D.Root;
export const DialogTrigger = D.Trigger;
export const DialogClose = D.Close;

export interface DialogContentProps extends React.ComponentPropsWithoutRef<typeof D.Content> {
  size?: "sm" | "md" | "lg" | "xl" | "full";
  tone?: Tone;
  /** Hide the × button in the corner. */
  hideClose?: boolean;
}

/** A large pebble over a soft scrim. Focus is trapped; Esc and the scrim close it. */
export const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(function DialogContent(
  { size = "md", tone = "clear", hideClose, className, children, ...rest }, ref,
) {
  return (
    <D.Portal>
      <D.Overlay className="sg-overlay" />
      <D.Content ref={ref} data-size={size} data-tone={tone} data-depth="lg" className={cx("sg-dialog sg-pebble", className)} {...rest}>
        {children}
        {!hideClose && (
          <D.Close className="sg-dialog-close" aria-label="Close"><XIcon /></D.Close>
        )}
      </D.Content>
    </D.Portal>
  );
});

export function DialogHeader({ title, description, className }: { title: ReactNode; description?: ReactNode; className?: string }) {
  return (
    <div className={cx("sg-dialog-header", className)}>
      <D.Title className="sg-dialog-title">{title}</D.Title>
      {description ? <D.Description className="sg-dialog-description">{description}</D.Description> : <D.Description className="sg-visually-hidden">{typeof title === "string" ? title : ""}</D.Description>}
    </div>
  );
}
export const DialogTitle = D.Title;
export const DialogDescription = D.Description;
export const DialogBody = ({ className, ...rest }: React.HTMLAttributes<HTMLDivElement>) => <div className={cx("sg-dialog-body", className)} {...rest} />;
export const DialogFooter = ({ className, ...rest }: React.HTMLAttributes<HTMLDivElement>) => <div className={cx("sg-dialog-footer", className)} {...rest} />;

/* ---------- Sheet: a dialog that slides in from an edge ---------- */
export interface SheetContentProps extends DialogContentProps { side?: "left" | "right" | "top" | "bottom" }
export const Sheet = D.Root;
export const SheetTrigger = D.Trigger;
export const SheetClose = D.Close;
export const SheetContent = forwardRef<HTMLDivElement, SheetContentProps>(function SheetContent(
  { side = "right", size = "md", tone = "clear", hideClose, className, children, ...rest }, ref,
) {
  return (
    <D.Portal>
      <D.Overlay className="sg-overlay" />
      <D.Content ref={ref} data-side={side} data-size={size} data-tone={tone} data-depth="lg" className={cx("sg-sheet sg-pebble", className)} {...rest}>
        {children}
        {!hideClose && <D.Close className="sg-dialog-close" aria-label="Close"><XIcon /></D.Close>}
      </D.Content>
    </D.Portal>
  );
});

/* ---------- AlertDialog: confirm destructive or important actions ---------- */
export interface AlertDialogProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** The element that opens it. */
  trigger?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  confirmLabel?: ReactNode;
  cancelLabel?: ReactNode;
  /** danger paints the confirm button coral. */
  tone?: "danger" | "primary";
  onConfirm?: () => void | Promise<void>;
  icon?: ReactNode;
}

export function AlertDialog({ open, defaultOpen, onOpenChange, trigger, title, description, confirmLabel = "Confirm", cancelLabel = "Cancel", tone = "primary", onConfirm, icon }: AlertDialogProps) {
  return (
    <A.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      {trigger && <A.Trigger asChild>{trigger}</A.Trigger>}
      <A.Portal>
        <A.Overlay className="sg-overlay" />
        <A.Content data-size="sm" data-tone="clear" data-depth="lg" className="sg-dialog sg-pebble sg-alert-dialog">
          {icon && <span className="sg-alert-icon sg-pebble" data-tone={tone === "danger" ? "coral" : "periwinkle"} data-depth="sm">{icon}</span>}
          <div className="sg-dialog-header">
            <A.Title className="sg-dialog-title">{title}</A.Title>
            {description && <A.Description className="sg-dialog-description">{description}</A.Description>}
          </div>
          <div className="sg-dialog-footer">
            <A.Cancel className="sg-button sg-pebble" data-tone="clear" data-depth="md" data-interactive="" data-size="md" data-variant="pebble">
              <span className="sg-button-label">{cancelLabel}</span>
            </A.Cancel>
            <A.Action className="sg-button sg-pebble" data-tone={tone === "danger" ? "danger" : "primary"} data-depth="md" data-interactive="" data-size="md" data-variant="pebble" onClick={() => onConfirm?.()}>
              <span className="sg-button-label">{confirmLabel}</span>
            </A.Action>
          </div>
        </A.Content>
      </A.Portal>
    </A.Root>
  );
}
