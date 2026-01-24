import * as WK from "../../src/v20170710/index.js";
import * as v from "valibot";
import { describe, expect } from "vitest";
import { testFor } from "./fixtures.js";

describe("Assignment", () => {
  testFor("Real Assignment", ({ assignment }) => {
    expect(() => v.assert(WK.Assignment, assignment)).not.toThrow();
    expect(WK.isAssignment(assignment)).toBe(true);
  });
});

describe("AssignmentCollection", () => {
  testFor("Real AssignmentCollection", ({ assignmentCollection }) => {
    expect(() => v.assert(WK.AssignmentCollection, assignmentCollection)).not.toThrow();
    expect(WK.isAssignmentCollection(assignmentCollection)).toBe(true);
  });
});

describe("AssignmentParameters", () => {
  testFor("Empty AssignmentParameters", ({ emptyParams }) => {
    expect(() => v.assert(WK.AssignmentParameters, emptyParams)).not.toThrow();
  });
  testFor("AssignmentParameters with empty arrays", ({ assignmentParamsWithEmptyArrays }) => {
    expect(() => v.assert(WK.AssignmentParameters, assignmentParamsWithEmptyArrays)).not.toThrow();
  });
  testFor("AssignmentParameters with many options filled", ({ assignmentParamsWithManyOptions }) => {
    expect(() => v.assert(WK.AssignmentParameters, assignmentParamsWithManyOptions)).not.toThrow();
  });
  testFor("AssignmentParameters with Date objects", ({ assignmentParamsWithDates }) => {
    expect(() => v.assert(WK.AssignmentParameters, assignmentParamsWithDates)).not.toThrow();
  });
  testFor("AssignmentParameters with DatableString properties", ({ assignmentParamsWithDatableStrings }) => {
    expect(() => v.assert(WK.AssignmentParameters, assignmentParamsWithDatableStrings)).not.toThrow();
  });
});

describe("AssignmentPayload", () => {
  testFor("AssignmentPayload with empty assignment property", ({ assignmentPayloadWithNoTime }) => {
    expect(() => v.assert(WK.AssignmentPayload, assignmentPayloadWithNoTime)).not.toThrow();
  });
  testFor("AssignmentPayload with JS Date started_at property", ({ assignmentPayloadWithDate }) => {
    expect(() => v.assert(WK.AssignmentPayload, assignmentPayloadWithDate)).not.toThrow();
  });
  testFor("AssignmentPayload with DatableString started_at property", ({ assignmentPayloadWithDatableString }) => {
    expect(() => v.assert(WK.AssignmentPayload, assignmentPayloadWithDatableString)).not.toThrow();
  });
});
