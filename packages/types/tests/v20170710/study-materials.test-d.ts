import type * as WK from "../../src/v20170710/index.js";
import { assertType, describe } from "vitest";
import { testFor } from "./fixtures.js";

describe("StudyMaterial", () => {
  testFor("Real StudyMaterial", ({ studyMaterial }) => {
    assertType<WK.StudyMaterial>(studyMaterial);
  });
});

describe("StudyMaterialCollection", () => {
  testFor("Real StudyMaterialCollection", ({ studyMaterialCollection }) => {
    assertType<WK.StudyMaterialCollection>(studyMaterialCollection);
  });
});

describe("StudyMaterialParameters", () => {
  testFor("Empty StudyMaterialParameters", ({ emptyParams }) => {
    assertType<WK.StudyMaterialParameters>(emptyParams);
  });
  testFor("StudyMaterialParameters with empty arrays", ({ studyMaterialParamsWithEmptyArrays }) => {
    assertType<WK.StudyMaterialParameters>(studyMaterialParamsWithEmptyArrays);
  });
  testFor("StudyMaterialParameters with many options filled", ({ studyMaterialParamsWithManyOptions }) => {
    assertType<WK.StudyMaterialParameters>(studyMaterialParamsWithManyOptions);
  });
  testFor("StudyMaterialParameters with Date objects", ({ studyMaterialParamsWithDates }) => {
    assertType<WK.StudyMaterialParameters>(studyMaterialParamsWithDates);
  });
  testFor("StudyMaterialParameters with DatableString properties", ({ studyMaterialParamsWithDatableStrings }) => {
    assertType<WK.StudyMaterialParameters>(studyMaterialParamsWithDatableStrings);
  });
});

describe("StudyMaterialUpdatePayload", () => {
  testFor("Empty payload", ({ emptyStudyMaterialUpdatePayload }) => {
    assertType<WK.StudyMaterialUpdatePayload>(emptyStudyMaterialUpdatePayload);
  });
  testFor("Payload with all properties", ({ fullStudyMaterialUpdatePayload }) => {
    assertType<WK.StudyMaterialUpdatePayload>(fullStudyMaterialUpdatePayload);
  });
});

describe("StudyMaterialCreatePayload", () => {
  testFor("Payload with required properties only", ({ minimalStudyMaterialCreatePayload }) => {
    assertType<WK.StudyMaterialCreatePayload>(minimalStudyMaterialCreatePayload);
  });
  testFor("Payload with all properties", ({ fullStudyMaterialCreatePayload }) => {
    assertType<WK.StudyMaterialCreatePayload>(fullStudyMaterialCreatePayload);
  });
});
