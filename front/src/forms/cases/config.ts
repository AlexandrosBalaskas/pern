export const config = {
  columns: [
    {
      accessorKey: "caseorigin",
      header: "caseorigin",
      codelist: "case_origin",
    },
    { accessorKey: "contactname", header: "contactname", codelist: "contacts" },
    { accessorKey: "subject", header: "subject" },
    { accessorKey: "status", header: "status", codelist: "case_status" },
    { accessorKey: "priority", header: "priority", codelist: "priority" },
    { accessorKey: "caseowner", header: "caseowner" },
    { accessorKey: "id", header: "id" },
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
        status: { type: "string" },
        priority: { type: "string" },
        caseorigin: { type: "string" },
        caseowner: { type: "string" },
        contactname: { type: "string" },
        accountname: { type: "string" },
        subject: { type: "string" },
        description: { type: "string" },
      },
    },
    uiSchema: {
      caseorigin: {
        "ui:widget": "SelectCodeListWidget",
        "ui:options": {
          codelistUrl: "case_origin",
          codelistId: "case_origin",
        },
      },
      status: {
        "ui:widget": "SelectCodeListWidget",
        "ui:options": {
          codelistUrl: "case_status",
          codelistId: "case_status",
        },
      },
      priority: {
        "ui:widget": "SelectCodeListWidget",
        "ui:options": {
          codelistUrl: "priority",
          codelistId: "priority",
        },
      },
      contactname: {
        "ui:widget": "SelectCodeListWidget",
        "ui:options": {
          codelistUrl: "contacts",
          codelistId: "contacts",
        },
      },
    },
  },
};
