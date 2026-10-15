import type { NavSection } from "seaglass-ui";
import { BookOpen, Download, Palette, Moon, Keyboard, Waves, LayoutGrid } from "lucide-react";
import { docs } from "./docs";
import { registry, groups } from "./registry";

/** Set this once the repository is public; the GitHub buttons stay hidden while it is empty. */
export const REPO_URL = "https://github.com/thisisdkyadav/seaglass";
export const VERSION = "0.1.0";

const docIcons: Record<string, React.ReactNode> = {
  introduction: <BookOpen size={20} />, installation: <Download size={20} />, theming: <Palette size={20} />,
  "dark-mode": <Moon size={20} />, keyboard: <Keyboard size={20} />, design: <Waves size={20} />,
};

export const sections: NavSection[] = [
  {
    id: "start", title: "Getting started", collapsible: false,
    items: [
      ...docs.map((d) => ({ id: `docs/${d.slug}`, label: d.title, href: `/docs/${d.slug}`, icon: docIcons[d.slug] })),
      { id: "components", label: "All components", href: "/components", icon: <LayoutGrid size={20} /> },
    ],
  },
  ...groups.map((g) => ({
    id: g.toLowerCase().replace(/\s+/g, "-"),
    title: g,
    items: registry.filter((e) => e.group === g).map((e) => ({
      id: `components/${e.slug}`, label: e.name, href: `/components/${e.slug}`, keywords: [e.summary],
    })),
  })),
];
