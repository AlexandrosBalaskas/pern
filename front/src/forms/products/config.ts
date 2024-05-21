export const config = {
  columns: [
    { accessorKey: "productname", header: "productname" },
    { accessorKey: "productfamily", header: "productfamily" },
    { accessorKey: "productcode", header: "productcode" },
    { accessorKey: "productdescription", header: "productdescription" },
    { accessorKey: "id", header: "Id" },
  ],
  rowButtons: {
    style: "menu",
    type: "default",
    groups: [
      {
        title: "edit",
        type: "redirect",
        icon: "EDIT",
        style: "simple",
      },
      {
        title: "delete",
        style: "simple",
        icon: "DELETE",
        confirm: true,
        notify: {
          success: "deleteEntitySuccess",
        },
      },
    ],
  },
  filtering: {
    schema: {
      type: "object",
      properties: {
        productname: { type: "string" },
        productfamily: { type: "string" },
        productcode: { type: "string" },
        active: { type: "boolean" },
        productdescription: { type: "string" },
      },
    },
    uiSchema: {
      productfamily: {
        "ui:widget": "SelectCodeListWidget",
        "ui:options": {
          codelistUrl: "product_families",
          codelistId: "product_families",
        },
      },
    },
  },
};
