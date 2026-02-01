import * as Utils from "../../src/v20170710/index.js";
import { describe, expect } from "vitest";
import { testFor } from "./fixtures.js";
describe("SUBJECT_MARKUP_MATCHER", () => {
  testFor("Matches Japanese text highlighting in <ja> tags", ({ subjectMarkupWithJaTag }) => {
    const matchedText = [...subjectMarkupWithJaTag.matchAll(Utils.SUBJECT_MARKUP_MATCHER)];
    expect(matchedText).toHaveLength(2);
    expect(matchedText[0]?.[0]).toBe("<ja>か</ja>");
    expect(matchedText[0]?.groups?.tag).toBe("ja");
    expect(matchedText[0]?.groups?.innerText).toBe("か");
    expect(matchedText[1]?.[0]).toBe("<ja>せつ</ja>");
    expect(matchedText[1]?.groups?.tag).toBe("ja");
    expect(matchedText[1]?.groups?.innerText).toBe("せつ");
  });

  testFor("Matches Kanji highlighting in <kanji> tags", ({ subjectMarkupWithKanjiTag }) => {
    const matchedText = [...subjectMarkupWithKanjiTag.matchAll(Utils.SUBJECT_MARKUP_MATCHER)];
    expect(matchedText).toHaveLength(2);
    expect(matchedText[0]?.[0]).toBe("<kanji>山</kanji>");
    expect(matchedText[0]?.groups?.tag).toBe("kanji");
    expect(matchedText[0]?.groups?.innerText).toBe("山");
    expect(matchedText[1]?.[0]).toBe("<kanji>人</kanji>");
    expect(matchedText[1]?.groups?.tag).toBe("kanji");
    expect(matchedText[1]?.groups?.innerText).toBe("人");
  });

  testFor("Matches Meaning highlighting in <meaning> tags", ({ subjectMarkupWithMeaningTag }) => {
    const matchedText = [...subjectMarkupWithMeaningTag.matchAll(Utils.SUBJECT_MARKUP_MATCHER)];
    expect(matchedText).toHaveLength(2);
    expect(matchedText[0]?.[0]).toBe("<meaning>one</meaning>");
    expect(matchedText[0]?.groups?.tag).toBe("meaning");
    expect(matchedText[0]?.groups?.innerText).toBe("one");
    expect(matchedText[1]?.[0]).toBe("<meaning>two</meaning>");
    expect(matchedText[1]?.groups?.tag).toBe("meaning");
    expect(matchedText[1]?.groups?.innerText).toBe("two");
  });

  testFor("Matches Radical highlighting in <radical> tags", ({ subjectMarkupWithRadicalTag }) => {
    const matchedText = [...subjectMarkupWithRadicalTag.matchAll(Utils.SUBJECT_MARKUP_MATCHER)];
    expect(matchedText).toHaveLength(2);
    expect(matchedText[0]?.[0]).toBe("<radical>ground</radical>");
    expect(matchedText[0]?.groups?.tag).toBe("radical");
    expect(matchedText[0]?.groups?.innerText).toBe("ground");
    expect(matchedText[1]?.[0]).toBe("<radical>coat rack</radical>");
    expect(matchedText[1]?.groups?.tag).toBe("radical");
    expect(matchedText[1]?.groups?.innerText).toBe("coat rack");
  });

  testFor("Matches Reading highlighting in <reading> tags", ({ subjectMarkupWithReadingTag }) => {
    const matchedText = [...subjectMarkupWithReadingTag.matchAll(Utils.SUBJECT_MARKUP_MATCHER)];
    expect(matchedText).toHaveLength(2);
    expect(matchedText[0]?.[0]).toBe("<reading>ha</reading>");
    expect(matchedText[0]?.groups?.tag).toBe("reading");
    expect(matchedText[0]?.groups?.innerText).toBe("ha");
    expect(matchedText[1]?.[0]).toBe("<reading>wa</reading>");
    expect(matchedText[1]?.groups?.tag).toBe("reading");
    expect(matchedText[1]?.groups?.innerText).toBe("wa");
  });

  testFor("Matches Vocabulary highlighting in <vocabulary> tags", ({ subjectMarkupWithVocabularyTag }) => {
    const matchedText = [...subjectMarkupWithVocabularyTag.matchAll(Utils.SUBJECT_MARKUP_MATCHER)];
    expect(matchedText).toHaveLength(2);
    expect(matchedText[0]?.[0]).toBe("<vocabulary>one thing</vocabulary>");
    expect(matchedText[0]?.groups?.tag).toBe("vocabulary");
    expect(matchedText[0]?.groups?.innerText).toBe("one thing");
    expect(matchedText[1]?.[0]).toBe("<vocabulary>first floor</vocabulary>");
    expect(matchedText[1]?.groups?.tag).toBe("vocabulary");
    expect(matchedText[1]?.groups?.innerText).toBe("first floor");
  });

  testFor(
    "Matches <radical> and <kanji> highlighting, like in a kanji meaning mnemonic",
    ({ subjectMarkupWithRadicalAndKanjiTags }) => {
      const matchedText = [...subjectMarkupWithRadicalAndKanjiTags.matchAll(Utils.SUBJECT_MARKUP_MATCHER)];
      expect(matchedText).toHaveLength(3);
      expect(matchedText[0]?.[0]).toBe("<kanji>three</kanji>");
      expect(matchedText[0]?.groups?.tag).toBe("kanji");
      expect(matchedText[0]?.groups?.innerText).toBe("three");
      expect(matchedText[1]?.[0]).toBe("<radical>one</radical>");
      expect(matchedText[1]?.groups?.tag).toBe("radical");
      expect(matchedText[1]?.groups?.innerText).toBe("one");
      expect(matchedText[2]?.[0]).toBe("<radical>two</radical>");
      expect(matchedText[2]?.groups?.tag).toBe("radical");
      expect(matchedText[2]?.groups?.innerText).toBe("two");
    },
  );

  testFor(
    "Matches <kanji>, <reading>, and <ja> highlighting, like in a kanji reading mnemonic",
    ({ subjectMarkupWithKanjiJaAndReadingTags }) => {
      const matchedText = [...subjectMarkupWithKanjiJaAndReadingTags.matchAll(Utils.SUBJECT_MARKUP_MATCHER)];
      expect(matchedText).toHaveLength(3);
      expect(matchedText[0]?.[0]).toBe("<kanji>mud</kanji>");
      expect(matchedText[0]?.groups?.tag).toBe("kanji");
      expect(matchedText[0]?.groups?.innerText).toBe("mud");
      expect(matchedText[1]?.[0]).toBe("<reading>doro</reading>");
      expect(matchedText[1]?.groups?.tag).toBe("reading");
      expect(matchedText[1]?.groups?.innerText).toBe("doro");
      expect(matchedText[2]?.[0]).toBe("<ja>どろ</ja>");
      expect(matchedText[2]?.groups?.tag).toBe("ja");
      expect(matchedText[2]?.groups?.innerText).toBe("どろ");
    },
  );

  testFor(
    "Matches <kanji> and <vocabulary> highlighting, like in a vocabulary meaning mnemonic",
    ({ subjectMarkupWithKanjiAndVocabularyTags }) => {
      const matchedText = [...subjectMarkupWithKanjiAndVocabularyTags.matchAll(Utils.SUBJECT_MARKUP_MATCHER)];
      expect(matchedText).toHaveLength(3);
      expect(matchedText[0]?.[0]).toBe("<vocabulary>oil painting</vocabulary>");
      expect(matchedText[0]?.groups?.tag).toBe("vocabulary");
      expect(matchedText[0]?.groups?.innerText).toBe("oil painting");
      expect(matchedText[1]?.[0]).toBe("<kanji>oil</kanji>");
      expect(matchedText[1]?.groups?.tag).toBe("kanji");
      expect(matchedText[1]?.groups?.innerText).toBe("oil");
      expect(matchedText[2]?.[0]).toBe("<kanji>drawing</kanji>");
      expect(matchedText[2]?.groups?.tag).toBe("kanji");
      expect(matchedText[2]?.groups?.innerText).toBe("drawing");
    },
  );

  testFor(
    "Matches <vocabulary>, <meaning>, <reading>, and <ja> tags, like in a vocabulary reading mnemonic",
    ({ subjectMarkupWithVocabularyJaReadingAndMeaningTags }) => {
      const matchedText = [
        ...subjectMarkupWithVocabularyJaReadingAndMeaningTags.matchAll(Utils.SUBJECT_MARKUP_MATCHER),
      ];
      expect(matchedText).toHaveLength(4);
      expect(matchedText[0]?.[0]).toBe("<vocabulary>girl</vocabulary>");
      expect(matchedText[0]?.groups?.tag).toBe("vocabulary");
      expect(matchedText[0]?.groups?.innerText).toBe("girl");
      expect(matchedText[1]?.[0]).toBe("<meaning>maiden</meaning>");
      expect(matchedText[1]?.groups?.tag).toBe("meaning");
      expect(matchedText[1]?.groups?.innerText).toBe("maiden");
      expect(matchedText[2]?.[0]).toBe("<reading>shoujo</reading>");
      expect(matchedText[2]?.groups?.tag).toBe("reading");
      expect(matchedText[2]?.groups?.innerText).toBe("shoujo");
      expect(matchedText[3]?.[0]).toBe("<ja>しょうじょ</ja>");
      expect(matchedText[3]?.groups?.tag).toBe("ja");
      expect(matchedText[3]?.groups?.innerText).toBe("しょうじょ");
    },
  );
});

