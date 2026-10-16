import {
  createContext, forwardRef, useCallback, useContext, useEffect, useMemo, useRef, useState,
  type CSSProperties, type HTMLAttributes, type KeyboardEvent, type ReactNode,
} from "react";
import { Dialog as D, Direction, DropdownMenu as DM, Tooltip as T } from "radix-ui";
import { cx } from "../lib/cx";
import type { Tone } from "../lib/types";
import { ChevronDown, ChevronRight, MenuIcon, PanelLeft, SearchIcon, XIcon } from "../lib/icons";
import { useHotkeys } from "../hooks/use-hotkeys";
import { useMediaQuery } from "../hooks/use-media-query";
import { usePersistedState } from "../hooks/use-persisted-state";
import { Kbd } from "./misc";

/* ============================================================
   Sidebar

   <SidebarProvider>                 state, shortcuts, layout grid
     <Sidebar>                       the pebble (a drawer on small screens)
       <SidebarHeader>…</SidebarHeader>
       <SidebarSearch />             filters the nav, "/" focuses it
       <SidebarNav sections={…} activeId={…} />   multi-level tree
       <SidebarFooter>…</SidebarFooter>
     </Sidebar>
     <SidebarInset>…page…</SidebarInset>
   </SidebarProvider>

   Expanded: a tree with folding groups, guide lines, badges and
   section headers; ↑/↓/←/→/Home/End move around it.
   Collapsed ("rail"): icons only; leaves show a tooltip, groups
   open a flyout menu on hover, click, Enter or →.
   Shortcuts: [ or mod+b toggles, / searches, Esc clears search.
   ============================================================ */

export interface NavItem {
  id: string;
  label: string;
  icon?: ReactNode;
  href?: string;
  /** A number or short text on the right. */
  badge?: ReactNode;
  badgeTone?: Tone;
  /** A small uppercase tag, e.g. "Beta". */
  tag?: string;
  /** A coloured pebble dot instead of an icon (pinned items, projects). */
  dot?: Tone;
  children?: NavItem[];
  disabled?: boolean;
  /** Extra search terms. */
  keywords?: string[];
}
export interface NavSection { id: string; title?: string; items: NavItem[]; /** Header folds the section. Default true. */ collapsible?: boolean }

interface Ctx {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
  toggle: () => void;
  isMobile: boolean;
  mobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
  width: number;
  setWidth: (w: number) => void;
  query: string;
  setQuery: (q: string) => void;
  searchRef: React.RefObject<HTMLInputElement | null>;
  focusSearch: () => void;
  /** Ids of open groups and folded sections; persisted. */
  open: Set<string>;
  setOpen: (id: string, v: boolean) => void;
  minWidth: number;
  maxWidth: number;
  defaultWidth: number;
  /** First nav item matching the query, registered by SidebarNav, for Enter-to-go. */
  firstMatch: React.RefObject<(() => void) | null>;
}
const SidebarContext = createContext<Ctx | null>(null);

export function useSidebar(): Ctx {
  const c = useContext(SidebarContext);
  if (!c) throw new Error("useSidebar must be used inside <SidebarProvider>");
  return c;
}

export interface SidebarProviderProps extends HTMLAttributes<HTMLDivElement> {
  defaultCollapsed?: boolean;
  collapsed?: boolean;
  onCollapsedChange?: (v: boolean) => void;
  /** Remember collapsed state, width and open groups. Default "sg-sidebar". false disables. */
  storageKey?: string | false;
  /** Shortcuts that toggle the rail. Default ["[", "mod+b"]. */
  hotkeys?: string[] | false;
  /** Shortcut that focuses the search. Default "/". */
  searchHotkey?: string | false;
  /** Below this width the sidebar becomes a drawer. Default 900. */
  mobileBreakpoint?: number;
  /** Expanded width in px. Default 264. Drag the edge to resize when resizable. */
  defaultWidth?: number;
  minWidth?: number;
  maxWidth?: number;
  /** Groups open on first visit. */
  defaultOpen?: string[];
}

