import type * as WK from "../../src/v20170710/index.js";
import { assertType, describe } from "vitest";
import { testFor } from "./fixtures.js";

describe("Assignment", () => {
  testFor("Real Assignment", ({ assignment }) => {
    assertType<WK.Assignment>(assignment);
  });
});

describe("AssignmentCollection", () => {
  testFor("Real AssignmentCollection", ({ assignmentCollection }) => {
    assertType<WK.AssignmentCollection>(assignmentCollection);
  });
});

describe("AssignmentParameters", () => {
  testFor("Empty AssignmentParameters", ({ emptyParams }) => {
    assertType<WK.AssignmentParameters>(emptyParams);
  });
  testFor("AssignmentParameters with empty arrays", ({ assignmentParamsWithEmptyArrays }) => {
    assertType<WK.AssignmentParameters>(assignmentParamsWithEmptyArrays);
  });
  testFor("AssignmentParameters with many options filled", ({ assignmentParamsWithManyOptions }) => {
    assertType<WK.AssignmentParameters>(assignmentParamsWithManyOptions);
  });
  testFor("AssignmentParameters with Date objects", ({ assignmentParamsWithDates }) => {
    assertType<WK.AssignmentParameters>(assignmentParamsWithDates);
  });
  testFor("AssignmentParameters with DatableString properties", ({ assignmentParamsWithDatableStrings }) => {
    assertType<WK.AssignmentParameters>(assignmentParamsWithDatableStrings);
  });
});

describe("AssignmentPayload", () => {
  testFor("AssignmentPayload with empty assignment property", ({ assignmentPayloadWithNoTime }) => {
    assertType<WK.AssignmentPayload>(assignmentPayloadWithNoTime);
  });
  testFor("AssignmentPayload with JS Date started_at property", ({ assignmentPayloadWithDate }) => {
    assertType<WK.AssignmentPayload>(assignmentPayloadWithDate);
  });
  testFor("AssignmentPayload with DatableString started_at property", ({ assignmentPayloadWithDatableString }) => {
    assertType<WK.AssignmentPayload>(assignmentPayloadWithDatableString);
  });
});
