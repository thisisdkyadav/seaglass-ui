// Renders the social preview card (site/public/og.png, 1200×630) from the real components.
// Run after `npm run build`:  node scripts/og-image.mjs   (CHROMIUM=/path/to/chrome optional)
import { createElement as h } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { readFileSync } from "node:fs";
import { chromium } from "playwright";
import { Badge, Button, Pebble, SegmentedControl, Switch, Progress, Input, Kbd } from "../dist/index.js";

const css = readFileSync(new URL("../dist/seaglass.css", import.meta.url), "utf8");
const logo = h("svg", { width: 34, height: 34, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.9, strokeLinecap: "round" },
  h("path", { d: "M3 9c2-1.6 4-1.6 6 0s4 1.6 6 0 4-1.6 6 0M3 14c2-1.6 4-1.6 6 0s4 1.6 6 0 4-1.6 6 0" }));

const card = h("div", { className: "og" },
  h("div", { className: "og-text" },
    h("div", { className: "og-brand" },
      h(Pebble, { tone: "aqua", depth: "md", radius: "20px", style: { width: 68, height: 68, display: "grid", placeItems: "center" } }, logo),
      h("span", null, "Sea Glass UI")),
    h("h1", null, "Frosted, accessible", h("br"), "React components"),
    h("p", null, "Tumbled-glass pebbles on white paper. Keyboard-first, themable, warm dark mode, right-to-left."),
    h("div", { className: "og-install sg-well" }, h("code", null, "npm install seaglass-ui"))),
  h("div", { className: "og-art" },
    h("div", { className: "og-row" },
      h(Button, { tone: "primary", size: "lg" }, "Save changes"),
      h(Button, { size: "lg" }, "Cancel")),
    h("div", { className: "og-row" },
      h(Badge, { tone: "mint", dot: true }, "Paid"),
      h(Badge, { tone: "amber", dot: true }, "Pending"),
      h(Badge, { tone: "lilac", variant: "pebble" }, "Pebble"),
      h(Kbd, { keys: "mod+k" })),
    h(SegmentedControl, { "aria-label": "Range", defaultValue: "week", options: [{ value: "day", label: "Day" }, { value: "week", label: "Week" }, { value: "month", label: "Month" }] }),
    h("div", { className: "og-row" },
      h(Switch, { defaultChecked: true, "aria-label": "On" }),
      h("div", { style: { flex: 1 } }, h(Progress, { value: 62, tone: "periwinkle", "aria-label": "Level" }))),
    h(Input, { placeholder: "Search components…", style: { width: "100%" } }),
    h("div", { className: "og-row" },
      h(Pebble, { tone: "rose", depth: "sm", radius: "50%", style: { width: 40, height: 40 } }),
      h(Pebble, { tone: "sky", depth: "sm", radius: "50%", style: { width: 40, height: 40 } }),
      h(Pebble, { tone: "amber", depth: "sm", style: { width: 72, height: 40 } }),
      h(Pebble, { tone: "coral", depth: "sm", style: { width: 56, height: 40 } }),
      h(Pebble, { tone: "seafoam", depth: "sm", radius: "50%", style: { width: 40, height: 40 } }))));

const html = `<!doctype html><html data-sg-theme="light"><head><meta charset="utf-8" />
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap" rel="stylesheet" />
<style>${css}
html, body { margin: 0; }
.og { width: 1200px; height: 630px; box-sizing: border-box; padding: 64px 72px; display: grid; grid-template-columns: 1fr 440px; gap: 56px; align-items: center;
  background: radial-gradient(900px 500px at 15% 0%, hsl(186 60% 96%), #fff 70%); }
.og-brand { display: flex; align-items: center; gap: 18px; font-size: 30px; font-weight: 600; color: hsl(186 50% 22%); }
.og h1 { margin: 34px 0 18px; font-size: 62px; line-height: 1.05; letter-spacing: -.03em; font-weight: 600; color: #1f2430; }
.og p { margin: 0 0 30px; font-size: 22px; line-height: 1.45; color: #5f6573; max-width: 560px; }
.og-install { display: inline-flex; padding: 14px 20px; border-radius: 16px; font-size: 20px; }
.og-install code { font-family: ui-monospace, "SF Mono", Menlo, monospace; color: #1f2430; }
.og-art { display: grid; gap: 26px; padding: 34px; border-radius: 30px; background: rgb(255 255 255 / .6); box-shadow: 0 30px 60px -30px rgb(40 50 70 / .25), inset 0 0 0 1px rgb(60 70 90 / .06); }
.og-row { display: flex; align-items: center; gap: 14px; }
</style></head><body class="sg-root">${renderToStaticMarkup(card)}</body></html>`;

const browser = await chromium.launch(process.env.CHROMIUM ? { executablePath: process.env.CHROMIUM } : {});
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await page.setContent(html, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: new URL("../site/public/og.png", import.meta.url).pathname });
await browser.close();
console.log("site/public/og.png");
