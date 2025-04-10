import * as WK from "../../src/v20170710/index.js";
import * as v from "valibot";
import { describe, expect } from "vitest";
import { testFor } from "./fixtures.js";

describe("StudyMaterial", () => {
  testFor("Real StudyMaterial", ({ studyMaterial }) => {
    expect(() => v.assert(WK.StudyMaterial, studyMaterial)).not.toThrow();
    expect(WK.isStudyMaterial(studyMaterial)).toBe(true);
  });
});

describe("StudyMaterialCollection", () => {
  testFor("Real StudyMaterialCollection", ({ studyMaterialCollection }) => {
    expect(() => v.assert(WK.StudyMaterialCollection, studyMaterialCollection)).not.toThrow();
    expect(WK.isStudyMaterialCollection(studyMaterialCollection)).toBe(true);
  });
});

describe("StudyMaterialParameters", () => {
  testFor("Empty StudyMaterialParameters", ({ emptyParams }) => {
    expect(() => v.assert(WK.StudyMaterialParameters, emptyParams)).not.toThrow();
  });
  testFor("StudyMaterialParameters with empty arrays", ({ studyMaterialParamsWithEmptyArrays }) => {
    expect(() => v.assert(WK.StudyMaterialParameters, studyMaterialParamsWithEmptyArrays)).not.toThrow();
  });
  testFor("StudyMaterialParameters with many options filled", ({ studyMaterialParamsWithManyOptions }) => {
    expect(() => v.assert(WK.StudyMaterialParameters, studyMaterialParamsWithManyOptions)).not.toThrow();
  });
  testFor("StudyMaterialParameters with Date objects", ({ studyMaterialParamsWithDates }) => {
    expect(() => v.assert(WK.StudyMaterialParameters, studyMaterialParamsWithDates)).not.toThrow();
  });
  testFor("StudyMaterialParameters with DatableString properties", ({ studyMaterialParamsWithDatableStrings }) => {
    expect(() => v.assert(WK.StudyMaterialParameters, studyMaterialParamsWithDatableStrings)).not.toThrow();
  });
});

describe("StudyMaterialUpdatePayload", () => {
  testFor("Empty payload", ({ emptyStudyMaterialUpdatePayload }) => {
    expect(() => v.assert(WK.StudyMaterialUpdatePayload, emptyStudyMaterialUpdatePayload)).not.toThrow();
  });
  testFor("Payload with all properties", ({ fullStudyMaterialUpdatePayload }) => {
    expect(() => v.assert(WK.StudyMaterialUpdatePayload, fullStudyMaterialUpdatePayload)).not.toThrow();
  });
});

describe("StudyMaterialCreatePayload", () => {
  testFor("Payload with required properties only", ({ minimalStudyMaterialCreatePayload }) => {
    expect(() => v.assert(WK.StudyMaterialCreatePayload, minimalStudyMaterialCreatePayload)).not.toThrow();
  });
  testFor("Payload with all properties", ({ fullStudyMaterialCreatePayload }) => {
    expect(() => v.assert(WK.StudyMaterialCreatePayload, fullStudyMaterialCreatePayload)).not.toThrow();
  });
});
