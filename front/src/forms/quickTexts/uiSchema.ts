export const uiSchema = {
  id: "quickTexts",
  groups: [
    {
      key: "details",
      widgets: ["quicktextname", "relatedto", "field", "category", "message"],
    },
  ],
  quicktextname: {
    "ui:widget": "TextWidget",
    "ui:options": {
      validations: { required: true },
    },
    disabledFrom: {
      source: { jsonPath: ["id"] },
    },
  },
  relatedto: {
    "ui:widget": "SelectCodeListWidget",
    "ui:options": {
      codelistUrl: "related_to",
      codelistId: "related_to",
      validations: { required: true },
    },
  },
  field: {
    "ui:widget": "TextWidget",
  },
  category: {
    "ui:widget": "TextWidget",
  },
  message: {
    "ui:widget": "TextWidget",
    "ui:options": {
      multiline: true,
      rows: 2,
    },
  },
};
