import { createTheme } from "@mui/material/styles";
import { alpha } from "@mui/material/styles";

const initTheme = (
  getExternalBasicTheme: any,
  getReactTheme: any,
  getReactThemeOverrides: any
) => {
  if (!getExternalBasicTheme || !getReactTheme || !getReactThemeOverrides) {
    return null;
  }

  const basicThemeData = getExternalBasicTheme();
  const BaseTheme = createTheme(basicThemeData.theme);

  const reactThemeData = getReactTheme(alpha, BaseTheme);
  const ReactTheme: any = createTheme(reactThemeData.theme);

  ReactTheme.props = reactThemeData.props;

  const reactThemeOverridesData = getReactThemeOverrides(alpha, ReactTheme);
  ReactTheme.overrides = reactThemeOverridesData.overrides;

  return ReactTheme;
};

export default initTheme;
