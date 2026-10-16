// Build-time SEO for the docs SPA. Link-preview scrapers do not run JavaScript, so every
// route gets its own HTML file with the right <title>, description, canonical URL and
// Open Graph / Twitter tags. Also writes sitemap.xml and robots.txt.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import type { Plugin } from "vite";

export const SITE_URL = "https://seaglass.awacxo.com";
const SITE_NAME = "Sea Glass UI";
const HOME_TITLE = "Sea Glass UI — frosted, accessible React components";
const HOME_DESCRIPTION = "An open-source React component library of frosted sea-glass pebbles. Accessible, keyboard-first, themable, with a warm dark mode and right-to-left support.";

export interface Route { path: string; title: string; description: string }

/** Reads routes from the content files without executing them (they import React components). */
export function routes(contentDir: string): Route[] {
  const docs = readFileSync(join(contentDir, "docs.tsx"), "utf8");
  const registry = readFileSync(join(contentDir, "registry.ts"), "utf8");
  const out: Route[] = [
    { path: "/", title: HOME_TITLE, description: HOME_DESCRIPTION },
    { path: "/components", title: `Components — ${SITE_NAME}`, description: "Every Sea Glass UI component: layout, primitives, forms, overlays, navigation and data display, with live examples and API tables." },
  ];
  for (const m of docs.matchAll(/slug: "([a-z0-9-]+)", title: "([^"]+)",\s*summary: "([^"]+)"/g)) {
    out.push({ path: `/docs/${m[1]}`, title: `${m[2]} — ${SITE_NAME}`, description: m[3] });
  }
  for (const m of registry.matchAll(/slug: "([a-z0-9-]+)", name: "([^"]+)", group: "[^"]+",\s*summary: "([^"]+)"/g)) {
    out.push({ path: `/components/${m[1]}`, title: `${m[2]} — ${SITE_NAME}`, description: `${m[3]} React component, with live examples, API reference and keyboard support.` });
  }
  return out;
}

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export function headFor(r: Route): string {
  const url = SITE_URL + (r.path === "/" ? "/" : r.path);
  return [
    `<title>${esc(r.title)}</title>`,
    `<meta name="description" content="${esc(r.description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta property="og:title" content="${esc(r.title)}" />`,
    `<meta property="og:description" content="${esc(r.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${SITE_URL}/og.png" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="Sea Glass UI: frosted pebble buttons, badges and a switch on white paper" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(r.title)}" />`,
    `<meta name="twitter:description" content="${esc(r.description)}" />`,
    `<meta name="twitter:image" content="${SITE_URL}/og.png" />`,
  ].join("\n  ");
}

export const seo = (): Plugin => ({
  name: "seo",
  apply: "build",
  closeBundle() {
    const root = new URL("./", import.meta.url).pathname;
    const dist = join(root, "dist");
    const shell = readFileSync(join(dist, "index.html"), "utf8");
    const marker = /<!-- seo -->[\s\S]*?<!-- \/seo -->/;
    if (!marker.test(shell)) throw new Error("site/index.html is missing the <!-- seo --> … <!-- /seo --> block");
    const all = routes(join(root, "src/content"));
    for (const r of all) {
      const html = shell.replace(marker, `<!-- seo -->\n  ${headFor(r)}\n  <!-- /seo -->`);
      // /components/button is served from components/button.html (Cloudflare and most static hosts)
      const file = r.path === "/" ? "index.html" : `${r.path.slice(1)}.html`;
      mkdirSync(dirname(join(dist, file)), { recursive: true });
      writeFileSync(join(dist, file), html);
    }
    const today = new Date().toISOString().slice(0, 10);
    writeFileSync(join(dist, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${all.map((r) => `  <url><loc>${SITE_URL}${r.path === "/" ? "/" : r.path}</loc><lastmod>${today}</lastmod></url>`).join("\n")}
</urlset>
`);
    writeFileSync(join(dist, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);
    console.log(`seo: ${all.length} pages, sitemap.xml, robots.txt`);
  },
});
