import { ThemeProps, withTheme } from "@rjsf/core";
import { Theme } from "@rjsf/mui";
import SelectCodeListWidget from "./SelectCodelistWidget";
import TextWidget from "./TextWidget";
import DateWidget from "./DateWidget";
import BooleanWidget from "./BooleanWidget";
import useCheckFrom from "../../hooks/useCheckFrom";
import { Grid } from "@mui/material";
export type AnyType = any;

const FieldRenderer = function ({ widget: Widget, ...props }: AnyType) {
  const { id: widgetId, uiSchema } = props;
  const { disabledFrom, visibilityFrom } = uiSchema;
  const { check: disabled } = useCheckFrom(widgetId, disabledFrom, false);
  const { check: visible } = useCheckFrom(widgetId, visibilityFrom, true);
  const widgetProps = { ...props, disabled };
  return visible ? (
    <div style={{ marginBottom: 16, width: "100%" }}>
      <Widget {...widgetProps} />
    </div>
  ) : null;
};

const customWidgets = {
  SelectCodeListWidget: (props: any) => {
    return <FieldRenderer {...props} widget={SelectCodeListWidget} />;
  },
  TextWidget: (props: any) => {
    return <FieldRenderer {...props} widget={TextWidget} />;
  },
  DateWidget: (props: any) => {
    return <FieldRenderer {...props} widget={DateWidget} />;
  },
  BooleanWidget: (props: any) => {
    return <FieldRenderer {...props} widget={BooleanWidget} />;
  },
};

const FormTheme: ThemeProps = {
  ...Theme,
  templates: {
    ...Theme.templates,
  },
  widgets: {
    ...Theme.widgets,
    ...customWidgets,
  },
};

const Form = withTheme(FormTheme) as any;

export default Form;
