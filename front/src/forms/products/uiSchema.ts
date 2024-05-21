export const uiSchema = {
  productname: {
    "ui:widget": "TextWidget",
    "ui:options": {
      validations: { required: true },
    },
  },
  productfamily: {
    "ui:widget": "SelectCodeListWidget",
    "ui:options": {
      codelistUrl: "product_families",
      codelistId: "product_families",
      validations: { required: true },
    },
  },
  productcode: {
    "ui:widget": "TextWidget",
    "ui:options": {
      validations: { required: true },
    },
  },
  productdescription: {
    "ui:widget": "TextWidget",
  },
  active: {
    "ui:widget": "BooleanWidget",
  },
};
