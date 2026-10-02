import { describe, expect } from "vitest";

import * as WaniKani from "../../src/v20170710/index.js";
import testFor from "./fixtures.js";

describe("Constants", () => {
  testFor("API revision", () => {
    expect(WaniKani.API_REVISION).toBe("20170710");
  });
  testFor("Level bounds", () => {
    expect(WaniKani.MIN_LEVEL).toBe(1);
    expect(WaniKani.MAX_LEVEL).toBe(60);
  });
  testFor("Lesson batch size bounds", () => {
    expect(WaniKani.MIN_LESSON_BATCH_SIZE).toBe(3);
    expect(WaniKani.MAX_LESSON_BATCH_SIZE).toBe(10);
  });
  testFor("SRS stage bounds", () => {
    expect(WaniKani.MIN_SRS_STAGE).toBe(0);
    expect(WaniKani.MAX_SRS_REVIEW_STAGE).toBe(8);
    expect(WaniKani.MAX_SRS_STAGE).toBe(9);
  });
});
