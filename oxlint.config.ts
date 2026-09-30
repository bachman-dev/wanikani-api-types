import bachmanDevConfig from "@bachman-dev/oxc-config/oxlint";

export default bachmanDevConfig(
  {},
  {
    ignorePatterns: ["packages/**/{coverage,docs,dist}/**"],
  },
);
