export const uiSchema = {
  done: {
    "ui:widget": "SelectCodeListWidget",
    "ui:options": {
      defaultValues: {
        enum: ["PERCENTAGE", "MAX_AMOUNT"],
        enumNames: ["Percent", "Max. Amount"],
      },
    },
  },
  name: {
    "ui:widget": "TextWidget",
  },
  address: {
    "ui:widget": "TextWidget",
  },
  surname: {
    "ui:widget": "TextWidget",
  },
  schoolname: {
    "ui:widget": "TextWidget",
  },
  text2: {
    "ui:widget": "TextWidget",
    visibilityFrom: {
      checkWhen: ["itsokay"],
      source: { jsonPath: ["text"] },
    },
  },
  date: {
    "ui:widget": "DateWidget",
  },
};
