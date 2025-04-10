---
title: Upgrade Guide
category: Guides
---

# Upgrade Guide

This guide contains advice and considerations when upgrading this library between major versions.

## Version 1.x to 2.0

Version 2.0 of the library introduced several breaking changes including renamed and removed items, but also introduced some new features that are especially helpful for runtime validation of data going to/from the WaniKani API.

### ⚠️ Breaking Changes

#### Minimum TypeScript Version 5.0

While the library itself doesn't make use of any features requiring 5.0, it is easier to build when we use 5.0 as a minimum version. This combined with the version being released in March 2023 and being widely adopted made it a good minimum version for the typescript peerDependency.

#### Library Targets ES2022

We use a new indices (`d`) flag in a regular expression that requires running on an ES2022 or higher runtime. All major browsers and JS runtimes (Node, Deno, Bun, etc.) support these features in their recent versions.

#### Exports Are Officially ESM Only

In Version 1, we didn't have an actual policy on whether we supported alternate module systems like CommonJS. In Version 2, we're making it official policy that we'll only be supporting ECMAScript Modules (ESM) as an exported format; while it may be possible to use the library in a CommonJS or other module setting, we aren't able to easily accommodate it.

#### Change to `v20170710` Module

When we published Version 1, the export configuration for the package's modules was valid but not ideal; it pointed to a relative path of the package instead of a module name. Those using the `v20170710` module will need to update their imports to use the new module like so:

```diff
- import {} from  "@bachman-dev/wanikani-api-types/dist/v20170710";
+ import {} from  "@bachman-dev/wanikani-api-types/v20170710";
```

#### Non-Type Import Side Effects

Due to our introducing Valibot schema (see further down), importing items without using `import type` may lead to unintended side effects such as an increased bundle size. If only the type definition is needed, make sure to only import its type.

```diff
- import { /* ... */ } from "@bachman-dev/wanikani-api-types/dist/v20170710";
+ import type { /* ... */ } from "@bachman-dev/wanikani-api-types/v20170710";
```

#### Unionizing `never` Properties Removed

Some types in Version 1 had `never` typed properties in an attempt to make them easier to unionize with a WaniKani API Error; these properties have been removed in favor of using type guards / schema validation.

#### `WK` Prefix Removed from Items

Unless otherwise noted below, most items have only had their `WK` prefix removed in terms of renaming.

```diff
- import { type WKAssignmentParameters, WK_API_REVISION } from "@bachman-dev/wanikani-api-types/dist/v20170710";
+ import { type AssignmentParameters, API_REVISION } from "@bachman-dev/wanikani-api-types/v20170710";

- const params: WKAssignmentParameters = {};
- const apiYear = WK_API_REVISION.slice(0, 5);
+ const params: AssignmentParameters = {};
+ const apiYear = API_REVISION.slice(0, 5);
```

Items can be imported using a namespaced / wildcard import with a prefix (`WK` or otherwise) if one is desired.

```diff
- import { type WKAssignmentParameters, WK_API_REVISION } from "@bachman-dev/wanikani-api-types/dist/v20170710";
+ import * as WK from "@bachman-dev/wanikani-api-types/v20170710";

- const params: WKAssignmentParameters = {};
- const apiYear = WK_API_REVISION.slice(0, 5);
+ const params: WK.AssignmentParameters = {};
+ const apiYear = WK.API_REVISION.slice(0, 5);
```

#### Renamed Items

The following items were renamed in Version 2 beyond just having a `WK` prefix removed:

| Old Name                      | New Name                                |
| ----------------------------- | --------------------------------------- |
| `WKCollection`                | `BaseCollection`                        |
| `WKError`                     | `ApiError`                              |
| `WKReport`                    | `BaseReport`                            |
| `WKRequest`                   | `ApiRequest`                            |
| `WKRequestFactory`            | `ApiRequestFactory`                     |
| `WKRequestFactoryInit`        | `ApiRequestFactoryInit`                 |
| `WKRequestHeaders`            | `ApiRequestHeaders`                     |
| `WKRequestGetOptions`         | `ApiRequestOptions`                     |
| `WKResource`                  | `BaseResource`                          |
| `WKSubjectData`               | `SubjectBaseData`                       |
| `WK_MAX_LEVELS`               | `MAX_LEVEL`                             |
| `WK_MIN_LEVELS`               | `MIN_LEVEL`                             |
| `isWKDatableString()`         | `isDatableString()`                     |
| `isWKLevel()`                 | `isLevel()`                             |
| `isWKLessonBatchSizeNumber()` | `isLessonBatchSizeNumber()`             |
| `isWKSrsStageNumber()`        | `isSpacedRepetitionSystemStageNumber()` |

#### Removed Items

The following items were removed from Version 2:

- All data types (e.g. `WKUserData`, `WKAssignmentData`, etc.), with the exception of subjects (`RadicalData`, `KanjiData`, etc.), as they made testing type and schema validation more difficult, and were less likely to be used vs the entire object they were a part of; subject data types were kept as they are part of a discriminated union for mixed subjects returned from WaniKani.
- `WKCollectionParametersMap` and `WKPayloadMap`, which were only used by `validateParameters()` and `validatePayload()` respectively which were also removed (see below)
- The type aliases `WKMaxLessonBatchSize`, `WKMaxLevels`, `WKMaxSrsReviewStages`, `WKMaxSrsStages`, `WKMinLessonBatchSize`, and `WKMinLevels` were all removed in favor of using their constant equivalents.
- `WKResourceType`, as it's unlikely that code would need to use this union when working with the WaniKani API, ie these resources aren't gathered at the same time from the API
- `WKRequestPostPutOptions` in favor of using `ApiRequestOptions` (formerly `WKRequestGetOptions`) for all request types, as all requests now only accept a `customHeaders` option instead of dedicated header options for `ifModifiedSince` and/or `ifNoneMatch` (see below)
- `WKAssignmentRequests`, `WKLevelProgressionRequests`, `WKResetRequests`, `WKReviewRequests`, `WKReviewStatisticRequests`, `WKSpacedRepetitionSystemRequests`, `WKStudyMaterialRequests`, `WKSubjectRequests`, `WKSummaryRequests`, `WKUserRequests`, and `WKVoiceActorRequests` were all removed when the request factory was rewritten to use `public readonly` objects instead of accessors; these types were likely only used by the library itself
- `WKReviewObjectdBase`, `WKReviewObjectWithAssignmentId`, and `WKReviewObjectWithSubjectId` in favor of directly expressing the union of allowed IDs under `ReviewPayload` (formerly `WKReviewPayload`)
- `WKRadicalCharacterImagePngMetadata` and `WKRadicalCharacterImageSvgMetadata` in favor of having the `metadata` field of `RadicalCharacterImage` (formerly `WKRadicalCharacterImage`) be formed using a discriminated union on the `content_type` field
- `isWKLevelArray()` and `isWKSrsStageNumberArray()`, as the underlying types being guarded are now wide enough (e.g. for dynamically generated numbers) that they became redundant
- `validateParameters()` and `validatePayload()` were removed in favor of using either schema validation or the request factory to construct a request to the API, now named {@link ApiRequestFactory}

#### `data` Property Removed from `BaseCollection`, `BaseReport`, and `BaseResource`

Formerly `WKCollection`, `WKReport`, and `WKResource` respectively, these types had a `data` property that was a union of different typed data for items that extended these types. These were removed, as they didn't align well with how the data was actually presented by the WaniKani API, ie there isn't a way to get different collections, reports, or resources in one go via the API.

#### `DatableString` Now Uses Valibot Brand

In Version 1, we used our own `Brand` internal type to prevent creating a `WKDatableString`, and further assert they were for dates returned by WaniKani. Now that we use Valibot to parse them (and thus optionally create them outside of the WaniKani API), the type now uses Valibot's built-in brand type instead.

#### `MIN_LEVEL` Now Lowest WaniKani Level

Formerly `WK_MIN_LEVELS` this constant now represents the smallest level, `1`, available in WaniKani, rather than the lowest level given to free-tier users without a subscription.

#### `ApiRequestFactory` Now Prefers Lowercase HTTP Header Names

In Version 2, `ApiRequestFactory`, formerly `WKRequestFactory`, now works with headers after converting their values to lowercase. This allows the factory to conform with multiple HTTP versions. The WaniKani API recognizes these lowercase header names. The factory will only send known API headers in lowercase; all other header names (e.g. those provided as custom headers) will be converted to lowercase only during validation against type-checked headers.

#### Removed Dedicated `ifModifiedSince` and `ifNoneMatch` Request Options

These options were removed to make the code simpler when constructing headers for a returned `ApiRequest` (formerly `WKRequest`). They should be set using the `customHeaders` property instead.

```diff
- options.ifModifiedSince = date;
- options.ifNoneMatch = etag;
+ options.customHeaders = {
+   "if-modified-since": date,
+   "if-none-match": etag,
+ };
```

#### `ApiRequestFactory` Methods Now Throw `ValiError`

The methods for creating requests in the `ApiRequestFactory` (formerly `WKRequestFactory`) now perform additional validation on IDs when requesting individual resources, such as safe integer validation, and therefore may throw a `ValiError` in addition to a `TypeError`, which is throw when type-checked headers are invalid. This is reflected by the parameter being a `SafeInteger` instead of a plain `number`. More info on this new type is further down in the next parent section.