export function SidebarProvider({
  defaultCollapsed = false, collapsed: collapsedProp, onCollapsedChange, storageKey = "sg-sidebar",
  hotkeys = ["[", "mod+b"], searchHotkey = "/", mobileBreakpoint = 900,
  defaultWidth = 264, minWidth = 220, maxWidth = 420, defaultOpen = [],
  className, style, children, ...rest
}: SidebarProviderProps) {
  const k = storageKey || undefined;
  const [storedCollapsed, setStoredCollapsed] = usePersistedState(k && k + ":collapsed", defaultCollapsed);
  const collapsedState = collapsedProp ?? storedCollapsed;
  const [width, setWidth] = usePersistedState(k && k + ":width", defaultWidth);
  const [openList, setOpenList] = usePersistedState<string[]>(k && k + ":open", defaultOpen);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");
  const isMobile = useMediaQuery(`(max-width: ${mobileBreakpoint}px)`);
  const searchRef = useRef<HTMLInputElement>(null);
  const firstMatch = useRef<(() => void) | null>(null);
  const collapsed = collapsedState && !isMobile;

  const setCollapsed = useCallback((v: boolean) => { setStoredCollapsed(v); onCollapsedChange?.(v); }, [setStoredCollapsed, onCollapsedChange]);
  const toggle = useCallback(() => (isMobile ? setMobileOpen((o) => !o) : setCollapsed(!collapsedState)), [isMobile, collapsedState, setCollapsed]);
  const open = useMemo(() => new Set(openList), [openList]);
  const setOpen = useCallback((id: string, v: boolean) => setOpenList((l) => (v ? (l.includes(id) ? l : [...l, id]) : l.filter((x) => x !== id))), [setOpenList]);
  const focusSearch = useCallback(() => {
    if (isMobile) setMobileOpen(true);
    if (collapsedState && !isMobile) setCollapsed(false);
    // wait for the rail to expand / the drawer to mount
    setTimeout(() => searchRef.current?.focus(), collapsedState || isMobile ? 260 : 0);
  }, [isMobile, collapsedState, setCollapsed]);

  useHotkeys(hotkeys || [], toggle, { enabled: !!hotkeys && hotkeys.length > 0 });
  useHotkeys(searchHotkey || "", focusSearch, { enabled: !!searchHotkey });

  const value: Ctx = {
    collapsed, setCollapsed, toggle, isMobile, mobileOpen, setMobileOpen, width, setWidth: (w) => setWidth(Math.round(Math.max(minWidth, Math.min(maxWidth, w)))),
    query, setQuery, searchRef, focusSearch, open, setOpen, minWidth, maxWidth, defaultWidth, firstMatch,
  };
  return (
    <SidebarContext.Provider value={value}>
      <T.Provider delayDuration={150} skipDelayDuration={400}>
        <div
          className={cx("sg-shell", className)}
          data-collapsed={collapsed ? "" : undefined}
          data-mobile={isMobile ? "" : undefined}
          style={{ ...style, ["--sg-sidebar-width" as string]: `${width}px` } as CSSProperties}
          {...rest}
        >
          {children}
        </div>
      </T.Provider>
    </SidebarContext.Provider>
  );
}

/* ---------- Sidebar ---------- */
export interface SidebarProps extends HTMLAttributes<HTMLElement> {
  tone?: Tone;
  /** Drag the right edge to resize; double-click it to reset. */
  resizable?: boolean;
  "aria-label"?: string;
}

export const Sidebar = forwardRef<HTMLElement, SidebarProps>(function Sidebar({ tone = "clear", resizable = true, className, children, "aria-label": label = "Main navigation", ...rest }, ref) {
  const s = useSidebar();
  const body = (
    <aside
      ref={ref}
      aria-label={label}
      data-tone={tone}
      data-depth="lg"
      data-state={s.collapsed ? "collapsed" : "expanded"}
      className={cx("sg-sidebar sg-pebble", className)}
      {...rest}
    >
      {children}
      {resizable && !s.collapsed && !s.isMobile && <ResizeHandle />}
    </aside>
  );
  if (!s.isMobile) return body;
  return (
    <D.Root open={s.mobileOpen} onOpenChange={s.setMobileOpen}>
      <D.Portal>
        <D.Overlay className="sg-overlay" />
        <D.Content className="sg-sidebar-drawer" aria-describedby={undefined}>
          <D.Title className="sg-visually-hidden">{label}</D.Title>
          {body}
          <D.Close className="sg-sidebar-drawer-close sg-pebble" data-tone="clear" data-depth="sm" aria-label="Close navigation"><XIcon /></D.Close>
        </D.Content>
      </D.Portal>
    </D.Root>
  );
});

