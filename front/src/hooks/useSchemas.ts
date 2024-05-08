export const useSchemas = (
  pageId: string,
  fallbackSchemas: FallbackSchemasType
) => {
  if (!fallbackSchemas[pageId]) {
    return {
      schema: {},
      uiSchema: {},
      loading: false,
      hasError: true,
    };
  }

  const { pageSchema, pageUiSchema, pageConfig } =
    fallbackSchemas[pageId] || {};

  return {
    schema: pageSchema || {},
    uiSchema: pageUiSchema || {},
    config: pageConfig || {},
    loading: false,
    hasError: false,
  };
};

export type FallbackSchemasType = {
  [_: string]: {
    configuration?: any;
    uiSchema?: any;
    schema?: any;
    pageUiSchema: any;
    pageSchema: any;
    pageConfig: any;
  };
};
