import { Grid, Theme } from "@mui/material";
import { useMemo } from "react";
import { makeStyles } from "@mui/styles";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    padding: 0,
    margin: 0,
    marginBottom: theme.spacing(4),
    width: "100%",
  },
  grid: {
    padding: 0,
    margin: 0,
    width: "100%",
  },
  titleContainer: {
    paddingLeft: "50px",
    paddingRight: "50px",
    paddingTop: "20px",
    fontWeight: 600,
  },
  hrContainer: {
    margin: "5px 50px 20px 50px",
  },
}));

export const ObjectFieldTemplate = function (props: any) {
  const {
    idSchema,
    properties,
    formContext: { canChange },
    uiSchema: { groups = [], id = "" },
    options,
  } = props;
  const styles = useStyles();
  const { t: translate } = useTranslation(id);
  const fieldId = idSchema.$id;

  const groupings = [
    {
      key: "DEFAULT_GROUP",
      type: "Ungrouped",
      widgets: properties.map((element: any) => element.name),
    },
  ] as Array<any>;

  const prop: Array<any> = useMemo(() => {
    return properties;
  }, [properties]);

  const renderWidgetElement = (code: any, index: any) => {
    const widgetElement = (prop || []).find((element) => element.name === code);
    const uiSchema = widgetElement?.content.props.uiSchema;
    const options = uiSchema && uiSchema["ui:options"];
    const { columns } = options || {};
    const { xs, sm, md, lg, xl } = columns || {};

    if (widgetElement) {
      return (
        <Grid
          key={widgetElement?.content?.props?.idSchema?.$id}
          item
          xs={xs || 12}
          sm={sm || 12}
          md={md || 12}
          lg={lg || 6}
          xl={xl || 6}
          style={{ paddingRight: "50px", paddingLeft: "50px" }}
        >
          {widgetElement.content}
        </Grid>
      );
    }

    return null;
  };

  return (
    <>
      {!canChange && (
        <div style={{ position: "relative", left: "50px" }}>
          {translate(id)}
        </div>
      )}
      {!canChange &&
        ((groups.length && groups) || groupings).map(
          (group: any, index: number) => (
            <>
              <div className={styles.titleContainer}>
                {translate(group.key)}
              </div>
              <hr className={styles.hrContainer}></hr>
              <Grid container alignItems="center" wrap="wrap" direction="row">
                <Grid container alignItems="center" wrap="wrap" direction="row">
                  {(group.widgets || []).map((widget: any, index: any) =>
                    renderWidgetElement(widget, index)
                  )}
                </Grid>
              </Grid>
            </>
          )
        )}
      {canChange &&
        ((groups.length && groups) || groupings).map(
          (group: any, index: number) => (
            <>
              {(group.widgets || []).map(
                (widget: any, index: any) =>
                  (prop || []).find((element) => element.name === widget)
                    .content
              )}
            </>
          )
        )}
    </>
  );
};
