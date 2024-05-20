export const uiSchema = {
  id: "accounts",
  groups: [
    {
      key: "about",
      widgets: [
        "accountname",
        "website",
        "type",
        "description",
        "parentaccount",
        "accountowner",
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
  },
  website: {
    "ui:widget": "TextWidget",
  },
  type: {
    "ui:widget": "SelectCodeListWidget",
    "ui:options": {
      defaultValues: {
        enum: ["PERCENTAGE", "MAX_AMOUNT"],
        enumNames: ["Percent", "Max. Amount"],
      },
      validations: { required: true },
    },
  },
  description: {
    "ui:widget": "TextWidget",
  },
  parentaccount: {
    "ui:widget": "TextWidget",
  },
  accountowner: {
    "ui:widget": "TextWidget",
  },
  phone: {
    "ui:widget": "TextWidget",
    "ui:options": {
      validations: { required: true },
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
