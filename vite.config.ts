import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

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
    environment: "jsdom",
    globals: true,
    setupFiles: ["tests/setup.ts"],
    css: false,
  },
});
