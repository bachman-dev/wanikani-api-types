# @bachman-dev/wanikani-api-types

[![Tests (Main)](https://github.com/bachman-dev/wanikani-api-types/actions/workflows/push.yml/badge.svg)](https://github.com/bachman-dev/wanikani-api-types/actions/workflows/push.yml)
[![codecov](https://codecov.io/gh/bachman-dev/wanikani-api-types/graph/badge.svg?token=CCVBE1UM9M)](https://codecov.io/gh/bachman-dev/wanikani-api-types)

Regularly updated type definitions for the [WaniKani API](https://docs.api.wanikani.com/20170710/)

## Package Versioning

This project follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html), with versions formatted as x.y.z.

A new Patch Version z includes backwards-compatible bug fixes, corrections to documentation, and other relatively insignificant changes.

A new Minor Version y includes new backwards-compatible library features, new backwards-compatible WaniKani API changes (e.g. new revision, new fields on a resource, etc.), widened TypeScript version support, and deprecatiung (but not removing) existing features to be removed in the next major version.

A new Major Version x includes backwards-incompatible changes such as removing previously deprecated items, backwards-incompatible WaniKani API changes (e.g. removing a field on a resource), or a [breaking change in TypeScript](https://github.com/microsoft/TypeScript/wiki/Breaking-Changes) that's introduced into the library (we'll try to avoid these as much as possible).

| Package Version | TypeScript Versions | WaniKani API Version | Latest API Revision |
| --------------- | ------------------- | -------------------- | ------------------- |
| 2.x             | 5.0 - 5.9           | 2                    | 20170710            |
| 1.x             | >= 4.5              | 2                    | 20170710            |

## Install

### NPM / Yarn / pnpm / Deno / Bun

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

```shell
deno add npm:@bachman-dev/wanikani-api-types
```

```shell
bun add @bachman-dev/wanikani-api-types
```

Then, import using one of two methods.

#### Specific API Revision (Recommended)

The module you import from matches a [WaniKani API Revision](https://docs.api.wanikani.com/20170710/#revisions-aka-versioning); you shouldn't expect any breaking changes from the package.

```typescript
import * as WK from "@bachman-dev/wanikani-api-types/v20170710";
```

#### Latest API Revision (Not Recommended)

Importing from the index module will always provide types, methods, etc. for use with the latest and greatest API Revision.

```typescript
import * as WK from "@bachman-dev/wanikani-api-types";
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
import {
  type AssignmentParameters,
  DatableString,
} from "https://esm.sh/@bachman-dev/wanikani-api-types@x.y.z/v20170710";
import { ApiRequestFactory } from "https://esm.sh/@bachman-dev/wanikani-api-types@x.y.z/v20170710";
```

#### Latest API Revision (Not Recommended)

Importing from the index module will always provide types, methods, etc. for use with the latest and greatest API Revision.

```typescript
import { type AssignmentParameters, DatableString } from "https://esm.sh/@bachman-dev/wanikani-api-types@x.y.z";
import { ApiRequestFactory } from "https://esm.sh/@bachman-dev/wanikani-api-types@x.y.z";
```

</details>

## Upgrading

See [UPGRADE.md](UPGRADE.md) for info on upgrading from previous versions of the package.

## Usage

### Type Definitions

We provide various type definitions to help with sending/receiving type-safe elements to/from the WaniKani API.

- **Base Types** that define essential WaniKani API building blocks
- **Collections/Reports/Resources** that represent whole responses from the API
- **Parameter Types** that can be broken down into a query string to append to a URI for the API (especially when fetching Collections) -- see below.
- **Payloads** that represent JSON bodies sent to the API when creating/updating certain resources

## Schema Validation

If you need to validate data going to/from the WaniKani API at runtime, you can use matching [Valibot](https://valibot.dev) schema provided for every exported type to do so; these schema are also compatible with any [Standard Schema](https://standardschema.dev/) compatible application/library.

### Type Guards

For all the types representing items coming from the WaniKani API, we provide type guards to quickly validate if the data matches a type (e.g. a WaniKani resource, or an API error if something went wrong), without producing any side-effects to keep your application's bundle size small.

## Request Factory

We provide a special class, `ApiRequestFactory`, that returns Request objects with all the information you need to make a request to the WaniKani API. That means the request's method (`GET`, `POST`, `PUT`), the URL (with parameters for Collections or an ID for individual Resources), headers (Authorization, conditional headers, etc.), and a body if you are sending data. You can use these objects in your preferred HTTP API/Library such as the Fetch API, Axios, Needle, Node's `https` Module, etc.

### Markup Matcher

When working with WaniKani's Subjects, you may want to stylize/highlight the markup that's inside the reading/meaning mnemonics and hints. We provide a Regex literal that can be used to extract one or more of these sorts of markup in `SUBJECT_MARKUP_MATCHER`.

### Examples

See [EXAMPLES.md](EXAMPLES.md) for examples using this library.
