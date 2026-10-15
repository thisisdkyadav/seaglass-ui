import { forwardRef, type ReactNode } from "react";
import { DropdownMenu as D, ContextMenu as C } from "radix-ui";
import { cx } from "../lib/cx";
import { CheckIcon, ChevronRight, DotIcon } from "../lib/icons";
import { Kbd } from "./misc";

/* ============================================================
   DropdownMenu and ContextMenu share one look and one item API:
   icon, label, description, shortcut, tone="danger", checkbox and
   radio items, labelled groups, separators and nested sub-menus.
   Keyboard: arrows, Home/End, type-ahead, → opens a sub-menu.
   ============================================================ */

interface ItemExtras { icon?: ReactNode; shortcut?: string; description?: ReactNode; tone?: "danger"; inset?: boolean }
const itemBody = (children: ReactNode, { icon, shortcut, description }: ItemExtras, after?: ReactNode) => (
  <>
    {icon && <span className="sg-menu-icon" aria-hidden>{icon}</span>}
    <span className="sg-menu-text">
      <span>{children}</span>
      {description && <span className="sg-menu-description">{description}</span>}
    </span>
    {shortcut && <Kbd keys={shortcut} className="sg-menu-shortcut" />}
    {after}
  </>
);

type Prim = typeof D | typeof C;
function build<P extends Prim>(M: P, prefix: string) {
  const Mx = M as typeof D; // identical part shapes

  const Content = forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof D.Content>>(function Content({ className, sideOffset = 8, ...rest }, ref) {
    return (
      <Mx.Portal>
        <Mx.Content ref={ref} sideOffset={prefix === "Context" ? undefined : sideOffset} data-tone="clear" data-depth="md" className={cx("sg-menu sg-pebble sg-popover-surface", className)} {...(rest as object)} />
      </Mx.Portal>
    );
  });

  const Item = forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof D.Item> & ItemExtras>(function Item(
    { icon, shortcut, description, tone, inset, className, children, ...rest }, ref,
  ) {
    return (
      <Mx.Item ref={ref} data-tone={tone} data-inset={inset ? "" : undefined} className={cx("sg-menu-item", className)} {...rest}>
        {itemBody(children, { icon, shortcut, description })}
      </Mx.Item>
    );
  });

  const CheckboxItem = forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof D.CheckboxItem> & ItemExtras>(function CheckboxItem(
    { icon, shortcut, description, className, children, ...rest }, ref,
  ) {
    return (
      <Mx.CheckboxItem ref={ref} className={cx("sg-menu-item", className)} {...rest}>
        <span className="sg-menu-check-slot"><Mx.ItemIndicator><CheckIcon width={16} height={16} /></Mx.ItemIndicator></span>
        {itemBody(children, { icon, shortcut, description })}
      </Mx.CheckboxItem>
    );
  });

  const RadioItem = forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof D.RadioItem> & ItemExtras>(function RadioItem(
    { icon, shortcut, description, className, children, ...rest }, ref,
  ) {
    return (
      <Mx.RadioItem ref={ref} className={cx("sg-menu-item", className)} {...rest}>
        <span className="sg-menu-check-slot"><Mx.ItemIndicator><DotIcon width={16} height={16} /></Mx.ItemIndicator></span>
        {itemBody(children, { icon, shortcut, description })}
      </Mx.RadioItem>
    );
  });

  const Label = forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof D.Label>>(function Label({ className, ...rest }, ref) {
    return <Mx.Label ref={ref} className={cx("sg-menu-label", className)} {...rest} />;
  });
  const Separator = forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof D.Separator>>(function Separator({ className, ...rest }, ref) {
    return <Mx.Separator ref={ref} className={cx("sg-menu-separator", className)} {...rest} />;
  });

  const SubTrigger = forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof D.SubTrigger> & { icon?: ReactNode }>(function SubTrigger(
    { icon, className, children, ...rest }, ref,
  ) {
    return (
      <Mx.SubTrigger ref={ref} className={cx("sg-menu-item", className)} {...rest}>
        {itemBody(children, { icon }, <ChevronRight className="sg-menu-chevron" width={16} height={16} />)}
      </Mx.SubTrigger>
    );
  });
  const SubContent = forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof D.SubContent>>(function SubContent({ className, sideOffset = 6, ...rest }, ref) {
    return (
      <Mx.Portal>
        <Mx.SubContent ref={ref} sideOffset={sideOffset} data-tone="clear" data-depth="md" className={cx("sg-menu sg-pebble sg-popover-surface", className)} {...rest} />
      </Mx.Portal>
    );
  });

  return { Content, Item, CheckboxItem, RadioItem, Label, Separator, SubTrigger, SubContent };
}

const d = build(D, "Dropdown");
export const DropdownMenu = D.Root;
export const DropdownMenuTrigger = D.Trigger;
export const DropdownMenuGroup = D.Group;
export const DropdownMenuRadioGroup = D.RadioGroup;
export const DropdownMenuSub = D.Sub;
export const DropdownMenuContent = d.Content;
export const DropdownMenuItem = d.Item;
export const DropdownMenuCheckboxItem = d.CheckboxItem;
export const DropdownMenuRadioItem = d.RadioItem;
export const DropdownMenuLabel = d.Label;
export const DropdownMenuSeparator = d.Separator;
export const DropdownMenuSubTrigger = d.SubTrigger;
export const DropdownMenuSubContent = d.SubContent;

const c = build(C, "Context");
export const ContextMenu = C.Root;
export const ContextMenuTrigger = C.Trigger;
export const ContextMenuGroup = C.Group;
export const ContextMenuRadioGroup = C.RadioGroup;
export const ContextMenuSub = C.Sub;
export const ContextMenuContent = c.Content;
export const ContextMenuItem = c.Item;
export const ContextMenuCheckboxItem = c.CheckboxItem;
export const ContextMenuRadioItem = c.RadioItem;
export const ContextMenuLabel = c.Label;
export const ContextMenuSeparator = c.Separator;
export const ContextMenuSubTrigger = c.SubTrigger;
export const ContextMenuSubContent = c.SubContent;
