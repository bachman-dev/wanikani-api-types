import { assertType, describe } from "vitest";

import type * as WaniKani from "../../src/v20170710/index.js";
import testFor from "./fixtures.js";

describe("Assignment", () => {
  testFor("Real Assignment", ({ assignment }) => {
    assertType<WaniKani.Assignment>(assignment);
  });
});

describe("AssignmentCollection", () => {
  testFor("Real AssignmentCollection", ({ assignmentCollection }) => {
    assertType<WaniKani.AssignmentCollection>(assignmentCollection);
  });
});

describe("AssignmentParameters", () => {
  testFor("Empty AssignmentParameters", ({ emptyParams }) => {
    assertType<WaniKani.AssignmentParameters>(emptyParams);
  });
  testFor("AssignmentParameters with empty arrays", ({ assignmentParamsWithEmptyArrays }) => {
    assertType<WaniKani.AssignmentParameters>(assignmentParamsWithEmptyArrays);
  });
  testFor("AssignmentParameters with many options filled", ({ assignmentParamsWithManyOptions }) => {
    assertType<WaniKani.AssignmentParameters>(assignmentParamsWithManyOptions);
  });
  testFor("AssignmentParameters with Date objects", ({ assignmentParamsWithDates }) => {
    assertType<WaniKani.AssignmentParameters>(assignmentParamsWithDates);
  });
  testFor("AssignmentParameters with DatableString properties", ({ assignmentParamsWithDatableStrings }) => {
    assertType<WaniKani.AssignmentParameters>(assignmentParamsWithDatableStrings);
  });
});

describe("AssignmentPayload", () => {
  testFor("AssignmentPayload with empty assignment property", ({ assignmentPayloadWithNoTime }) => {
    assertType<WaniKani.AssignmentPayload>(assignmentPayloadWithNoTime);
  });
  testFor("AssignmentPayload with JS Date started_at property", ({ assignmentPayloadWithDate }) => {
    assertType<WaniKani.AssignmentPayload>(assignmentPayloadWithDate);
  });
  testFor("AssignmentPayload with DatableString started_at property", ({ assignmentPayloadWithDatableString }) => {
    assertType<WaniKani.AssignmentPayload>(assignmentPayloadWithDatableString);
  });
});
