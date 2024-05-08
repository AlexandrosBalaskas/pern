import { Grid, Theme } from "@mui/material";
import { useMemo } from "react";
import { makeStyles } from "@mui/styles";

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
}));

export const ObjectFieldTemplate = function (props: any) {
  const { idSchema, properties, formContext } = props;

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

    if (widgetElement) {
      return (
        <Grid
          key={widgetElement?.content?.props?.idSchema?.$id}
          item
          xs={6}
          sm={6}
          md={6}
          lg={6}
          xl={6}
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
      {groupings.map((group, index) => (
        <Grid container alignItems="center" wrap="wrap" direction="row">
          <Grid container alignItems="center" wrap="wrap" direction="row">
            {(group.widgets || []).map((widget: any, index: any) =>
              renderWidgetElement(widget, index)
            )}
          </Grid>
        </Grid>
      ))}
    </>
  );
};
