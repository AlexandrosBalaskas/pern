export const uiSchema = {
  id: "oportunities",
  groups: [
    {
      key: "details",
      widgets: [
        "oportunityname",
        "accountname",
        "closedate",
        "amount",
        "oportunityowner",
        "description",
      ],
    },
    {
      key: "status",
      widgets: ["stage", "probability", "forecastcategory", "nextstep"],
    },
  ],
  oportunityname: {
    "ui:widget": "TextWidget",
    "ui:options": {
      validations: { required: true },
    },
    disabledFrom: {
      source: { jsonPath: ["id"] },
    },
  },
  accountname: {
    "ui:widget": "SelectCodeListWidget",
    "ui:options": {
      codelistUrl: "accounts",
      codelistId: "accounts",
      hasPlaceHolder: true,
      validations: { required: true },
    },
    visibilityFrom: {
      source: { jsonPath: ["oportunityname"] },
    },
  },
  closedate: {
    "ui:widget": "DateWidget",
  },
  amount: {
    "ui:widget": "TextWidget",
  },
  description: {
    "ui:widget": "TextWidget",
    "ui:options": {
      multiline: true,
      rows: 2,
    },
  },
  oportunityowner: {
    "ui:widget": "TextWidget",
  },
  stage: {
    "ui:widget": "SelectCodeListWidget",
    "ui:options": {
      codelistUrl: "stage",
      codelistId: "stage",
      validations: { required: true },
    },
  },
  probability: {
    "ui:widget": "TextWidget",
  },
  forecastcategory: {
    "ui:widget": "SelectCodeListWidget",
    "ui:options": {
      codelistUrl: "forecast_category",
      codelistId: "forecast_category",
      validations: { required: true },
    },
  },
  nextstep: {
    "ui:widget": "TextWidget",
    "ui:options": {
      multiline: true,
      rows: 2,
    },
  },
};
