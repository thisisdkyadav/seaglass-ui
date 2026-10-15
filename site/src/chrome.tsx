// Pieces shared by the home page header and the docs top bar.
import { useState } from "react";
import { Pebble, Button, IconButton, Kbd, Tooltip, CommandPalette, CommandGroup, CommandItem, useTheme } from "seaglass-ui";
import { Search, Sun, Moon, FileText, Component, Contrast } from "lucide-react";
import { navigate } from "./router";
import { docs } from "./content/docs";
import { registry } from "./content/registry";
import { REPO_URL } from "./content/nav";

export function Logo({ size = 44 }: { size?: number }) {
  return (
    <Pebble tone="aqua" depth="sm" radius={`${Math.round(size * 0.34)}px`} className="site-logo" style={{ width: size, height: size }} aria-hidden>
      <svg viewBox="0 0 24 24" width={size * 0.5} height={size * 0.5} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
        <path d="M3 9c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
        <path d="M3 15c2-2 4-2 6 0s4 2 6 0 4-2 6 0" opacity=".55" />
      </svg>
    </Pebble>
  );
}

/** ⌘K search over every page. Returns the palette element and an opener. */
export function useSearch() {
  const [open, setOpen] = useState(false);
  const { toggle } = useTheme();
  const go = (to: string) => { setOpen(false); navigate(to); };
  const palette = (
    <CommandPalette open={open} onOpenChange={setOpen} placeholder="Search docs and components…">
      <CommandGroup heading="Getting started">
        {docs.map((d) => (
          <CommandItem key={d.slug} value={`doc ${d.title}`} keywords={[d.summary]} icon={<FileText />} description={d.summary} onSelect={() => go(`/docs/${d.slug}`)}>{d.title}</CommandItem>
        ))}
      </CommandGroup>
      <CommandGroup heading="Components">
        {registry.map((e) => (
          <CommandItem key={e.slug} value={`component ${e.name}`} keywords={[e.summary, e.group]} icon={<Component />} description={e.group} onSelect={() => go(`/components/${e.slug}`)}>{e.name}</CommandItem>
        ))}
      </CommandGroup>
      <CommandGroup heading="Actions">
        <CommandItem value="toggle dark mode theme" icon={<Contrast />} shortcut="shift+d" onSelect={() => { setOpen(false); toggle(); }}>Toggle dark mode</CommandItem>
      </CommandGroup>
    </CommandPalette>
  );
  return { open: () => setOpen(true), palette };
}

export function SearchButton({ onOpen }: { onOpen: () => void }) {
  return (
    <Button variant="soft" tone="clear" icon={<Search />} onClick={onOpen} className="site-search-btn">
      <span className="site-search-label">Search</span> <Kbd keys="mod+k" />
    </Button>
  );
}

export function ThemeButton() {
  const { resolved, toggle } = useTheme();
  return (
    <Tooltip content={resolved === "dark" ? "Lights on" : "Dim the lights"} shortcut="shift+d">
      <IconButton aria-label="Toggle dark mode" tone="clear" onClick={toggle}>{resolved === "dark" ? <Sun /> : <Moon />}</IconButton>
    </Tooltip>
  );
}

export function GithubButton() {
  if (!REPO_URL) return null;
  return (
    <Tooltip content="Source on GitHub">
      <IconButton aria-label="GitHub repository" tone="clear" asChild>
        <a href={REPO_URL} target="_blank" rel="noreferrer">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden><path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.26 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" /></svg>
        </a>
      </IconButton>
    </Tooltip>
  );
}
