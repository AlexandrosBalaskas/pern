export const config = {
  columns: [
    { accessorKey: "name", header: "Full Name" },
    { accessorKey: "address", header: "Address" },
    { accessorKey: "schoolname", header: "School Name" },
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
        name: { type: "string" },
        address: { type: "string" },
        schoolname: { type: "string" },
        surname: { type: "string" },
      },
    },
    uiSchema: {
      address: {
        "ui:widget": "TextWidget",
      },
      schoolname: {
        "ui:widget": "TextWidget",
      },
      surname: {
        "ui:widget": "TextWidget",
      },
    },
  },
};
