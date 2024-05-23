export const config = {
  columns: [
    { accessorKey: "firstname", header: "firstname" },
    { accessorKey: "accountname", header: "accountname", codelist: "accounts" },
    { accessorKey: "title", header: "title" },
    { accessorKey: "phone", header: "phone" },
    { accessorKey: "email", header: "email" },
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
        firstname: { type: "string" },
        accountname: { type: "string" },
        title: { type: "string" },
        phone: { type: "string" },
        email: { type: "string" },
        salutation: { type: "string" },
        reportsto: { type: "string" },
        mailingcountry: { type: "string" },
      },
    },
    uiSchema: {
      accountname: {
        "ui:widget": "SelectCodeListWidget",
        "ui:options": {
          codelistUrl: "accounts",
          codelistId: "accounts",
        },
      },
      salutation: {
        "ui:widget": "SelectCodeListWidget",
        "ui:options": {
          codelistUrl: "salutation",
          codelistId: "salutation",
        },
      },
      reportsto: {
        "ui:widget": "SelectCodeListWidget",
        "ui:options": {
          codelistUrl: "contacts",
          codelistId: "contacts",
        },
      },
    },
  },
};
