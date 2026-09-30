import { assertType, describe } from "vitest";

import type * as WaniKani from "../../src/v20170710/index.js";
import testFor from "./fixtures.js";

describe("StudyMaterial", () => {
  testFor("Real StudyMaterial", ({ studyMaterial }) => {
    assertType<WaniKani.StudyMaterial>(studyMaterial);
  });
});

describe("StudyMaterialCollection", () => {
  testFor("Real StudyMaterialCollection", ({ studyMaterialCollection }) => {
    assertType<WaniKani.StudyMaterialCollection>(studyMaterialCollection);
  });
});

describe("StudyMaterialParameters", () => {
  testFor("Empty StudyMaterialParameters", ({ emptyParams }) => {
    assertType<WaniKani.StudyMaterialParameters>(emptyParams);
  });
  testFor("StudyMaterialParameters with empty arrays", ({ studyMaterialParamsWithEmptyArrays }) => {
    assertType<WaniKani.StudyMaterialParameters>(studyMaterialParamsWithEmptyArrays);
  });
  testFor("StudyMaterialParameters with many options filled", ({ studyMaterialParamsWithManyOptions }) => {
    assertType<WaniKani.StudyMaterialParameters>(studyMaterialParamsWithManyOptions);
  });
  testFor("StudyMaterialParameters with Date objects", ({ studyMaterialParamsWithDates }) => {
    assertType<WaniKani.StudyMaterialParameters>(studyMaterialParamsWithDates);
  });
  testFor("StudyMaterialParameters with DatableString properties", ({ studyMaterialParamsWithDatableStrings }) => {
    assertType<WaniKani.StudyMaterialParameters>(studyMaterialParamsWithDatableStrings);
  });
});

describe("StudyMaterialUpdatePayload", () => {
  testFor("Empty payload", ({ emptyStudyMaterialUpdatePayload }) => {
    assertType<WaniKani.StudyMaterialUpdatePayload>(emptyStudyMaterialUpdatePayload);
  });
  testFor("Payload with all properties", ({ fullStudyMaterialUpdatePayload }) => {
    assertType<WaniKani.StudyMaterialUpdatePayload>(fullStudyMaterialUpdatePayload);
  });
});

describe("StudyMaterialCreatePayload", () => {
  testFor("Payload with required properties only", ({ minimalStudyMaterialCreatePayload }) => {
    assertType<WaniKani.StudyMaterialCreatePayload>(minimalStudyMaterialCreatePayload);
  });
  testFor("Payload with all properties", ({ fullStudyMaterialCreatePayload }) => {
    assertType<WaniKani.StudyMaterialCreatePayload>(fullStudyMaterialCreatePayload);
  });
});
