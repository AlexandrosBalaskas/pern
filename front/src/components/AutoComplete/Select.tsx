import React, { useCallback } from "react";
import AutoComplete from "./AutoComplete";
import { AutocompleteOption } from "./AutoComplete.d";
import { GenericSelectProps } from "./Select.d";

const GenericSelect = ({
  id = "",
  value = "",
  selectAll,
  label = "",
  options = [],
  disabledOptions = [],
  disabled = false,
  readonly = false,
  multiple = false,
  canChange = false,
  onChange = () => void 0,
  onFocus = () => void 0,
  valid = true,
  loading = false,
  placeHolder = "",
  className = "",
  errors = null,
}: GenericSelectProps) => {
  const transformToAutocompleteValue = (
    selectedValue: any,
    listOptions: any
  ) => {
    if (!multiple) {
      return (
        (listOptions || []).find(
          (option: any) =>
            option.code === selectedValue ||
            option.code === Number(selectedValue)
        ) || ""
      );
    } else {
      return (listOptions || []).filter((option: any) =>
        (selectedValue || []).includes(option.code)
      );
    }
  };
  const onChangeCallback = React.useCallback(onChange, [onChange]);

  const onFocusCallback = useCallback(() => onFocus && onFocus(), []);

  return (
    <>
      <AutoComplete
        id={id}
        multiple={multiple}
        value={transformToAutocompleteValue(value, options)}
        label={label || ""}
        selectAll={selectAll}
        loading={loading}
        loadingText={"loading"}
        disabled={disabled || readonly}
        options={options}
        className={className}
        placeHolder={placeHolder}
        disabledOptions={disabledOptions}
        onChange={(selected) =>
          onChangeCallback({
            target: {
              value: multiple
                ? (selected as Array<AutocompleteOption>)?.map(
                    (item) => item.code
                  )
                : (selected as AutocompleteOption)?.code,
            },
          })
        }
        onFocus={onFocusCallback}
        valid={valid}
      />
      {errors}
    </>
  );
};

export default GenericSelect;
