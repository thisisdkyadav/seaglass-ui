// Publishes the agent skill (skills/seaglass-ui) with the docs, so any harness can install
// it from the site: `npx skills add https://seaglass.awacxo.com`. The skills CLI reads
// /.well-known/skills/index.json and fetches each listed file from
// /.well-known/skills/<name>/<file>. Also writes /llms.txt, a map of the site for agents.
import { readFileSync, writeFileSync, mkdirSync, readdirSync, copyFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import type { Plugin } from "vite";
import { SITE_URL } from "./seo.ts";

const files = (dir: string): string[] =>
  readdirSync(dir, { withFileTypes: true }).flatMap((f) => (f.isDirectory() ? files(join(dir, f.name)) : [join(dir, f.name)]));

const frontmatter = (md: string, key: string) => md.match(new RegExp(`^${key}:\\s*(.+)$`, "m"))?.[1].trim() ?? "";

export const skills = (): Plugin => ({
  name: "agent-skills",
  apply: "build",
  closeBundle() {
    const root = new URL("../", import.meta.url).pathname;
    const dist = join(root, "site/dist");
    const index: { name: string; description: string; files: string[] }[] = [];

    for (const name of readdirSync(join(root, "skills"))) {
      const src = join(root, "skills", name);
      const list = files(src).map((f) => relative(src, f)).sort((a, b) => (a === "SKILL.md" ? -1 : b === "SKILL.md" ? 1 : a.localeCompare(b)));
      for (const f of list) {
        const to = join(dist, ".well-known/skills", name, f);
        mkdirSync(dirname(to), { recursive: true });
        copyFileSync(join(src, f), to);
      }
      const md = readFileSync(join(src, "SKILL.md"), "utf8");
      index.push({ name: frontmatter(md, "name"), description: frontmatter(md, "description"), files: list });
    }
    writeFileSync(join(dist, ".well-known/skills/index.json"), JSON.stringify({ skills: index }, null, 2) + "\n");

    const base = `${SITE_URL}/.well-known/skills/seaglass-ui`;
    const components = readFileSync(join(root, "skills/seaglass-ui/references/components.md"), "utf8")
      .split("\n").filter((l) => l.startsWith("- [")).map((l) => l.replace("](components/", `](${base}/references/components/`));
    writeFileSync(join(dist, "llms.txt"), `# Sea Glass UI

> A React component library and design language: frosted, domed sea-glass pebbles on white paper, lit by one fixed lamp at the top left, with a warm dim-room dark mode. npm package \`seaglass-ui\`. The stylesheet is framework-free, so the look can be rebuilt in any stack.

Install the agent skill (Claude Code, Codex, OpenCode, Cursor and others): \`npx skills add https://seaglass.awacxo.com\` or \`npx skills add thisisdkyadav/seaglass-ui\`.

## Start here

- [Agent skill (SKILL.md)](${base}/SKILL.md): how to build with Sea Glass in React or any other stack
- [Design language](${base}/references/design-language.md): the material, light, colour and rules
- [Stylesheet](${base}/assets/seaglass.css): the complete CSS (classes \`sg-*\`, tokens \`--sg-*\`)
- [Installation](${SITE_URL}/docs/installation)

## Components

${components.join("\n")}
`);
    console.log(`skills: ${index.map((s) => `${s.name} (${s.files.length} files)`).join(", ")}, llms.txt`);
  },
});
