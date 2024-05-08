export const config = {
  columns: [
    { accessorKey: "firstname", header: "Name" },
    { accessorKey: "company", header: "Company" },
    { accessorKey: "state", header: "State" },
    { accessorKey: "phone", header: "Phone" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "leadstatus", header: "Lead Status" },
    { accessorKey: "leadOwner", header: "Owner" },
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
        oportunityName: { type: "string" },
        accountName: { type: "string" },
        closeDate: { type: "string" },
        amount: { type: "string" },
        description: { type: "string" },
        oportunityOwner: { type: "string" },
        stage: { type: "string" },
        probability: { type: "string" },
        forecastCategory: { type: "string" },
        nextStep: { type: "string" },
      },
    },
    uiSchema: {},
  },
};
