export const uiSchema = {
  salutation: {
    "ui:widget": "SelectCodeListWidget",
    "ui:options": {
      codelistUrl: "salutation",
      codelistId: "salutation",
      validations: { required: true },
    },
  },
  firstName: {
    "ui:widget": "TextWidget",
    "ui:options": {
      validations: { required: true },
    },
  },
  lastName: {
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
  },
  contactOwner: {
    "ui:widget": "TextWidget",
  },
  phone: {
    "ui:widget": "TextWidget",
  },
  email: {
    "ui:widget": "TextWidget",
  },
  mailingStreet: {
    "ui:widget": "TextWidget",
  },
  postalCode: {
    "ui:widget": "TextWidget",
  },
  mailingCity: {
    "ui:widget": "TextWidget",
  },
  mailingCountry: {
    "ui:widget": "TextWidget",
  },
  mailingState: {
    "ui:widget": "TextWidget",
  },
};
