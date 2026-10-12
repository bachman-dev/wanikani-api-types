// oxlint-disable oxc/no-barrel-file -- This is the entrypoint for the package
import { revision as v20170710 } from "./v20170710/index.js";

/*
This file exports the schema of the recommended (latest) API revision, as `revision`, along with its definitions.
Generators should use `revisions` to generate every supported revision.
*/

export * from "./v20170710/index.js";

/** Every supported WaniKani API revision, oldest first; the last one is the latest. */
export const revisions = [v20170710] as const;
