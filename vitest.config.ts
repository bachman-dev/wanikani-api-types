import { coverageConfigDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    projects: ["packages/*"],
    coverage: {
      enabled: true,
      include: ["packages/*/src/**/*.ts"],
      exclude: [
        "packages/*/src/index.ts",
        "packages/*/src/v20170710/index.ts",
        "packages/*/src/v20170710/lang/**",
        "**/tests/**",
        "**/node_modules/**",
        ...coverageConfigDefaults.exclude,
      ],
    },
  },
});
