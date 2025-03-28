---
title: Upgrade Guide
category: Guides
---

# Upgrade Guide

This guide contains advice and considerations when upgrading this library between major versions.

Headings marked with a ⚠️ indicate breaking changes that may require code changes.

## Version 1.x to 2.0

Version 2.0 of the library introduced several breaking changes including renamed and removed items, but also introduced some new features that are especially helpful for runtime validation of data going to/from the WaniKani API.

### General Changes

#### ⚠️ Minimum TypeScript Version 5.0

While the library itself doesn't make use of any features requiring 5.0, it is easier to build when we use 5.0 as a minimum version. This combined with the version being released in March 2023 and being widely adopted made it a good minimum version for the typescript peerDependency.

#### `typescript` peerDependency is now optional

When Version 1 of the library was released, it consisted mostly of TypeScript types, so it made sense, in our opinion at the time anyway, to have TypeScript be a required peerDependency; it's since been made optional with the addition of more runtime code, particularly schema and type guards.

#### ⚠️ Library Targets ES2022

We use a new indices (d) flag in a regular expression that requires running on an ES2022 or higher runtime. All major browsers and JS runtimes (Node, Deno, Bun, etc.) support these features.

#### ⚠️ Exports Are Officially ESM Only

In Version 1, we didn't have an actual policy on whether we supported alternate module systems like CommonJS. In Version 2, we're making it official policy that we'll only be supporting ECMAScript Modules (ESM) as an exported format; while it may be possible to use the library in a CommonJS setting, we aren't able to easily accommodate it.

#### ⚠️ Change to `v20170710` Module

When we published Version 1, the export configuration for the package's modules was valid but not ideal; it pointed to a relative path of the package instead of a module name. Those using the `v20170710` module will need to update their imports to use the new module like so:

```diff
- import {} from  "@bachman-dev/wanikani-api-types/dist/v20170710";
+ import {} from  "@bachman-dev/wanikani-api-types/v20170710";
```

#### ⚠️ `WK` Prefix Removed from Items

Unless otherwise noted below, most items have only had their `WK` prefix removed in terms of renaming.

```diff
- import { WKAssignmentParameters } from "@bachman-dev/wanikani-api-types/dist/v20170710";
+ import { AssignmentParameters } from "@bachman-dev/wanikani-api-types/v20170710";

- const params: WKAssignmentParameters = {};
+ const params: AssignmentParameters = {};
```

Items can be imported using a namespaced / wildcard import with a prefix (`WK` or otherwise) if one is desired.

```diff
- import { WKAssignmentParameters } from "@bachman-dev/wanikani-api-types/dist/v20170710";
+ import * as WK from "@bachman-dev/wanikani-api-types/v20170710";

- const params: WKAssignmentParameters = {};
+ const params: WK.AssignmentParameters = {};
```

#### ⚠️ Most Resource `Data` Types Removed

With the exception of Radicals, Kanji, Vocabulary, and Kana Vocabulary, all other `Data` types have been removed. These types were based on data returned from WaniKani, and were never meant to be initialized by clients; removing them reduced the complexity of tests written for matching runtime schemas and types. For most users, this will only effect things like how the type appears in their editor; those who used these types e.g. in type annotations/parameters/etc. will need to refactor their code.
