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

Some types in Version 1 had `never` interfaces in an attempt to make them easier to unionize with a WaniKani API Error; these properties have been removed in favor of using type guards / schema validation.

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

| Old Name            | New Name          |
| ------------------- | ----------------- |
| `WKCollection`      | `BaseCollection`  |
| `WKError`           | `ApiError`        |
| `WK_MAX_LEVELS`     | `MAX_LEVEL`       |
| `WK_MIN_LEVELS`     | `MIN_LEVEL`       |
| `isWKDatableString` | `isDatableString` |

#### Removed Items

The following items were removed from Version 2:

- All data types (e.g. `WKUserData`, `WKAssignmentData`, etc.), with the exception of subjects (see renamed items above), as they made testing type and schema validation more difficult, and were less likely to be used vs the entire object they were a part of; subject data types were kept as they are part of a discriminated union for mixed subjects returned from WaniKani.
- `WKCollectionParametersMap` which was only used by `validateParameters()` which was also removed (see below)
- The type aliases `WKMaxLessonBatchSize`, `WKMaxLevels`, `WKMaxSrsReviewStages`, `WKMaxSrsStages`, `WKMinLessonBatchSize`, and `WKMinLevels` were all removed in favor of using their constant equivalents.

#### `data` Union Removed from `BaseCollection`

Formerly `WKCollection`, this type had a `data` property that was a union of different typed arrays of WaniKani resources. This was removed, as there isn't a way to get multiple resource collections at once from WaniKani, nor would it be at all common to merge them together under this type like this in code.

#### `DatableString` Now Uses Valibot Brand

In Version 1, we used our own `Brand` internal type to prevent creating `WKDatableString`s, and further assert they were for dates returned by WaniKani. Now that we use Valibot to parse them, the type now uses Valibot's built-in brand type instead.

#### `MIN_LEVEL` Now Lowest WaniKani Level

Formerly `WK_MIN_LEVELS` this constant now represents the smallest level, `1`, available in WaniKani, rather than the lowest level given to free-tier users without a subscription.

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

Both constants and type aliases for numbers (e.g. `Level`, `MIN_LEVEL`, `LessonBatchSizeNumber`, etc.) have had their types widened. Constants are now plain number literals with type `number` instead of their corresponding type alias, and type aliases were widened to `number & {}` so they show up in documentation. This allows for easier use of dynamically figured numbers in code. Type guards and schema should be used to validate these numbers; they are validated when used in `ApiRequestFactory`, e.g. when creating a request with `CollectionParameters`.
