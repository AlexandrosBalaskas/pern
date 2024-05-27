export const uiSchema = {
  id: "accounts",
  groups: [
    {
      key: "about",
      widgets: [
        "accountname",
        "website",
        "type",
        "accountowner",
        "parentaccount",
        "description",
        "phone",
      ],
    },
    {
      key: "billing",
      widgets: [
        "billingstreet",
        "billingpostalcode",
        "billingcity",
        "billingcountry",
        "billingstate",
      ],
    },
    {
      key: "shipping",
      widgets: [
        "shippingstreet",
        "shippingpostalcode",
        "shippingcity",
        "shippingcountry",
        "shippingstate",
      ],
    },
  ],
  accountname: {
    "ui:widget": "TextWidget",
    "ui:options": {
      validations: { required: true },
    },
    disabledFrom: {
      source: { jsonPath: ["id"] },
    },
  },
  website: {
    "ui:widget": "TextWidget",
    "ui:options": {},
  },
  type: {
    "ui:widget": "SelectCodeListWidget",
    "ui:options": {
      codelistUrl: "account_type",
      codelistId: "account_type",
      validations: { required: true },
    },
  },
  description: {
    "ui:widget": "TextWidget",
    "ui:options": {
      multiline: true,
      rows: 2,
    },
  },
  parentaccount: {
    "ui:widget": "SelectCodeListWidget",
    "ui:options": {
      codelistUrl: "accounts",
      codelistId: "accounts",
      hasPlaceHolder: true,
    },
  },
  accountowner: {
    "ui:widget": "TextWidget",
  },
  phone: {
    "ui:widget": "TextWidget",
    "ui:options": {
      validations: {
        required: true,
        regex: "^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$",
      },
    },
    visibilityFrom: {
      source: { jsonPath: ["parentaccount"] },
    },
  },
  billingstreet: {
    "ui:widget": "TextWidget",
  },
  billingpostalcode: {
    "ui:widget": "TextWidget",
  },
  billingcity: {
    "ui:widget": "TextWidget",
  },
  billingcountry: {
    "ui:widget": "TextWidget",
  },
  billingstate: {
    "ui:widget": "TextWidget",
  },
  shippingstreet: {
    "ui:widget": "TextWidget",
  },
  shippingpostalcode: {
    "ui:widget": "TextWidget",
  },
  shippingcity: {
    "ui:widget": "TextWidget",
  },
  shippingcountry: {
    "ui:widget": "TextWidget",
  },
  shippingstate: {
    "ui:widget": "TextWidget",
  },
};
