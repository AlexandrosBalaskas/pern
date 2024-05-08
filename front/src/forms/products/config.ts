export const config = {
  columns: [
    { accessorKey: "productname", header: "Product Name" },
    { accessorKey: "productFamily", header: "Product Family" },
    { accessorKey: "productCode", header: "Product Code" },
    { accessorKey: "productDescription", header: "Product Description" },
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
        productName: { type: "string" },
        productFamily: { type: "string" },
        productCode: { type: "string" },
        active: { type: "boolean" },
        productDescription: { type: "string" },
      },
    },
    uiSchema: {},
  },
};
