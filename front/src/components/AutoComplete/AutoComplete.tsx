import { Autocomplete } from "@mui/lab";
import { AutocompleteTagsProps, AutocompleteOption } from "./AutoComplete.d";
import { TextField, Typography } from "@mui/material";
import { useMemo } from "react";

const AutoComplete = ({
  id,
  multiple = false,
  options,
  disabledOptions = [],
  onChange,
  onFocus,
  value,
  label = "",
  loading = false,
  loadingText,
  valid = true,
  disabled = false,
  renderBy = "label",
}: AutocompleteTagsProps) => {
  const isSelected = (option: AutocompleteOption, selected: any) => {
    if (multiple) {
      return (selected || []).indexOf(option.code) >= 0;
    } else {
      return selected === option.code;
    }
  };
  const isDisabled = (option: AutocompleteOption, disabledOptions: any) => {
    return (disabledOptions || []).indexOf(option.code) >= 0;
  };

  const filteredOptions = useMemo(() => {
    return options?.filter((option) => !isSelected(option, value));
  }, [options, value]);

  const getOptionLabel = (option: AutocompleteOption) => {
    if (!option) {
      return "";
    }

    if (!option[renderBy]) {
      return "";
    }
    return option[renderBy].toString();
  };
  return (
    <Autocomplete
      id={id}
      value={value}
      loading={loading}
      loadingText={loadingText}
      disabled={disabled}
      onChange={(_event, _value) => onChange(_value)}
      onFocus={onFocus}
      options={filteredOptions}
      getOptionLabel={getOptionLabel}
      getOptionDisabled={(option: AutocompleteOption) =>
        isDisabled(option, disabledOptions)
      }
      ChipProps={{ variant: "outlined", size: "medium" }}
      renderInput={(params) => (
        <TextField
          {...params}
          multiline
          color="primary"
          variant="outlined"
          inputProps={{
            ...params.inputProps,
          }}
          InputProps={{
            ...params.InputProps,
          }}
          label={label}
          error={!valid}
          id={id}
        />
      )}
    />
  );
};

export default AutoComplete;
