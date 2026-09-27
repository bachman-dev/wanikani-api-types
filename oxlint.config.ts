import bachmanDevConfig from "@bachman-dev/oxc-config/oxlint";

export default bachmanDevConfig(
  {},
  {
    ignorePatterns: ["packages/**/{coverage,docs,dist}/**"],
    rules: {
      "id-length": ["error", { exceptions: ["m", "v"] }],
      "jsdoc/require-param-type": "off",
      "jsdoc/require-returns-type": "off",
      "typescript/no-confusing-void-expression": [
        "error",
        { ignoreArrowShorthand: true, ignoreVoidOperator: false, ignoreVoidReturningFunctions: false },
      ],
      "unicorn/no-instanceof-builtins": [
        "error",
        { exclude: [], include: [], strategy: "loose", useErrorIsError: true },
      ],
    },
    overrides: [
      {
        files: ["**/*.test.{ts,tsx,mts,cts}", "**/*.test-d.{ts,tsx,mts,cts}"],
        rules: {
          "vitest/max-expects": ["error", { max: 20 }],
        },
      },
    ],
    settings: {
      jsdoc: {
        tagNamePreference: {
          category: "category",
        },
      },
    },
  },
);
