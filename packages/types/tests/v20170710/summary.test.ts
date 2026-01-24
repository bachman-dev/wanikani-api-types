import * as WK from "../../src/v20170710/index.js";
import * as v from "valibot";
import { describe, expect } from "vitest";
import { testFor } from "./fixtures.js";

describe("Summary", () => {
  testFor("Real Summary", ({ summary }) => {
    expect(() => v.assert(WK.Summary, summary)).not.toThrow();
    expect(WK.isSummary(summary)).toBe(true);
  });
});
