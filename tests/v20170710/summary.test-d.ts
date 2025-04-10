import type * as WK from "../../src/v20170710/index.js";
import { assertType, describe } from "vitest";
import { testFor } from "./fixtures.js";

describe("Summary", () => {
  testFor("Real Summary", ({ summary }) => {
    assertType<WK.Summary>(summary);
  });
});
