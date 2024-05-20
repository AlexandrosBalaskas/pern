export const uiSchema = {
  productName: {
    "ui:widget": "TextWidget",
    "ui:options": {
      validations: { required: true },
    },
  },
  productFamily: {
    "ui:widget": "TextWidget",
  },
  productCode: {
    "ui:widget": "TextWidget",
    "ui:options": {
      validations: { required: true },
    },
  },
  productDescription: {
    "ui:widget": "TextWidget",
  },
};
