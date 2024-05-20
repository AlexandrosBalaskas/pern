export const config = {
  columns: [
    { accessorKey: "firstname", header: "firstname" },
    { accessorKey: "accountname", header: "accountname" },
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
        mailingstreet: { type: "string" },
        mailingcountry: { type: "string" },
      },
    },
    uiSchema: {},
  },
};
