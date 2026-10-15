import { forwardRef, type HTMLAttributes } from "react";
import { Slot } from "radix-ui";
import { cx } from "../lib/cx";
import type { Depth, Tone } from "../lib/types";

export interface PebbleProps extends HTMLAttributes<HTMLDivElement> {
  tone?: Tone;
  depth?: Depth;
  /** Corner radius: a token name or any CSS length. */
  radius?: "sm" | "md" | "lg" | "xl" | "full" | (string & {});
  /** Lift on hover, sink on press. */
  interactive?: boolean;
  /** Render as the child element instead of a div. */
  asChild?: boolean;
}

const RADII = new Set(["sm", "md", "lg", "xl", "full"]);

/**
 * The raw material: any surface as a frosted sea-glass pebble.
 * Every other surface in the library is built on the same .sg-pebble class.
 */
export const Pebble = forwardRef<HTMLDivElement, PebbleProps>(function Pebble(
  { tone = "clear", depth = "lg", radius, interactive, asChild, className, style, ...rest }, ref,
) {
  const Comp = asChild ? Slot.Root : "div";
  const r = radius == null ? undefined : RADII.has(radius) ? `var(--sg-radius-${radius})` : radius;
  return (
    <Comp
      ref={ref}
      data-tone={tone}
      data-depth={depth}
      data-interactive={interactive ? "" : undefined}
      className={cx("sg-pebble", className)}
      style={r ? { ...style, ["--sg-r" as string]: r } : style}
      {...rest}
    />
  );
});
