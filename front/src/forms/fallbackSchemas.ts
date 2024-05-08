import {
  ACCOUNTS,
  CASES,
  CONTACTS,
  DTE_FORM,
  LEADS,
  OPORTUNITIES,
  PRICEBOOKS,
  PRODUCTS,
  QUICKTEXTS,
} from "./pageIds";

import { schema as dteFormSchema } from "./test/schema";
import { uiSchema as dteFormUiSchema } from "./test/uiSchema";
import { config as dteFormConfig } from "./test/config";

import { schema as contactsSchema } from "./contacts/schema";
import { uiSchema as contactsUiSchema } from "./contacts/uiSchema";
import { config as contactsConfig } from "./contacts/config";

import { schema as accountsSchema } from "./accounts/schema";
import { uiSchema as accountsUiSchema } from "./accounts/uiSchema";
import { config as accountsConfig } from "./accounts/config";

import { schema as leadsSchema } from "./leads/schema";
import { uiSchema as leadsUiSchema } from "./leads/uiSchema";
import { config as leadsConfig } from "./leads/config";

import { schema as oportunitiesSchema } from "./oportunities/schema";
import { uiSchema as oportunitiesUiSchema } from "./oportunities/uiSchema";
import { config as oportunitiesConfig } from "./oportunities/config";

import { schema as productsSchema } from "./products/schema";
import { uiSchema as productsUiSchema } from "./products/uiSchema";
import { config as productsConfig } from "./products/config";

import { schema as casesSchema } from "./cases/schema";
import { uiSchema as casesUiSchema } from "./cases/uiSchema";
import { config as casesConfig } from "./cases/config";

import { schema as quickTextsSchema } from "./quickTexts/schema";
import { uiSchema as quickTextsUiSchema } from "./quickTexts/uiSchema";
import { config as quickTextsConfig } from "./quickTexts/config";

import { schema as priceBooksSchema } from "./priceBooks/schema";
import { uiSchema as priceBooksUiSchema } from "./priceBooks/uiSchema";
import { config as priceBooksConfig } from "./priceBooks/config";

export const FALLBACK_SCHEMAS = {
  [DTE_FORM]: {
    pageSchema: dteFormSchema,
    pageUiSchema: dteFormUiSchema,
    pageConfig: dteFormConfig,
  },
  [CONTACTS]: {
    pageSchema: contactsSchema,
    pageUiSchema: contactsUiSchema,
    pageConfig: contactsConfig,
  },
  [ACCOUNTS]: {
    pageSchema: accountsSchema,
    pageUiSchema: accountsUiSchema,
    pageConfig: accountsConfig,
  },
  [LEADS]: {
    pageSchema: leadsSchema,
    pageUiSchema: leadsUiSchema,
    pageConfig: leadsConfig,
  },
  [OPORTUNITIES]: {
    pageSchema: oportunitiesSchema,
    pageUiSchema: oportunitiesUiSchema,
    pageConfig: oportunitiesConfig,
  },
  [PRODUCTS]: {
    pageSchema: productsSchema,
    pageUiSchema: productsUiSchema,
    pageConfig: productsConfig,
  },
  [QUICKTEXTS]: {
    pageSchema: quickTextsSchema,
    pageUiSchema: quickTextsUiSchema,
    pageConfig: quickTextsConfig,
  },
  [PRICEBOOKS]: {
    pageSchema: priceBooksSchema,
    pageUiSchema: priceBooksUiSchema,
    pageConfig: priceBooksConfig,
  },
  [CASES]: {
    pageSchema: casesSchema,
    pageUiSchema: casesUiSchema,
    pageConfig: casesConfig,
  },
};
