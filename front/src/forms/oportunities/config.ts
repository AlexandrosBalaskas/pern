import { createColumnHelper } from "@tanstack/react-table";
import moment from "moment";
const columnHelper = createColumnHelper();

export const config = {
  columns: [
    { accessorKey: "oportunityname", header: "oportunityname" },
    { accessorKey: "accountname", header: "accountname", codelist: "accounts" },
    { accessorKey: "amount", header: "amount" },
    columnHelper.accessor("closedate", {
      cell: (props) => moment(props.getValue()).format("DD/MM/yyyy"),
      header: "closedate",
    }),
    { accessorKey: "stage", header: "stage", codelist: "stage" },
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
    uiSchema: {
      stage: {
        "ui:widget": "SelectCodeListWidget",
        "ui:options": {
          codelistUrl: "stage",
          codelistId: "stage",
        },
      },
      forecastcategory: {
        "ui:widget": "SelectCodeListWidget",
        "ui:options": {
          codelistUrl: "forecast_category",
          codelistId: "forecast_category",
        },
      },
      accountname: {
        "ui:widget": "SelectCodeListWidget",
        "ui:options": {
          codelistUrl: "accounts",
          codelistId: "accounts",
        },
      },
    },
  },
};
