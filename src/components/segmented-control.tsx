import { forwardRef, type ReactNode } from "react";
import { ToggleGroup as T } from "radix-ui";
import { cx } from "../lib/cx";
import type { Size, Tone } from "../lib/types";
import { CheckIcon } from "../lib/icons";
import { useControllableState } from "../hooks/use-controllable-state";

export interface SegmentedOption { value: string; label: ReactNode; icon?: ReactNode; disabled?: boolean }

export interface SegmentedControlProps {
  options: SegmentedOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  tone?: Tone;
  size?: Size;
  /** separate: one pebble per option (default) · joined: one pebble with a white chip on the selection */
  variant?: "separate" | "joined";
  /** Show a check mark on the selected pebble (separate variant). Default true. */
  showCheck?: boolean;
  "aria-label"?: string;
  className?: string;
}

/** Pick one of a few options. Arrow keys move between them. */
export const SegmentedControl = forwardRef<HTMLDivElement, SegmentedControlProps>(function SegmentedControl(
  { options, value, defaultValue, onValueChange, tone: toneProp, size = "md", variant = "separate", showCheck = true, className, ...rest }, ref,
) {
  const [current, setCurrent] = useControllableState({ value, defaultValue: defaultValue ?? options[0]?.value ?? "", onChange: onValueChange });
  const joined = variant === "joined";
  // separate pebbles default to mint; a joined tray stays clear so the white chip reads
  const tone = toneProp ?? (joined ? "clear" : "mint");
  return (
    <T.Root
      ref={ref}
      type="single"
      value={current}
      onValueChange={(v) => v && setCurrent(v)}
      data-tone={tone}
      data-variant={variant}
      data-size={size}
      data-depth={joined ? "md" : undefined}
      className={cx("sg-segmented", joined && "sg-pebble", className)}
      {...rest}
    >
      {options.map((o) => {
        const on = o.value === current;
        return (
          <T.Item
            key={o.value}
            value={o.value}
            disabled={o.disabled}
            data-tone={joined ? undefined : tone}
            data-depth={joined ? undefined : size === "sm" ? "sm" : "md"}
            data-interactive={joined ? undefined : ""}
            className={cx("sg-segment", !joined && "sg-pebble", joined && on && "sg-chip-surface")}
          >
            {!joined && showCheck && on && <CheckIcon width={16} height={16} strokeWidth={2.6} />}
            {o.icon}
            <span>{o.label}</span>
          </T.Item>
        );
      })}
    </T.Root>
  );
});
