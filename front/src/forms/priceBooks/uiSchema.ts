export const uiSchema = {
  id: "priceBooks",
  groups: [
    {
      key: "details",
      widgets: ["pricebookname", "active", "description", "isstandard"],
    },
  ],
  pricebookname: {
    "ui:widget": "TextWidget",
    "ui:options": {
      validations: { required: true },
    },
    disabledFrom: {
      source: { jsonPath: ["id"] },
    },
  },
  description: {
    "ui:widget": "TextWidget",
    "ui:options": {
      multiline: true,
      rows: 2,
    },
    visibilityFrom: {
      source: { jsonPath: ["pricebookname"] },
    },
  },
  active: {
    "ui:widget": "BooleanWidget",
  },
  isstandard: {
    "ui:widget": "BooleanWidget",
  },
};