function ResizeHandle() {
  const s = useSidebar();
  // The sidebar sits at the inline start, so in RTL it grows towards the left.
  const sign = Direction.useDirection() === "rtl" ? -1 : 1;
  const onPointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    const startX = e.clientX, startW = s.width;
    const move = (ev: PointerEvent) => s.setWidth(startW + (ev.clientX - startX) * sign);
    const up = () => { window.removeEventListener("pointermove", move); window.removeEventListener("pointerup", up); document.body.style.cursor = ""; };
    document.body.style.cursor = "col-resize";
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };
  return (
    <div
      role="separator"
      aria-orientation="vertical"
      aria-label="Resize sidebar"
      aria-valuenow={s.width}
      aria-valuemin={s.minWidth}
      aria-valuemax={s.maxWidth}
      tabIndex={0}
      className="sg-sidebar-resize"
      onPointerDown={onPointerDown}
      onDoubleClick={() => s.setWidth(s.defaultWidth)}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") { e.preventDefault(); s.setWidth(s.width - 16 * sign); }
        if (e.key === "ArrowRight") { e.preventDefault(); s.setWidth(s.width + 16 * sign); }
      }}
    />
  );
}

export const SidebarHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function SidebarHeader({ className, ...rest }, ref) {
  return <div ref={ref} className={cx("sg-sidebar-header", className)} {...rest} />;
});
export const SidebarFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function SidebarFooter({ className, ...rest }, ref) {
  return <div ref={ref} className={cx("sg-sidebar-footer", className)} {...rest} />;
});
/** Scrolling middle area; SidebarNav goes here (it adds one itself if used directly). */
export const SidebarContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function SidebarContent({ className, ...rest }, ref) {
  return <div ref={ref} className={cx("sg-sidebar-content", className)} {...rest} />;
});
/** Hides its children while the sidebar is a rail. */
export function SidebarExpandedOnly({ children }: { children: ReactNode }) {
  return useSidebar().collapsed ? null : <>{children}</>;
}

export interface SidebarInsetProps extends HTMLAttributes<HTMLElement> {
  /** Render a `<div>` when the inset is not the page's main content (a nested demo, a panel). @default "main" */
  as?: "main" | "div";
}

/** The page next to the sidebar. */
export const SidebarInset = forwardRef<HTMLElement, SidebarInsetProps>(function SidebarInset({ as: Tag = "main", className, ...rest }, ref) {
  return <Tag ref={ref as React.Ref<HTMLDivElement>} className={cx("sg-sidebar-inset", className)} {...rest} />;
});

/* ---------- Toggles ---------- */
/** Collapses to a rail on desktop; opens the drawer on small screens. */
export const SidebarTrigger = forwardRef<HTMLButtonElement, HTMLAttributes<HTMLButtonElement> & { variant?: "plain" | "pebble" }>(function SidebarTrigger(
  { variant = "plain", className, ...rest }, ref,
) {
  const s = useSidebar();
  const label = s.isMobile ? "Open navigation" : s.collapsed ? "Expand sidebar" : "Collapse sidebar";
  return (
    <T.Root>
      <T.Trigger asChild>
        <button
          ref={ref}
          type="button"
          aria-label={label}
          aria-expanded={s.isMobile ? s.mobileOpen : !s.collapsed}
          onClick={s.toggle}
          data-tone={variant === "pebble" ? "clear" : undefined}
          data-depth={variant === "pebble" ? "sm" : undefined}
          data-interactive={variant === "pebble" ? "" : undefined}
          className={cx("sg-sidebar-trigger", variant === "pebble" && "sg-pebble", className)}
          {...rest}
        >
          {s.isMobile ? <MenuIcon width={18} height={18} /> : <PanelLeft width={18} height={18} />}
        </button>
      </T.Trigger>
      <T.Portal>
        <T.Content className="sg-tooltip" side={s.collapsed ? "right" : "bottom"} sideOffset={10}>{label}<Kbd keys="[" className="sg-tooltip-kbd" /></T.Content>
      </T.Portal>
    </T.Root>
  );
});

