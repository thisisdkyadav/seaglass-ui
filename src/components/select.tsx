import { forwardRef, type ReactNode } from "react";
import { Select as S } from "radix-ui";
import { cx } from "../lib/cx";
import { CheckIcon, ChevronDown } from "../lib/icons";
import { useFieldControlProps } from "./field";

export interface SelectOption { value: string; label: ReactNode; icon?: ReactNode; description?: ReactNode; disabled?: boolean }
export interface SelectGroup { label: ReactNode; options: SelectOption[] }

export interface SelectProps extends Omit<React.ComponentPropsWithoutRef<typeof S.Root>, "children"> {
  /** Flat options or labelled groups. Or pass <SelectItem> children. */
  options?: Array<SelectOption | SelectGroup>;
  placeholder?: ReactNode;
  size?: "sm" | "md" | "lg";
  invalid?: boolean;
  id?: string;
  className?: string;
  "aria-label"?: string;
  children?: ReactNode;
}

const isGroup = (o: SelectOption | SelectGroup): o is SelectGroup => "options" in o;

/** A sunken field that opens a pebble list. Type-ahead, arrow keys, Home/End all work. */
export const Select = forwardRef<HTMLButtonElement, SelectProps>(function Select(
  { options, placeholder = "Select…", size = "md", invalid, id, className, children, "aria-label": ariaLabel, ...rest }, ref,
) {
  const control = useFieldControlProps({ id, disabled: rest.disabled, required: rest.required, "aria-invalid": invalid });
  return (
    <S.Root {...rest} disabled={control.disabled}>
      <S.Trigger
        ref={ref}
        id={control.id}
        aria-label={ariaLabel}
        aria-invalid={control["aria-invalid"]}
        aria-describedby={control["aria-describedby"]}
        data-size={size}
        className={cx("sg-select-trigger sg-well", className)}
      >
        <S.Value placeholder={placeholder} />
        <S.Icon className="sg-select-icon"><ChevronDown width={16} height={16} /></S.Icon>
      </S.Trigger>
      <S.Portal>
        <S.Content className="sg-select-content sg-pebble sg-popover-surface" data-tone="clear" data-depth="md" position="popper" sideOffset={8}>
          <S.Viewport className="sg-select-viewport">
            {options?.map((o, i) =>
              isGroup(o) ? (
                <S.Group key={i}>
                  <S.Label className="sg-menu-label">{o.label}</S.Label>
                  {o.options.map((x) => <SelectItem key={x.value} {...x} />)}
                </S.Group>
              ) : (
                <SelectItem key={o.value} {...o} />
              ),
            )}
            {children}
          </S.Viewport>
        </S.Content>
      </S.Portal>
    </S.Root>
  );
});

export function SelectItem({ value, label, icon, description, disabled }: SelectOption) {
  return (
    <S.Item value={value} disabled={disabled} className="sg-menu-item sg-select-item">
      {icon && <span className="sg-menu-icon" aria-hidden>{icon}</span>}
      <span className="sg-menu-text">
        <S.ItemText>{label}</S.ItemText>
        {description && <span className="sg-menu-description">{description}</span>}
      </span>
      <S.ItemIndicator className="sg-menu-check"><CheckIcon width={16} height={16} /></S.ItemIndicator>
    </S.Item>
  );
}
export const SelectSeparator = () => <S.Separator className="sg-menu-separator" />;
