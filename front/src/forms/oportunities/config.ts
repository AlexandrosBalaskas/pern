export const config = {
  columns: [
    { accessorKey: "oportunityname", header: "oportunityname" },
    { accessorKey: "accountname", header: "accountname" },
    { accessorKey: "amount", header: "amount" },
    { accessorKey: "closedate", header: "closedate" },
    { accessorKey: "stage", header: "stage" },
    { accessorKey: "oportunityowner", header: "oportunityowner" },
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
        oportunityname: { type: "string" },
        accountname: { type: "string" },
        closedate: { type: "string" },
        amount: { type: "string" },
        description: { type: "string" },
        oportunityowner: { type: "string" },
        stage: { type: "string" },
        probability: { type: "string" },
        forecastcategory: { type: "string" },
        nextstep: { type: "string" },
      },
    },
    uiSchema: {},
  },
};
