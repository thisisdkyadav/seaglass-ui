import type { ComponentType } from "react";
import { Pebble, Badge } from "seaglass-ui";
import { CodeBlock, C } from "../ui/code";
import { Callout, KeysTable } from "../ui/tables";
import { Example } from "../ui/example";
import { Link } from "../router";

export interface Doc { slug: string; title: string; summary: string; toc: { id: string; label: string }[]; Body: ComponentType }

const H2 = ({ id, children }: { id: string; children: React.ReactNode }) => <h2 id={id}><a href={`#${id}`}>{children}</a></h2>;

export const docs: Doc[] = [
  {
    slug: "introduction", title: "Introduction",
    summary: "React components made of frosted sea glass. Accessible, keyboard-first and themable.",
    toc: [{ id: "what", label: "What it is" }, { id: "principles", label: "Principles" }, { id: "stack", label: "Under the hood" }, { id: "next", label: "Next steps" }],
    Body: () => (
      <>
        <H2 id="what">What it is</H2>
        <p>
          Sea Glass UI is an open-source component library for React. Every surface is a small, smooth pebble of frosted
          sea glass resting on white paper: thick in the middle, rounding down to its edges, lit by one fixed lamp at the
          top left and casting a soft shadow. It is matte and calm, not glossy.
        </p>
        <p>
          You get around fifty components — buttons, forms, menus, dialogs, a command palette, a data table and a complete
          sidebar app shell — that share that single material.
        </p>
        <H2 id="principles">Principles</H2>
        <ul className="site-list">
          <li><b>Accessible by default.</b> Behaviour comes from Radix primitives, so focus management, ARIA and screen-reader support are built in.</li>
          <li><b>Keyboard-first.</b> Every component works without a mouse, and app-level shortcuts (⌘K, <C>[</C>, <C>/</C>, Shift D) are built in and configurable.</li>
          <li><b>One material, any colour.</b> A tint is one hue / saturation / lightness triple. Body, rim, shadow and text are derived from it.</li>
          <li><b>Plain CSS.</b> No CSS-in-JS runtime, no Tailwind requirement. Classes, data attributes and custom properties in a cascade layer you can override.</li>
          <li><b>A real dark mode.</b> Not a black screen — a dim, warm room lit by one lamp.</li>
        </ul>
        <H2 id="stack">Under the hood</H2>
        <ul className="site-list">
          <li><a href="https://www.radix-ui.com/primitives" target="_blank" rel="noreferrer">Radix Primitives</a> for overlays, menus, form controls and focus.</li>
          <li><a href="https://cmdk.paco.me/" target="_blank" rel="noreferrer">cmdk</a> for the command palette and combobox search.</li>
          <li>ESM and CommonJS builds, one file per module, so bundlers only ship what you import. Types included. Marked <C>"use client"</C> for React Server Components.</li>
        </ul>
        <H2 id="next">Next steps</H2>
        <div className="site-next">
          <Link to="/docs/installation" className="site-next-card sg-pebble" data-tone="periwinkle" data-depth="sm"><b>Installation</b><span>Add the package and the stylesheet.</span></Link>
          <Link to="/components/button" className="site-next-card sg-pebble" data-tone="seafoam" data-depth="sm"><b>Browse components</b><span>Live examples, code and props.</span></Link>
          <Link to="/docs/theming" className="site-next-card sg-pebble" data-tone="amber" data-depth="sm"><b>Theming</b><span>Tones, tokens and your own colours.</span></Link>
        </div>
      </>
    ),
  },
  {
    slug: "installation", title: "Installation",
    summary: "Add the package, import the stylesheet once and wrap your app.",
    toc: [{ id: "install", label: "Install" }, { id: "styles", label: "Import the styles" }, { id: "providers", label: "Add the providers" }, { id: "font", label: "Font" }, { id: "frameworks", label: "Frameworks" }],
    Body: () => (
      <>
        <H2 id="install">Install</H2>
        <p>React 18 or newer is required. Radix and cmdk come along as dependencies.</p>
        <CodeBlock lang="sh" code="npm install seaglass-ui" />
        <p className="site-muted">Using pnpm, yarn or bun? <C>pnpm add seaglass-ui</C> · <C>yarn add seaglass-ui</C> · <C>bun add seaglass-ui</C></p>
        <H2 id="styles">Import the styles</H2>
        <p>Import the stylesheet once, at your app's entry point. It is about 68 kB of plain CSS inside <C>@layer seaglass</C>, so your own unlayered CSS always wins.</p>
        <CodeBlock code={`import "seaglass-ui/styles.css";`} />
        <H2 id="providers">Add the providers</H2>
        <p>
          <C>ThemeProvider</C> handles light and dark, <C>TooltipProvider</C> shares tooltip timing and <C>Toaster</C> renders
          notifications. All three are optional, but most apps want them.
        </p>
        <CodeBlock code={`import "seaglass-ui/styles.css";
import { ThemeProvider, TooltipProvider, Toaster, Button, toast } from "seaglass-ui";

export function App() {
  return (
    <ThemeProvider>
      <TooltipProvider>
        <Button tone="primary" onClick={() => toast.success("Saved")}>
          Save
        </Button>
        <Toaster />
      </TooltipProvider>
    </ThemeProvider>
  );
}`} />
        <Callout title="Page background">
          ThemeProvider adds the <C>sg-root</C> class to <C>&lt;body&gt;</C>, which sets the paper colour, ink and font. Without it, add <C>className="sg-root"</C> to your own root element.
        </Callout>
        <H2 id="font">Font</H2>
        <p>The components are designed around <a href="https://fonts.google.com/specimen/Outfit" target="_blank" rel="noreferrer">Outfit</a>, weights 400–700. It is not bundled; load it however you load fonts, or set <C>--sg-font</C> to your own.</p>
        <CodeBlock lang="sh" code={`<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap" />`} />
        <H2 id="frameworks">Frameworks</H2>
        <ul className="site-list">
          <li><b>Vite, Create React App, Parcel</b> — works as is.</li>
          <li><b>Next.js App Router</b> — every module is marked <C>"use client"</C>, so you can import components straight into server components. Import the CSS in <C>app/layout.tsx</C>.</li>
          <li><b>Remix / React Router</b> — add the stylesheet to your root <C>links</C>.</li>
        </ul>
      </>
    ),
  },
  {
    slug: "theming", title: "Theming",
    summary: "Tones, tokens and your own colours.",
    toc: [{ id: "tones", label: "Tones" }, { id: "custom", label: "Custom colours" }, { id: "tokens", label: "Design tokens" }, { id: "overriding", label: "Overriding styles" }],
    Body: () => (
      <>
        <H2 id="tones">Tones</H2>
        <p>
          Almost every component takes a <C>tone</C>. There are eleven tints — the colours real beach glass comes in — plus
          semantic aliases that map onto them.
        </p>
        <div className="site-tone-grid">
          {([["clear", "neutral"], ["periwinkle", "primary"], ["aqua", "info"], ["sky"], ["seafoam"], ["mint", "success"], ["lilac"], ["coral", "danger"], ["rose"], ["amber", "warning"], ["sand"]] as const).map(([t, alias]) => (
            <Pebble key={t} tone={t} depth="sm" radius="18px" className="site-tone">
              <b>{t}</b>
              {alias && <small>{alias}</small>}
            </Pebble>
          ))}
        </div>
        <H2 id="custom">Custom colours</H2>
        <p>
          A tint is one hue / saturation / lightness triple: <C>--h</C>, <C>--s</C> and <C>--l</C>. Everything else — the
          body, the milky rim, the cloudy core, the bright lip, the tinted shadow and the dark text — is derived from it.
          Set the triple on any component:
        </p>
        <Example example={{ id: "pebble/custom-tint", title: "Inline tint" }} />
        <p>Or name your own tone once in CSS and use it anywhere:</p>
        <CodeBlock lang="css" code={`[data-tone="brand"] { --h: 172; --s: 45%; --l: 80%; }

/* or retune a built-in one */
[data-tone="periwinkle"] { --h: 228; }`} />
        <CodeBlock code={`<Button tone={"brand" as Tone}>Brand</Button>`} />
        <p className="site-muted">Keep lightness between about 78% and 88%: sea glass is pale and sun-bleached. Text on a pebble is drawn in a very dark shade of its own hue, so it stays readable.</p>
        <H2 id="tokens">Design tokens</H2>
        <p>Everything global is a custom property on <C>:root</C>, redefined under <C>[data-sg-theme="dark"]</C>.</p>
        <div className="site-table-scroll">
          <table className="site-props">
            <thead><tr><th>Token</th><th>Controls</th></tr></thead>
            <tbody>
              {[
                ["--sg-font, --sg-font-mono", "Typefaces"],
                ["--sg-text-2xs … --sg-text-2xl", "Type scale (11, 12, 13, 14, 16, 18, 24px)"],
                ["--sg-space-1 … --sg-space-8", "Spacing on a 4px grid"],
                ["--sg-control-xs … --sg-control-lg", "Control heights shared by buttons, inputs, selects and segments (28, 32, 38, 44px)"],
                ["--sg-icon-sm … --sg-icon-lg", "Icon sizes inside controls (14, 16, 18px)"],
                ["--sg-radius-xs … --sg-radius-full", "Corner radii (6, 10, 12, 18, 24px, pill)"],
                ["--sg-page", "Paper colour behind everything"],
                ["--sg-ink, --sg-ink-muted, --sg-ink-faint", "Text colours"],
                ["--sg-line", "Hairlines and borders"],
                ["--sg-focus, --sg-focus-ring, --sg-invalid-ring", "Keyboard focus and error rings"],
                ["--sg-chip, --sg-chip-shadow", "White chips marking active states"],
                ["--sg-well, --sg-well-shadow", "Sunken inputs"],
                ["--sg-shade, --sg-shade-alpha", "Colour and strength of cast shadows"],
                ["--sg-ease, --sg-spring, --sg-dur", "Motion"],
                ["--sg-z-*", "Stacking of sticky bars, overlays, popovers, toasts, tooltips"],
              ].map(([t, d]) => <tr key={t}><td><code>{t}</code></td><td>{d}</td></tr>)}
            </tbody>
          </table>
        </div>
        <H2 id="overriding">Overriding styles</H2>
        <p>
          The stylesheet lives in <C>@layer seaglass</C>. Unlayered CSS beats layered CSS regardless of specificity, so a
          plain class in your app overrides any component style. Every component accepts <C>className</C> and
          <C>style</C>, and state is exposed through <C>data-*</C> attributes (<C>data-state</C>, <C>data-tone</C>,
          <C>data-size</C>…) you can target.
        </p>
        <CodeBlock lang="css" code={`.my-cta { --sg-r: 14px; font-weight: 700; }
.sg-button[data-size="lg"] { min-height: 56px; }`} />
      </>
    ),
  },
  {
    slug: "dark-mode", title: "Dark mode",
    summary: "A dim, warm room lit by one lamp.",
    toc: [{ id: "idea", label: "The idea" }, { id: "usage", label: "Usage" }, { id: "ssr", label: "Avoiding a flash" }],
    Body: () => (
      <>
        <H2 id="idea">The idea</H2>
        <p>
          Dark mode here is not a black screen. The page turns a warm sand-brown with a soft pool of brighter light near
          the top left that falls off towards the corners. Shadows turn warm brown, and pebbles keep their tints, slightly
          muted by the room light. Press <b>Shift + D</b> to see it on this page.
        </p>
        <H2 id="usage">Usage</H2>
        <p><C>ThemeProvider</C> sets <C>data-sg-theme</C> on <C>&lt;html&gt;</C>, follows the system setting until the user chooses, and remembers the choice. <C>useTheme</C> reads and changes it.</p>
        <Example example={{ id: "theme/toggle", title: "Theme switcher" }} />
        <CodeBlock code={`<ThemeProvider defaultTheme="system" storageKey="my-app-theme" toggleHotkey="shift+d">
  <App />
</ThemeProvider>`} />
        <H2 id="ssr">Avoiding a flash</H2>
        <p>With server rendering, set the attribute before React loads so the first paint is already in the right theme:</p>
        <CodeBlock lang="sh" code={`<script>
  try {
    var t = localStorage.getItem("sg-theme") || "system";
    var dark = t === "dark" || (t === "system" && matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.dataset.sgTheme = dark ? "dark" : "light";
  } catch (e) {}
</script>`} />
      </>
    ),
  },
  {
    slug: "keyboard", title: "Keyboard",
    summary: "Every component works without a mouse. App shortcuts are built in and configurable.",
    toc: [{ id: "global", label: "App shortcuts" }, { id: "components", label: "Inside components" }, { id: "own", label: "Your own shortcuts" }],
    Body: () => (
      <>
        <H2 id="global">App shortcuts</H2>
        <p>These are on by default when you use the matching component. All of them work on this site.</p>
        <KeysTable rows={[
          ["⌘ K / Ctrl K", "Open the command palette (CommandPalette)"],
          ["[ / ⌘ B / Ctrl B", "Collapse or expand the sidebar (SidebarProvider)"],
          ["/", "Search the sidebar nav"],
          ["Shift + D", "Toggle light and dark (ThemeProvider)"],
          ["F8", "Focus the notifications (Toaster)"],
          ["Esc", "Close whatever is open"],
        ]} />
        <p>Change or turn off any of them with a prop: <C>hotkey</C>, <C>hotkeys</C>, <C>searchHotkey</C>, <C>toggleHotkey</C>. Pass <C>false</C> to disable. Shortcuts never fire while you're typing in a field.</p>
        <H2 id="components">Inside components</H2>
        <p>Each component page lists its own keys. The common patterns:</p>
        <KeysTable rows={[
          ["Tab / Shift + Tab", "Move between components"],
          ["↑ ↓ ← →", "Move within menus, lists, tabs, radio groups, the calendar"],
          ["Home / End", "First / last item"],
          ["Enter / Space", "Activate or choose"],
          ["A–Z", "Jump to a matching menu item or option"],
        ]} />
        <H2 id="own">Your own shortcuts</H2>
        <p>The same hook the components use is exported. <C>mod</C> means ⌘ on Apple devices and Ctrl elsewhere, and <C>Kbd</C> renders combos with the right symbols.</p>
        <CodeBlock code={`import { useHotkeys, Kbd } from "seaglass-ui";

useHotkeys("mod+s", save);
useHotkeys(["j", "arrowdown"], next);

<Kbd keys="mod+s" />  // ⌘ S on Mac, Ctrl S elsewhere`} />
        <p><Link to="/components/hooks">See the hooks page</Link> for options.</p>
      </>
    ),
  },
  {
    slug: "design", title: "Design language",
    summary: "Frosted sea-glass pebbles, domed and softly lit from the top left, resting on white paper.",
    toc: [{ id: "material", label: "Material" }, { id: "shape", label: "Shape" }, { id: "light", label: "Light" }, { id: "colour", label: "Colour" }, { id: "details", label: "Details" }, { id: "rules", label: "Rules of thumb" }],
    Body: () => (
      <>
        <p>Every interactive surface is a small, smooth pebble of frosted sea glass resting on a sheet of paper. Not a flat card, and not glossy “liquid glass”: matte, soft and worn, like something the sea has tumbled for years.</p>
        <H2 id="material">Material</H2>
        <ul className="site-list">
          <li><b>Frosted, not clear.</b> The body is milky and translucent; it softens what is behind it but never shows it sharply.</li>
          <li><b>Fine flecks.</b> Tiny light chips and darker pits, like real worn glass, crisp on a slightly soft body.</li>
          <li><b>Uneven top.</b> Gentle rises and dips across the surface, so it never reads as a flat plateau.</li>
          <li><b>Cloudy core.</b> Denser and deeper in the middle; paler at the edges; lightest along the bottom, where light leaks out.</li>
        </ul>
        <H2 id="shape">Shape</H2>
        <ul className="site-list">
          <li><b>Straight, clean outlines.</b> Rounded rectangles or full pills. The organic feel comes from the surface, never wobbly edges.</li>
          <li><b>Domed thickness.</b> The edge facing the light turns milky-bright; the far edge rolls into deeper colour.</li>
          <li><b>Generous rounding.</b> Pills for controls, 20–32px corners for cards, circles for avatars and icon buttons.</li>
        </ul>
        <H2 id="light">Light</H2>
        <ul className="site-list">
          <li><b>One fixed lamp, up and to the left.</b> Nothing reacts to the pointer.</li>
          <li><b>Every pebble casts a soft, tinted shadow down and to the right.</b> Shadow length scales with size, so everything appears to rest at the same height.</li>
          <li><b>Hover lifts, press sinks.</b></li>
        </ul>
        <div className="site-row">
          <Pebble tone="periwinkle" depth="lg" className="site-demo-pebble">lg</Pebble>
          <Pebble tone="seafoam" depth="md" className="site-demo-pebble">md</Pebble>
          <Pebble tone="amber" depth="sm" className="site-demo-pebble">sm</Pebble>
          <Pebble tone="rose" depth="xs" className="site-demo-pebble">xs</Pebble>
        </div>
        <H2 id="colour">Colour</H2>
        <ul className="site-list">
          <li><b>Pale, sun-bleached tints</b> — periwinkle, seafoam, aqua, lilac, coral, amber, mint — plus a clear milky grey.</li>
          <li><b>One recipe for every colour.</b> Body, rim, core, lip and shadow all derive from one h/s/l triple.</li>
          <li><b>Text takes the pebble's own hue, very dark</b> — never plain black on colour.</li>
          <li><b>The page is white paper.</b> Colour lives only in the pebbles.</li>
        </ul>
        <H2 id="details">Details</H2>
        <ul className="site-list">
          <li><b>White chips inside pebbles</b> mark active or selected states, like a smooth shell resting on the stone.</li>
          <li><b>Sunken fields.</b> Inputs are pressed into the surface, never raised.</li>
          <li><b>Charts are pebbles too.</b> Each bar is its own small stone.</li>
          <li><b>Motion</b> is soft and slightly springy. Menus fold open; nothing snaps. Reduced motion is respected.</li>
        </ul>
        <H2 id="rules">Rules of thumb</H2>
        <div className="site-dos">
          <div className="site-do"><Badge tone="mint" variant="pebble">Do</Badge><p>Keep outlines straight · use one light direction · give every pebble a shadow · let colour come from tints · leave white space so pebbles have room to cast shadows.</p></div>
          <div className="site-do"><Badge tone="coral" variant="pebble">Don't</Badge><p>Glossy highlights · sharp reflections · distorted borders · hard drop shadows · saturated colours · black text on colour · light that follows the cursor.</p></div>
        </div>
      </>
    ),
  },
];

export const docBySlug = new Map(docs.map((d) => [d.slug, d]));
