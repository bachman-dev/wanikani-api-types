import * as classic from "zod";
import * as z from "zod/v4/core";
import { describe, expect } from "vitest";
import { en, ja } from "zod/locales";

import * as WaniKani from "../../src/v20170710/index.js";
import { getLocale } from "../../src/v20170710/lang/_internal.ts";
import testFor from "./fixtures.js";

const messages = {
  dateUnion: "Expected either a valid ISO-8601 timestamp string or a JavaScript Date",
  reviewPayloadUnion:
    "Review Payload must have one and only one of either an assignment_id or subject_id positive integer",
  subjectTupleDuplicate: "Duplicate Subject Type detected in Subject Tuple",
};

const badReviewPayload = {
  review: { assignment_id: 1, subject_id: undefined, incorrect_meaning_answers: 0, incorrect_reading_answers: 0 },
};

function getMessage(schema: z.$ZodType, value: unknown): string | undefined {
  return z.safeParse(schema, value).error?.issues[0]?.message;
}

function useZodClassicDefaultLocale(): void {
  z.config({ localeError: undefined });
  // Zod Classic configures its default locale when the first schema is constructed
  classic.string();
}

describe("getLocale", () => {
  testFor("Returns undefined when no locale is configured", () => {
    z.config({ localeError: undefined });
    expect(getLocale()).toBeUndefined();
  });
  testFor("Returns en when Zod is configured with the en locale", () => {
    z.config(en());
    expect(getLocale()).toBe("en");
  });
  testFor("Returns en when Zod Classic sets its default locale", () => {
    useZodClassicDefaultLocale();
    expect(getLocale()).toBe("en");
  });
  testFor("Returns undefined when Zod is configured with an unsupported locale", () => {
    z.config(ja());
    expect(getLocale()).toBeUndefined();
  });
  testFor("Returns undefined for a custom locale error map", () => {
    z.config({ localeError: () => "Custom locale message" });
    expect(getLocale()).toBeUndefined();
  });
  testFor("Returns undefined for a custom locale error map with no message", () => {
    z.config({ localeError: () => null });
    expect(getLocale()).toBeUndefined();
  });
  testFor("Returns en for a locale error map giving en messages as objects", () => {
    const { localeError } = en();
    z.config({
      localeError: (issue) => {
        const message = localeError(issue);
        return typeof message === "string" ? { message } : message;
      },
    });
    expect(getLocale()).toBe("en");
  });
  testFor("Follows changes to the configured locale", () => {
    const enLocale = en();
    z.config(enLocale);
    expect(getLocale()).toBe("en");
    z.config(ja());
    expect(getLocale()).toBeUndefined();
    z.config(enLocale);
    expect(getLocale()).toBe("en");
    z.config({ localeError: undefined });
    expect(getLocale()).toBeUndefined();
  });
});

describe("Custom messages", () => {
  testFor(
    "Are used when Zod is configured with the en locale",
    ({ collectionParamsWithBadDatableStringUnion, repeatedSubjectTuple }) => {
      z.config(en());
      expect(getMessage(WaniKani.CollectionParameters, collectionParamsWithBadDatableStringUnion)).toBe(
        messages.dateUnion,
      );
      expect(getMessage(WaniKani.ReviewPayload, badReviewPayload)).toBe(messages.reviewPayloadUnion);
      expect(getMessage(WaniKani.SubjectTuple, repeatedSubjectTuple)).toBe(messages.subjectTupleDuplicate);
    },
  );
  testFor(
    "Are used when Zod Classic sets its default locale",
    ({ collectionParamsWithBadDatableStringUnion, repeatedSubjectTuple }) => {
      useZodClassicDefaultLocale();
      expect(getMessage(WaniKani.CollectionParameters, collectionParamsWithBadDatableStringUnion)).toBe(
        messages.dateUnion,
      );
      expect(getMessage(WaniKani.ReviewPayload, badReviewPayload)).toBe(messages.reviewPayloadUnion);
      expect(getMessage(WaniKani.SubjectTuple, repeatedSubjectTuple)).toBe(messages.subjectTupleDuplicate);
    },
  );
  testFor(
    "Are not used when no locale is configured",
    ({ collectionParamsWithBadDatableStringUnion, repeatedSubjectTuple }) => {
      z.config({ localeError: undefined });
      expect(getMessage(WaniKani.CollectionParameters, collectionParamsWithBadDatableStringUnion)).toBe(
        "Invalid input",
      );
      expect(getMessage(WaniKani.ReviewPayload, badReviewPayload)).toBe("Invalid input");
      expect(getMessage(WaniKani.SubjectTuple, repeatedSubjectTuple)).toBe("Invalid input");
    },
  );
  testFor(
    "Defer to Zod for an unsupported locale",
    ({ collectionParamsWithBadDatableStringUnion, repeatedSubjectTuple }) => {
      z.config({ localeError: () => "Custom locale message" });
      expect(getMessage(WaniKani.CollectionParameters, collectionParamsWithBadDatableStringUnion)).toBe(
        "Custom locale message",
      );
      expect(getMessage(WaniKani.ReviewPayload, badReviewPayload)).toBe("Custom locale message");
      expect(getMessage(WaniKani.SubjectTuple, repeatedSubjectTuple)).toBe("Custom locale message");
    },
  );
  testFor("Follow the locale configured after the schemas were created", ({ repeatedSubjectTuple }) => {
    z.config({ localeError: undefined });
    expect(getMessage(WaniKani.SubjectTuple, repeatedSubjectTuple)).toBe("Invalid input");
    z.config(en());
    expect(getMessage(WaniKani.SubjectTuple, repeatedSubjectTuple)).toBe(messages.subjectTupleDuplicate);
    z.config(ja());
    expect(getMessage(WaniKani.SubjectTuple, repeatedSubjectTuple)).not.toBe(messages.subjectTupleDuplicate);
  });
});
