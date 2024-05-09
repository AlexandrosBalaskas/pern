import { Grid } from "@mui/material";
import { useMemo } from "react";

export const ObjectFieldTemplate = function (props: any) {
  const { properties } = props;

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
