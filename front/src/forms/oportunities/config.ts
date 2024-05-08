export const config = {
  columns: [
    { accessorKey: "oportunityname", header: "Oportunity Name" },
    { accessorKey: "accountname", header: "Account Name" },
    { accessorKey: "amount", header: "Amount" },
    { accessorKey: "closedate", header: "Close Date" },
    { accessorKey: "stage", header: "Stage" },
    { accessorKey: "oportunityowner", header: "Oportunity Owner" },
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
