import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    name: { label: "requests", color: "green" },
    include: ["tests/**/*.{test,spec}.ts"],
    typecheck: {
      enabled: true,
    },
    pool: "threads",
  },
});
