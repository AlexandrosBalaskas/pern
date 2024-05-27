export const uiSchema = {
  id: "leads",
  groups: [
    {
      key: "details",
      widgets: [
        "salutation",
        "firstname",
        "lastname",
        "company",
        "title",
        "website",
        "leadowner",
        "leadstatus",
        "description",
      ],
    },
    {
      key: "getInTouch",
      widgets: ["phone", "email"],
    },
    {
      key: "address",
      widgets: ["street", "postalcode", "city", "country", "state"],
    },
    {
      key: "segment",
      widgets: ["employeesnumber", "annualrevenue", "leadsource", "industry"],
    },
  ],
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
    "ui:options": {
      multiline: true,
      rows: 2,
    },
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
    "ui:options": {
      validations: {
        regex: "^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$",
      },
    },
  },
  email: {
    "ui:widget": "TextWidget",
  },
  street: {
    "ui:widget": "TextWidget",
  },
  postalcode: {
    "ui:widget": "TextWidget",
    "ui:options": {
      validations: { regex: "^\\+?([1-9]\\d*)$" },
    },
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
    "ui:options": {
      validations: { regex: "^\\+?([1-9]\\d*)$" },
    },
  },
  annualrevenue: {
    "ui:widget": "TextWidget",
    "ui:options": {
      validations: { regex: "^\\+?([1-9]\\d*)$" },
    },
  },
  leadsource: {
    "ui:widget": "SelectCodeListWidget",
    "ui:options": {
      codelistUrl: "lead_source",
      codelistId: "lead_source",
      validations: { required: true },
    },
    disabledFrom: {
      source: { jsonPath: ["id"] },
    },
  },
  industry: {
    "ui:widget": "SelectCodeListWidget",
    "ui:options": {
      codelistUrl: "industry",
      codelistId: "industry",
      validations: { required: true },
    },
    disabledFrom: {
      source: { jsonPath: ["id"] },
    },
  },
};
