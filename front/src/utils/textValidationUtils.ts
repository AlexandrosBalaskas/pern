import { hasValue } from "../hooks/utils";

export const hasTextValue = (value: string | null | undefined) => {
  return hasValue(value?.toString().trim());
};

export const isValidRequired = (
  required = false,
  value: string | null | undefined = ""
) => {
  if (!required) {
    return true;
  }
  return hasTextValue(value);
};

export const hasValidMinValue = (minValue: any, value: any) => {
  return !(hasValue(minValue) && hasValue(value) && value < minValue);
};

export const hasValidMaxValue = (maxValue: any, value: any) => {
  return !(hasValue(maxValue) && hasValue(value) && value > maxValue);
};

export const hasValidMinValueExcludeLimit = (minValue: any, value: any) => {
  return !(hasValue(minValue) && hasValue(value) && value <= minValue);
};

export const hasValidMaxValueExcludeLimit = (maxValue: any, value: any) => {
  return !(hasValue(maxValue) && hasValue(value) && value >= maxValue);
};

export const hasValidMinLength = (minLength = 0, value = "") => {
  return !(minLength && hasTextValue(value) && value.length < minLength);
};

export const hasValidMaxLength = (maxLength = 0, value = "") => {
  return !(maxLength && hasTextValue(value) && value.length > maxLength);
};

export const hasValidPattern = (regex: string, value: string) => {
  if (!hasTextValue(value)) {
    return true;
  }
  return new RegExp(regex).test(value);
};

export const getAllValidationErrors = (rules: any, value: string) => {
  const errors: Array<string> = [];
  console.log(value, "valueee");
  if (!isValidRequired(rules.required, value)) {
    errors.push("required");
  }

  if (!hasValidMinValue(rules.minValue, parseFloat(value))) {
    errors.push(`minValue#{"minValue": ${rules.minValue}}`);
  }

  if (!hasValidMaxValue(rules.maxValue, parseFloat(value))) {
    errors.push(`maxValue#{"maxValue": ${rules.maxValue}}`);
  }

  if (
    !hasValidMinValueExcludeLimit(rules.minValueExcludeLimit, parseFloat(value))
  ) {
    errors.push(
      `minValueExcludeLimit#{"minValueExcludeLimit": ${rules.minValueExcludeLimit}}`
    );
  }

  if (
    !hasValidMaxValueExcludeLimit(rules.maxValueExcludeLimit, parseFloat(value))
  ) {
    errors.push(
      `maxValueExcludeLimit#{"maxValueExcludeLimit": ${rules.maxValueExcludeLimit}}`
    );
  }

  if (!hasValidMinLength(rules.minLength, value)) {
    errors.push(`minLength#{"minLength": ${rules.minLength}}`);
  }

  if (!hasValidMaxLength(rules.maxLength, value)) {
    errors.push(`maxLength#{"maxLength": ${rules.maxLength}}`);
  }

  if (rules.regex && !hasValidPattern(rules.regex, value)) {
    errors.push("invalidFormat");
  }

  return errors;
};
