import {
  isObject as isTypeObject,
  isNumber,
  isEmpty,
  isFunction,
  isNull,
} from "lodash";
var jp = require("jsonpath");

export const resolveSourceData = (
  widgetId: string,
  state: any,
  source: any
) => {
  const entityId = widgetId?.split("_")[0];
  const data = state.Entities[entityId]?.formData;

  const keyValue = getContextValue(data || {}, source);

  return keyValue;
};

const getContextValue = (formData: any, source: any) => {
  const jsonPath = JSON.parse(JSON.stringify(source?.jsonPath));

  return jp.value(
    formData || {},
    jp.stringify(jsonPath || {}).replace(/"/g, "")
  );
};

export const isValueCorrect = (
  value: any,
  checkWhen: Array<string> = [],
  operator = "equals",
  defaultValue = false
) => {
  if (!hasValue(value)) {
    return defaultValue ?? false;
  }

  if (!checkWhen.length && hasValue(value)) {
    return true;
  }

  if (operator === "equals") {
    return hasCorrectValue(checkWhen || [], value);
  }

  return true;
};

export const hasCorrectValue = (
  left?: Array<string | boolean | number | null>,
  right?:
    | string
    | boolean
    | number
    | null
    | Array<string | boolean | number | null>
) => {
  if (!hasValue(left) || !(hasValue(right) || isNull(right))) {
    return false;
  }

  if (Array.isArray(right)) {
    return right.some((r) => left?.includes(r));
  }

  return left?.includes(right!);
};

export const hasValue = (v: any) => {
  if (isTypeObject(v)) {
    return isFunction(v) || !isEmpty(v);
  }

  if (isNumber(v)) {
    return true;
  }

  if (v === false) {
    return true;
  }

  return !!v;
};
