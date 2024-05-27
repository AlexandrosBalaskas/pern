export const uiSchema = {
  id: "contacts",
  groups: [
    {
      key: "about",
      widgets: [
        "salutation",
        "firstname",
        "lastname",
        "accountname",
        "title",
        "reportsto",
        "contactowner",
        "description",
      ],
    },
    {
      key: "getInTouch",
      widgets: ["phone", "email"],
    },
    {
      key: "mailing",
      widgets: [
        "mailingstreet",
        "mailingpostalcode",
        "mailingcity",
        "mailingcountry",
        "mailingstate",
      ],
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
  accountname: {
    "ui:widget": "SelectCodeListWidget",
    "ui:options": {
      codelistUrl: "accounts",
      codelistId: "accounts",
      hasPlaceHolder: true,
      validations: { required: true },
    },
  },
  title: {
    "ui:widget": "TextWidget",
    "ui:options": {
      validations: { required: true },
    },
  },
  reportsto: {
    "ui:widget": "SelectCodeListWidget",
    "ui:options": {
      codelistUrl: "contacts",
      codelistId: "contacts",
      hasPlaceHolder: true,
      validations: { required: true },
    },
  },
  description: {
    "ui:widget": "TextWidget",
    "ui:options": {
      multiline: true,
      rows: 2,
    },
  },
  contactowner: {
    "ui:widget": "TextWidget",
  },
  phone: {
    "ui:widget": "TextWidget",
    "ui:options": {
      validations: {
        required: true,
        regex: "^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$",
      },
    },
  },
  email: {
    "ui:widget": "TextWidget",
  },
  mailingstreet: {
    "ui:widget": "TextWidget",
  },
  postalcode: {
    "ui:widget": "TextWidget",
  },
  mailingcity: {
    "ui:widget": "TextWidget",
  },
  mailingcountry: {
    "ui:widget": "TextWidget",
  },
  mailingstate: {
    "ui:widget": "TextWidget",
  },
};
