export const uiSchema = {
  oportunityname: {
    "ui:widget": "TextWidget",
  },
  accountname: {
    "ui:widget": "SelectCodeListWidget",
    "ui:options": {
      codelistUrl: "accounts",
      codelistId: "accounts",
      hasPlaceHolder: true,
      validations: { required: true },
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
  },
};
