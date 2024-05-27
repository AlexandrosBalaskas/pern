export const uiSchema = {
  id: "cases",
  groups: [
    {
      key: "details",
      widgets: ["status", "priority", "caseorigin", "caseowner", "leadowner"],
    },
    {
      key: "contactInfo",
      widgets: ["contactname", "accountname"],
    },
    {
      key: "descript",
      widgets: ["subject", "description"],
    },
  ],
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
    disabledFrom: {
      source: { jsonPath: ["id"] },
    },
  },
  subject: {
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
      validations: { required: true },
    },
    visibilityFrom: {
      source: { jsonPath: ["subject"] },
    },
  },
};
