import { assertType, describe } from "vitest";

import type * as WaniKani from "../../src/v20170710/index.js";
import testFor from "./fixtures.js";

describe("VoiceActor", () => {
  testFor("Real VoiceActor", ({ voiceActor }) => {
    assertType<WaniKani.VoiceActor>(voiceActor);
  });
});

describe("VoiceActorCollection", () => {
  testFor("Real VoiceActorCollection", ({ voiceActorCollection }) => {
    assertType<WaniKani.VoiceActorCollection>(voiceActorCollection);
  });
});
