import AppTextField from "../AppTextField/AppTextField";
import useFormField from "../../hooks/useFormField";
import useFieldValidations from "../../hooks/useFieldValidations";
import ValidationErrors from "../ValidationErrors/ValidationErrors";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FormControlLabel } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";

const TextWidget = (props: any) => {
  const {
    label,
    id,
    disabled,
    onChange,
    formContext: { canChange },
    options,
    idPrefix,
  } = props;
  const { validations, multiline, rows } = options;

  const entityId = useMemo(() => id?.split("_")[0], [id]);

  const { t: translate } = useTranslation(entityId);

  const { value, setFieldValue } = useFormField(id);

  return (
    <>
      <FormControlLabel
        control={
          <Checkbox
            checked={!!value}
            onChange={() => {
              setFieldValue(!value);
            }}
          />
        }
        label={translate(label)}
      />
    </>
  );
};

export default TextWidget;
