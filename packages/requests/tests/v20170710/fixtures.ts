import { test } from "vitest";

import { ApiRequestFactory } from "../../src/v20170710/requests.js";

const testFor = test.extend({
  collectionParamsWithManyOptions: {
    // oxlint-disable-next-line no-magic-numbers -- Fixture IDs
    ids: [1, 2, 3],
    page_after_id: 1,
    page_before_id: 1,
  },
  requestFactory: new ApiRequestFactory({ apiToken: "abc" }),
});

export default testFor;
