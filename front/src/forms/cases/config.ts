export const config = {
  columns: [
    { accessorKey: "caseOrigin", header: "Case Origin" },
    { accessorKey: "contactName", header: "Contact Name" },
    { accessorKey: "subject", header: "Subject" },
    { accessorKey: "status", header: "Status" },
    { accessorKey: "priority", header: "Priority" },
    { accessorKey: "caseOwner", header: "Case Owner" },
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
        status: { type: "string" },
        priority: { type: "string" },
        caseOrigin: { type: "string" },
        caseOwner: { type: "string" },
        contactName: { type: "string" },
        accountName: { type: "string" },
        subject: { type: "string" },
        description: { type: "string" },
      },
    },
    uiSchema: {},
  },
};
