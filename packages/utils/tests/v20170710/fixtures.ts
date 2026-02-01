import { test } from "vitest";

export const testFor = test.extend({
  subjectMarkupWithJaTag: `The romaji "ka" can be written as <ja>か</ja> in hiragana. The romaji "setsu" can be written as <ja>せつ</ja>.`,
  subjectMarkupWithKanjiTag: `Two of WaniKani's Level 1 Kanji are <kanji>山</kanji> and <kanji>人</kanji>.`,
  subjectMarkupWithMeaningTag: `The kanji 一 means <meaning>one</meaning>. The kanji 二 means <meaning>two</meaning>.`,
  subjectMarkupWithRadicalTag: `One of the first radicals is the <radical>ground</radical> radical. A more complex one is <radical>coat rack</radical>.`,
  subjectMarkupWithReadingTag: `The partical は can sound like <reading>ha</reading>, but is also read like <reading>wa</reading>.`,
  subjectMarkupWithVocabularyTag: `The kanji 一 is used in the vocabulary <vocabulary>one thing</vocabulary> and <vocabulary>first floor</vocabulary>.`,
  subjectMarkupWithRadicalAndKanjiTags: `The kanji <kanji>three</kanji> is made up of the <radical>one</radical> and <radical>two</radical> radicals.`,
  subjectMarkupWithKanjiJaAndReadingTags: `The <kanji>mud</kanji> kanji is read like <reading>doro</reading> (<ja>どろ</ja>).`,
  subjectMarkupWithKanjiAndVocabularyTags: `The vocabulary <vocabulary>oil painting</vocabulary> uses the <kanji>oil</kanji> and <kanji>drawing</kanji> kanji.`,
  subjectMarkupWithVocabularyJaReadingAndMeaningTags: `The vocabulary <vocabulary>girl</vocabulary> can mean <meaning>maiden</meaning> as well, and is read <reading>shoujo</reading> (<ja>しょうじょ</ja>).`,
  subjectMarkupWithNestedTags: `The vocabulary <vocabulary>to go up</vocabulary> has a nested <ja><reading>word</reading></ja> in it. It's not <ja>very <reading>common</reading> to</ja> see this, but we should test for it.`,
  subjectMarkupWithEmptyTag: `Oops, this <ja></ja> tag has no text in it.`,
});
