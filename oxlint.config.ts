import bachmanDevConfig from "@bachman-dev/oxc-config/oxlint";

export default bachmanDevConfig(
  {},
  {
    ignorePatterns: ["packages/**/{coverage,docs,dist}/**"],
    rules: {
      "id-length": ["error", { exceptions: ["m", "v"] }],
      "jsdoc/require-param-type": "off",
      "jsdoc/require-returns-type": "off",
      "unicorn/no-instanceof-builtins": [
        "error",
        { exclude: [], include: [], strategy: "loose", useErrorIsError: true },
      ],
    },
    settings: {
      jsdoc: {
        tagNamePreference: {
          category: "category",
        },
      },
    },
  },
);
