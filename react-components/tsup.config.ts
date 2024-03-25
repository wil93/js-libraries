import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: "esm",
  dts: true,
  sourcemap: true,
  loader: {
    ".css": "copy",
  },
  esbuildOptions(options) {
    options.banner = {
      js: '"use client";',
    };
  },
});
