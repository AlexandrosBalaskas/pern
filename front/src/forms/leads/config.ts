export const config = {
  columns: [
    { accessorKey: "firstname", header: "firstname" },
    { accessorKey: "company", header: "company" },
    { accessorKey: "state", header: "state" },
    { accessorKey: "phone", header: "phone" },
    { accessorKey: "email", header: "email" },
    {
      accessorKey: "leadstatus",
      header: "leadstatus",
      codelist: "lead_status",
    },
    { accessorKey: "leadowner", header: "leadowner" },
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
        salutation: { type: "string" },
        firstname: { type: "string" },
        lastname: { type: "string" },
        company: { type: "string" },
        title: { type: "string" },
        website: { type: "string" },
        description: { type: "string" },
        leadstatus: { type: "string" },
        leadowner: { type: "string" },
        phone: { type: "string" },
        email: { type: "string" },
        street: { type: "string" },
        postalcode: { type: "string" },
        city: { type: "string" },
        country: { type: "string" },
        state: { type: "string" },
        employeesnumber: { type: "string" },
        annualrevenue: { type: "string" },
        leadsource: { type: "string" },
        industry: { type: "string" },
      },
    },
    uiSchema: {
      leadstatus: {
        "ui:widget": "SelectCodeListWidget",
        "ui:options": {
          codelistUrl: "lead_status",
          codelistId: "lead_status",
        },
      },
      salutation: {
        "ui:widget": "SelectCodeListWidget",
        "ui:options": {
          codelistUrl: "salutation",
          codelistId: "salutation",
        },
      },
      industry: {
        "ui:widget": "SelectCodeListWidget",
        "ui:options": {
          codelistUrl: "industry",
          codelistId: "industry",
        },
      },
      leadsource: {
        "ui:widget": "SelectCodeListWidget",
        "ui:options": {
          codelistUrl: "lead_source",
          codelistId: "lead_source",
        },
      },
    },
  },
};
