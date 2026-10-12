# @bachman-dev/wanikani-api-schema

The internal, single source of truth for the WaniKani API schema. The type definitions in `@bachman-dev/wanikani-api-types` and the runtime schema in `@bachman-dev/wanikani-api-valibot` and `@bachman-dev/wanikani-api-zod` are generated from it; their `src/` files (other than `lang/` folders) shouldn't be edited by hand.

## Layout

- `src/core/` (`@bachman-dev/wanikani-api-schema/core`): the building blocks for defining schema (`define`, `object`, `property`, `union`, ...), along with helpers for writing generators (docs rendering, import tracking, writing and formatting files).
- `src/v20170710/` (`@bachman-dev/wanikani-api-schema/v20170710`): the definitions of the `20170710` API revision, one file per generated module, plus the revision's custom error `messages`.
- `src/index.ts`: the latest revision, along with `revisions`, every revision a generator should generate.

## Changing the Schema

1. Edit the definitions in `src/<revision>/`. Docs given to a definition or property are printed above it in every generated package.
2. Run `pnpm generate` from the repository root; this builds the schema package, then runs each package's `scripts/generate.ts`.
3. Commit the regenerated files along with the schema change.

CI runs `pnpm generate` and fails if it changes any files, so generated files can't fall out of date.

## Adding a Schema Library

1. Create the package, following the layout of the existing ones (`src/index.ts` exporting the latest revision from `src/v20170710/`).
2. Add `@bachman-dev/wanikani-api-schema` as a dev dependency, and a `generate` script running `node scripts/generate.ts`.
3. Write `scripts/generate.ts` (see `packages/valibot/scripts/generate.ts`), rendering every kind of `Schema` and passing the output to `generatePackageFiles()` and `writeGeneratedFiles()`.
4. Implement the revision's `messages` in `src/<revision>/lang/`, exported under the same names.
5. Write tests similar to those of the existing schema libraries.
