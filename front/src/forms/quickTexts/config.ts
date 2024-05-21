export const config = {
  columns: [
    { accessorKey: "quicktextname", header: "quicktextname" },
    { accessorKey: "relatedto", header: "relatedto", codelist: "related_to" },
    { accessorKey: "field", header: "field" },
    { accessorKey: "category", header: "category" },
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
        quicktextname: { type: "string" },
        relatedto: { type: "string" },
        field: { type: "string" },
        category: { type: "string" },
        message: { type: "string" },
      },
    },
    uiSchema: {
      relatedto: {
        "ui:widget": "SelectCodeListWidget",
        "ui:options": {
          codelistUrl: "related_to",
          codelistId: "related_to",
        },
      },
    },
  },
};
