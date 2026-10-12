import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    name: { label: "types", color: "blue" },
    include: ["tests/**/*.{test,spec}.ts"],
    typecheck: {
      enabled: true,
    },
    pool: "threads",
    isolate: false,
  },
});
