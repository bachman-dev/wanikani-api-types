import { defineConfig } from "tsdown";

export default defineConfig({
  clean: true,
  copy: "../../LICENSE",
  dts: { sourcemap: true },
  entry: ["src/index.ts", "src/v20170710/index.ts"],
  format: "esm",
  target: "es2025",
  platform: "neutral",
  exports: true,
  publint: {
    level: "error",
  },
  attw: {
    profile: "esm-only",
    level: "error",
  },
});
