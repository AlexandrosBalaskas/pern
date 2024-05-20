export const config = {
  columns: [
    { accessorKey: "pricebookname", header: "pricebookname" },
    { accessorKey: "description", header: "description" },
    { accessorKey: "active", header: "active" },
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
        pricebookname: { type: "string" },
        description: { type: "string" },
        active: { type: "boolean" },
        isstandard: { type: "boolean" },
      },
    },
    uiSchema: {},
  },
};
