export const uiSchema = {
  id: "products",
  groups: [
    {
      key: "details",
      widgets: [
        "productname",
        "productfamily",
        "productcode",
        "productdescription",
        "active",
      ],
    },
  ],
  productname: {
    "ui:widget": "TextWidget",
    "ui:options": {
      validations: { required: true },
    },
    disabledFrom: {
      source: { jsonPath: ["id"] },
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
    disabledFrom: {
      source: { jsonPath: ["id"] },
    },
  },
  productdescription: {
    "ui:widget": "TextWidget",
    "ui:options": {
      multiline: true,
      rows: 2,
    },
    visibilityFrom: {
      source: { jsonPath: ["productcode"] },
    },
  },
  active: {
    "ui:widget": "BooleanWidget",
  },
};
