import type { Definition } from "./schema.js";
import validateRevision from "./validate.js";

/** A group of definitions generated into one file, e.g. `assignments.ts`. */
export interface Module {
  /** The file name, without an extension. */
  readonly name: string;

  /** The documentation category of every definition in the module. */
  readonly category: string;

  /** The definitions, in the order they're generated; a definition must come after any it references. */
  readonly definitions: readonly Definition[];
}

/** A WaniKani API revision, generated into its own folder, e.g. `v20170710`. */
export interface Revision {
  /** The WaniKani API revision, e.g. `20170710`. */
  readonly revision: string;

  /** The folder name of the revision, e.g. `v20170710`. */
  readonly folder: string;

  readonly modules: readonly Module[];

  /**
   * Custom error messages used by schemas, keyed by name, with their default (English) text. Runtime schema libraries
   * implement each message in their `lang` folder, exported under the same name.
   */
  readonly messages: Readonly<Record<string, string>>;
}

/**
 * Defines a module of an API revision.
 *
 * @param name The file name, without an extension
 * @param category The documentation category of every definition in the module
 * @param definitions The definitions, in the order they're generated
 * @returns The module
 */
export function defineModule(name: string, category: string, definitions: readonly Definition[]): Module {
  return { name, category, definitions };
}

/**
 * Defines an API revision, validating that its definitions can be generated.
 *
 * @param revision The revision's modules and messages
 * @returns The revision
 * @throws {Error} If the revision's definitions are invalid
 */
export function defineRevision(revision: Omit<Revision, "folder">): Revision {
  const defined: Revision = { ...revision, folder: `v${revision.revision}` };
  const problems = validateRevision(defined);
  if (problems.length > 0) {
    const list = problems.map((problem) => `- ${problem}`).join("\n");
    throw new Error(`Invalid schema for revision ${revision.revision}:\n${list}`);
  }
  return defined;
}
