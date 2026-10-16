import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

// Library build: one ES + CJS module per source file so apps only ship what they import.
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    emptyOutDir: false,
    sourcemap: true,
    lib: { entry: "src/index.ts", formats: ["es", "cjs"], fileName: (f, name) => `${name}.${f === "es" ? "js" : "cjs"}` },
    rolldownOptions: {
      external: [/^react($|\/)/, /^react-dom($|\/)/, /^radix-ui($|\/)/, /^cmdk($|\/)/],
      output: { preserveModules: true, preserveModulesRoot: "src", banner: '"use client";' },
    },
  },
  test: {
    // tests import the docs examples, which import "seaglass-ui"
    alias: { "seaglass-ui": fileURLToPath(new URL("./src/index.ts", import.meta.url)) },
    environment: "jsdom",
    globals: true,
    setupFiles: ["tests/setup.ts"],
    css: false,
    // The on-disk module cache does not notice new files matched by import.meta.glob, so new
    // examples would silently skip the axe tests until the cache is cleared. Off for correctness.
    fsModuleCache: false,
  },
});
