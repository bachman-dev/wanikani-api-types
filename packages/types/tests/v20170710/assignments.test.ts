import * as v from "valibot";
import { describe, expect } from "vitest";

import * as WaniKani from "../../src/v20170710/index.js";
import testFor from "./fixtures.js";

describe("Assignment", () => {
  testFor("Real Assignment", ({ assignment }) => {
    expect(() => v.assert(WaniKani.Assignment, assignment)).not.toThrow();
    expect(WaniKani.isAssignment(assignment)).toBe(true);
  });
});

describe("AssignmentCollection", () => {
  testFor("Real AssignmentCollection", ({ assignmentCollection }) => {
    expect(() => v.assert(WaniKani.AssignmentCollection, assignmentCollection)).not.toThrow();
    expect(WaniKani.isAssignmentCollection(assignmentCollection)).toBe(true);
  });
});

describe("AssignmentParameters", () => {
  testFor("Empty AssignmentParameters", ({ emptyParams }) => {
    expect(() => v.assert(WaniKani.AssignmentParameters, emptyParams)).not.toThrow();
  });
  testFor("AssignmentParameters with empty arrays", ({ assignmentParamsWithEmptyArrays }) => {
    expect(() => v.assert(WaniKani.AssignmentParameters, assignmentParamsWithEmptyArrays)).not.toThrow();
  });
  testFor("AssignmentParameters with many options filled", ({ assignmentParamsWithManyOptions }) => {
    expect(() => v.assert(WaniKani.AssignmentParameters, assignmentParamsWithManyOptions)).not.toThrow();
  });
  testFor("AssignmentParameters with Date objects", ({ assignmentParamsWithDates }) => {
    expect(() => v.assert(WaniKani.AssignmentParameters, assignmentParamsWithDates)).not.toThrow();
  });
  testFor("AssignmentParameters with DatableString properties", ({ assignmentParamsWithDatableStrings }) => {
    expect(() => v.assert(WaniKani.AssignmentParameters, assignmentParamsWithDatableStrings)).not.toThrow();
  });
});

describe("AssignmentPayload", () => {
  testFor("AssignmentPayload with empty assignment property", ({ assignmentPayloadWithNoTime }) => {
    expect(() => v.assert(WaniKani.AssignmentPayload, assignmentPayloadWithNoTime)).not.toThrow();
  });
  testFor("AssignmentPayload with JS Date started_at property", ({ assignmentPayloadWithDate }) => {
    expect(() => v.assert(WaniKani.AssignmentPayload, assignmentPayloadWithDate)).not.toThrow();
  });
  testFor("AssignmentPayload with DatableString started_at property", ({ assignmentPayloadWithDatableString }) => {
    expect(() => v.assert(WaniKani.AssignmentPayload, assignmentPayloadWithDatableString)).not.toThrow();
  });
});
