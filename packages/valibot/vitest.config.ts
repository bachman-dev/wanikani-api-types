import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    name: { label: "valibot", color: "yellow" },
    include: ["tests/**/*.{test,spec}.ts"],
    typecheck: {
      enabled: true,
    },
    pool: "threads",
  },
});
