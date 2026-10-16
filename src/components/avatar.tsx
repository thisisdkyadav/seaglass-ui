import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { Avatar as A } from "radix-ui";
import { cx } from "../lib/cx";
import { toneFor, type Tone } from "../lib/types";

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  /** Used for the initials fallback, the alt text and the default tone. */
  name: string;
  src?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  tone?: Tone;
  shape?: "circle" | "square";
  /** Presence dot. */
  status?: "online" | "away" | "busy" | "offline";
  /** Custom fallback instead of initials (an icon, say). */
  fallback?: ReactNode;
}

export function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] ?? "") + (parts.length > 1 ? parts[parts.length - 1][0] : "")).toUpperCase();
}

const DEPTH = { xs: "xs", sm: "xs", md: "sm", lg: "sm", xl: "md" } as const;

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(function Avatar(
  { name, src, size = "md", tone, shape = "circle", status, fallback, className, ...rest }, ref,
) {
  return (
    <A.Root
      ref={ref}
      data-tone={tone ?? toneFor(name)}
      data-depth={DEPTH[size]}
      data-size={size}
      data-shape={shape}
      className={cx("sg-avatar sg-pebble", className)}
      {...rest}
    >
      {src && <A.Image className="sg-avatar-img" src={src} alt={name} />}
      <A.Fallback className="sg-avatar-fallback" delayMs={src ? 400 : 0} aria-label={src ? undefined : name}>
        {fallback ?? initials(name)}
      </A.Fallback>
      {status && <span className="sg-avatar-status" data-status={status} role="img" aria-label={status[0].toUpperCase() + status.slice(1)} />}
    </A.Root>
  );
});

export interface AvatarGroupProps extends HTMLAttributes<HTMLDivElement> {
  /** Show at most this many; the rest collapse into "+N". */
  max?: number;
  size?: AvatarProps["size"];
  children: ReactNode;
}

export function AvatarGroup({ max = 4, size = "sm", className, children, ...rest }: AvatarGroupProps) {
  const items = (Array.isArray(children) ? children : [children]).flat().filter(Boolean);
  const shown = items.slice(0, max);
  const extra = items.length - shown.length;
  return (
    <div className={cx("sg-avatar-group", className)} data-size={size} {...rest}>
      {shown}
      {extra > 0 && (
        <span className="sg-avatar sg-pebble sg-avatar-more" data-tone="clear" data-depth="xs" data-size={size} data-shape="circle">
          <span className="sg-avatar-fallback">+{extra}</span>
        </span>
      )}
    </div>
  );
}
