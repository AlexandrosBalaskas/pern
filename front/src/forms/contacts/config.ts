export const config = {
  columns: [
    { accessorKey: "firstName", header: "First Name" },
    { accessorKey: "accountName", header: "Account Name" },
    { accessorKey: "title", header: "Title" },
    { accessorKey: "phone", header: "Phone" },
    { accessorKey: "email", header: "Email" },
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
        firstName: { type: "string" },
        accountName: { type: "string" },
        title: { type: "string" },
        phone: { type: "string" },
        email: { type: "string" },
        mailingStreet: { type: "string" },
        mailingCountry: { type: "string" },
      },
    },
    uiSchema: {},
  },
};
