import { alias, array, define, defineModule, literal, object, picklist, property, string } from "../core/index.js";
import { BaseCollection, BaseResource, CollectionParameters, DatableString, SafeInteger } from "./base.js";

const collectionSee = ["https://docs.api.wanikani.com/20170710/#get-all-voice-actors"];

export const VoiceActor = define(
  "VoiceActor",
  object(
    {
      data: property(
        object({
          created_at: property(DatableString, "Timestamp for when the voice actor was added to WaniKani."),
          description: property(string(), "Details about the voice actor."),
          gender: property(picklist(["female", "male"]), "The voice actor's gender, either `male` or `female`."),
          name: property(string(), "The voice actor's name."),
        }),
        "Data for the returned voice actor.",
      ),
      id: property(SafeInteger, "A unique number identifying the voice actor."),
      object: property(literal("voice_actor"), "The kind of object returned."),
    },
    { extends: [BaseResource] },
  ),
  {
    description: "Available voice actors used for vocabulary reading pronunciation audio.",
    see: ["https://docs.api.wanikani.com/20170710/#voice-actors"],
  },
  { typeGuard: true },
);

export const VoiceActorCollection = define(
  "VoiceActorCollection",
  object({ data: property(array(VoiceActor), "An array of returned voice actors.") }, { extends: [BaseCollection] }),
  {
    description: "A collection of voice actors returned from the WaniKani API.",
    see: collectionSee,
  },
  { typeGuard: true },
);

export const VoiceActorParameters = alias("VoiceActorParameters", CollectionParameters, {
  description: "Parameters that can be passed to the WaniKani API to filter a request for a Voice Actor Collection.",
  see: collectionSee,
});

export default defineModule("voice-actors", [VoiceActor, VoiceActorCollection, VoiceActorParameters]);
