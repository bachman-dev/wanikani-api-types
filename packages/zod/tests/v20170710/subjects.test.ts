import * as z from "zod/v4/core";
import { describe, expect } from "vitest";
import { en } from "zod/locales";

import * as WaniKani from "../../src/v20170710/index.js";
import { setLang } from "../../src/v20170710/lang/_internal.ts";
import testFor from "./fixtures.js";

z.config(en());
setLang("en");

describe("SubjectType", () => {
  testFor("Valid Subject Types", ({ subjectTypes }) => {
    if (Array.isArray(subjectTypes)) {
      for (const subject of subjectTypes) {
        expect(() => WaniKani.SubjectType.parse(subject)).not.toThrow();
        expect(WaniKani.isSubjectType(subject)).toBe(true);
      }
    } else {
      throw new TypeError("Expected subjectTypes to be an array");
    }
  });
  testFor("Invalid Subject Type", () => {
    expect(() => WaniKani.SubjectType.parse("not real")).toThrow(
      new z.$ZodRealError([
        {
          code: "invalid_value",
          values: WaniKani.SubjectType.options,
          path: [],
          message: `Invalid option: expected one of ${WaniKani.SubjectType.options.map((option) => `"${option}"`).join("|")}`,
        },
      ]),
    );
    expect(WaniKani.isSubjectType("not real")).toBe(false);
  });
});

describe("SubjectTuple", () => {
  testFor("Empty SubjectTuple throws error", ({ emptySubjectTuple }) => {
    expect(() => WaniKani.SubjectTuple.parse(emptySubjectTuple)).toThrow(
      new z.$ZodRealError([
        {
          code: "invalid_value",
          values: WaniKani.SubjectType.options,
          path: [0],
          message: `Invalid option: expected one of ${WaniKani.SubjectType.options.map((option) => `"${option}"`).join("|")}`,
        },
      ]),
    );
    expect(WaniKani.isSubjectTuple(emptySubjectTuple)).toBe(false);
  });
  testFor("Partial SubjectTuple is valid", ({ partialSubjectTuple }) => {
    expect(() => WaniKani.SubjectTuple.parse(partialSubjectTuple)).not.toThrow();
    expect(WaniKani.isSubjectTuple(partialSubjectTuple)).toBe(true);
  });
  testFor("Full SubjectTuple is valid", ({ fullSubjectTuple }) => {
    expect(() => WaniKani.SubjectTuple.parse(fullSubjectTuple)).not.toThrow();
    expect(WaniKani.isSubjectTuple(fullSubjectTuple)).toBe(true);
  });
  testFor("SubjectTuple with repeated items throws error", ({ repeatedSubjectTuple }) => {
    expect(() => WaniKani.SubjectTuple.parse(repeatedSubjectTuple)).toThrow(
      "Duplicate Subject Type detected in Subject Tuple",
    );
    expect(WaniKani.isSubjectTuple(repeatedSubjectTuple)).toBe(false);
  });
});

describe("Subjects", () => {
  testFor("Real Radical", ({ radical }) => {
    expect(() => WaniKani.Subject.parse(radical)).not.toThrow();
    expect(WaniKani.isSubject(radical)).toBe(true);
  });
  testFor("Real Kanji", ({ kanji }) => {
    expect(() => WaniKani.Subject.parse(kanji)).not.toThrow();
    expect(WaniKani.isSubject(kanji)).toBe(true);
  });
  testFor("Real Vocabulary", ({ vocabulary }) => {
    expect(() => WaniKani.Subject.parse(vocabulary)).not.toThrow();
    expect(WaniKani.isSubject(vocabulary)).toBe(true);
  });
  testFor("Real Kana-Only Vocabulary", ({ kanaVocabulary }) => {
    expect(() => WaniKani.Subject.parse(kanaVocabulary)).not.toThrow();
    expect(WaniKani.isSubject(kanaVocabulary)).toBe(true);
  });
});

describe("Subject Collections", () => {
  testFor("Collection of Radicals", ({ radicalCollection }) => {
    expect(() => WaniKani.SubjectCollection.parse(radicalCollection)).not.toThrow();
    expect(WaniKani.isSubjectCollection(radicalCollection)).toBe(true);
  });
  testFor("Collection of Kanji", ({ kanjiCollection }) => {
    expect(() => WaniKani.SubjectCollection.parse(kanjiCollection)).not.toThrow();
    expect(WaniKani.isSubjectCollection(kanjiCollection)).toBe(true);
  });
  testFor("Collection of Vocabulary", ({ vocabularyCollection }) => {
    expect(() => WaniKani.SubjectCollection.parse(vocabularyCollection)).not.toThrow();
    expect(WaniKani.isSubjectCollection(vocabularyCollection)).toBe(true);
  });
  testFor("Collection of Kana-Only Vocabulary", ({ kanaVocabularyCollection }) => {
    expect(() => WaniKani.SubjectCollection.parse(kanaVocabularyCollection)).not.toThrow();
    expect(WaniKani.isSubjectCollection(kanaVocabularyCollection)).toBe(true);
  });
  testFor("Real SubjectCollection", ({ subjectCollection }) => {
    expect(() => WaniKani.SubjectCollection.parse(subjectCollection)).not.toThrow();
    expect(WaniKani.isSubjectCollection(subjectCollection)).toBe(true);
  });
});

describe("SubjectParameters", () => {
  testFor("Empty SubjectParameters", ({ emptyParams }) => {
    expect(() => WaniKani.SubjectParameters.parse(emptyParams)).not.toThrow();
  });
  testFor("SubjectParameters with empty arrays", ({ subjectParamsWithEmptyArrays }) => {
    expect(() => WaniKani.SubjectParameters.parse(subjectParamsWithEmptyArrays)).not.toThrow();
  });
  testFor("SubjectParameters with many options filled", ({ subjectParamsWithManyOptions }) => {
    expect(() => WaniKani.SubjectParameters.parse(subjectParamsWithManyOptions)).not.toThrow();
  });
  testFor("SubjectParameters with Date objects", ({ subjectParamsWithDates }) => {
    expect(() => WaniKani.SubjectParameters.parse(subjectParamsWithDates)).not.toThrow();
  });
  testFor("SubjectParameters with DatableString properties", ({ subjectParamsWithDatableStrings }) => {
    expect(() => WaniKani.SubjectParameters.parse(subjectParamsWithDatableStrings)).not.toThrow();
  });
});
