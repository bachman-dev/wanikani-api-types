import { describe, expect } from "vitest";

import * as WaniKani from "../../src/v20170710/index.js";
import testFor from "./fixtures.js";

describe("Assignment", () => {
  testFor("Real Assignment", ({ assignment }) => {
    expect(() => WaniKani.Assignment.parse(assignment)).not.toThrow();
    expect(WaniKani.isAssignment(assignment)).toBe(true);
  });
});

describe("AssignmentCollection", () => {
  testFor("Real AssignmentCollection", ({ assignmentCollection }) => {
    expect(() => WaniKani.AssignmentCollection.parse(assignmentCollection)).not.toThrow();
    expect(WaniKani.isAssignmentCollection(assignmentCollection)).toBe(true);
  });
});

describe("AssignmentParameters", () => {
  testFor("Empty AssignmentParameters", ({ emptyParams }) => {
    expect(() => WaniKani.AssignmentParameters.parse(emptyParams)).not.toThrow();
  });
  testFor("AssignmentParameters with empty arrays", ({ assignmentParamsWithEmptyArrays }) => {
    expect(() => WaniKani.AssignmentParameters.parse(assignmentParamsWithEmptyArrays)).not.toThrow();
  });
  testFor("AssignmentParameters with many options filled", ({ assignmentParamsWithManyOptions }) => {
    expect(() => WaniKani.AssignmentParameters.parse(assignmentParamsWithManyOptions)).not.toThrow();
  });
  testFor("AssignmentParameters with Date objects", ({ assignmentParamsWithDates }) => {
    expect(() => WaniKani.AssignmentParameters.parse(assignmentParamsWithDates)).not.toThrow();
  });
  testFor("AssignmentParameters with DatableString properties", ({ assignmentParamsWithDatableStrings }) => {
    expect(() => WaniKani.AssignmentParameters.parse(assignmentParamsWithDatableStrings)).not.toThrow();
  });
});

describe("AssignmentPayload", () => {
  testFor("AssignmentPayload with empty assignment property", ({ assignmentPayloadWithNoTime }) => {
    expect(() => WaniKani.AssignmentPayload.parse(assignmentPayloadWithNoTime)).not.toThrow();
  });
  testFor("AssignmentPayload with JS Date started_at property", ({ assignmentPayloadWithDate }) => {
    expect(() => WaniKani.AssignmentPayload.parse(assignmentPayloadWithDate)).not.toThrow();
  });
  testFor("AssignmentPayload with DatableString started_at property", ({ assignmentPayloadWithDatableString }) => {
    expect(() => WaniKani.AssignmentPayload.parse(assignmentPayloadWithDatableString)).not.toThrow();
  });
});
