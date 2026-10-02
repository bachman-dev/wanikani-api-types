import * as v from "valibot";
import { describe, expect } from "vitest";

import * as WaniKani from "../../src/v20170710/index.js";
import testFor from "./fixtures.js";

describe("Summary", () => {
  testFor("Real Summary", ({ summary }) => {
    expect(() => v.assert(WaniKani.Summary, summary)).not.toThrow();
    expect(WaniKani.isSummary(summary)).toBe(true);
  });
});
