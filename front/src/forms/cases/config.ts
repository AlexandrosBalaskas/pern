export const config = {
  columns: [
    { accessorKey: "caseorigin", header: "caseorigin" },
    { accessorKey: "contactname", header: "contactname" },
    { accessorKey: "subject", header: "subject" },
    { accessorKey: "status", header: "status" },
    { accessorKey: "priority", header: "priority" },
    { accessorKey: "caseowner", header: "caseowner" },
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
        caseorigin: { type: "string" },
        caseowner: { type: "string" },
        contactname: { type: "string" },
        accountname: { type: "string" },
        subject: { type: "string" },
        description: { type: "string" },
      },
    },
    uiSchema: {},
  },
};
