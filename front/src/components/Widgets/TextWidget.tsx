import AppTextField from "../AppTextField/AppTextField";
import useFormField from "../../hooks/useFormField";
import useFieldValidations from "../../hooks/useFieldValidations";
import ValidationErrors from "../ValidationErrors/ValidationErrors";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { hasValue } from "../../hooks/utils";

const TextWidget = ({
  id,
  readonly = false,
  disabled = false,
  schema,
  options,
  formContext,
  label,
  value: innerValue,
  onChange,
}: any) => {
  const { canChange } = formContext || {};
  const { validations, multiline, rows } = options;

  const entityId = useMemo(() => id?.split("_")[0], [id]);

  const { t: translate } = useTranslation(entityId);

  const finalLabel = useMemo(() => {
    const changedLabel = translate(label) + " (*)";
    if (validations?.required) return changedLabel;
    return translate(label);
  }, [label, validations, translate]);

  const { value, setFieldValue } = useFormField(
    id,
    canChange ? innerValue : undefined
  );

  const { errors, dirty, valid } = useFieldValidations(id, value, validations);

  return (
    <AppTextField
      id={id}
      label={finalLabel}
      value={hasValue(value) ? value : ""}
      readonly={disabled}
      disabled={disabled}
      onChange={canChange ? onChange : setFieldValue}
      type={schema.type || "string"}
      showLabel={true}
      multiline={multiline}
      rows={rows}
      valid={valid}
      errors={<ValidationErrors clientErrors={errors} dirty={dirty} />}
    />
  );
};

export default TextWidget;
