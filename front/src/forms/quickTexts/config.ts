export const config = {
  columns: [
    { accessorKey: "quickTextName", header: "Quick Text Name" },
    { accessorKey: "relatedTo", header: "Related To" },
    { accessorKey: "field", header: "Field" },
    { accessorKey: "category", header: "Category" },
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
        quickTextName: { type: "string" },
        relatedTo: { type: "string" },
        field: { type: "string" },
        category: { type: "string" },
        message: { type: "string" },
      },
    },
    uiSchema: {},
  },
};
