import { forwardRef, type CSSProperties, type HTMLAttributes } from "react";
import { Slot } from "radix-ui";
import { cx } from "../lib/cx";

/** A step on the spacing scale (--sg-space-N), or any CSS length. */
export type Space = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | (string & {});
const space = (v: Space | undefined) => (v == null ? undefined : typeof v === "number" ? (v === 0 ? "0" : `var(--sg-space-${v})`) : v);

type Align = "start" | "center" | "end" | "stretch" | "baseline";
type Justify = "start" | "center" | "end" | "between" | "around" | "evenly";
const JUSTIFY: Record<Justify, string> = { start: "flex-start", center: "center", end: "flex-end", between: "space-between", around: "space-around", evenly: "space-evenly" };
const ALIGN: Record<Align, string> = { start: "flex-start", center: "center", end: "flex-end", stretch: "stretch", baseline: "baseline" };

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  /** column (default) or row. */
  direction?: "column" | "row" | "column-reverse" | "row-reverse";
  /** @default 3 */
  gap?: Space;
  align?: Align;
  justify?: Justify;
  wrap?: boolean;
  /** Render the child element instead of a div. */
  asChild?: boolean;
}

/** Lays children out in a row or a column with even gaps. */
export const Stack = forwardRef<HTMLDivElement, StackProps>(function Stack(
  { direction = "column", gap = 3, align, justify, wrap, asChild, className, style, ...rest }, ref,
) {
  const Comp = asChild ? Slot.Root : "div";
  const s: CSSProperties = {
    flexDirection: direction, gap: space(gap),
    alignItems: align && ALIGN[align], justifyContent: justify && JUSTIFY[justify], flexWrap: wrap ? "wrap" : undefined, ...style,
  };
  return <Comp ref={ref} className={cx("sg-stack", className)} style={s} {...rest} />;
});

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  /** A column count, or a CSS grid-template-columns value. */
  columns?: number | string;
  /** Fit as many columns of at least this width as there is room for, e.g. 240 or "16rem". Overrides columns. */
  minColumnWidth?: number | string;
  /** @default 4 */
  gap?: Space;
  rowGap?: Space;
  align?: Align;
  asChild?: boolean;
}

/** A CSS grid. With minColumnWidth it reflows on its own, without media queries. */
export const Grid = forwardRef<HTMLDivElement, GridProps>(function Grid(
  { columns, minColumnWidth, gap = 4, rowGap, align, asChild, className, style, ...rest }, ref,
) {
  const Comp = asChild ? Slot.Root : "div";
  const min = typeof minColumnWidth === "number" ? `${minColumnWidth}px` : minColumnWidth;
  const template = min
    ? `repeat(auto-fill, minmax(min(${min}, 100%), 1fr))`
    : typeof columns === "number" ? `repeat(${columns}, minmax(0, 1fr))` : columns;
  const s: CSSProperties = { gridTemplateColumns: template, gap: space(gap), rowGap: space(rowGap), alignItems: align && ALIGN[align], ...style };
  return <Comp ref={ref} className={cx("sg-grid", className)} style={s} {...rest} />;
});