/* ---------- Search ---------- */
export function SidebarSearch({ placeholder = "Jump to…", className }: { placeholder?: string; className?: string }) {
  const s = useSidebar();
  if (s.collapsed) {
    return (
      <RailTip label="Search" shortcut="/">
        <button type="button" className={cx("sg-sidebar-search-rail sg-well", className)} aria-label="Search navigation" onClick={s.focusSearch}>
          <SearchIcon width={18} height={18} />
        </button>
      </RailTip>
    );
  }
  return (
    <label className={cx("sg-sidebar-search sg-well", className)}>
      <SearchIcon width={16} height={16} className="sg-sidebar-search-icon" />
      <input
        ref={s.searchRef}
        type="search"
        value={s.query}
        placeholder={placeholder}
        aria-label="Filter navigation"
        autoComplete="off"
        onChange={(e) => s.setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Escape") { e.preventDefault(); if (s.query) s.setQuery(""); else e.currentTarget.blur(); }
          if (e.key === "Enter") { e.preventDefault(); s.firstMatch.current?.(); }
          if (e.key === "ArrowDown") {
            e.preventDefault();
            e.currentTarget.closest(".sg-sidebar")?.querySelector<HTMLElement>("[data-sg-nav-item]")?.focus();
          }
        }}
      />
      {!s.query && <Kbd className="sg-sidebar-search-kbd">/</Kbd>}
    </label>
  );
}

/* ---------- Nav tree ---------- */
export interface SidebarNavProps {
  sections: NavSection[];
  /** Name for the navigation landmark. @default "Sections" */
  "aria-label"?: string;
  activeId?: string;
  /** Called when a leaf is chosen (click, Enter, flyout, search). */
  onNavigate?: (item: NavItem) => void;
  /** Render links with your router. Spread `props` onto your link. */
  renderLink?: (item: NavItem, props: LinkProps) => ReactNode;
  className?: string;
}
export interface LinkProps {
  href?: string;
  className: string;
  "aria-current"?: "page";
  "data-sg-nav-item": "";
  "data-active"?: "";
  onClick: (e: React.MouseEvent) => void;
  onKeyDown: (e: KeyboardEvent<HTMLElement>) => void;
  children: ReactNode;
}

const matches = (item: NavItem, q: string): boolean =>
  item.label.toLowerCase().includes(q) || !!item.keywords?.some((k) => k.toLowerCase().includes(q)) || !!item.children?.some((c) => matches(c, q));

function ancestorsOf(sections: NavSection[], id?: string): string[] {
  if (!id) return [];
  const walk = (items: NavItem[], trail: string[]): string[] | null => {
    for (const it of items) {
      if (it.id === id) return trail;
      if (it.children) { const r = walk(it.children, [...trail, it.id]); if (r) return r; }
    }
    return null;
  };
  for (const s of sections) { const r = walk(s.items, []); if (r) return r; }
  return [];
}

