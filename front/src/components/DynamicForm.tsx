import Form from "./Widgets/FieldRenderer";
import validator from "@rjsf/validator-ajv8";
import { RJSFSchema, UiSchema, WidgetProps } from "@rjsf/utils";
import { CustomFieldTemplate } from "./CustomFieldTemplate";
import React from "react";
import { Grid, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import AppButton from "./AppButton/AppButton";
import { useTranslation } from "react-i18next";
import { ObjectFieldTemplate } from "./ObjectFieldTemplate";

const useStyles = makeStyles((theme: Theme) => ({
  filterButton: {
    marginLeft: theme.spacing(1),
  },
  formButtons: {
    marginTop: theme.spacing(4),
  },
}));

export const DynamicForm = function ({
  widget: Widget,
  schema: schema,
  uiSchema: uiSchema,
  data,
  onSubmit,
  onClear,
  submitButton,
  pageId,
  id,
  onChange,
  ...props
}: {
  uiSchema: UiSchema;
  schema: RJSFSchema;
  data?: any;
  pageId?: string;
  onSubmit?: any;
  onClear?: any;
  submitButton?: any;
  onChange?: any;
  id?: string;
  widget?: any;
  props?: WidgetProps;
}) {
  const { t: translate } = useTranslation("common");

  const styles = useStyles();

  const onFormDataChange = React.useCallback(
    ({ formData }: any) => {
      onChange && onChange(formData);
    },
    [onChange]
  );

  const onFormSubmit = ({ formData }: any) => {
    onSubmit && onSubmit(formData);
  };

  const onFormClear = () => {
    onClear && onClear();
  };

  const renderFormButtons = () => {
    if (!onClear && !onSubmit && !submitButton) {
      return <div />;
    }

    return submitButton ? (
      submitButton
    ) : (
      <Grid
        container
        alignItems="flex-end"
        direction="column"
        spacing={2}
        className={styles.formButtons}
      >
        <Grid item xs={12}>
          {onClear && (
            <AppButton
              id={`${id}-clear-btn`}
              label={translate("clear")}
              variant="outlined"
              onClick={onFormClear}
            />
          )}
          {onSubmit && (
            <AppButton
              id={`${id}-apply-btn`}
              label={translate("apply")}
              styles={styles.filterButton}
              type="button"
              onClick={(e: any) => {
                e.preventDefault();
                onSubmit(data);
              }}
            />
          )}
        </Grid>
      </Grid>
    );
  };
  return (
    <Form
      schema={schema}
      idPrefix={pageId || id}
      validator={validator}
      uiSchema={uiSchema}
      templates={{
        ObjectFieldTemplate: ObjectFieldTemplate,
      }}
      onChange={onFormDataChange}
      formData={data}
      onSubmit={onFormSubmit}
    >
      {renderFormButtons()}
    </Form>
  );
};
