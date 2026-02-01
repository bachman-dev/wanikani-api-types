# @bachman-dev/wanikani-api-types

Regularly updated type definitions for the [WaniKani API](https://docs.api.wanikani.com/20170710/)

## Install

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

### Specific API Revision (Recommended)

The module you import from matches a [WaniKani API Revision](https://docs.api.wanikani.com/20170710/#revisions-aka-versioning); you shouldn't expect any breaking changes from the package.

```typescript
import * as WK from "@bachman-dev/wanikani-api-types/v20170710";
```

### Latest API Revision (Not Recommended)

Importing from the index module will always provide types, methods, etc. for use with the latest and greatest API Revision.

```typescript
import * as WK from "@bachman-dev/wanikani-api-types";
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

### Type Guards

For all the types representing items coming from the WaniKani API, we provide type guards to quickly validate if the data matches a type (e.g. a WaniKani resource, or an API error if something went wrong), without producing any side-effects to keep your application's bundle size small.

### Examples

See [EXAMPLES.md](EXAMPLES.md) for examples using this library.
