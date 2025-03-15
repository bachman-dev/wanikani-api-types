# @bachman-dev/wanikani-api-types

[![Tests (Main)](https://github.com/bachman-dev/wanikani-api-types/actions/workflows/push.yml/badge.svg)](https://github.com/bachman-dev/wanikani-api-types/actions/workflows/push.yml)
[![codecov](https://codecov.io/gh/bachman-dev/wanikani-api-types/branch/main/graph/badge.svg?token=CCVBE1UM9M)](https://codecov.io/gh/bachman-dev/wanikani-api-types)

Regularly updated type definitions for the [WaniKani API](https://docs.api.wanikani.com/20170710/)

## Documentation

Available at https://wanikani-api-types.bachman.dev

## Package Versioning

This project follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html), with versions formatted as x.y.z.

A new Patch Version z includes backwards-compatible bug fixes, corrections to documentation, and other relatively insignificant changes.

A new Minor Version y includes new backwards-compatible library features, new backwards-compatible WaniKani API changes (e.g. new revision, new fields on a resource, etc.), widened TypeScript version support, and deprecatiung (but not removing) existing features to be removed in the next major version.

A new Major Version x includes backwards-incompatible changes such as removing previously deprecated items, backwards-incompatible WaniKani API changes (e.g. removing a field on a resource), or a [breaking change in TypeScript](https://github.com/microsoft/TypeScript/wiki/Breaking-Changes) that's introduced into the library (we'll try to avoid these as much as possible).

| Package Version | TypeScript Versions | WaniKani API Version | Latest API Revision |
| --------------- | ------------------- | -------------------- | ------------------- |
| 1.x             | 4.5 - 5.7           | 2                    | 20170710            |

## Install

### NPM / Yarn / pnpm

<details>
<summary>Click/Tap to Show Instructions</summary>

Run the following command pertaining to your package manager:

```shell
npm install @bachman-dev/wanikani-api-types
```

```shell
yarn add @bachman-dev/wanikani-api-types
```

```shell
pnpm add @bachman-dev/wanikani-api-types
```

Then, import using one of two methods.

#### Specific API Revision (Recommended)

The module you import from matches a [WaniKani API Revision](https://docs.api.wanikani.com/20170710/#revisions-aka-versioning); you shouldn't expect any breaking changes from the package.

```typescript
import type { WKAssignmentParameters, WKDatableString } from "@bachman-dev/wanikani-api-types/dist/v20170710";
import { stringifyParameters } from "@bachman-dev/wanikani-api-types/dist/v20170710";
```

#### Latest API Revision (Not Recommended)

Importing from the index module will always provide types, methods, etc. for use with the latest and greatest API Revision.

```typescript
import type { WKAssignmentParameters, WKDatableString } from "@bachman-dev/wanikani-api-types";
import { stringifyParameters } from "@bachman-dev/wanikani-api-types";
```

</details>

### Deno via NPM Specifier

<details>
<summary>Click/Tap to Show Instructions</summary>

Deno version 1.28 and up can import the library using an [npm specifier](https://deno.land/manual@v1.31.3/node/npm_specifiers).

**Be sure to replace `x.y.z` with your desired version number.**

#### Specific API Revision (Recommended)

The module you import from matches a [WaniKani API Revision](https://docs.api.wanikani.com/20170710/#revisions-aka-versioning); you shouldn't expect any breaking changes from the package.

```typescript
import type { WKAssignmentParameters, WKDatableString } from "npm:@bachman-dev/wanikani-api-types@x.y.z/dist/v20170710";
import { stringifyParameters } from "npm:@bachman-dev/wanikani-api-types@x.y.z/dist/v20170710";
```

#### Latest API Revision (Not Recommended)

Importing from the index module will always provide types, methods, etc. for use with the latest and greatest API Revision.

```typescript
import type { WKAssignmentParameters, WKDatableString } from "npm:@bachman-dev/wanikani-api-types@x.y.z";
import { stringifyParameters } from "npm:@bachman-dev/wanikani-api-types@x.y.z";
```

</details>

### Other Environments

<details>

<summary>Click/Tap to Show Instructions</summary>

You can import the modules directly with `esm.sh`.

**Be sure to replace `x.y.z` with your desired version number.**

#### Specific API Revision (Recommended)

The module you import from matches a [WaniKani API Revision](https://docs.api.wanikani.com/20170710/#revisions-aka-versioning); you shouldn't expect any breaking changes from the package.

```typescript
import type {
  WKAssignmentParameters,
  WKDatableString,
} from "https://esm.sh/@bachman-dev/wanikani-api-types@x.y.z/dist/v20170710.js";
import { stringifyParameters } from "https://esm.sh/@bachman-dev/wanikani-api-types@x.y.z/dist/v20170710.js";
```

#### Latest API Revision (Not Recommended)

Importing from the index module will always provide types, methods, etc. for use with the latest and greatest API Revision.

```typescript
import type { WKAssignmentParameters, WKDatableString } from "https://esm.sh/@bachman-dev/wanikani-api-types@x.y.z";
import { stringifyParameters } from "https://esm.sh/@bachman-dev/wanikani-api-types@x.y.z";
```

</details>

## Usage

### Type Definitions

We provide various type definitions to help with sending/receiving type-safe elements to/from the WaniKani API.

- **Base Types** that define essential WaniKani API building blocks
- **Collections/Reports/Resources** that represent whole responses from the API
- **Data** that represents only the actual returned data from the API (i.e. the `data` field on most responses)
- **Parameter Types** that can be broken down into a query string to append to a URI for the API (especially when fetching Collections) -- see below.
- **Payloads** that represent JSON bodies sent to the API when creating/updating certain resources

We also export various subtypes that fall underneath these main types, in case they're needed to work with partial data.

### Type Guards

Most of the types defined here are object types with straightforward structure. Sometimes, however, you may have a string or number that needs to meet specific criteria to be narrowed down to an exact type. So we provide some [type guards](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates) to verify if a variable is of a given type; these will usually begin with `is` in their name (e.g. `isWKDatableString`). See the documentation for more info.

## Request Factory

We provide a special class, `WKRequestFactory`, that returns Request objects with all the information you need to make a request to the WaniKani API. That means the request's method (`GET`, `POST`, `PUT`), the URL (with parameters for Collections or an ID for individual Resources), headers (Authorization, conditional headers, etc.), and a body if you are sending data. You can use these objects in your preferred HTTP API/Library such as the Fetch API, Axios, Needle, Node's `https` Module, etc.

### Helper Functions

There are also multiple helper functions that can assist with formatting and/or validating data sent to the WaniKani API, outside of and in addition to the Request Factory.

- `stringifyParameters` converts a Parameters object (e.g. `WKAssignmentParameters`) into a URL query string to use when filtering a Collection
- `validateParameters` does runtime validation on a Parameters object, allowing for more strict validation than TypeScript's type narrowing behavior (i.e. not allowing widening to `WKCollectionParameters`); it's a good function for those who must be absolutely sure their parameters are of the exact type.
- `validatePayload` does runtime validation of Payload objects; while most TypeScript and editor-assisted projects likely won't need this function, it can be useful for pure JavaScript applications.

### Markup Matchers

When working with WaniKani's Subjects, you may want to stylize/highlight the markup that's inside the reading/meaning mnemonics and hints. We provide some Regex Literals that can be used to extract one or more of these sorts of markup in `WK_SUBJECT_MARKUP_MATCHERS`.

### Examples

See [EXAMPLES.md](EXAMPLES.md) for examples using this library.

## Need Help? Want to Contribute?

Please note that this package is community-developed and is NOT officially supported by Tofugu LLC or its staff.

That said, if you have any questions or encounter any problems with this package, please feel free to open an Issue.

We welcome any contributions to help improve this library. Please see the following documents:

- [CONTRIBUTING.md](CONTRIBUTING.md)
- [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)

Thank you in advance for your contribution(s)!
