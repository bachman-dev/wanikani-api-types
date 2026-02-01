import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    name: { label: "utils", color: "white" },
    include: ["tests/**/*.{test,spec}.ts"],
    typecheck: {
      enabled: true,
    },
    pool: "threads",
  },
});