describe("parseSubjectMarkup", () => {
  testFor("Parses an empty string", () => {
    expect(Utils.parseSubjectMarkup("")).toStrictEqual([]);
  });

  testFor("Parses Japanese text highlighting in <ja> tags", ({ subjectMarkupWithJaTag }) => {
    const parsed: Utils.ParsedSubjectMarkup[] = [
      {
        text: `The romaji "ka" can be written as `,
      },
      {
        tag: "ja",
        children: [{ text: "か" }],
      },
      {
        text: ` in hiragana. The romaji "setsu" can be written as `,
      },
      {
        tag: "ja",
        children: [{ text: "せつ" }],
      },
      {
        text: ".",
      },
    ];
    expect(Utils.parseSubjectMarkup(subjectMarkupWithJaTag)).toStrictEqual(parsed);
  });

  testFor("Parses Kanji highlighting in <kanji> tags", ({ subjectMarkupWithKanjiTag }) => {
    const parsed: Utils.ParsedSubjectMarkup[] = [
      {
        text: "Two of WaniKani's Level 1 Kanji are ",
      },
      {
        tag: "kanji",
        children: [{ text: "山" }],
      },
      {
        text: " and ",
      },
      {
        tag: "kanji",
        children: [{ text: "人" }],
      },
      {
        text: ".",
      },
    ];
    expect(Utils.parseSubjectMarkup(subjectMarkupWithKanjiTag)).toStrictEqual(parsed);
  });

  testFor("Parses Meaning highlighting in <meaning> tags", ({ subjectMarkupWithMeaningTag }) => {
    const parsed: Utils.ParsedSubjectMarkup[] = [
      {
        text: "The kanji 一 means ",
      },
      {
        tag: "meaning",
        children: [{ text: "one" }],
      },
      {
        text: ". The kanji 二 means ",
      },
      {
        tag: "meaning",
        children: [{ text: "two" }],
      },
      {
        text: ".",
      },
    ];
    expect(Utils.parseSubjectMarkup(subjectMarkupWithMeaningTag)).toStrictEqual(parsed);
  });

  testFor("Parses Radical highlighting in <radical> tags", ({ subjectMarkupWithRadicalTag }) => {
    const parsed: Utils.ParsedSubjectMarkup[] = [
      {
        text: "One of the first radicals is the ",
      },
      {
        tag: "radical",
        children: [{ text: "ground" }],
      },
      {
        text: " radical. A more complex one is ",
      },
      {
        tag: "radical",
        children: [{ text: "coat rack" }],
      },
      {
        text: ".",
      },
    ];
    expect(Utils.parseSubjectMarkup(subjectMarkupWithRadicalTag)).toStrictEqual(parsed);
  });

  testFor("Parses Reading highlighting in <reading> tags", ({ subjectMarkupWithReadingTag }) => {
    const parsed: Utils.ParsedSubjectMarkup[] = [
      {
        text: "The partical は can sound like ",
      },
      {
        tag: "reading",
        children: [{ text: "ha" }],
      },
      {
        text: ", but is also read like ",
      },
      {
        tag: "reading",
        children: [{ text: "wa" }],
      },
      {
        text: ".",
      },
    ];
    expect(Utils.parseSubjectMarkup(subjectMarkupWithReadingTag)).toStrictEqual(parsed);
  });

  testFor("Parses Vocabulary highlighting in <vocabulary> tags", ({ subjectMarkupWithVocabularyTag }) => {
    const parsed: Utils.ParsedSubjectMarkup[] = [
      {
        text: "The kanji 一 is used in the vocabulary ",
      },
      {
        tag: "vocabulary",
        children: [{ text: "one thing" }],
      },
      {
        text: " and ",
      },
      {
        tag: "vocabulary",
        children: [{ text: "first floor" }],
      },
      {
        text: ".",
      },
    ];
    expect(Utils.parseSubjectMarkup(subjectMarkupWithVocabularyTag)).toStrictEqual(parsed);
  });

  testFor(
    "Parses <radical> and <kanji> highlighting, like in a kanji meaning mnemonic",
    ({ subjectMarkupWithRadicalAndKanjiTags }) => {
      const parsed: Utils.ParsedSubjectMarkup[] = [
        {
          text: "The kanji ",
        },
        {
          tag: "kanji",
          children: [{ text: "three" }],
        },
        {
          text: " is made up of the ",
        },
        {
          tag: "radical",
          children: [{ text: "one" }],
        },
        {
          text: " and ",
        },
        {
          tag: "radical",
          children: [{ text: "two" }],
        },
        {
          text: " radicals.",
        },
      ];
      expect(Utils.parseSubjectMarkup(subjectMarkupWithRadicalAndKanjiTags)).toStrictEqual(parsed);
    },
  );

  testFor(
    "Parses <kanji>, <reading>, and <ja> highlighting, like in a kanji reading mnemonic",
    ({ subjectMarkupWithKanjiJaAndReadingTags }) => {
      const parsed: Utils.ParsedSubjectMarkup[] = [
        {
          text: "The ",
        },
        {
          tag: "kanji",
          children: [{ text: "mud" }],
        },
        {
          text: " kanji is read like ",
        },
        {
          tag: "reading",
          children: [{ text: "doro" }],
        },
        {
          text: " (",
        },
        {
          tag: "ja",
          children: [{ text: "どろ" }],
        },
        {
          text: ").",
        },
      ];
      expect(Utils.parseSubjectMarkup(subjectMarkupWithKanjiJaAndReadingTags)).toStrictEqual(parsed);
    },
  );

  testFor(
    "Parses <kanji> and <vocabulary> highlighting, like in a vocabulary meaning mnemonic",
    ({ subjectMarkupWithKanjiAndVocabularyTags }) => {
      const parsed: Utils.ParsedSubjectMarkup[] = [
        {
          text: "The vocabulary ",
        },
        {
          tag: "vocabulary",
          children: [{ text: "oil painting" }],
        },
        {
          text: " uses the ",
        },
        {
          tag: "kanji",
          children: [{ text: "oil" }],
        },
        {
          text: " and ",
        },
        {
          tag: "kanji",
          children: [{ text: "drawing" }],
        },
        {
          text: " kanji.",
        },
      ];
      expect(Utils.parseSubjectMarkup(subjectMarkupWithKanjiAndVocabularyTags)).toStrictEqual(parsed);
    },
  );

  testFor(
    "Parses <vocabulary>, <meaning>, <reading>, and <ja> tags, like in a vocabulary reading mnemonic",
    ({ subjectMarkupWithVocabularyJaReadingAndMeaningTags }) => {
      const parsed: Utils.ParsedSubjectMarkup[] = [
        {
          text: "The vocabulary ",
        },
        {
          tag: "vocabulary",
          children: [{ text: "girl" }],
        },
        {
          text: " can mean ",
        },
        {
          tag: "meaning",
          children: [{ text: "maiden" }],
        },
        {
          text: " as well, and is read ",
        },
        {
          tag: "reading",
          children: [{ text: "shoujo" }],
        },
        {
          text: " (",
        },
        {
          tag: "ja",
          children: [{ text: "しょうじょ" }],
        },
        {
          text: ").",
        },
      ];
      expect(Utils.parseSubjectMarkup(subjectMarkupWithVocabularyJaReadingAndMeaningTags)).toStrictEqual(parsed);
    },
  );

  testFor("Parses subject markup with nested tags", ({ subjectMarkupWithNestedTags }) => {
    const parsed: Utils.ParsedSubjectMarkup[] = [
      {
        text: "The vocabulary ",
      },
      {
        tag: "vocabulary",
        children: [{ text: "to go up" }],
      },
      {
        text: " has a nested ",
      },
      {
        tag: "ja",
        children: [{ tag: "reading", children: [{ text: "word" }] }],
      },
      {
        text: " in it. It's not ",
      },
      {
        tag: "ja",
        children: [{ text: "very " }, { tag: "reading", children: [{ text: "common" }] }, { text: " to" }],
      },
      {
        text: " see this, but we should test for it.",
      },
    ];
    expect(Utils.parseSubjectMarkup(subjectMarkupWithNestedTags)).toStrictEqual(parsed);
  });

  testFor("Parses subject markup with empty tags (i.e. no child text/tags)", ({ subjectMarkupWithEmptyTag }) => {
    const parsed: Utils.ParsedSubjectMarkup[] = [
      {
        text: "Oops, this ",
      },
      {
        tag: "ja",
        children: [],
      },
      {
        text: " tag has no text in it.",
      },
    ];
    expect(Utils.parseSubjectMarkup(subjectMarkupWithEmptyTag)).toStrictEqual(parsed);
  });
});
