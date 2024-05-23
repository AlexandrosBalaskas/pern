export const uiSchema = {
  done: {
    "ui:widget": "SelectCodeListWidget",
    "ui:options": {
      defaultValues: {
        enum: ["PERCENTAGE", "MAX_AMOUNT"],
        enumNames: ["Percent", "Max. Amount"],
      },
    },
  },
  name: {
    "ui:widget": "TextWidget",
  },
  address: {
    "ui:widget": "TextWidget",
  },
  surname: {
    "ui:widget": "TextWidget",
  },
  schoolname: {
    "ui:widget": "TextWidget",
  },
  text2: {
    "ui:widget": "TextWidget",
    visibilityFrom: {
      checkWhen: ["itsokay"],
      source: { jsonPath: ["text"] },
    },
  },
  date: {
    "ui:widget": "DateWidget",
  },
  interest: {
    "ui:widget": "HorizontalBarChart",
    "ui:options": {
      data: [
        { label: "UNDERSTATEMENT PENALTY", value: 5 },
        { label: "UPAYMENT ESTMD TAX PENALTY", value: 18 },
        { label: "LATE FILLING PENALTY", value: 24 },
        { label: "UNDERSTATEMENT PENALTY", value: 12 },
        { label: "NOT AVAILABLE", value: 22 },
      ],
    },
  },
  overdueDebtByRevenueType: {
    "ui:widget": "FilledPieChart",
    "ui:options": {
      data: [
        { name: "Excise Tax", value: 11.88 },
        { name: "Value Added Tax", value: 34.81 },
        { name: "Income Tax", value: 36.9 },
        { name: "Wage Withholding Tax", value: 16.41 },
      ],
    },
  },
};
