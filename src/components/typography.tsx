import { forwardRef, type AnchorHTMLAttributes, type HTMLAttributes } from "react";
import { Slot } from "radix-ui";
import { cx } from "../lib/cx";
import type { Tone } from "../lib/types";

type TextSize = "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

export interface TextProps extends HTMLAttributes<HTMLElement> {
  /** @default "p" */
  as?: "p" | "span" | "div" | "label" | "strong" | "em" | "small";
  size?: TextSize;
  /** default: body ink · muted: secondary text · faint: hints and metadata. All meet AA contrast. */
  color?: "default" | "muted" | "faint";
  weight?: "regular" | "medium" | "strong" | "bold";
  align?: "start" | "center" | "end";
  /** Cut off with an ellipsis. true = one line; a number clamps to that many lines. */
  truncate?: boolean | number;
  /** Tabular, monospaced digits for numbers that line up. */
  numeric?: boolean;
  asChild?: boolean;
}

/** Body text on the type scale. */
export const Text = forwardRef<HTMLElement, TextProps>(function Text(
  { as: Tag = "p", size, color = "default", weight, align, truncate, numeric, asChild, className, style, ...rest }, ref,
) {
  const Comp = (asChild ? Slot.Root : Tag) as "p";
  const lines = typeof truncate === "number" ? truncate : undefined;
  return (
    <Comp
      ref={ref as React.Ref<HTMLParagraphElement>}
      className={cx("sg-text", className)}
      data-size={size}
      data-color={color === "default" ? undefined : color}
      data-weight={weight}
      data-align={align}
      data-truncate={truncate ? (lines && lines > 1 ? "lines" : "") : undefined}
      data-numeric={numeric ? "" : undefined}
      style={lines && lines > 1 ? { ...style, WebkitLineClamp: lines } : style}
      {...rest}
    />
  );
});

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  /** The element: h1 to h6. Pick it from the page outline, and the look with size. @default 2 */
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  /** Visual size, independent of level. Defaults to a size that matches the level. */
  size?: TextSize | "3xl";
  align?: "start" | "center" | "end";
  asChild?: boolean;
}

const LEVEL_SIZE = { 1: "3xl", 2: "2xl", 3: "xl", 4: "lg", 5: "md", 6: "sm" } as const;

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(function Heading(
  { level = 2, size, align, asChild, className, ...rest }, ref,
) {
  const Comp = (asChild ? Slot.Root : (`h${level}` as const)) as "h2";
  return <Comp ref={ref} className={cx("sg-heading", className)} data-size={size ?? LEVEL_SIZE[level]} data-align={align} {...rest} />;
});

export interface TextLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  tone?: Tone;
  /** always: underlined (default, best inside prose) · hover: underline on hover only · none */
  underline?: "always" | "hover" | "none";
  /** Render your router's link instead: <Link asChild><RouterLink to="/" /></Link> */
  asChild?: boolean;
  /** Opens in a new tab with rel="noopener noreferrer". */
  external?: boolean;
}

/** A text link. Inherits the font size around it. */
export const Link = forwardRef<HTMLAnchorElement, TextLinkProps>(function Link(
  { tone = "primary", underline = "always", asChild, external, className, target, rel, ...rest }, ref,
) {
  const Comp = asChild ? Slot.Root : "a";
  return (
    <Comp
      ref={ref}
      data-tone={tone}
      data-underline={underline}
      className={cx("sg-link", className)}
      target={external ? "_blank" : target}
      rel={external ? "noopener noreferrer" : rel}
      {...rest}
    />
  );
});
