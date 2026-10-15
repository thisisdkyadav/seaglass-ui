import { forwardRef, type ReactNode } from "react";
import { Tooltip as T } from "radix-ui";
import { cx } from "../lib/cx";
import { Kbd } from "./misc";

export const TooltipProvider = T.Provider;

export interface TooltipProps extends Omit<React.ComponentPropsWithoutRef<typeof T.Content>, "content"> {
  content: ReactNode;
  /** Shortcut shown after the text, e.g. "mod+k". */
  shortcut?: string;
  children: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  delayDuration?: number;
  /** Render nothing extra and just pass children through. */
  disabled?: boolean;
}

/** A small ink label. Wrap any focusable element. */
export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(function Tooltip(
  { content, shortcut, children, open, defaultOpen, onOpenChange, delayDuration = 300, disabled, side = "top", sideOffset = 8, className, ...rest }, ref,
) {
  if (disabled) return <>{children}</>;
  return (
    <T.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange} delayDuration={delayDuration}>
      <T.Trigger asChild>{children}</T.Trigger>
      <T.Portal>
        <T.Content ref={ref} side={side} sideOffset={sideOffset} className={cx("sg-tooltip", className)} {...rest}>
          {content}
          {shortcut && <Kbd keys={shortcut} className="sg-tooltip-kbd" />}
        </T.Content>
      </T.Portal>
    </T.Root>
  );
});
