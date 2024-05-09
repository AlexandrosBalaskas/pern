export const config = {
  columns: [
    { accessorKey: "accountname", header: "Account Name" },
    { accessorKey: "phone", header: "Phone" },
    { accessorKey: "website", header: "Website" },
    { accessorKey: "billingcity", header: "Billing City" },
    { accessorKey: "billingstate", header: "Billing State" },
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
        accountName: { type: "string" },
        website: { type: "string" },
        type: { type: "string" },
        description: { type: "string" },
        parentAccount: { type: "string" },
        accountOwner: { type: "string" },
        phone: { type: "string" },
        billingStreet: { type: "string" },
        billingPostalCode: { type: "string" },
        billingCity: { type: "string" },
        billingCountry: { type: "string" },
        billingState: { type: "string" },
        shippingStreet: { type: "string" },
        shippingPostalCode: { type: "string" },
        shippingCity: { type: "string" },
        shippingCountry: { type: "string" },
        shippingState: { type: "string" },
      },
    },
    uiSchema: {},
  },
};