export function SidebarNav({ sections, activeId, onNavigate, renderLink, className, "aria-label": label = "Sections" }: SidebarNavProps) {
  const s = useSidebar();
  const q = s.query.trim().toLowerCase();
  const trail = useMemo(() => ancestorsOf(sections, activeId), [sections, activeId]);
  const navRef = useRef<HTMLElement>(null);

  // reveal the active item: open its ancestors whenever it changes
  useEffect(() => { trail.forEach((id) => s.setOpen(id, true)); }, [trail.join("|")]); // eslint-disable-line react-hooks/exhaustive-deps

  // register Enter-to-go for the search box
  const firstLeaf = useMemo(() => {
    if (!q) return null;
    const find = (items: NavItem[]): NavItem | null => {
      for (const it of items) {
        if (!matches(it, q)) continue;
        if (!it.children) return it;
        const own = it.label.toLowerCase().includes(q);
        const r = find(own ? it.children : it.children.filter((c) => matches(c, q)));
        if (r) return r;
      }
      return null;
    };
    for (const sec of sections) { const r = find(sec.items); if (r) return r; }
    return null;
  }, [sections, q]);
  s.firstMatch.current = firstLeaf ? () => { go(firstLeaf); s.setQuery(""); } : null;

  const go = (item: NavItem) => {
    onNavigate?.(item);
    if (s.isMobile) s.setMobileOpen(false);
  };

  // arrow-key movement through visible items
  const onKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    const items = [...(navRef.current?.querySelectorAll<HTMLElement>("[data-sg-nav-item]") ?? [])].filter((el) => el.offsetParent !== null && !el.closest("[data-folded]"));
    const i = items.indexOf(document.activeElement as HTMLElement);
    if (i < 0) return;
    const to = (n: number) => { e.preventDefault(); items[Math.max(0, Math.min(items.length - 1, n))]?.focus(); };
    if (e.key === "ArrowDown") to(i + 1);
    else if (e.key === "ArrowUp") { if (i === 0 && !s.collapsed) { e.preventDefault(); s.searchRef.current?.focus(); } else to(i - 1); }
    else if (e.key === "Home") to(0);
    else if (e.key === "End") to(items.length - 1);
  };

  return (
    <nav ref={navRef} className={cx("sg-sidebar-content sg-nav", className)} onKeyDown={onKeyDown} aria-label={label}>
      {sections.map((sec) => {
        const items = q ? sec.items.filter((it) => matches(it, q)) : sec.items;
        if (!items.length) return null;
        const foldable = sec.title && sec.collapsible !== false && !s.collapsed && !q;
        const folded = foldable && s.open.has("§" + sec.id);
        return (
          <section key={sec.id} className="sg-nav-section" data-folded={folded ? "" : undefined}>
            {sec.title && (s.collapsed ? <div className="sg-nav-rule" role="separator" aria-label={sec.title} /> : (
              foldable ? (
                <button type="button" className="sg-nav-title" aria-expanded={!folded} onClick={() => s.setOpen("§" + sec.id, !folded)}>
                  <span>{sec.title}</span><ChevronDown className="sg-nav-title-chevron" width={14} height={14} />
                </button>
              ) : <div className="sg-nav-title">{sec.title}</div>
            ))}
            <div className="sg-fold" data-open={folded ? undefined : ""}>
              <ul className="sg-nav-list" role="list">
                {items.map((it) => (
                  <NavNode key={it.id} item={it} depth={0} activeId={activeId} trail={trail} q={q} go={go} renderLink={renderLink} />
                ))}
              </ul>
            </div>
          </section>
        );
      })}
      {q && !sections.some((sec) => sec.items.some((it) => matches(it, q))) && <p className="sg-nav-empty">No pages match “{s.query}”</p>}
    </nav>
  );
}

interface NodeProps { item: NavItem; depth: number; activeId?: string; trail: string[]; q: string; go: (i: NavItem) => void; renderLink?: SidebarNavProps["renderLink"] }

function NavNode({ item, depth, activeId, trail, q, go, renderLink }: NodeProps) {
  const s = useSidebar();
  const keys = arrowKeys(Direction.useDirection());
  const active = item.id === activeId;
  const inTrail = trail.includes(item.id);
  const kids = item.children ? (q && !item.label.toLowerCase().includes(q) ? item.children.filter((c) => matches(c, q)) : item.children) : null;
  const isOpen = !!kids && (q ? true : s.open.has(item.id));

  const lead = depth === 0 && (item.dot ? <span className="sg-nav-dot" data-tone={item.dot} /> : item.icon ? <span className="sg-nav-icon" aria-hidden>{item.icon}</span> : null);
  const tail = (
    <>
      {item.tag && <span className="sg-nav-tag">{item.tag}</span>}
      {item.badge != null && <span className="sg-count" data-tone={item.badgeTone ?? "rose"}>{item.badge}</span>}
    </>
  );

  /* rail mode: top-level only */
  if (s.collapsed && depth === 0) {
    if (kids) return <li><RailFlyout item={item} activeId={activeId} active={inTrail} go={go} renderLink={renderLink} /></li>;
    return (
      <li>
        <RailTip label={item.label} badge={item.badge}>
          {leaf(item, active, go, renderLink, <>{lead}<span className="sg-visually-hidden">{item.label}</span>{item.badge != null && <span className="sg-count sg-nav-rail-count" data-tone={item.badgeTone ?? "rose"}>{item.badge}</span>}</>, keys)}
        </RailTip>
      </li>
    );
  }

  if (!kids) {
    return <li>{leaf(item, active, go, renderLink, <>{lead}<span className="sg-nav-label">{item.label}</span>{tail}</>, keys)}</li>;
  }

  return (
    <li data-open={isOpen ? "" : undefined}>
      <button
        type="button"
        data-sg-nav-item=""
        className="sg-nav-item"
        data-trail={inTrail ? "" : undefined}
        aria-expanded={isOpen}
        disabled={item.disabled}
        onClick={() => s.setOpen(item.id, !isOpen)}
        onKeyDown={(e) => {
          if (e.key === keys.open) {
            e.preventDefault();
            if (!isOpen) s.setOpen(item.id, true);
            else e.currentTarget.parentElement?.querySelector<HTMLElement>(".sg-nav-sub [data-sg-nav-item]")?.focus();
          }
          if (e.key === keys.close) {
            e.preventDefault();
            if (isOpen) s.setOpen(item.id, false);
            else focusParent(e.currentTarget);
          }
        }}
      >
        {lead}<span className="sg-nav-label">{item.label}</span>{tail}
        <ChevronRight className="sg-nav-chevron" width={14} height={14} />
      </button>
      <div className="sg-fold" data-open={isOpen ? "" : undefined} data-folded={isOpen ? undefined : ""}>
        <ul className="sg-nav-list sg-nav-sub" role="list">
          {kids.map((c) => <NavNode key={c.id} item={c} depth={depth + 1} activeId={activeId} trail={trail} q={q} go={go} renderLink={renderLink} />)}
        </ul>
      </div>
    </li>
  );
}

