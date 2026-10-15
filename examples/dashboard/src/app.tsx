import { useEffect, useState } from "react";
import {
  SidebarProvider, Sidebar, SidebarHeader, SidebarFooter, SidebarInset, SidebarTrigger, SidebarSearch, SidebarNav,
  SidebarButton, SidebarExpandedOnly, Pebble, Avatar, Progress, Breadcrumbs, IconButton, Button, Tooltip, Kbd, useSidebar,
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator,
  DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent, DropdownMenuRadioGroup, DropdownMenuRadioItem,
  CommandPalette, CommandGroup, CommandItem, useTheme, toast, type ThemeSetting,
} from "seaglass-ui";
import { sections, titles } from "./nav";
import { Overview, Orders } from "./pages/dashboard";
import { Foundations, Buttons } from "./pages/primitives";
import { Forms } from "./pages/forms";
import { Overlays } from "./pages/overlays";
import { Navigation, DataDisplay } from "./pages/data";
import { Settings } from "./pages/settings";
import { Placeholder } from "./pages/placeholder";

const I = (name: string) => <span className="ms">{name}</span>;
const route = () => location.hash.replace(/^#\/?/, "") || "overview";

export function App() {
  const [page, setPage] = useState(route);
  const [palette, setPalette] = useState(false);
  const { theme, setTheme, resolved, toggle } = useTheme();
  useEffect(() => {
    const on = () => { setPage(route()); window.scrollTo({ top: 0 }); };
    addEventListener("hashchange", on);
    return () => removeEventListener("hashchange", on);
  }, []);
  const go = (id: string) => { location.hash = "#/" + id; };
  const title = titles[page] ?? page.replace(/-/g, " ").replace(/^./, (c) => c.toUpperCase());

  return (
    <SidebarProvider defaultOpen={["sales"]}>
      <Sidebar>
        <SidebarHeader>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarButton
                media={<Pebble tone="aqua" depth="sm" className="pg-logo">{I("water_drop")}</Pebble>}
                title="Tidepool"
                subtitle="Studio workspace"
                end={I("unfold_more")}
                railLabel="Tidepool"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="pg-ws-menu">
              <DropdownMenuLabel>Workspaces</DropdownMenuLabel>
              <DropdownMenuItem icon={I("water_drop")} shortcut="mod+1">Tidepool</DropdownMenuItem>
              <DropdownMenuItem icon={I("sailing")} shortcut="mod+2">Harbour Labs</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem icon={I("add")}>New workspace</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <SidebarExpandedOnly><SidebarTrigger /></SidebarExpandedOnly>
        </SidebarHeader>
        <SidebarSearch />
        <SidebarNav sections={sections} activeId={page === "settings" ? "settings-general" : page} />
        <SidebarFooter>
          <SidebarExpandedOnly>
            <Pebble tone="aqua" depth="sm" className="pg-storage">
              <Progress value={68} tone="aqua" size="sm" label="Storage" showValue formatValue={() => "6.8 / 10 GB"} />
            </Pebble>
          </SidebarExpandedOnly>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarButton
                media={<Avatar name="Ava Thompson" tone="lilac" size="sm" status="online" />}
                title="Ava Thompson"
                subtitle="ava@tidepool.co"
                end={I("more_horiz")}
                railLabel="Ava Thompson"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent side="top" align="start">
              <DropdownMenuItem icon={I("person")} shortcut="mod+,">Profile</DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger icon={I("contrast")}>Theme</DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuRadioGroup value={theme} onValueChange={(v) => setTheme(v as ThemeSetting)}>
                    <DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="dark" shortcut="shift+d">Dark</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="system">System</DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuItem icon={I("keyboard")} shortcut="?">Keyboard shortcuts</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem icon={I("logout")} tone="danger">Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <header className="pg-top">
          <TopTrigger />
          <Breadcrumbs items={[{ label: "Tidepool", href: "#/overview" }, ...(page === "overview" ? [] : [{ label: title }])]} />
          <div className="pg-top-actions">
            <Button variant="soft" tone="clear" icon={I("search")} onClick={() => setPalette(true)} className="pg-search-btn">
              Search <Kbd keys="mod+k" />
            </Button>
            <Tooltip content={resolved === "dark" ? "Lights on" : "Dim the lights"} shortcut="shift+d">
              <IconButton aria-label="Toggle theme" tone="clear" shape="circle" onClick={toggle}>{I(resolved === "dark" ? "light_mode" : "dark_mode")}</IconButton>
            </Tooltip>
            <Tooltip content="Notifications">
              <IconButton aria-label="Notifications" tone="clear" shape="circle" onClick={() => toast.info("No new notifications", { description: "You're all caught up." })}>
                {I("notifications")}
              </IconButton>
            </Tooltip>
          </div>
        </header>
        <Page id={page} />
      </SidebarInset>

      <CommandPalette open={palette} onOpenChange={setPalette}>
        <CommandGroup heading="Pages">
          {sections.flatMap((s) => s.items.flatMap((i) => (i.children ?? [i]).flatMap((c) => c.children ?? [c]))).filter((i) => i.href).map((i) => (
            <CommandItem key={i.id} value={i.label} keywords={i.keywords} icon={i.icon ?? I("article")} onSelect={() => { go(i.href!.slice(2)); setPalette(false); }}>{i.label}</CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Actions">
          <CommandItem value="toggle theme" icon={I("contrast")} shortcut="shift+d" onSelect={() => { toggle(); setPalette(false); }}>Toggle dark mode</CommandItem>
          <CommandItem value="new order" icon={I("add_shopping_cart")} shortcut="mod+shift+o" onSelect={() => { setPalette(false); toast.success("Draft order created"); }}>New order</CommandItem>
          <CommandItem value="invite teammate" icon={I("person_add")} description="Send an invite by email" onSelect={() => { setPalette(false); toast("Invite sent"); }}>Invite teammate</CommandItem>
        </CommandGroup>
      </CommandPalette>
    </SidebarProvider>
  );
}

/** Shows a trigger in the top bar when the sidebar is a rail or a drawer. */
function TopTrigger() {
  const s = useSidebar();
  return s.collapsed || s.isMobile ? <SidebarTrigger variant="pebble" /> : null;
}

function Page({ id }: { id: string }) {
  switch (id) {
    case "overview": return <Overview />;
    case "orders": return <Orders />;
    case "foundations": return <Foundations />;
    case "buttons": return <Buttons />;
    case "forms": return <Forms />;
    case "overlays": return <Overlays />;
    case "navigation": return <Navigation />;
    case "data": return <DataDisplay />;
    case "settings": return <Settings />;
    default: return <Placeholder title={titles[id] ?? id} />;
  }
}
