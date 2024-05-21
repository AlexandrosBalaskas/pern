export const uiSchema = {
  status: {
    "ui:widget": "SelectCodeListWidget",
    "ui:options": {
      codelistUrl: "case_status",
      codelistId: "case_status",
      validations: { required: true },
    },
  },
  priority: {
    "ui:widget": "SelectCodeListWidget",
    "ui:options": {
      codelistUrl: "priority",
      codelistId: "priority",
      validations: { required: true },
    },
  },
  caseorigin: {
    "ui:widget": "SelectCodeListWidget",
    "ui:options": {
      codelistUrl: "case_origin",
      codelistId: "case_origin",
      validations: { required: true },
    },
  },
  caseowner: {
    "ui:widget": "TextWidget",
  },
  contactname: {
    "ui:widget": "SelectCodeListWidget",
    "ui:options": {
      codelistUrl: "contacts",
      codelistId: "contacts",
      hasPlaceHolder: true,
      validations: { required: true },
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
  },
  subject: {
    "ui:widget": "TextWidget",
  },
  description: {
    "ui:widget": "TextWidget",
  },
};
