import { useMemo } from "react";
import useFormData from "./useFormData";
import { isValueCorrect } from "./utils";

const useCheckFrom = (widgetId: string, from: any, defaultValue: boolean) => {
  const { checkWhen, operator, source } = from || {};

  const value = useFormData(widgetId, source);
  const check = useMemo(() => {
    return isValueCorrect(value, checkWhen, operator);
  }, [value]);

  return { check: from ? check : defaultValue };
};

export default useCheckFrom;
