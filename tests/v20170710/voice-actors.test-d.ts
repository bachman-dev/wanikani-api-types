import type * as WK from "../../src/v20170710/index.js";
import { assertType, describe } from "vitest";
import { testFor } from "./fixtures.js";

describe("VoiceActor", () => {
  testFor("Real VoiceActor", ({ voiceActor }) => {
    assertType<WK.VoiceActor>(voiceActor);
  });
});

describe("VoiceActorCollection", () => {
  testFor("Real VoiceActorCollection", ({ voiceActorCollection }) => {
    assertType<WK.VoiceActorCollection>(voiceActorCollection);
  });
});
