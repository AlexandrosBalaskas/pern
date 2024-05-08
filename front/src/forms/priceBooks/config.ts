export const config = {
  columns: [
    { accessorKey: "priceBookName", header: "Price Book Name" },
    { accessorKey: "description", header: "Description" },
    { accessorKey: "active", header: "Active" },
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
        priceBookName: { type: "string" },
        description: { type: "string" },
        active: { type: "boolean" },
        isStandard: { type: "boolean" },
      },
    },
    uiSchema: {},
  },
};
