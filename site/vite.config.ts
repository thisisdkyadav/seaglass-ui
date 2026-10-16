import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import { copyFileSync } from "node:fs";
import { seo } from "./seo.ts";

// Static hosts (GitHub Pages and friends) serve 404.html for unknown paths;
// making it the app shell lets client-side routes work on reload.
const spaFallback = (): Plugin => ({
  name: "spa-fallback",
  apply: "build",
  closeBundle() {
    const dist = fileURLToPath(new URL("./dist/", import.meta.url));
    copyFileSync(dist + "index.html", dist + "404.html");
  },
});

export default defineConfig({
  root: fileURLToPath(new URL(".", import.meta.url)),
  base: process.env.SITE_BASE ?? "/",
  plugins: [react(), spaFallback(), seo()],
  resolve: {
    alias: {
      "seaglass-ui/styles.css": fileURLToPath(new URL("../src/styles/index.css", import.meta.url)),
      "seaglass-ui": fileURLToPath(new URL("../src/index.ts", import.meta.url)),
    },
  },
  server: { port: 5310 },
  preview: { port: 5310 },
  // Every example ships live on its page, so one ~200 kB (gzip) bundle is expected.
  build: { outDir: "dist", emptyOutDir: true, chunkSizeWarningLimit: 1000 },
});
