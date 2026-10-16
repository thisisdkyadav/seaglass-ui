// Generates the reference files of the agent skill in skills/seaglass-ui from the library
// itself, so they never drift: the design language, the stylesheet, and one page per
// component with its API, example source (React) and the HTML those examples render to
// (for agents rebuilding the look in another stack). SKILL.md is written by hand.
//
//   npm run build:skill          regenerate
//   npm run build:skill -- --check   fail if the committed files are out of date (CI)
import { createServer } from "vite";
import { readFileSync, writeFileSync, mkdirSync, rmSync, readdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

const SKILL = "skills/seaglass-ui";
const check = process.argv.includes("--check");
const out = new Map(); // path (relative to SKILL) -> content

const vite = await createServer({
  configFile: "site/vite.config.ts",
  server: { middlewareMode: true, hmr: false },
  appType: "custom",
  logLevel: "error",
});

try {
  const { registry, groups } = await vite.ssrLoadModule("/src/content/registry.ts");
  const { ThemeProvider } = await vite.ssrLoadModule("seaglass-ui");

  // ---- design language
  const design = readFileSync("DESIGN.md", "utf8")
    // the uiexp reference files are not part of this repo
    .replace(/\nReference implementations[\s\S]*?\n\n/, "\n");
  out.set("references/design-language.md", design);

  // ---- stylesheets: the full library CSS works with plain HTML, no React needed
  if (!existsSync("dist/seaglass.css")) throw new Error("dist/seaglass.css is missing — run `npm run build:css` first");
  out.set("assets/seaglass.css", readFileSync("dist/seaglass.css", "utf8"));
  out.set("assets/tokens.css", readFileSync("src/styles/tokens.css", "utf8"));
  out.set("assets/material.css", readFileSync("src/styles/material.css", "utf8"));

  // ---- components
  const index = ["# Components", "", "One file per component in `components/`. Each has the import, the props, and every docs example as React source plus the static HTML it renders to (closed overlays show only their trigger; open menus, dialogs and popovers are portalled to <body> at runtime).", ""];
  for (const group of groups) {
    const entries = registry.filter((e) => e.group === group);
    if (!entries.length) continue;
    index.push(`## ${group}`, "");
    for (const e of entries) {
      index.push(`- [${e.name}](components/${e.slug}.md) — ${e.summary}`);
      out.set(`references/components/${e.slug}.md`, await componentPage(e, ThemeProvider));
    }
    index.push("");
  }
  out.set("references/components.md", index.join("\n"));
} finally {
  await vite.close();
}

async function componentPage(e, ThemeProvider) {
  const md = [`# ${e.name}`, "", e.summary, ""];
  if (e.description) md.push(e.description, "");
  md.push("```tsx", e.imports, "```", "");
  if (e.radix) md.push(`Built on the Radix ${e.radix.name} primitive (${e.radix.url}) — the same keyboard and ARIA behaviour.`, "");

  for (const g of e.api) {
    md.push(`## ${g.name} props`, "");
    if (g.description) md.push(g.description, "");
    md.push("| Prop | Type | Default | Description |", "| --- | --- | --- | --- |");
    for (const p of g.props) {
      const cell = (s = "") => String(s).replace(/\|/g, "\\|").replace(/\n/g, " ");
      md.push(`| \`${cell(p.name)}\`${p.required ? " (required)" : ""} | \`${cell(p.type)}\` | ${p.default ? `\`${cell(p.default)}\`` : ""} | ${cell(p.description)} |`);
    }
    md.push("");
  }
  if (e.keyboard?.length) {
    md.push("## Keyboard", "");
    for (const [k, v] of e.keyboard) md.push(`- **${k}** — ${v}`);
    md.push("");
  }
  if (e.a11y?.length) {
    md.push("## Accessibility", "");
    for (const a of e.a11y) md.push(`- ${a}`);
    md.push("");
  }

  md.push("## Examples", "");
  for (const ex of e.examples) {
    const file = `site/src/examples/${ex.id}.tsx`;
    md.push(`### ${ex.title}`, "");
    if (ex.description) md.push(ex.description, "");
    md.push("```tsx", readFileSync(file, "utf8").trim(), "```", "");
    const html = await render(ex.id, ThemeProvider);
    if (html) md.push("Rendered HTML:", "", "```html", html, "```", "");
  }
  return md.join("\n");
}

async function render(id, ThemeProvider) {
  try {
    const mod = await vite.ssrLoadModule(`/src/examples/${id}.tsx`);
    const html = renderToStaticMarkup(createElement(ThemeProvider, { defaultTheme: "light" }, createElement(mod.default)));
    return tidy(html);
  } catch (err) {
    console.warn(`  could not render ${id}: ${err.message.split("\n")[0]}`);
    return "";
  }
}

// Strip what an agent does not need to copy: icon path data, React's generated ids,
// and the lamp element the ThemeProvider adds. Then put one tag per line.
function tidy(html) {
  return html
    .replace(/<div class="sg-lamp"[^>]*><\/div>/g, "")
    .replace(/(<svg[^>]*class="lucide[^"]*"[^>]*>)[\s\S]*?<\/svg>/g, "$1…</svg>")
    .replace(/(<svg)[^>]*class="(lucide[^"]*)"[^>]*>…<\/svg>/g, '<svg class="$2" aria-hidden="true">…</svg>')
    .replace(/«r[0-9a-z]+»|:r[0-9a-z]+:|_R_[0-9a-zA-Z]+_/g, "id")
    .replace(/></g, ">\n<")
    .trim();
}

// ---- write or check
const existing = new Map();
const walk = (dir) => {
  if (!existsSync(dir)) return;
  for (const f of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, f.name);
    if (f.isDirectory()) walk(p);
    else existing.set(p.slice(SKILL.length + 1), readFileSync(p, "utf8"));
  }
};
for (const d of ["references", "assets"]) walk(join(SKILL, d));

if (check) {
  const stale = [...out].filter(([p, c]) => existing.get(p) !== c).map(([p]) => p);
  const extra = [...existing.keys()].filter((p) => !out.has(p));
  if (stale.length || extra.length) {
    console.error(`skills/seaglass-ui is out of date (${[...stale, ...extra].join(", ")}). Run \`npm run build:skill\`.`);
    process.exit(1);
  }
  console.log("skills/seaglass-ui is up to date");
} else {
  for (const d of ["references", "assets"]) rmSync(join(SKILL, d), { recursive: true, force: true });
  for (const [p, c] of out) {
    mkdirSync(dirname(join(SKILL, p)), { recursive: true });
    writeFileSync(join(SKILL, p), c);
  }
  const kb = [...out.values()].reduce((n, c) => n + c.length, 0) / 1024;
  console.log(`${SKILL}: ${out.size} files, ${kb.toFixed(0)} kB`);
}
