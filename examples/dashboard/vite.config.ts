import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

export default defineConfig({
  root: fileURLToPath(new URL(".", import.meta.url)),
  base: "./",
  plugins: [react()],
  resolve: {
    alias: {
      "seaglass/styles.css": fileURLToPath(new URL("../../src/styles/index.css", import.meta.url)),
      "seaglass": fileURLToPath(new URL("../../src/index.ts", import.meta.url)),
    },
  },
  server: { port: 5311 },
  preview: { port: 5311 },
  build: { outDir: "dist", emptyOutDir: true },
});
