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
import classNames from "classnames";

const useStyles = makeStyles((theme: Theme) => ({
  filterButton: {
    marginLeft: "100px",
  },
  formButtons: {
    marginTop: theme.spacing(4),
    position: "relative",
    left: "-50px",
    top: "20px",
  },
  formContainer: {
    boxShadow: "0 3px 6px rgba(0, 0, 0, 0.16)",
    margin: "2%",
  },
  submitButton: {
    position: "relative",
    left: "50px",
    marginBottom: "10px",
    display: "inline-block",
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
  formContext,
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
  formContext?: any;
  submitButton?: any;
  onChange?: (data: any) => void;
  id?: string;
  widget?: any;
  props?: WidgetProps;
}) {
  const { t: translate } = useTranslation("common");
  const { canChange } = formContext || {};

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
          <div style={{ display: "flex", flexDirection: "row" }}>
            {onClear && (
              <AppButton
                id={`${id}-clear-btn`}
                label={translate("clear")}
                variant="outlined"
                onClick={onFormClear}
              />
            )}
            {onSubmit && (
              <div style={{ marginLeft: "10px" }}>
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
              </div>
            )}
          </div>
        </Grid>
      </Grid>
    );
  };
  return (
    <Form
      className={classNames({
        [styles.formContainer]: !canChange,
      })}
      schema={schema}
      idPrefix={pageId || id}
      validator={validator}
      formContext={formContext}
      uiSchema={uiSchema}
      noHtml5Validate
      templates={{
        ObjectFieldTemplate: ObjectFieldTemplate,
      }}
      onChange={onFormDataChange}
      formData={data}
      onSubmit={onFormSubmit}
    >
      <div className={styles.submitButton}>{renderFormButtons()}</div>
    </Form>
  );
};
