import { useEffect, useMemo } from "react";
import useFormField from "../../hooks/useFormField";
import useCodelist from "../../store/codelist/useCodelist";
import GenericSelect from "../AutoComplete/Select";
import { FormWidgetProps } from "../AutoComplete/Select.d";
import { useTranslation } from "react-i18next";
import useFieldValidations from "../../hooks/useFieldValidations";
import ValidationErrors from "../ValidationErrors/ValidationErrors";

const SelectCodeListWidget = ({
  id,
  label,
  options,
  disabled,
  readonly,
  autofocus,
  onBlur,
  warnOnChange,
}: FormWidgetProps) => {
  const {
    multiple,
    validations,
    selectAll = false,
    fullWidth,
    widthSize = "sm",
    defaultValues,
  } = options;

  const entityId = useMemo(() => id?.split("_")[0], [id]);

  const { t: translate } = useTranslation(entityId);

  const { value, setFieldValue } = useFormField(id);

  const { loadCodelist, items } = useCodelist("accounts");

  useEffect(() => {
    loadCodelist({ url: "accounts", codelistId: "accounts" });
  }, []);
  const optionsFromEnum = defaultValues?.enumNames?.map(
    (name: string, index: number) => ({
      code: defaultValues?.enum?.[index].toString(),
      label: name,
    })
  );

  const { errors, dirty, valid } = useFieldValidations(id, value, validations);

  const finalLabel = useMemo(() => {
    const changedLabel = translate(label) + " (*)";
    if (validations?.required) return changedLabel;
    return translate(label);
  }, [label, validations, translate]);

  const placeHolder = useMemo(
    () => translate(`select_${label}`),
    [translate, label]
  );

  return (
    <GenericSelect
      id={id}
      label={finalLabel}
      value={value}
      readonly={readonly}
      required={(validations || {}).required || false}
      disabled={disabled || readonly}
      autofocus={autofocus}
      selectAll={selectAll}
      multiple={multiple}
      placeHolder={placeHolder}
      widthSize={widthSize}
      onChange={(e: any) =>
        warnOnChange
          ? warnOnChange(e.target.value)
          : setFieldValue(e.target.value)
      }
      onBlur={(e: any) => onBlur && onBlur(e.target.value)}
      options={items}
      fullWidth={fullWidth}
      valid={valid}
      errors={<ValidationErrors clientErrors={errors} dirty={dirty} />}
    />
  );
};

export default SelectCodeListWidget;
