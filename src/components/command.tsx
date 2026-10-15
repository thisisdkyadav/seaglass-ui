import { forwardRef, type ReactNode } from "react";
import { Command as K } from "cmdk";
import { Dialog as D } from "radix-ui";
import { cx } from "../lib/cx";
import { SearchIcon } from "../lib/icons";
import { Kbd } from "./misc";
import { useHotkeys } from "../hooks/use-hotkeys";

/* ============================================================
   Command: a filterable, keyboard-first list (cmdk under the hood).
   CommandPalette: the same inside a dialog, opened with ⌘K / Ctrl+K.
   ============================================================ */
export const Command = forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof K>>(function Command({ className, ...rest }, ref) {
  return <K ref={ref} className={cx("sg-command", className)} {...rest} />;
});

export const CommandInput = forwardRef<HTMLInputElement, React.ComponentPropsWithoutRef<typeof K.Input>>(function CommandInput({ className, ...rest }, ref) {
  return (
    <div className="sg-command-input sg-well">
      <SearchIcon className="sg-command-search" />
      <K.Input ref={ref} className={cx("sg-command-input-el", className)} {...rest} />
    </div>
  );
});

export const CommandList = forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof K.List>>(function CommandList({ className, ...rest }, ref) {
  return <K.List ref={ref} className={cx("sg-command-list", className)} {...rest} />;
});

export const CommandEmpty = forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof K.Empty>>(function CommandEmpty({ className, ...rest }, ref) {
  return <K.Empty ref={ref} className={cx("sg-command-empty", className)} {...rest} />;
});

export const CommandGroup = forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof K.Group>>(function CommandGroup({ className, ...rest }, ref) {
  return <K.Group ref={ref} className={cx("sg-command-group", className)} {...rest} />;
});

export const CommandSeparator = forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof K.Separator>>(function CommandSeparator({ className, ...rest }, ref) {
  return <K.Separator ref={ref} className={cx("sg-menu-separator", className)} {...rest} />;
});

export interface CommandItemProps extends React.ComponentPropsWithoutRef<typeof K.Item> { icon?: ReactNode; shortcut?: string; description?: ReactNode; trailing?: ReactNode }
export const CommandItem = forwardRef<HTMLDivElement, CommandItemProps>(function CommandItem({ icon, shortcut, description, trailing, className, children, ...rest }, ref) {
  return (
    <K.Item ref={ref} className={cx("sg-menu-item sg-command-item", className)} {...rest}>
      {icon && <span className="sg-menu-icon" aria-hidden>{icon}</span>}
      <span className="sg-menu-text">
        <span>{children}</span>
        {description && <span className="sg-menu-description">{description}</span>}
      </span>
      {shortcut && <Kbd keys={shortcut} className="sg-menu-shortcut" />}
      {trailing}
    </K.Item>
  );
});

export interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Shortcut that toggles it. Default "mod+k". false disables. */
  hotkey?: string | false;
  placeholder?: string;
  /** Shown when nothing matches. */
  empty?: ReactNode;
  /** Text under the list; defaults to navigation hints. */
  footer?: ReactNode;
  children: ReactNode;
  /** Custom filter; cmdk's fuzzy ranking by default. */
  filter?: (value: string, search: string, keywords?: string[]) => number;
}

export function CommandPalette({ open, onOpenChange, hotkey = "mod+k", placeholder = "Type a command or search…", empty = "No results.", footer, children, filter }: CommandPaletteProps) {
  useHotkeys(hotkey || "", () => onOpenChange(!open), { enabled: !!hotkey, enableInInputs: true });
  return (
    <D.Root open={open} onOpenChange={onOpenChange}>
      <D.Portal>
        <D.Overlay className="sg-overlay" />
        <D.Content className="sg-palette sg-pebble" data-tone="clear" data-depth="lg" aria-describedby={undefined}>
          <D.Title className="sg-visually-hidden">Command palette</D.Title>
          <Command loop filter={filter}>
            <CommandInput placeholder={placeholder} autoFocus />
            <CommandList>
              <CommandEmpty>{empty}</CommandEmpty>
              {children}
            </CommandList>
            <div className="sg-palette-footer">
              {footer ?? (
                <>
                  <span><Kbd>↑</Kbd><Kbd>↓</Kbd> navigate</span>
                  <span><Kbd>↵</Kbd> open</span>
                  <span><Kbd>Esc</Kbd> close</span>
                </>
              )}
            </div>
          </Command>
        </D.Content>
      </D.Portal>
    </D.Root>
  );
}