function focusParent(el: HTMLElement) {
  el.closest(".sg-nav-sub")?.closest("li")?.querySelector<HTMLElement>(":scope > [data-sg-nav-item]")?.focus();
}

/** Arrow keys that open and close a tree branch: towards and away from the inline end. */
const arrowKeys = (dir: "ltr" | "rtl") => (dir === "rtl" ? { open: "ArrowLeft", close: "ArrowRight" } : { open: "ArrowRight", close: "ArrowLeft" });

function leaf(item: NavItem, active: boolean, go: (i: NavItem) => void, renderLink: SidebarNavProps["renderLink"], children: ReactNode, keys = arrowKeys("ltr")) {
  const props: LinkProps = {
    href: item.href,
    className: "sg-nav-item",
    "aria-current": active ? "page" : undefined,
    "data-sg-nav-item": "",
    "data-active": active ? "" : undefined,
    onClick: (e) => { if (item.disabled) { e.preventDefault(); return; } go(item); },
    onKeyDown: (e) => { if (e.key === keys.close) { e.preventDefault(); focusParent(e.currentTarget); } },
    children,
  };
  if (renderLink) return renderLink(item, props);
  return item.href ? <a {...props} aria-disabled={item.disabled || undefined} /> : <button type="button" {...props} disabled={item.disabled} />;
}

/* ---------- rail helpers ---------- */
function RailTip({ label, shortcut, badge, children }: { label: string; shortcut?: string; badge?: ReactNode; children: ReactNode }) {
  const side = Direction.useDirection() === "rtl" ? "left" : "right";
  return (
    <T.Root>
      <T.Trigger asChild>{children}</T.Trigger>
      <T.Portal>
        <T.Content className="sg-tooltip" side={side} sideOffset={14}>
          {label}{badge != null && <span className="sg-tooltip-badge">{badge}</span>}{shortcut && <Kbd keys={shortcut} className="sg-tooltip-kbd" />}
        </T.Content>
      </T.Portal>
    </T.Root>
  );
}

