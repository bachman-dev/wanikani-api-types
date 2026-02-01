import { test } from "vitest";
import { ApiRequestFactory } from "../../src/v20170710/requests.js";

export const testFor = test.extend({
  collectionParamsWithManyOptions: {
    ids: [1, 2, 3],
    page_after_id: 1,
    page_before_id: 1,
  },
  requestFactory: new ApiRequestFactory({ apiToken: "abc" }),
});
