import { ACCOUNTS } from "./pageIds";

import { schema as accountsSchema } from "./accounts/schema";
import { uiSchema as accountsUiSchema } from "./accounts/uiSchema";
import { config as accountsConfig } from "./accounts/config";

export const FALLBACK_SCHEMAS = {
  [ACCOUNTS]: {
    pageSchema: accountsSchema,
    pageUiSchema: accountsUiSchema,
    pageConfig: accountsConfig,
  },
};
