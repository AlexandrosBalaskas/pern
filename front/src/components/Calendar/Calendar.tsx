import React from "react";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export type DateCalendarProps = React.ComponentProps<typeof DatePicker> & {};

const DateCalendar: React.FC<DateCalendarProps> = ({ ...restProps }) => (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <DatePicker
      {...restProps}
      disabled={restProps.disabled || restProps.readOnly}
    />
  </LocalizationProvider>
);

export default DateCalendar;
