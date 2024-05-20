export const uiSchema = {
  status: {
    "ui:widget": "TextWidget",
    "ui:options": {
      validations: { required: true },
    },
  },
  priority: {
    "ui:widget": "TextWidget",
    "ui:options": {
      validations: { required: true },
    },
  },
  caseorigin: {
    "ui:widget": "TextWidget",
  },
  caseowner: {
    "ui:widget": "TextWidget",
  },
  contactname: {
    "ui:widget": "TextWidget",
    "ui:options": {
      validations: { required: true },
    },
  },
  accountname: {
    "ui:widget": "TextWidget",
    "ui:options": {
      validations: { required: true },
    },
  },
  subject: {
    "ui:widget": "TextWidget",
  },
  description: {
    "ui:widget": "TextWidget",
  },
};
