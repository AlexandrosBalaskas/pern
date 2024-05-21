export const uiSchema = {
  quicktextname: {
    "ui:widget": "TextWidget",
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
  },
};
