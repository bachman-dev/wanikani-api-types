import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    name: { label: "schema", color: "magenta" },
    include: ["tests/**/*.{test,spec}.ts"],
    typecheck: {
      enabled: true,
    },
    pool: "threads",
    isolate: false,
  },
});
