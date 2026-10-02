import * as v from "valibot";
import { describe, expect } from "vitest";

import * as WaniKani from "../../src/v20170710/index.js";
import testFor from "./fixtures.js";

describe("StudyMaterial", () => {
  testFor("Real StudyMaterial", ({ studyMaterial }) => {
    expect(() => v.assert(WaniKani.StudyMaterial, studyMaterial)).not.toThrow();
    expect(WaniKani.isStudyMaterial(studyMaterial)).toBe(true);
  });
});

describe("StudyMaterialCollection", () => {
  testFor("Real StudyMaterialCollection", ({ studyMaterialCollection }) => {
    expect(() => v.assert(WaniKani.StudyMaterialCollection, studyMaterialCollection)).not.toThrow();
    expect(WaniKani.isStudyMaterialCollection(studyMaterialCollection)).toBe(true);
  });
});

describe("StudyMaterialParameters", () => {
  testFor("Empty StudyMaterialParameters", ({ emptyParams }) => {
    expect(() => v.assert(WaniKani.StudyMaterialParameters, emptyParams)).not.toThrow();
  });
  testFor("StudyMaterialParameters with empty arrays", ({ studyMaterialParamsWithEmptyArrays }) => {
    expect(() => v.assert(WaniKani.StudyMaterialParameters, studyMaterialParamsWithEmptyArrays)).not.toThrow();
  });
  testFor("StudyMaterialParameters with many options filled", ({ studyMaterialParamsWithManyOptions }) => {
    expect(() => v.assert(WaniKani.StudyMaterialParameters, studyMaterialParamsWithManyOptions)).not.toThrow();
  });
  testFor("StudyMaterialParameters with Date objects", ({ studyMaterialParamsWithDates }) => {
    expect(() => v.assert(WaniKani.StudyMaterialParameters, studyMaterialParamsWithDates)).not.toThrow();
  });
  testFor("StudyMaterialParameters with DatableString properties", ({ studyMaterialParamsWithDatableStrings }) => {
    expect(() => v.assert(WaniKani.StudyMaterialParameters, studyMaterialParamsWithDatableStrings)).not.toThrow();
  });
});

describe("StudyMaterialUpdatePayload", () => {
  testFor("Empty payload", ({ emptyStudyMaterialUpdatePayload }) => {
    expect(() => v.assert(WaniKani.StudyMaterialUpdatePayload, emptyStudyMaterialUpdatePayload)).not.toThrow();
  });
  testFor("Payload with all properties", ({ fullStudyMaterialUpdatePayload }) => {
    expect(() => v.assert(WaniKani.StudyMaterialUpdatePayload, fullStudyMaterialUpdatePayload)).not.toThrow();
  });
  testFor("Payload with an explicitly undefined property", () => {
    expect(() => v.assert(WaniKani.StudyMaterialUpdatePayload, { meaning_note: undefined })).toThrow(
      "Invalid type: Expected string but received undefined",
    );
  });
});

describe("StudyMaterialCreatePayload", () => {
  testFor("Payload with required properties only", ({ minimalStudyMaterialCreatePayload }) => {
    expect(() => v.assert(WaniKani.StudyMaterialCreatePayload, minimalStudyMaterialCreatePayload)).not.toThrow();
  });
  testFor("Payload with all properties", ({ fullStudyMaterialCreatePayload }) => {
    expect(() => v.assert(WaniKani.StudyMaterialCreatePayload, fullStudyMaterialCreatePayload)).not.toThrow();
  });
});
