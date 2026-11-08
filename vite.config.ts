import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Tailwind runs through PostCSS (postcss.config.js).
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { "@": path.resolve(import.meta.dirname, "src") },
  },
});
