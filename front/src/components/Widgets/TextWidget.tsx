import AppTextField from "../AppTextField/AppTextField";
import useFormField from "../../hooks/useFormField";
import useFieldValidations from "../../hooks/useFieldValidations";
import ValidationErrors from "../ValidationErrors/ValidationErrors";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

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
  const { validations } = options;

  const entityId = useMemo(() => id?.split("_")[0], [id]);

  const { t: translate } = useTranslation(entityId);

  const finalLabel = useMemo(() => {
    const changedLabel = translate(label) + " (*)";
    if (validations?.required) return changedLabel;
    return translate(label);
  }, [label, validations, translate]);

  const { value, setFieldValue } = useFormField(id);

  const { errors, dirty, valid } = useFieldValidations(id, value, validations);

  return (
    <AppTextField
      id={props?.id}
      label={finalLabel}
      value={value}
      readonly={props?.readonly}
      disabled={disabled}
      autofocus={props?.autofocus}
      onChange={canChange ? onChange : setFieldValue}
      type={props?.schema.type || "string"}
      showLabel={true}
      valid={valid}
      errors={<ValidationErrors clientErrors={errors} dirty={dirty} />}
    />
  );
};

export default TextWidget;
