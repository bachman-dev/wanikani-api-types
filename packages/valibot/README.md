# @bachman-dev/wanikani-api-valibot

Regularly updated [Valibot](https://valibot.dev) schema for the [WaniKani API](https://docs.api.wanikani.com/20170710/)

## Install

<details>
<summary>Click/Tap to Show Instructions</summary>

Run the following command pertaining to your package manager:

```shell
npm install @bachman-dev/wanikani-api-valibot
```

```shell
yarn add @bachman-dev/wanikani-api-valibot
```

```shell
pnpm add @bachman-dev/wanikani-api-valibot
```

```shell
deno add npm:@bachman-dev/wanikani-api-valibot
```

```shell
bun add @bachman-dev/wanikani-api-valibot
```

Then, import using one of two methods.

### Specific API Revision (Recommended)

The module you import from matches a [WaniKani API Revision](https://docs.api.wanikani.com/20170710/#revisions-aka-versioning); you shouldn't expect any breaking changes from the package.

```typescript
import * as WK from "@bachman-dev/wanikani-api-valibot/v20170710";
```

### Latest API Revision (Not Recommended)

Importing from the index module will always provide schema, types, etc. for use with the latest and greatest API Revision.

```typescript
import * as WK from "@bachman-dev/wanikani-api-valibot";
```

</details>

## Usage

### Schema and Types

Each schema shares its name with the type definition it validates, which is re-exported from [`@bachman-dev/wanikani-api-types`](../types). There's no need to install or import from both packages; the schema, types, and constants (e.g. `API_REVISION`, `MAX_LEVEL`) are all available from the same module.

```typescript
import * as v from "valibot";
import { Assignment, type DatableString } from "@bachman-dev/wanikani-api-valibot/v20170710";

const response = await fetch(/* ... */);

// The parsed output is typed as an `Assignment`
const assignment: Assignment = v.parse(Assignment, await response.json());

// Timestamps are validated, and branded as a `DatableString`
const startedAt: DatableString | null = assignment.data.started_at;
```

### Type Guards

For all the types representing items coming from the WaniKani API, we provide type guards to quickly validate if the data matches a type (e.g. a WaniKani resource, or an API error if something went wrong), without producing any side-effects to keep your application's bundle size small.

```typescript
import { isApiError, isSummary } from "@bachman-dev/wanikani-api-valibot/v20170710";

const json: unknown = await response.json();

if (isSummary(json)) {
  // json is a Summary
} else if (isApiError(json)) {
  throw new Error(json.error);
}
```
