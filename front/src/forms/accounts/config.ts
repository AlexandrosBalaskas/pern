export const config = {
  columns: [
    { accessorKey: "accountname", header: "accountname" },
    { accessorKey: "phone", header: "phone" },
    { accessorKey: "website", header: "website" },
    { accessorKey: "billingcity", header: "billingcity" },
    { accessorKey: "billingstate", header: "billingstate" },
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
        accountname: { type: "string" },
        website: { type: "string" },
        type: { type: "string" },
        description: { type: "string" },
        parentaccount: { type: "string" },
        accountowner: { type: "string" },
        phone: { type: "string" },
        billingstreet: { type: "string" },
        billingpostalcode: { type: "string" },
        billingcity: { type: "string" },
        billingcountry: { type: "string" },
        billingstate: { type: "string" },
        shippingstreet: { type: "string" },
        shippingpostalcode: { type: "string" },
        shippingcity: { type: "string" },
        shippingcountry: { type: "string" },
        shippingstate: { type: "string" },
      },
    },
    uiSchema: { id: "accounts" },
  },
};
