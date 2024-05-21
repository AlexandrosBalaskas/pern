import React from "react";
import { AppTextFieldProps } from "./AppTextField.d";
import { Box, TextField, Theme, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTranslation } from "react-i18next";

export const AppTextField: React.FC<AppTextFieldProps> = ({
  id,
  required = false,
  readonly = false,
  disabled = false,
  label = "",
  value,
  onChange,
  onClick,
  autofocus = false,
  rows,
  errors,
  multiline,
  emptyValue,
  valid = true,
  type = "string",
  description,
  showLabel = true,
  variant,
  placeHolder,
}: AppTextFieldProps) => {
  const { t: translate } = useTranslation("common");
  const onElementChange = ({ target: { value: fieldValue } }: any) => {
    if (!onChange) {
      return;
    }
    try {
      const finalValue =
        type === "number" ? parseFloat(fieldValue) : fieldValue;
      onChange(fieldValue === "" ? emptyValue : finalValue);
    } catch {
      onChange(fieldValue === "" ? emptyValue : fieldValue);
    }
  };
  return (
    <>
      <TextField
        placeholder={placeHolder}
        id={id}
        label={showLabel ? label || "" : null}
        variant={variant || "outlined"}
        color="primary"
        value={value}
        multiline={multiline}
        minRows={rows}
        maxRows={3}
        autoFocus={autofocus}
        required={required}
        disabled={disabled || readonly}
        onChange={onElementChange}
        onClick={onClick}
        error={!valid}
        type={type}
        helperText={description}
      />
      {errors}
    </>
  );
};

export default AppTextField;
