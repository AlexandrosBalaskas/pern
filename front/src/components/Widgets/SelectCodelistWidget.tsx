import { useEffect, useMemo } from "react";
import useFormField from "../../hooks/useFormField";
import useCodelist from "../../store/codelist/useCodelist";
import GenericSelect from "../AutoComplete/Select";
import { FormWidgetProps } from "../AutoComplete/Select.d";
import { useTranslation } from "react-i18next";
import useFieldValidations from "../../hooks/useFieldValidations";
import ValidationErrors from "../ValidationErrors/ValidationErrors";
import { hasValue } from "../../hooks/utils";

const SelectCodeListWidget = ({
  id,
  label,
  options,
  disabled,
  readonly,
  autofocus,
  onChange,
  formContext,
  onBlur,
  value: innerValue,
  warnOnChange,
}: FormWidgetProps) => {
  const {
    multiple,
    validations,
    selectAll = false,
    fullWidth,
    widthSize = "sm",
    defaultValues,
    codelistUrl,
    codelistId,
    hasPlaceHolder = false,
  } = options;

  const { canChange } = formContext;

  const entityId = useMemo(() => id?.split("_")[0], [id]);

  const { t: translate } = useTranslation([entityId, "codelist"]);

  const { value, setFieldValue } = useFormField(
    id,
    canChange ? innerValue : undefined
  );

  const { loadCodelist, items } = useCodelist(codelistId);

  const translatedOptions = useMemo(() => {
    return (items || []).map((item: any) => {
      return {
        code: item.code,
        label: translate(item.label, { ns: "codelist" }),
      };
    });
  }, [items, translate]);

  useEffect(() => {
    loadCodelist({ url: codelistUrl, codelistId });
  }, [codelistUrl, codelistId, loadCodelist]);
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
    () => translate(`select_${label}`, { ns: "codelist" }),
    [translate, label]
  );

  return (
    <GenericSelect
      id={id}
      label={finalLabel}
      value={hasValue(value) ? value : ""}
      readonly={readonly}
      required={(validations || {}).required || false}
      disabled={disabled || readonly}
      autofocus={autofocus}
      selectAll={selectAll}
      multiple={multiple}
      placeHolder={hasPlaceHolder ? placeHolder : ""}
      widthSize={widthSize}
      onChange={(e: any) =>
        canChange ? onChange(e.target?.value) : setFieldValue(e.target.value)
      }
      onBlur={(e: any) => onBlur && onBlur(e.target.value)}
      options={translatedOptions}
      fullWidth={fullWidth}
      canChange={canChange}
      valid={valid}
      errors={<ValidationErrors clientErrors={errors} dirty={dirty} />}
    />
  );
};

export default SelectCodeListWidget;
