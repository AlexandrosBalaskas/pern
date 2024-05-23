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
        parentaccount: { type: "string" },
        phone: { type: "string" },
        billingcity: { type: "string" },
        billingstate: { type: "string" },
        shippingstate: { type: "string" },
      },
    },
    uiSchema: {
      id: "accounts",
      type: {
        "ui:widget": "SelectCodeListWidget",
        "ui:options": {
          codelistUrl: "account_type",
          codelistId: "account_type",
        },
      },
      parentaccount: {
        "ui:widget": "SelectCodeListWidget",
        "ui:options": {
          codelistUrl: "accounts",
          codelistId: "accounts",
        },
      },
    },
  },
};
