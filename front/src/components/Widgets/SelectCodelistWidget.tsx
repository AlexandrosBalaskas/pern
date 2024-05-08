import useFormField from "../../hooks/useFormField";
import GenericSelect from "../AutoComplete/Select";
import { FormWidgetProps } from "../AutoComplete/Select.d";

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

  const { value, setFieldValue } = useFormField(id);

  const optionsFromEnum = defaultValues?.enumNames?.map(
    (name: string, index: number) => ({
      code: defaultValues?.enum?.[index].toString(),
      label: name,
    })
  );

  const finalList = optionsFromEnum;

  return (
    <GenericSelect
      id={id}
      label={label}
      value={value}
      readonly={readonly}
      required={(validations || {}).required || false}
      disabled={disabled || readonly}
      autofocus={autofocus}
      selectAll={selectAll}
      multiple={multiple}
      widthSize={widthSize}
      onChange={(e: any) =>
        warnOnChange
          ? warnOnChange(e.target.value)
          : setFieldValue(e.target.value)
      }
      onBlur={(e: any) => onBlur && onBlur(e.target.value)}
      options={finalList}
      fullWidth={fullWidth}
    />
  );
};

export default SelectCodeListWidget;
