import { useMemo, useState, type ReactNode } from "react";
import { Popover as P } from "radix-ui";
import { cx } from "../lib/cx";
import { CheckIcon, ChevronsUpDown, XIcon } from "../lib/icons";
import { useControllableState } from "../hooks/use-controllable-state";
import { useFieldControlProps } from "./field";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./command";

export interface ComboboxOption { value: string; label: string; icon?: ReactNode; description?: ReactNode; group?: string; keywords?: string[]; disabled?: boolean }

interface Common {
  options: ComboboxOption[];
  placeholder?: string;
  searchPlaceholder?: string;
  empty?: ReactNode;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  invalid?: boolean;
  id?: string;
  className?: string;
  "aria-label"?: string;
  /** Offer "Create “query”" when nothing matches. */
  onCreate?: (query: string) => void;
}
export interface ComboboxSingleProps extends Common { multiple?: false; value?: string | null; defaultValue?: string | null; onValueChange?: (v: string | null) => void }
export interface ComboboxMultiProps extends Common { multiple: true; value?: string[]; defaultValue?: string[]; onValueChange?: (v: string[]) => void; /** chips shown before "+N" */ maxChips?: number }
export type ComboboxProps = ComboboxSingleProps | ComboboxMultiProps;

/** A searchable select. Single or multiple, grouped options, optional "create". */
export function Combobox(props: ComboboxProps) {
  const { options, placeholder = "Select…", searchPlaceholder = "Search…", empty = "No matches.", size = "md", invalid, id, className, onCreate } = props;
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const control = useFieldControlProps({ id, disabled: props.disabled, "aria-invalid": invalid });

  const [single, setSingle] = useControllableState<string | null>({
    value: props.multiple ? undefined : props.value, defaultValue: props.multiple ? null : props.defaultValue ?? null,
    onChange: props.multiple ? undefined : props.onValueChange,
  });
  const [multi, setMulti] = useControllableState<string[]>({
    value: props.multiple ? props.value : undefined, defaultValue: props.multiple ? props.defaultValue ?? [] : [],
    onChange: props.multiple ? props.onValueChange : undefined,
  });
  const selected = props.multiple ? multi : single ? [single] : [];
  const byValue = useMemo(() => new Map(options.map((o) => [o.value, o])), [options]);
  const groups = useMemo(() => {
    const m = new Map<string, ComboboxOption[]>();
    options.forEach((o) => { const g = o.group ?? ""; m.set(g, [...(m.get(g) ?? []), o]); });
    return [...m];
  }, [options]);

  const pick = (v: string) => {
    if (props.multiple) setMulti((cur) => (cur.includes(v) ? cur.filter((x) => x !== v) : [...cur, v]));
    else { setSingle(v === single ? null : v); setOpen(false); }
    setQuery("");
  };

  const maxChips = props.multiple ? props.maxChips ?? 3 : 0;
  const display = props.multiple ? (
    multi.length ? (
      <span className="sg-combobox-chips">
        {multi.slice(0, maxChips).map((v) => (
          <span key={v} className="sg-combobox-chip sg-chip-surface">
            {byValue.get(v)?.label ?? v}
            <span role="button" tabIndex={-1} aria-label={`Remove ${byValue.get(v)?.label ?? v}`} onPointerDown={(e) => { e.preventDefault(); e.stopPropagation(); pick(v); }}><XIcon width={12} height={12} strokeWidth={3} /></span>
          </span>
        ))}
        {multi.length > maxChips && <span className="sg-combobox-more">+{multi.length - maxChips}</span>}
      </span>
    ) : <span className="sg-combobox-placeholder">{placeholder}</span>
  ) : single ? <span className="sg-combobox-value">{byValue.get(single)?.icon}{byValue.get(single)?.label ?? single}</span> : <span className="sg-combobox-placeholder">{placeholder}</span>;

  return (
    <P.Root open={open} onOpenChange={setOpen}>
      <P.Trigger
        id={control.id}
        disabled={control.disabled}
        role="combobox"
        aria-expanded={open}
        aria-label={props["aria-label"]}
        aria-invalid={control["aria-invalid"]}
        aria-describedby={control["aria-describedby"]}
        data-size={size}
        className={cx("sg-select-trigger sg-combobox-trigger sg-well", className)}
      >
        {display}
        <ChevronsUpDown className="sg-select-icon" width={16} height={16} />
      </P.Trigger>
      <P.Portal>
        <P.Content aria-label="Options" className="sg-combobox-content sg-pebble sg-popover-surface" data-tone="clear" data-depth="md" sideOffset={8} align="start">
          <Command loop>
            <CommandInput placeholder={searchPlaceholder} value={query} onValueChange={setQuery} />
            <CommandList>
              <CommandEmpty>
                {onCreate && query ? (
                  <button type="button" className="sg-menu-item sg-combobox-create" onClick={() => { onCreate(query); setQuery(""); }}>Create “{query}”</button>
                ) : empty}
              </CommandEmpty>
              {groups.map(([g, opts]) => (
                <CommandGroup key={g || "_"} heading={g || undefined}>
                  {opts.map((o) => (
                    <CommandItem key={o.value} value={o.value} keywords={[o.label, ...(o.keywords ?? [])]} disabled={o.disabled} icon={o.icon} description={o.description} trailing={selected.includes(o.value) ? <CheckIcon className="sg-menu-check" width={16} height={16} /> : null} onSelect={() => pick(o.value)}>
                      {o.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))}
            </CommandList>
          </Command>
        </P.Content>
      </P.Portal>
    </P.Root>
  );
}
