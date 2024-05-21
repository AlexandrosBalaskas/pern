import { useCallback } from "react";
import useFormField from "../../hooks/useFormField";
import DateCalendar from "../Calendar/Calendar";
const dayjs = require("dayjs");

const DateWidget = (props: any) => {
  const { label, id, disabled } = props;

  const { value, setFieldValue } = useFormField(id);
  console.log(value, "value");

  const onDateChange = useCallback(
    (date: any) => {
      console.log(date.format("YYYY-MM-DD"), "date");
      if (date === null) {
        setFieldValue(null);
      } else {
        try {
          setFieldValue(date.format("YYYY-MM-DD"));
        } catch {
          console.log("date fault");
        }
      }
    },
    [setFieldValue]
  );
  return (
    <DateCalendar
      label={label}
      value={dayjs(value) || null}
      disabled={disabled}
      onChange={onDateChange}
    />
  );
};

export default DateWidget;
