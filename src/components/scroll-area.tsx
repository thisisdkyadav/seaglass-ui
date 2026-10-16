import { forwardRef } from "react";
import { ScrollArea as S } from "radix-ui";
import { cx } from "../lib/cx";

export interface ScrollAreaProps extends React.ComponentPropsWithoutRef<typeof S.Root> {
  /** Which scrollbars to draw. @default "vertical" */
  orientation?: "vertical" | "horizontal" | "both";
  /** Height or max height of the viewport, e.g. 240 or "50vh". */
  maxHeight?: number | string;
  /** Name the region when its content is not otherwise labelled. Makes it a focusable region. */
  "aria-label"?: string;
}

/**
 * A scroll container with slim glass scrollbars. Native scrolling, wheel, touch and keyboard
 * all keep working; only the bars are drawn by us.
 */
export const ScrollArea = forwardRef<HTMLDivElement, ScrollAreaProps>(function ScrollArea(
  { orientation = "vertical", maxHeight, type = "hover", className, style, children, "aria-label": label, ...rest }, ref,
) {
  const bars = orientation === "both" ? (["vertical", "horizontal"] as const) : [orientation];
  return (
    <S.Root ref={ref} type={type} className={cx("sg-scroll-area", className)} style={style} {...rest}>
      <S.Viewport
        className="sg-scroll-viewport"
        style={{ maxHeight }}
        // A labelled viewport is a region keyboard users can focus and scroll with the arrow keys.
        {...(label ? { role: "region", "aria-label": label, tabIndex: 0 } : {})}
      >
        {children}
      </S.Viewport>
      {bars.map((o) => (
        <S.Scrollbar key={o} orientation={o} className="sg-scrollbar">
          <S.Thumb className="sg-scroll-thumb" />
        </S.Scrollbar>
      ))}
      {orientation === "both" && <S.Corner className="sg-scroll-corner" />}
    </S.Root>
  );
});