function RailFlyout({ item, activeId, active, go, renderLink }: { item: NavItem; activeId?: string; active: boolean; go: (i: NavItem) => void; renderLink?: SidebarNavProps["renderLink"] }) {
  const [open, setOpen] = useState(false);
  const dir = Direction.useDirection();
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const hover = (v: boolean, delay: number) => { clearTimeout(timer.current); timer.current = setTimeout(() => setOpen(v), delay); };
  useEffect(() => () => clearTimeout(timer.current), []);

  const renderItems = (items: NavItem[]): ReactNode =>
    items.map((c) =>
      c.children ? (
        <DM.Sub key={c.id}>
          <DM.SubTrigger className="sg-menu-item" data-trail={ancestorsOf([{ id: "_", items: c.children }], activeId).length || c.children.some((x) => x.id === activeId) ? "" : undefined}>
            <span className="sg-menu-text">{c.label}</span>
            <ChevronRight className="sg-menu-chevron" width={16} height={16} />
          </DM.SubTrigger>
          <DM.Portal>
            <DM.SubContent className="sg-menu sg-pebble sg-popover-surface" data-tone="clear" data-depth="md" sideOffset={6} onPointerEnter={() => hover(true, 0)} onPointerLeave={() => hover(false, 250)}>
              {renderItems(c.children)}
            </DM.SubContent>
          </DM.Portal>
        </DM.Sub>
      ) : (
        <DM.Item key={c.id} asChild disabled={c.disabled} onSelect={() => go(c)}>
          {renderLink
            ? renderLink(c, { href: c.href, className: "sg-menu-item", "aria-current": c.id === activeId ? "page" : undefined, "data-sg-nav-item": "", "data-active": c.id === activeId ? "" : undefined, onClick: () => {}, onKeyDown: () => {}, children: <MenuRow c={c} /> }) as React.ReactElement
            : c.href ? <a href={c.href} className="sg-menu-item" data-active={c.id === activeId ? "" : undefined}><MenuRow c={c} /></a>
            : <div className="sg-menu-item" data-active={c.id === activeId ? "" : undefined}><MenuRow c={c} /></div>}
        </DM.Item>
      ),
    );

  return (
    <DM.Root open={open} onOpenChange={setOpen} modal={false}>
      <DM.Trigger asChild>
        <button
          type="button"
          data-sg-nav-item=""
          className="sg-nav-item"
          data-trail={active ? "" : undefined}
          aria-label={item.label}
          onPointerEnter={() => hover(true, 120)}
          onPointerLeave={() => hover(false, 250)}
          onKeyDown={(e) => { if (e.key === arrowKeys(dir).open) { e.preventDefault(); setOpen(true); } }}
        >
          {item.dot ? <span className="sg-nav-dot" data-tone={item.dot} /> : <span className="sg-nav-icon" aria-hidden>{item.icon}</span>}
          {item.badge != null && <span className="sg-count sg-nav-rail-count" data-tone={item.badgeTone ?? "rose"}>{item.badge}</span>}
        </button>
      </DM.Trigger>
      <DM.Portal>
        <DM.Content
          side={dir === "rtl" ? "left" : "right"}
          align="start"
          sideOffset={18}
          className="sg-menu sg-pebble sg-popover-surface sg-flyout"
          data-tone="clear"
          data-depth="md"
          onPointerEnter={() => hover(true, 0)}
          onPointerLeave={() => hover(false, 250)}
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          <DM.Label className="sg-flyout-title">{item.icon && <span className="sg-nav-icon" aria-hidden>{item.icon}</span>}{item.label}</DM.Label>
          {renderItems(item.children!)}
        </DM.Content>
      </DM.Portal>
    </DM.Root>
  );
}

function MenuRow({ c }: { c: NavItem }) {
  return (
    <>
      <span className="sg-menu-text">{c.label}</span>
      {c.tag && <span className="sg-nav-tag">{c.tag}</span>}
      {c.badge != null && <span className="sg-count" data-tone={c.badgeTone ?? "rose"}>{c.badge}</span>}
    </>
  );
}

/* ---------- a standalone row for header/footer (profile, workspace) ---------- */
export interface SidebarButtonProps extends Omit<HTMLAttributes<HTMLButtonElement>, "title"> {
  /** Shown in both modes (an avatar or logo). */
  media: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  /** Trailing glyph in expanded mode. */
  end?: ReactNode;
  /** Tooltip text in rail mode. */
  railLabel?: string;
}

/** A media + two-line text row that shrinks to just the media in rail mode. Works as a DropdownMenu trigger. */
export const SidebarButton = forwardRef<HTMLButtonElement, SidebarButtonProps>(function SidebarButton({ media, title, subtitle, end, railLabel, className, ...rest }, ref) {
  const s = useSidebar();
  return (
    <button ref={ref} type="button" aria-label={s.collapsed ? railLabel ?? (typeof title === "string" ? title : undefined) : undefined} className={cx("sg-sidebar-button", className)} {...rest}>
      <span className="sg-sidebar-button-media">{media}</span>
      {!s.collapsed && (
        <>
          <span className="sg-sidebar-button-text"><b>{title}</b>{subtitle && <small>{subtitle}</small>}</span>
          {end && <span className="sg-sidebar-button-end" aria-hidden>{end}</span>}
        </>
      )}
    </button>
  );
});
