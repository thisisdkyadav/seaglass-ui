import { createContext, forwardRef, useContext, type ReactNode } from "react";
import { Tabs as T, Accordion as A, Collapsible as C } from "radix-ui";
import { cx } from "../lib/cx";
import type { Tone } from "../lib/types";
import { ChevronDown } from "../lib/icons";

/* ---------- Tabs ---------- */
export interface TabsProps extends React.ComponentPropsWithoutRef<typeof T.Root> {
  /** pebble: tabs sit in one pebble, the active one is a white chip (default) · chips: no tray · line: underline */
  variant?: "pebble" | "chips" | "line";
  tone?: Tone;
}
const TabsCtx = createContext<{ variant: TabsProps["variant"]; tone: Tone }>({ variant: "pebble", tone: "clear" });

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(function Tabs({ variant = "pebble", tone = "clear", className, ...rest }, ref) {
  return (
    <TabsCtx.Provider value={{ variant, tone }}>
      <T.Root ref={ref} data-variant={variant} data-tone={tone} className={cx("sg-tabs", className)} {...rest} />
    </TabsCtx.Provider>
  );
});

export const TabsList = forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof T.List>>(function TabsList({ className, ...rest }, ref) {
  const { variant, tone } = useContext(TabsCtx);
  return <T.List ref={ref} data-tone={tone} data-depth="md" className={cx("sg-tabs-list", variant === "pebble" && "sg-pebble", className)} {...rest} />;
});

export interface TabProps extends React.ComponentPropsWithoutRef<typeof T.Trigger> { icon?: ReactNode; count?: ReactNode }
export const Tab = forwardRef<HTMLButtonElement, TabProps>(function Tab({ icon, count, className, children, ...rest }, ref) {
  return (
    <T.Trigger ref={ref} className={cx("sg-tab", className)} {...rest}>
      {icon && <span className="sg-tab-icon" aria-hidden>{icon}</span>}
      <span>{children}</span>
      {count != null && <span className="sg-tab-count">{count}</span>}
    </T.Trigger>
  );
});

export const TabsContent = forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof T.Content>>(function TabsContent({ className, ...rest }, ref) {
  return <T.Content ref={ref} className={cx("sg-tabs-content", className)} {...rest} />;
});

/* ---------- Accordion ---------- */
export type AccordionProps = React.ComponentPropsWithoutRef<typeof A.Root> & { tone?: Tone; variant?: "separate" | "joined" };
const AccordionCtx = createContext<{ variant: AccordionProps["variant"]; tone: Tone }>({ variant: "joined", tone: "clear" });

export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(function Accordion({ tone = "clear", variant = "joined", className, ...rest }, ref) {
  const joined = variant === "joined";
  return <AccordionCtx.Provider value={{ variant, tone }}><A.Root ref={ref} data-tone={tone} data-depth={joined ? "lg" : undefined} data-variant={variant} className={cx("sg-accordion", joined && "sg-pebble", className)} {...(rest as React.ComponentPropsWithoutRef<typeof A.Root>)} /></AccordionCtx.Provider>;
});

export interface AccordionItemProps extends Omit<React.ComponentPropsWithoutRef<typeof A.Item>, "title"> { title: ReactNode; icon?: ReactNode; tone?: Tone }
export const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(function AccordionItem({ title, icon, tone, className, children, ...rest }, ref) {
  // separate items are each their own pebble
  const root = useContext(AccordionCtx);
  const separate = root.variant === "separate";
  return (
    <A.Item ref={ref} data-tone={tone ?? (separate ? root.tone : undefined)} data-depth={separate ? "md" : undefined} className={cx("sg-accordion-item", separate && "sg-pebble", className)} {...rest}>
      <A.Header className="sg-accordion-header">
        <A.Trigger className="sg-accordion-trigger">
          {icon && <span className="sg-accordion-icon" aria-hidden>{icon}</span>}
          <span className="sg-accordion-title">{title}</span>
          <ChevronDown className="sg-accordion-chevron" />
        </A.Trigger>
      </A.Header>
      <A.Content className="sg-accordion-content"><div className="sg-accordion-inner">{children}</div></A.Content>
    </A.Item>
  );
});

/* ---------- Collapsible ---------- */
export const Collapsible = C.Root;
export const CollapsibleTrigger = C.Trigger;
export const CollapsibleContent = forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof C.Content>>(function CollapsibleContent({ className, ...rest }, ref) {
  return <C.Content ref={ref} className={cx("sg-collapsible-content", className)} {...rest} />;
});
