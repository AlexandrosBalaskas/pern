import AppTextField from "../AppTextField/AppTextField";
import useFormField from "../../hooks/useFormField";

const TextWidget = (props: any) => {
  const { label, id, disabled, onChange } = props;
  const { value, setFieldValue } = useFormField(id);
  return (
    <AppTextField
      id={props?.id}
      label={label}
      value={value}
      readonly={props?.readonly}
      disabled={disabled}
      autofocus={props?.autofocus}
      onChange={setFieldValue}
      type={props?.schema.type || "string"}
      showLabel={true}
    />
  );
};

export default TextWidget;
