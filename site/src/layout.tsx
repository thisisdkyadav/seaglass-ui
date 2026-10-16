import { useEffect, useState, type ReactNode } from "react";
import {
  SidebarProvider, Sidebar, SidebarHeader, SidebarFooter, SidebarInset, SidebarTrigger, SidebarSearch, SidebarNav,
  SidebarButton, SidebarExpandedOnly, Breadcrumbs, useSidebar, Badge,
} from "seaglass-ui";
import { Link, navigate } from "./router";
import { sections, VERSION } from "./content/nav";
import { Logo, SearchButton, ThemeButton, GithubButton, useSearch } from "./chrome";

export interface Crumb { label: string; to?: string }
export interface TocItem { id: string; label: string; depth?: number }

/** Docs and component pages: the library's own sidebar shell. */
export function DocsLayout({ active, crumbs, toc, children }: { active: string; crumbs: Crumb[]; toc?: TocItem[]; children: ReactNode }) {
  const search = useSearch();
  return (
    <SidebarProvider storageKey="sg-docs-sidebar" className="site-shell">
      <Sidebar aria-label="Documentation">
        <SidebarHeader>
          <SidebarButton
            media={<Logo />}
            title="Sea Glass UI"
            subtitle={<span className="site-version">v{VERSION} · beta</span>}
            railLabel="Sea Glass UI — home"
            onClick={() => navigate("/")}
          />
          <SidebarExpandedOnly><SidebarTrigger /></SidebarExpandedOnly>
        </SidebarHeader>
        <SidebarSearch placeholder="Filter pages…" />
        <SidebarNav
          sections={sections}
          activeId={active}
          onNavigate={(item) => item.href && navigate(item.href)}
          renderLink={(item, { href: _h, onClick, ...props }) => (
            <Link
              to={item.href ?? "/"}
              {...props}
              onClick={(e) => { if (!(e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0)) onClick(e); }}
            />
          )}
        />
        <SidebarFooter>
          <SidebarExpandedOnly>
            <p className="site-sidebar-foot">Built with Sea Glass UI itself.</p>
          </SidebarExpandedOnly>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="site-inset">
        <header className="site-topbar">
          <TopTrigger />
          <Breadcrumbs
            className="site-crumbs"
            aria-label="You are here"
            items={crumbs.map((c) => ({ label: c.label, href: c.to }))}
            renderLink={(c, children) => <Link to={c.href!}>{children}</Link>}
          />
          <div className="site-topbar-actions">
            <SearchButton onOpen={search.open} />
            <ThemeButton />
            <GithubButton />
          </div>
        </header>
        <div className={toc?.length ? "site-doc-grid" : "site-doc-grid site-doc-grid-full"}>
          <div className="site-main" id="main">{children}</div>
          {!!toc?.length && <Toc items={toc} />}
        </div>
        <footer className="site-doc-footer">
          <span>Sea Glass UI · MIT licensed</span>
          <Badge size="sm" tone="amber">beta</Badge>
        </footer>
      </SidebarInset>
      {search.palette}
    </SidebarProvider>
  );
}

function TopTrigger() {
  const s = useSidebar();
  return s.collapsed || s.isMobile ? <SidebarTrigger variant="pebble" /> : null;
}

/** On this page — highlights the section in view. */
function Toc({ items }: { items: TocItem[] }) {
  const [current, setCurrent] = useState(items[0]?.id);
  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const onScroll = () => {
      const y = 120;
      let cur = els[0].id;
      for (const el of els) if (el.getBoundingClientRect().top <= y) cur = el.id;
      if (innerHeight + scrollY >= document.documentElement.scrollHeight - 4) cur = els[els.length - 1].id;
      setCurrent(cur);
    };
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, [items]);
  return (
    <nav className="site-toc" aria-label="On this page">
      <p>On this page</p>
      <ul>
        {items.map((i) => (
          <li key={i.id} data-depth={i.depth ?? 0}>
            <a href={`#${i.id}`} aria-current={i.id === current ? "location" : undefined} onClick={(e) => { e.preventDefault(); history.replaceState(null, "", `#${i.id}`); document.getElementById(i.id)?.scrollIntoView({ behavior: "smooth", block: "start" }); }}>
              {i.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
