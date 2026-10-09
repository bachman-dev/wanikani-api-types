import * as z from "zod/v4/core";
import { describe, expect } from "vitest";
import { en } from "zod/locales";

import * as WaniKani from "../../src/v20170710/index.js";
import testFor from "./fixtures.js";

z.config(en());

describe("StudyMaterial", () => {
  testFor("Real StudyMaterial", ({ studyMaterial }) => {
    expect(() => WaniKani.StudyMaterial.parse(studyMaterial)).not.toThrow();
    expect(WaniKani.isStudyMaterial(studyMaterial)).toBe(true);
  });
});

describe("StudyMaterialCollection", () => {
  testFor("Real StudyMaterialCollection", ({ studyMaterialCollection }) => {
    expect(() => WaniKani.StudyMaterialCollection.parse(studyMaterialCollection)).not.toThrow();
    expect(WaniKani.isStudyMaterialCollection(studyMaterialCollection)).toBe(true);
  });
});

describe("StudyMaterialParameters", () => {
  testFor("Empty StudyMaterialParameters", ({ emptyParams }) => {
    expect(() => WaniKani.StudyMaterialParameters.parse(emptyParams)).not.toThrow();
  });
  testFor("StudyMaterialParameters with empty arrays", ({ studyMaterialParamsWithEmptyArrays }) => {
    expect(() => WaniKani.StudyMaterialParameters.parse(studyMaterialParamsWithEmptyArrays)).not.toThrow();
  });
  testFor("StudyMaterialParameters with many options filled", ({ studyMaterialParamsWithManyOptions }) => {
    expect(() => WaniKani.StudyMaterialParameters.parse(studyMaterialParamsWithManyOptions)).not.toThrow();
  });
  testFor("StudyMaterialParameters with Date objects", ({ studyMaterialParamsWithDates }) => {
    expect(() => WaniKani.StudyMaterialParameters.parse(studyMaterialParamsWithDates)).not.toThrow();
  });
  testFor("StudyMaterialParameters with DatableString properties", ({ studyMaterialParamsWithDatableStrings }) => {
    expect(() => WaniKani.StudyMaterialParameters.parse(studyMaterialParamsWithDatableStrings)).not.toThrow();
  });
});

describe("StudyMaterialUpdatePayload", () => {
  testFor("Empty payload", ({ emptyStudyMaterialUpdatePayload }) => {
    expect(() => WaniKani.StudyMaterialUpdatePayload.parse(emptyStudyMaterialUpdatePayload)).not.toThrow();
  });
  testFor("Payload with all properties", ({ fullStudyMaterialUpdatePayload }) => {
    expect(() => WaniKani.StudyMaterialUpdatePayload.parse(fullStudyMaterialUpdatePayload)).not.toThrow();
  });
  testFor("Payload with an explicitly undefined property", () => {
    expect(() => WaniKani.StudyMaterialUpdatePayload.parse({ meaning_note: undefined })).toThrow(
      new z.$ZodRealError([
        {
          expected: "string",
          code: "invalid_type",
          path: ["meaning_note"],
          message: "Invalid input: expected string, received undefined",
        },
      ]),
    );
  });
});

describe("StudyMaterialCreatePayload", () => {
  testFor("Payload with required properties only", ({ minimalStudyMaterialCreatePayload }) => {
    expect(() => WaniKani.StudyMaterialCreatePayload.parse(minimalStudyMaterialCreatePayload)).not.toThrow();
  });
  testFor("Payload with all properties", ({ fullStudyMaterialCreatePayload }) => {
    expect(() => WaniKani.StudyMaterialCreatePayload.parse(fullStudyMaterialCreatePayload)).not.toThrow();
  });
});
