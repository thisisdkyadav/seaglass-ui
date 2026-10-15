// Concatenates the stylesheets in src/styles (in the order index.css imports them) into dist/seaglass.css.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";

const dir = "src/styles";
const index = readFileSync(join(dir, "index.css"), "utf8");
const files = [...index.matchAll(/@import\s+"\.\/([^"]+)";/g)].map((m) => m[1]);
const body = files.map((f) => `/* ---- ${f} ---- */\n` + readFileSync(join(dir, f), "utf8").trim()).join("\n\n");
// Inside a cascade layer, so any unlayered app CSS overrides it without specificity fights.
const out = `@layer seaglass {\n${body}\n}\n`;
mkdirSync(dirname("dist/seaglass.css"), { recursive: true });
writeFileSync("dist/seaglass.css", out);
console.log(`dist/seaglass.css  ${(out.length / 1024).toFixed(1)} kB from ${files.length} files`);