#### `ApiRequestFactory` Uses `public readonly` Objects Instead of Accessors

This change is mostly internal, but is mentioned in case it causes breaking changes. As mentioned with the removed type aliases above, the factory now uses `public readonly` objects containing the methods to construct an `ApiRequest` (formerly `WKRequest`). This has helped reduce redundant code and make the library smaller.

#### `characters` Property No Longer in Subject Base

`WKSubjectData` included a `characters` property that was extended on `WKRadicalData` to be `string | null`, and `string` on other subject type in Version 1. This was removed on the base interface, and is now only present on the subject data types themselves. This does not affect code that was using the intefaces that extended the base interface.

#### `Subject` is Now a Discriminated Union

Formerly `WKSubject`, this type now uses the `object` field as a variant to create a discriminated union for the `data` field. This is a cleaner way of unionizing the subject types when retrieving them from the WaniKani API. This should not produce breaking changes in most cases, but may affect type checking depending on how the type is used, e.g. as a type parameter.

#### `WK_SUBJECT_MARKUP_MATCHERS` Combined into `SUBJECT_MARKUP_MATCHER`

In Version 1, this was an object with separate regex matchers for each individual subject markup tag found in mnemonics and hints in the WaniKani API. These have been combined into one matcher that matches on all the tags. A new `tag` capture group has been added to check the tag name, alongside the existing `innerText` group. The matcher also makes use of the `d` flag to provide start and end indices for matches and groups.

### Other Enhancements to Consider

#### Items Moved in Documentation

The following items changed file locations in Version 2, which meant a change in their documentation categories:

| Item                                | Old Category | New Category              |
| ----------------------------------- | ------------ | ------------------------- |
| `LessonBatchSizeNumber`             | Base         | User                      |
| `SpacedRepetitionSystemStageNumber` | Base         | Spaced Repetition Systems |
| `SubjectTuple`                      | Base         | Subjects                  |
| `SubjectType`                       | Base         | Subjects                  |
| `MAX_LESSON_BATCH_SIZE`             | Base         | User                      |
| `MAX_SRS_STAGE`                     | Base         | Spaced Repetition Systems |
| `MAX_SRS_REVIEW_STAGE`              | Base         | Spaced Repetition Systems |
| `MIN_LESSON_BATCH_SIZE`             | Base         | User                      |
| `MIN_SRS_STAGE`                     | Base         | Spaced Repetition Systems |

#### `typescript` peerDependency is now optional

When Version 1 of the library was released, it consisted mostly of TypeScript types, so it made sense, in our opinion at the time anyway, to have TypeScript be a required peerDependency; it's since been made optional with the addition of more runtime code, particularly schema and type guards.

#### Valibot Schema for Runtime Validation

Every exported type now includes a matching Valibot schema, which can be used with any Valibot or [Standard Schema](https://standardschema.dev/) compatible application/library/etc.

```ts
import * as v from "valibot";
import { Assignment } from "@bachman-dev/wanikani-api-types/v20170710";

const response = await fetch(url);

const data = await response.json();

// Both the typedef and schema share a name here
const assignment: Assignment = v.parse(Assignment, data);
```

#### Type Guards

Every type returned from the WaniKani API now includes a type guard for runtime validation instead of merely asserting the type.

```ts
import { isAssignment } from "@bachman-dev/wanikani-api-types/v20170710";

const response = await fetch(url, options);
const assignment = await response.json();

if (isAssignment(assignment)) {
  const { object } = assignment; // "assignment"
}
```

#### Number Types Widened

Both constants and type aliases for numbers (e.g. `Level`, `MIN_LEVEL`, `LessonBatchSizeNumber`, the `starting_srs_stage` and `ending_srs_stage` on reviews, etc.) have had their types widened. Constants are now plain number literals with type `number` instead of their corresponding type alias, and type aliases / interface properties were widened to `number & {}` type aliases so they show up in documentation. This allows for easier use of dynamically calculated numbers in code. Type guards and schema should be used to validate these numbers; they are validated when used in `ApiRequestFactory`, e.g. when creating a request with `CollectionParameters`.

#### `SafeInteger` Type for Validated Numbers

Some numbers, such as resource IDs, are validated to make sure they are a safe integer, to help catch impossible values before actually sending them to the WaniKani API. This is typed as `number & {}` so that it shows up as documentation; any number can be used from TypeScript's perspective, but they are subject to a runtime validation and may throw an error.

#### Subject Markup Parser

A new method, {@link parseSubjectMarkup}, can be used to parse a WaniKani subject mnemonic/hint with subject markup tags into an array of {@link ParsedSubjectMarkup} nodes, which can be traversed to construct HTML, JSX, and other UI components based on the markup for rendering.
