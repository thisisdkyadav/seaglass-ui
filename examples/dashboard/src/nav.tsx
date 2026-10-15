import type { NavSection } from "seaglass";

const I = (name: string) => <span className="ms">{name}</span>;

export const sections: NavSection[] = [
  {
    id: "main",
    items: [
      { id: "overview", label: "Overview", icon: I("space_dashboard"), href: "#/overview" },
      {
        id: "sales", label: "Sales", icon: I("shopping_bag"), badge: 12,
        children: [
          { id: "orders", label: "Orders", href: "#/orders", badge: 12 },
          { id: "invoices", label: "Invoices", href: "#/invoices" },
          {
            id: "returns", label: "Returns",
            children: [
              { id: "returns-open", label: "Open", href: "#/returns-open", badge: 3, badgeTone: "amber" },
              { id: "returns-done", label: "Resolved", href: "#/returns-done" },
            ],
          },
        ],
      },
      { id: "inbox", label: "Inbox", icon: I("inbox"), href: "#/inbox", badge: 4, badgeTone: "periwinkle" },
    ],
  },
  {
    id: "components",
    title: "Components",
    items: [
      { id: "foundations", label: "Foundations", icon: I("palette"), href: "#/foundations", keywords: ["tone", "pebble", "colour"] },
      { id: "buttons", label: "Buttons & badges", icon: I("smart_button"), href: "#/buttons", keywords: ["avatar", "kbd", "progress"] },
      { id: "forms", label: "Forms", icon: I("edit_note"), href: "#/forms", keywords: ["input", "select", "combobox", "date", "checkbox", "switch", "slider"] },
      { id: "overlays", label: "Overlays", icon: I("layers"), href: "#/overlays", tag: "new", keywords: ["dialog", "sheet", "menu", "popover", "toast", "command"] },
      { id: "navigation", label: "Navigation", icon: I("signpost"), href: "#/navigation", keywords: ["tabs", "accordion", "breadcrumbs", "pagination"] },
      { id: "data", label: "Data display", icon: I("table_chart"), href: "#/data", keywords: ["table", "stat", "chart", "calendar"] },
    ],
  },
  {
    id: "pinned",
    title: "Pinned",
    items: [
      { id: "q4", label: "Q4 launch", dot: "coral", href: "#/q4" },
      { id: "brand", label: "Brand refresh", dot: "seafoam", href: "#/brand" },
      { id: "hiring", label: "Hiring plan", dot: "lilac", href: "#/hiring" },
    ],
  },
  {
    id: "workspace",
    title: "Workspace",
    items: [
      {
        id: "settings", label: "Settings", icon: I("settings"),
        children: [
          { id: "settings-general", label: "General", href: "#/settings" },
          { id: "settings-billing", label: "Billing", href: "#/billing", tag: "pro" },
          { id: "settings-team", label: "Team", href: "#/team" },
        ],
      },
      { id: "help", label: "Help & docs", icon: I("help"), href: "#/help" },
    ],
  },
];

export const titles: Record<string, string> = {
  overview: "Overview", orders: "Orders", foundations: "Foundations", buttons: "Buttons & badges", forms: "Forms",
  overlays: "Overlays", navigation: "Navigation", data: "Data display", settings: "Settings",
};
