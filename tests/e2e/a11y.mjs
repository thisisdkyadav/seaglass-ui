// Browser accessibility audit: runs axe (including colour contrast, which needs real layout)
// on every docs route, in light and dark. Usage:
//   npm run build:site && npm run test:e2e            (serves site/dist on a free port)
//   BASE_URL=http://localhost:5173 npm run test:e2e   (against a running dev server)
// CHROMIUM=/path/to/chrome overrides the Playwright-managed browser.
import { chromium } from "playwright";
import { readFileSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join } from "node:path";

const axeSource = readFileSync(new URL("../../node_modules/axe-core/axe.min.js", import.meta.url), "utf8");
const registry = readFileSync(new URL("../../site/src/content/registry.ts", import.meta.url), "utf8");
const docs = readFileSync(new URL("../../site/src/content/docs.tsx", import.meta.url), "utf8");
const slugs = (src) => [...src.matchAll(/^\s*slug: "([a-z0-9-]+)"/gm)].map((m) => m[1]);
const routes = ["/", "/components", ...slugs(docs).map((s) => `/docs/${s}`), ...slugs(registry).map((s) => `/components/${s}`)];

let base = process.env.BASE_URL;
let server;
if (!base) {
  const root = new URL("../../site/dist/", import.meta.url).pathname;
  const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml", ".png": "image/png", ".txt": "text/plain", ".xml": "application/xml" };
  server = createServer((req, res) => {
    const path = decodeURIComponent(new URL(req.url, "http://x").pathname);
    let file = join(root, path);
    try { readFileSync(file); if (!extname(file)) throw 0; } catch { file = join(root, "index.html"); }
    res.writeHead(200, { "content-type": types[extname(file)] ?? "application/octet-stream" });
    res.end(readFileSync(file));
  }).listen(0);
  base = `http://localhost:${server.address().port}`;
}

const browser = await chromium.launch(process.env.CHROMIUM ? { executablePath: process.env.CHROMIUM } : {});
let failures = 0;
for (const theme of ["light", "dark"]) {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, reducedMotion: "reduce" });
  await ctx.addInitScript((t) => localStorage.setItem("sg-theme", t), theme);
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  for (const route of routes) {
    await page.goto(base + route, { waitUntil: "networkidle" });
    await page.addScriptTag({ content: axeSource });
    const result = await page.evaluate(async () => {
      const r = await window.axe.run(document, { resultTypes: ["violations"] });
      // Known false positives:
      // - Radix Tabs only mounts the active panel, so inactive triggers point aria-controls at
      //   an id that is not in the DOM yet. Screen readers ignore a dangling aria-controls.
      // - Disabled controls are exempt from WCAG 1.4.3; axe cannot tell a Radix checkbox's
      //   label is disabled because the control is a <button>.
      const ignored = (id, n) =>
        (id === "aria-valid-attr-value" && n.html.includes('role="tab"')) ||
        (id === "color-contrast" && n.target.join(" ").includes("[data-disabled"));
      for (const v of r.violations) v.nodes = v.nodes.filter((n) => !ignored(v.id, n));
      return r.violations.filter((v) => v.nodes.length).map((v) => ({ id: v.id, impact: v.impact, help: v.help, nodes: v.nodes.slice(0, 6).map((n) => ({ target: n.target.join(" "), summary: n.failureSummary?.split("\n").slice(1, 2).join(" ").trim() })) }));
    });
    for (const v of result) {
      failures++;
      console.log(`\n✗ [${theme}] ${route}  ${v.id} (${v.impact}): ${v.help}`);
      for (const n of v.nodes) console.log(`    ${n.target}\n      ${n.summary}`);
    }
  }
  if (errors.length) { failures += errors.length; console.log(`\n✗ [${theme}] page errors:\n  ` + errors.join("\n  ")); }
  await ctx.close();
}
await browser.close();
server?.close();
console.log(failures ? `\n${failures} problem(s) across ${routes.length} routes × 2 themes` : `\n✓ ${routes.length} routes × 2 themes: no axe violations`);
process.exit(failures ? 1 : 0);
