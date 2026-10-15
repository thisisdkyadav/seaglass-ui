import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

export default defineConfig({
  root: fileURLToPath(new URL(".", import.meta.url)),
  base: "./",
  plugins: [react()],
  resolve: {
    alias: {
      "seaglass-ui/styles.css": fileURLToPath(new URL("../src/styles/index.css", import.meta.url)),
      "seaglass-ui": fileURLToPath(new URL("../src/index.ts", import.meta.url)),
    },
  },
  server: { port: 5310 },
  preview: { port: 5310 },
  build: { outDir: "dist", emptyOutDir: true },
});
