import { forwardRef } from "react";
import { Popover as P, HoverCard as H } from "radix-ui";
import { cx } from "../lib/cx";
import type { Tone } from "../lib/types";

export const Popover = P.Root;
export const PopoverTrigger = P.Trigger;
export const PopoverAnchor = P.Anchor;
export const PopoverClose = P.Close;

export interface PopoverContentProps extends React.ComponentPropsWithoutRef<typeof P.Content> { tone?: Tone; padding?: "none" | "sm" | "md" }

/** A floating pebble. Focus moves in, Esc and outside clicks close it. */
export const PopoverContent = forwardRef<HTMLDivElement, PopoverContentProps>(function PopoverContent(
  { tone = "clear", padding = "md", sideOffset = 10, align = "start", className, ...rest }, ref,
) {
  return (
    <P.Portal>
      <P.Content ref={ref} sideOffset={sideOffset} align={align} data-tone={tone} data-depth="md" data-padding={padding} className={cx("sg-popover sg-pebble sg-popover-surface", className)} {...rest} />
    </P.Portal>
  );
});

export const HoverCard = H.Root;
export const HoverCardTrigger = H.Trigger;
export const HoverCardContent = forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof H.Content> & { tone?: Tone }>(function HoverCardContent(
  { tone = "clear", sideOffset = 10, className, ...rest }, ref,
) {
  return (
    <H.Portal>
      <H.Content ref={ref} sideOffset={sideOffset} data-tone={tone} data-depth="md" data-padding="md" className={cx("sg-popover sg-pebble sg-popover-surface", className)} {...rest} />
    </H.Portal>
  );
});
