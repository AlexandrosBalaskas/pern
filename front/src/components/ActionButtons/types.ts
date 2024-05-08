export type FieldConditionSchema = {
  type?: string;
  checkWhen?: Array<string | number | boolean>;
  operator?:
    | "equals"
    | "greaterEquals"
    | "greater"
    | "lowerEquals"
    | "lower"
    | "not"
    | "isNull"
    | "isUndefined"
    | "equalsOrNull"
    | "isNotLoggedInUser"
    | "isLoggedInUser";
  key: string;
  source: DataSourceSchema;
  isOptional?: boolean;
  defaultValue?: boolean;
};

export type RelatedCodelistSchema = {
  code: string;
  attribute: string;
  replacements?: Array<ReplacementSchema>;
  queryFrom?: Array<ReplacementSchema>;
  value?: string;
};
export type RelatedObjectSchema = {
  code: string;
  property: string;
  replacements?: Array<ReplacementSchema>;
  queryFrom?: Array<ReplacementSchema>;
  value?: string;
};

export type StoreTypesSchema =
  | "SELF"
  | "ENTITY"
  | "FILTERS"
  | "LIST"
  | "STORE"
  | "NODE"
  | "API_DATA"
  | "WIDGET_PATH"
  | "ROUTER"
  | "ROUTER_DATA"
  | "ROUTER_QUERY";

export type ReplacementSchema = {
  key: string;
  type?: string;
  defaultValue?: Array<JsonPathSchema>;
  isOptional?: boolean;
  visible?: boolean;
  source?: DataSourceSchema;
};

export type JsonPathSchema = {
  jsonPath?: Array<string>;
};

export type DataSourceSchema = {
  type?: StoreTypesSchema;
  code?: string;
  jsonPath?: Array<string>;
  jsonPathReplacement?: DataSourceSchema;
  performQuery?: boolean;
  relatedCodeList?: RelatedCodelistSchema;
  relatedObject?: RelatedObjectSchema;
  reverse?: boolean;
  applyWhen?: CheckFromSchema;
  operator?: "sum" | "concat" | "keys" | "first" | "join";
};

export type CheckFromSchema = {
  operator: "every" | "some" | "none" | "add" | "multiply" | "percentage";
  fields: Array<FieldConditionSchema>;
};

export type ApiValuesSchema = {
  url: string;
  codeList?: string;
  type?: string;
  resourceId?: string;
  resourceToEntity?: string;
  resourcePath?: Array<string>;
  method?: "get" | "put" | "delete" | "post";
  jsonPath?: Array<string>;
  alwaysReload?: boolean;
  performQuery?: boolean;
  ignoreParamsIfNotFound?: boolean;
  dataFrom?: Array<FieldConditionSchema>;
  queryFrom?: Array<FieldConditionSchema>;
  replacements?: Array<FieldConditionSchema>;
  applyWhen?: CheckFromSchema;
  unifyData?: boolean;
  disableOptionWhen?: {
    key: string;
    value: any;
    type?: "ATTRIBUTE";
  };
  refreshFromButtons?: Array<string>;
};

export type ActionButtonTypes =
  | "redirect"
  | "default"
  | "download"
  | "EDIT"
  | "DELETE"
  | "DUPLICATE";

export type ActionButtonStyles =
  | "button"
  | "menu"
  | "link"
  | "simple"
  | "icon"
  | "inner-menu";

export type ActionButtonType = {
  type?:
    | "redirect"
    | "default"
    | "download"
    | "info"
    | "main"
    | "DELETE"
    | "ADD_LOCALLY"
    | "SAVE_LOCAL_TABLE"
    | "DELETE_LOCALLY"
    | "EDIT_LOCALLY"
    | "UNDO_LOCALLY";
  style?: ActionButtonStyles;
  customStyles?: any;
  title: string;
  source?: any;
  redirectSourceId?: string;
  confirm?: boolean;
  permissionKey?: string;
  values?: ApiValuesSchema;
  visibilityFrom?: CheckFromSchema;
  disabledFrom?: CheckFromSchema;
  warningOnClick?: {
    warningTitleKey: string;
    warningMessageKey: string;
  };
  color?: string;
  infoMessage?: string;
  notify?: {
    success?: string;
    error?: string;
  };
  groups?: Array<ActionButtonType>;
  schemas?: {
    schema: any;
    uiSchema: any;
  };
  icon?: string;
  isIcon?: boolean;
  onClick?: (param: any | undefined) => void;
  disabled?: boolean;
  checkValidButtons?: boolean;
  localStatusButton?: boolean;
  showClientValidations?: boolean;
};

export type AppActionButtons = {
  pageId?: string;
  visibilityFrom?: CheckFromSchema;
  replaceMainButton?: boolean;
  type?: "redirect" | "default";
  style?: "button" | "menu" | "link";
  buttons: Array<ActionButtonType>;
  checkValidButtons?: boolean;
};

export type AppActionsType = {
  page: {
    id: string;
    url?: string;
    idKey?: string;
  };
  source?: any;
  disabled?: boolean;
  checkPermissions?: boolean;
  disabledForm?: CheckFromSchema;
  onSuccessCallback?: () => void;
  actions?: any;
  defaultActions?: any;
  mode?: "LOCAL" | "DEFAULT";
};
