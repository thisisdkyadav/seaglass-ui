import { forwardRef } from "react";
import { Slider as S } from "radix-ui";
import { cx } from "../lib/cx";
import type { Tone } from "../lib/types";

export interface SliderProps extends React.ComponentPropsWithoutRef<typeof S.Root> {
  tone?: Tone;
  /** Accessible names for the thumbs (one per value). */
  thumbLabels?: string[];
}

/** A sunken track filled with tinted glass, with a pebble thumb per value. Supports ranges. */
export const Slider = forwardRef<HTMLSpanElement, SliderProps>(function Slider(
  { tone = "aqua", thumbLabels, "aria-label": ariaLabel, "aria-labelledby": ariaLabelledBy, className, ...rest }, ref,
) {
  const count = (rest.value ?? rest.defaultValue ?? [0]).length;
  // The thumbs carry role="slider", so the name has to live on them, not on the root.
  return (
    <S.Root ref={ref} data-tone={tone} className={cx("sg-slider", className)} {...rest}>
      <S.Track className="sg-slider-track sg-well">
        <S.Range className="sg-slider-range" />
      </S.Track>
      {Array.from({ length: count }, (_, i) => (
        <S.Thumb key={i} className="sg-slider-thumb sg-pebble" data-tone="clear" data-depth="xs" 
          aria-label={thumbLabels?.[i] ?? ariaLabel} aria-labelledby={thumbLabels?.[i] ? undefined : ariaLabelledBy} />
      ))}
    </S.Root>
  );
});
