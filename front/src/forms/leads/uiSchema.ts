export const uiSchema = {
  salutation: {
    "ui:widget": "SelectCodeListWidget",
    "ui:options": {
      codelistUrl: "salutation",
      codelistId: "salutation",
      validations: { required: true },
    },
  },
  firstname: {
    "ui:widget": "TextWidget",
    "ui:options": {
      validations: { required: true },
    },
  },
  lastname: {
    "ui:widget": "TextWidget",
    "ui:options": {
      validations: { required: true },
    },
  },
  company: {
    "ui:widget": "TextWidget",
    "ui:options": {
      validations: { required: true },
    },
  },
  title: {
    "ui:widget": "TextWidget",
  },
  website: {
    "ui:widget": "TextWidget",
  },
  description: {
    "ui:widget": "TextWidget",
  },
  leadstatus: {
    "ui:widget": "SelectCodeListWidget",
    "ui:options": {
      codelistUrl: "lead_status",
      codelistId: "lead_status",
      validations: { required: true },
    },
  },
  leadowner: {
    "ui:widget": "TextWidget",
  },
  phone: {
    "ui:widget": "TextWidget",
  },
  email: {
    "ui:widget": "TextWidget",
  },
  street: {
    "ui:widget": "TextWidget",
  },
  postalcode: {
    "ui:widget": "TextWidget",
  },
  city: {
    "ui:widget": "TextWidget",
  },
  country: {
    "ui:widget": "TextWidget",
  },
  state: {
    "ui:widget": "TextWidget",
  },
  employeesnumber: {
    "ui:widget": "TextWidget",
  },
  annualrevenue: {
    "ui:widget": "TextWidget",
  },
  leadsource: {
    "ui:widget": "SelectCodeListWidget",
    "ui:options": {
      codelistUrl: "lead_source",
      codelistId: "lead_source",
      validations: { required: true },
    },
  },
  industry: {
    "ui:widget": "SelectCodeListWidget",
    "ui:options": {
      codelistUrl: "industry",
      codelistId: "industry",
      validations: { required: true },
    },
  },
};
