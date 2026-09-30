import { assertType, describe } from "vitest";

import type * as WaniKani from "../../src/v20170710/index.js";
import testFor from "./fixtures.js";

describe("Summary", () => {
  testFor("Real Summary", ({ summary }) => {
    assertType<WaniKani.Summary>(summary);
  });
});
