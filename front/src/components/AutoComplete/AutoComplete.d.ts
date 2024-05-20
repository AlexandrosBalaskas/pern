export type AutocompleteOption = {
  code: string;
  label: string;
};

export type AutocompleteTagsProps = {
  id: string;
  multiple?: boolean;
  selectAll?: boolean;
  className?: any;
  options: Array<AutocompleteOption>;
  loading?: boolean;
  loadingText?: string;
  disabledOptions?: Array<string | number | boolean>;
  onChange: (
    value: AutocompleteOption | Array<AutocompleteOption> | null
  ) => void;
  onFocus?: () => void;
  value: AutocompleteOption | null | undefined;
  ariaDescribedBy?: string;
  label?: string;
  valid?: boolean;
  placeHolder?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  renderBy?: "label" | "code";
};
