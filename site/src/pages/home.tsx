import { useState } from "react";
import {
  Button, Badge, Card, CardHeader, Field, Input, Switch, SegmentedControl, Avatar, AvatarGroup, Stat, Slider,
  Tabs, TabsList, Tab, Kbd, Checkbox, Progress, IconButton, Tooltip, toast,
} from "seaglass-ui";
import {
  ArrowRight, Accessibility, Keyboard, Palette, Moon, Package, FileCode2, Search, Wallet, Heart, Share2, Bell,
} from "lucide-react";
import { Link, navigate } from "../router";
import { Logo, SearchButton, ThemeButton, GithubButton, useSearch } from "../chrome";
import { CopyButton } from "../ui/code";
import { ComponentGrid } from "./component-grid";
import { VERSION } from "../content/nav";

export function Home() {
  const search = useSearch();
  return (
    <div className="site-home">
      <header className="site-home-header">
        <Link to="/" className="site-brand" aria-label="Sea Glass UI home"><Logo size={32} /><b>Sea Glass UI</b></Link>
        <nav className="site-home-nav" aria-label="Main">
          <Link to="/docs/introduction">Docs</Link>
          <Link to="/components">Components</Link>
          <Link to="/docs/theming">Theming</Link>
        </nav>
        <div className="site-topbar-actions">
          <SearchButton onOpen={search.open} />
          <ThemeButton />
          <GithubButton />
        </div>
      </header>

      <main id="main">
        <section className="site-hero">
          <div className="site-hero-text">
            <Badge tone="seafoam" variant="pebble" dot>v{VERSION} · open source</Badge>
            <h1>Frosted sea-glass components for React</h1>
            <p>
              Accessible, keyboard-first building blocks made of one calm material: smooth pebbles of tumbled glass,
              lit by a single lamp and resting on white paper.
            </p>
            <div className="site-hero-actions">
              <Button size="lg" tone="primary" iconEnd={<ArrowRight />} onClick={() => navigate("/docs/installation")}>Get started</Button>
              <Button size="lg" tone="clear" onClick={() => navigate("/components")}>Browse components</Button>
            </div>
            <div className="site-install sg-well">
              <code><span className="site-faint">$</span> npm install seaglass-ui</code>
              <CopyButton text="npm install seaglass-ui" label="Copy install command" />
            </div>
          </div>
          <Showcase />
        </section>

        <section className="site-features" aria-labelledby="features">
          <h2 id="features" className="sg-visually-hidden">Features</h2>
          {features.map((f) => (
            <div key={f.title} className="site-feature">
              <span className="site-feature-icon sg-pebble" data-tone={f.tone} data-depth="xs">{f.icon}</span>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </div>
          ))}
        </section>

        <section className="site-home-components" aria-labelledby="components">
          <div className="site-section-head">
            <h2 id="components">Everything an app needs</h2>
            <p>From buttons to a complete sidebar shell, each with live examples, source and props.</p>
          </div>
          <ComponentGrid />
        </section>

        <section className="site-cta sg-pebble" data-tone="periwinkle" data-depth="md">
          <div>
            <h2>Start in a minute</h2>
            <p>Install the package, import one stylesheet, and wrap your app in ThemeProvider.</p>
          </div>
          <Button size="lg" tone="clear" iconEnd={<ArrowRight />} onClick={() => navigate("/docs/installation")}>Read the guide</Button>
        </section>
      </main>

      <footer className="site-home-footer">
        <span><Logo size={24} /> Sea Glass UI</span>
        <nav aria-label="Footer">
          <Link to="/docs/introduction">Docs</Link>
          <Link to="/components">Components</Link>
          <Link to="/docs/design">Design language</Link>
          <Link to="/docs/keyboard">Keyboard</Link>
        </nav>
        <span className="site-faint">MIT licensed</span>
      </footer>
      {search.palette}
    </div>
  );
}

const features = [
  { icon: <Accessibility />, tone: "periwinkle", title: "Accessible", text: "Built on Radix primitives: focus management, ARIA and screen-reader support come for free." },
  { icon: <Keyboard />, tone: "seafoam", title: "Keyboard-first", text: "Every component works without a mouse. ⌘K, sidebar and theme shortcuts are built in and configurable." },
  { icon: <Palette />, tone: "amber", title: "One material, any colour", text: "A tint is one hue / saturation / lightness triple. Rim, core, shadow and text are derived from it." },
  { icon: <Moon />, tone: "lilac", title: "A warm dark mode", text: "Not a black screen: a dim room lit by one lamp. Press Shift + D to try it." },
  { icon: <Package />, tone: "mint", title: "Tree-shakeable and typed", text: "ESM and CJS, one file per module, full TypeScript types, ready for Server Components." },
  { icon: <FileCode2 />, tone: "coral", title: "Plain CSS", text: "No CSS-in-JS runtime, no Tailwind needed. Tokens and a cascade layer your own styles always beat." },
] as const;

/** A small composition of real components. */
function Showcase() {
  const [plan, setPlan] = useState("pro");
  const [vol, setVol] = useState([64]);
  return (
    <div className="site-showcase" aria-label="Component showcase">
      <Card className="site-show-profile" padding="md">
        <div className="site-show-row">
          <Avatar name="Mia Chen" size="lg" tone="rose" status="online" />
          <div className="site-show-grow">
            <b>Mia Chen</b>
            <small className="site-muted">Product designer</small>
          </div>
          <Tooltip content="Notify me">
            <IconButton aria-label="Notify me" tone="clear" size="sm"><Bell /></IconButton>
          </Tooltip>
        </div>
        <div className="site-show-row site-show-actions">
          <Button tone="rose" icon={<Heart />} onClick={() => toast.success("Followed Mia")}>Follow</Button>
          <Button variant="soft" tone="clear" icon={<Share2 />} onClick={() => toast("Link copied")}>Share</Button>
        </div>
      </Card>

      <Stat className="site-show-stat" tone="seafoam" label="Revenue" icon={<Wallet />} value="$48,295" delta="+12.4%" data={[12, 18, 15, 22, 19, 27, 31, 29, 36]} />

      <Card className="site-show-form" padding="md">
        <CardHeader titleAs="h2" title="Your plan" description="Change any time." />
        <div className="site-show-stack">
          <SegmentedControl aria-label="Plan" variant="joined" value={plan} onValueChange={setPlan} options={[{ value: "free", label: "Free" }, { value: "pro", label: "Pro" }, { value: "team", label: "Team" }]} />
          <Field label="Work email">
            <Input placeholder="you@company.com" leading={<Search size={16} />} />
          </Field>
          <Switch label="Weekly digest" defaultChecked />
          <Checkbox label="Share usage data" />
        </div>
      </Card>

      <Card className="site-show-misc" padding="md">
        <Tabs defaultValue="week">
          <TabsList aria-label="Range">
            <Tab value="day">Day</Tab>
            <Tab value="week">Week</Tab>
            <Tab value="month">Month</Tab>
          </TabsList>
        </Tabs>
        <Slider aria-label="Volume" value={vol} onValueChange={setVol} />
        <Progress value={vol[0]} tone="periwinkle" size="sm" label="Storage" showValue />
        <div className="site-show-row">
          <AvatarGroup max={4}>
            {["Ava Thompson", "Leo Martins", "Noah Patel", "Isla Romero", "Kai Nakamura", "Zara Okafor"].map((n) => <Avatar key={n} name={n} />)}
          </AvatarGroup>
          <span className="site-show-grow" />
          <Kbd keys="mod+k" />
        </div>
      </Card>
    </div>
  );
}
