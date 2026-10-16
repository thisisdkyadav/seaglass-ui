// Makes the emitted declarations resolve under every TypeScript moduleResolution mode:
// adds explicit extensions to relative imports (required by node16/nodenext) and writes a
// .d.cts twin of each file so `require("seaglass-ui")` gets CommonJS-flavoured types.
import { readdirSync, readFileSync, writeFileSync, existsSync, statSync } from "node:fs";
import { join, dirname, resolve } from "node:path";

const root = "dist/types";
const walk = (d) => readdirSync(d).flatMap((f) => (statSync(join(d, f)).isDirectory() ? walk(join(d, f)) : [join(d, f)]));
const rel = /((?:from|import)\s*\(?\s*["'])(\.{1,2}\/[^"']+)(["'])/g;

let n = 0;
for (const file of walk(root).filter((f) => f.endsWith(".d.ts"))) {
  const src = readFileSync(file, "utf8");
  const target = (spec) => {
    const abs = resolve(dirname(file), spec);
    if (existsSync(abs + ".d.ts")) return spec;
    if (existsSync(join(abs, "index.d.ts"))) return spec + "/index";
    throw new Error(`${file}: cannot resolve ${spec}`);
  };
  const withExt = (ext) => src.replace(rel, (_, a, spec, b) => (/\.(js|cjs)$/.test(spec) ? a + spec + b : a + target(spec) + ext + b));
  writeFileSync(file, withExt(".js"));
  writeFileSync(file.replace(/\.d\.ts$/, ".d.cts"), withExt(".cjs"));
  n++;
}
console.log(`dist/types  ${n} declarations, + .d.cts twins`);
