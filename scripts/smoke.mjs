// Consumer smoke test: packs the library, installs the tarball into a fresh project and checks
// that it imports (ESM and CJS), server-renders, ships its stylesheet and type-checks under
// both "bundler" and "node16" resolution. Run after `npm run build`.
import { execFileSync } from "node:child_process";
import { mkdtempSync, writeFileSync, rmSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const run = (cmd, args, cwd) => execFileSync(cmd, args, { cwd, stdio: ["ignore", "pipe", "inherit"], encoding: "utf8" });
const dir = mkdtempSync(join(tmpdir(), "seaglass-smoke-"));
const pkg = run("npm", ["pack", "--json", "--pack-destination", dir], root);
const tarball = join(dir, JSON.parse(pkg)[0].filename);

try {
  writeFileSync(join(dir, "package.json"), JSON.stringify({ name: "smoke", private: true, type: "module" }));
  run("npm", ["install", "--no-audit", "--no-fund", "--loglevel=error", tarball, "react@19", "react-dom@19", "@types/react@19"], dir);

  writeFileSync(join(dir, "esm.mjs"), `
    import { createElement as h } from "react";
    import { renderToString } from "react-dom/server";
    import { Button, Card, CardHeader, ThemeProvider } from "seaglass-ui";
    const html = renderToString(h(ThemeProvider, null, h(Card, null, h(CardHeader, { title: "Hi" }), h(Button, null, "Go"))));
    if (!html.includes("sg-button") || !html.includes("Hi")) throw new Error("unexpected SSR output: " + html);
    console.log("  esm + ssr ok");
  `);
  writeFileSync(join(dir, "cjs.cjs"), `
    const { Button, Dialog } = require("seaglass-ui");
    if (typeof Button !== "object" && typeof Button !== "function") throw new Error("Button missing");
    if (!Dialog) throw new Error("Dialog missing");
    require.resolve("seaglass-ui/styles.css");
    console.log("  cjs + styles.css ok");
  `);
  writeFileSync(join(dir, "app.tsx"), `
    import { Button, Field, Select, type ButtonProps } from "seaglass-ui";
    const props: ButtonProps = { variant: "soft", tone: "aqua" };
    export const App = () => (
      <Field label="Plan"><Select placeholder="Pick" options={[{ value: "a", label: "A" }]} onValueChange={(v: string) => v} /></Field>
    );
    export const Save = () => <Button {...props}>Save</Button>;
  `);
  console.log(run("node", ["esm.mjs"], dir).trimEnd());
  console.log(run("node", ["cjs.cjs"], dir).trimEnd());
  if (!existsSync(join(dir, "node_modules/seaglass-ui/dist/seaglass.css"))) throw new Error("dist/seaglass.css missing from tarball");

  const tsc = join(root, "node_modules/typescript/bin/tsc");
  for (const [module, resolution] of [["esnext", "bundler"], ["node16", "node16"]]) {
    run("node", [tsc, "--noEmit", "--strict", "--jsx", "react-jsx", "--skipLibCheck", "false", "--target", "es2022", "--lib", "es2022,dom,dom.iterable", "--module", module, "--moduleResolution", resolution, "app.tsx"], dir);
    console.log(`  types ok (moduleResolution ${resolution})`);
  }
  console.log("✓ smoke test passed");
} finally {
  rmSync(dir, { recursive: true, force: true });
}
