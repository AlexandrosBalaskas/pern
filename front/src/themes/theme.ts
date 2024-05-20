import { createTheme } from "@mui/material/styles";
import { alpha } from "@mui/material/styles";

export const getExternalBasicTheme: any = () => {
  return {
    theme: {
      breakpoints: {
        values: {
          xs: 0,
          sm: 660,
          md: 1024,
          lg: 1440,
          xl: 1920,
        },
      },
      spacing: 4,
    },
  };
};

export const getExternalTheme: any = (fade: any, BaseTheme: any) => {
  return {
    theme: {
      breakpoints: {
        values: {
          xs: 0,
          sm: 660,
          md: 1024,
          lg: 1440,
          xl: 1920,
        },
      },
      palette: {
        common: {
          black: "#000000",
          white: "#FFFFFF",
        },
        primary: {
          dark: "#23A3EC",
          main: "#0F7B9F",
          light: "#DEEFF4",
          contrastText: "#FFFFFF",
        },
        secondary: {
          dark: "#C61869",
          main: "#E93586",
          light: "#FCE5F8",
          contrastText: "#FFFFFF",
        },
        error: {
          main: "#E40505",
          contrastText: "#FFFFFF",
        },
        success: {
          main: "#279E3B",
          contrastText: "#FFFFFF",
        },
        warning: {
          main: "#FF8900",
          contrastText: "#FFFFFF",
        },
        grey: {
          100: fade("#FFFFFF", 0.8),
          200: fade("#FFFFFF", 1),
          300: fade("#000000", 0.12),
          400: fade("#000000", 0.26),
          500: fade("#000000", 0.54),
          600: fade("#000000", 0.87),
        },
        text: {
          primary: fade("#000000", 0.87),
          secondary: fade("#000000", 0.54),
          disabled: fade("#000000", 0.26),
          hint: fade("#000000", 0.26),
        },
      },
      typography: {
        fontSize: 16,
        fontWeightBold: 700,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightLight: 300,
        h1: {
          fontSize: `${BaseTheme.spacing(24)}px`,
          fontWeight: 300,
          lineHeight: `${BaseTheme.spacing(30)}px`,
          letterSpacing: "-1.5px",
          [BaseTheme.breakpoints.down("sm")]: {
            fontSize: `${BaseTheme.spacing(24) * 0.8}px`,
            lineHeight: `${BaseTheme.spacing(30) * 0.8}px`,
          },
          [BaseTheme.breakpoints.down("xs")]: {
            fontSize: `${BaseTheme.spacing(24) * 0.6}px`,
            lineHeight: `${BaseTheme.spacing(30) * 0.6}px`,
          },
        },
        h2: {
          fontSize: `${BaseTheme.spacing(15)}px`,
          fontWeight: 300,
          lineHeight: `${BaseTheme.spacing(18)}px`,
          letterSpacing: "-0.5px",
          [BaseTheme.breakpoints.down("sm")]: {
            fontSize: `${BaseTheme.spacing(15) * 0.8}px`,
            lineHeight: `${BaseTheme.spacing(18) * 0.8}px`,
          },
          [BaseTheme.breakpoints.down("xs")]: {
            fontSize: `${BaseTheme.spacing(15) * 0.6}px`,
            lineHeight: `${BaseTheme.spacing(18) * 0.6}px`,
          },
        },
        h3: {
          fontSize: `${BaseTheme.spacing(12)}px`,
          fontWeight: 400,
          lineHeight: `${BaseTheme.spacing(15)}px`,
          letterSpacing: "0px",
          [BaseTheme.breakpoints.down("sm")]: {
            fontSize: `${BaseTheme.spacing(12) * 0.8}px`,
            lineHeight: `${BaseTheme.spacing(15) * 0.8}px`,
          },
          [BaseTheme.breakpoints.down("xs")]: {
            fontSize: `${BaseTheme.spacing(12) * 0.6}px`,
            lineHeight: `${BaseTheme.spacing(15) * 0.6}px`,
          },
        },
        h4: {
          fontSize: `${BaseTheme.spacing(8.5)}px`,
          fontWeight: 400,
          lineHeight: `${BaseTheme.spacing(11)}px`,
          letterSpacing: "0.25px",
          [BaseTheme.breakpoints.down("sm")]: {
            fontSize: `${BaseTheme.spacing(12) * 0.8}px`,
            lineHeight: `${BaseTheme.spacing(15) * 0.8}px`,
          },
          [BaseTheme.breakpoints.down("xs")]: {
            fontSize: `${BaseTheme.spacing(12) * 0.6}px`,
            lineHeight: `${BaseTheme.spacing(15) * 0.6}px`,
          },
        },
        h5: {
          fontSize: "24px",
          fontWeight: 400,
          lineHeight: "32px",
          letterSpacing: "0px",
        },
        h6: {
          fontSize: "20px",
          fontWeight: 500,
          lineHeight: "28px",
          letterSpacing: "0.15px",
        },
        subtitle1: {
          fontSize: "16px",
          fontWeight: 400,
          lineHeight: "20px",
          letterSpacing: "0.15px",
        },
        subtitle2: {
          fontSize: "14px",
          fontWeight: 500,
          lineHeight: "24px",
          letterSpacing: "0.1px",
        },
        body1: {
          fontSize: "16px",
          fontWeight: 400,
          lineHeight: "24px",
          letterSpacing: "0.5px",
        },
        body2: {
          fontSize: "14px",
          fontWeight: 400,
          lineHeight: "20px",
          letterSpacing: "0.25px",
        },
        button: {
          fontSize: "14px",
          fontWeight: 500,
          lineHeight: "20px",
          letterSpacing: "1.25px",
          textTransform: "uppercase",
        },
        caption: {
          fontSize: "12px",
          fontWeight: 400,
          lineHeight: "16px",
          letterSpacing: "0.4px",
        },
        overline: {
          fontSize: "12px",
          fontWeight: 400,
          lineHeight: "16px",
          letterSpacing: "0.5px",
          textTransform: "uppercase",
        },
      },
    },
    props: {
      MuiButtonBase: {
        disableRipple: true,
      },
      MuiInputLabel: {
        shrink: true,
      },
      MuiInput: {
        disableUnderline: true,
      },
      MuiContainer: {
        maxWidth: "lg",
      },
    },
  };
};

export const getExternalThemeOverrides: any = (fade: any, ReactTheme: any) => {
  return {
    overrides: {
      MuiInputBase: {
        styleOverrides: {
          input: {
            boxShadow: " 0 0 0 50px white inset;",
          },
          formControl: {
            opacity: 1,
            color: "grey",
          },
        },
      },
      MuiBackdrop: {
        styleOverrides: {
          root: {
            zIndex: 2,
          },
        },
      },
      MuiPopover: {
        styleOverrides: {
          paper: {
            boxShadow: " rgba(0, 0, 0, 0.16) 0px 0px 8px",
            borderRadius: "8px",
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            left: ReactTheme.spacing(-2),
            "& + .MuiInput-formControl": {
              marginTop: ReactTheme.spacing(0.5),
            },
          },
          formControl: {
            left: ReactTheme.spacing(-2),
          },
          outlined: {
            "&.MuiInputLabel-shrink": {
              transform: "translate(14px, 16px)",
              transition: "none !important",
            },
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            fontSize: ReactTheme.spacing(3),
          },
        },
      },
      MuiSvgIcon: {
        styleOverrides: {
          root: {
            fontSize: ReactTheme.spacing(3),
          },
        },
      },
      MuiAutocomplete: {
        styleOverrides: {
          inputRoot: {
            "& .MuiAutocomplete-input": {
              padding: "0px 4px !important",
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            "& .MuiAutocomplete-input": {
              padding: "0px 4px !important",
            },
            height: "35px",
            width: "70%",
          },
          notchedOutline: {
            "& span": {
              display: "none !important",
            },
          },
          input: {
            boxSizing: "border-box",
          },
        },
      },
      MuiFormControl: {
        styleOverrides: {
          root: {
            "&.MuiTextField-root": {
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            },
          },
        },
      },
      MuiFormControlLabel: {
        styleOverrides: {
          label: {
            fontSize: ReactTheme.typography.body2.fontSize,
          },
        },
      },
      MuiRadio: {
        styleOverrides: {
          root: {
            "& .MuiSvgIcon-root": {
              fontSize: ReactTheme.spacing(3),
            },
          },
        },
      },
      MuiCheckbox: {
        styleOverrides: {
          root: {
            "& .MuiSvgIcon-root": {
              fontSize: ReactTheme.spacing(3),
            },
          },
          indeterminate: {
            color: ReactTheme.palette.primary.main,
          },
        },
      },
      MuiSwitch: {
        styleOverrides: {
          switchBase: {
            color: "#B2B2B2",
            "& + .MuiSwitch-track": {
              backgroundColor: ReactTheme.palette.grey[300],
            },
          },
          track: {
            width: ReactTheme.spacing(4),
          },
          colorPrimary: {
            "&.Mui-checked": {
              "& + .MuiSwitch-track": {
                backgroundColor: ReactTheme.palette.primary.light,
              },
            },
          },
        },
      },
      MuiStep: {
        styleOverrides: {
          horizontal: {
            paddingTop: ReactTheme.spacing(1.5),
            paddingBottom: ReactTheme.spacing(2),
            "&:hover": {
              backgroundColor: fade(ReactTheme.palette.common.black, 0.04),
            },
          },
          completed: {
            "&:hover": {
              backgroundColor: fade(ReactTheme.palette.common.black, 0.04),
            },
          },
        },
      },
      MuiStepIcon: {
        styleOverrides: {
          root: {
            width: ReactTheme.spacing(3.5),
            height: ReactTheme.spacing(3.5),
            borderRadius: "100%",
            border: `2px solid ${ReactTheme.palette.grey[400]}`,
            "& circle": {
              fill: ReactTheme.palette.common.white,
            },
            "& text": {
              transform: "translateY(2px)",
              fill: ReactTheme.palette.text.disabled,
              fontSize: ReactTheme.typography.body1.fontSize,
            },
            "&.MuiStepIcon-active": {
              border: `2px solid ${ReactTheme.palette.success.main}`,
              "& text": {
                transform: "translateY(2px)",
                fill: ReactTheme.palette.success.main,
              },
            },
            "&.MuiStepIcon-completed": {
              width: ReactTheme.spacing(3.5),
              height: ReactTheme.spacing(3.5),
              border: "none",
              color: ReactTheme.palette.success.main,
            },
          },
        },
      },
      MuiStepLabel: {
        styleOverrides: {
          label: {
            color: ReactTheme.palette.text.secondary,
            "&.MuiStepLabel-alternativeLabel": {
              marginTop: ReactTheme.spacing(1),
            },
            "&.MuiStepLabel-active": {
              color: ReactTheme.palette.success.main,
            },
            "&.MuiStepLabel-completed": {
              color: ReactTheme.palette.success.main,
            },
          },
        },
      },
      MuiStepConnector: {
        styleOverrides: {
          alternativeLabel: {
            top: ReactTheme.spacing(3),
            left: "calc(-50% + 12px)",
            right: "calc(50% + 12px)",
          },
          lineHorizontal: {
            borderTopWidth: 2,
            borderTopColor: fade(ReactTheme.palette.common.black, 0.12),
          },
          vertical: {
            padding: ReactTheme.spacing(1, 0),
            marginLeft: 14,
          },
          lineVertical: {
            borderLeftWidth: 2,
            borderLeftColor: fade(ReactTheme.palette.common.black, 0.12),
          },
        },
      },
      MuiTabs: {
        styleOverrides: {
          root: {
            backgroundColor: ReactTheme.palette.primary.light,
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            padding: ReactTheme.spacing(2.25, 2),
            fontSize: ReactTheme.typography.body2.fontSize,
          },
          textColorPrimary: {
            fontWeight: 400,
            color: ReactTheme.palette.text.primary,
            "&:hover": {
              backgroundColor: fade(ReactTheme.palette.primary.main, 0.08),
            },
            "&.Mui-focusVisible": {
              backgroundColor: fade(ReactTheme.palette.primary.main, 0.04),
            },
            "&.Mui-selected": {
              fontWeight: 500,
              color: ReactTheme.palette.text.primary,
            },
          },
          textColorSecondary: {
            fontWeight: 400,
            color: ReactTheme.palette.text.primary,
            "&:hover": {
              backgroundColor: ReactTheme.palette.secondary.light,
            },
            "&.Mui-focusVisible": {
              backgroundColor: fade(ReactTheme.palette.secondary.main, 0.7),
            },
            "&.Mui-selected": {
              fontWeight: 500,
              color: ReactTheme.palette.text.primary,
            },
          },
        },
      },
      MuiLinearProgress: {
        styleOverrides: {
          colorPrimary: {
            backgroundColor: ReactTheme.palette.primary.light,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            cursor: "pointer",
            borderRadius: ReactTheme.spacing(2.25),
            boxShadow: `0 0 16px ${fade(
              ReactTheme.palette.common.black,
              0.12
            )}`,
            "&:hover": {
              backgroundColor: "#F4F4F4",
              transition: ReactTheme.transitions.create(["background-color"], {
                duration: ReactTheme.transitions.duration.standard,
              }),
            },
          },
        },
      },
      MuiCardHeader: {
        styleOverrides: {
          root: {
            margin: 0,
            paddingLeft: ReactTheme.spacing(3),
            paddingRight: ReactTheme.spacing(3),
          },
          title: {
            fontSize: ReactTheme.typography.h6.fontSize,
            color: ReactTheme.palette.primary.main,
          },
          action: {
            alignSelf: "center",
            "& .MuiSvgIcon-root": {
              color: ReactTheme.palette.common.black,
            },
          },
        },
      },
      MuiCardContent: {
        styleOverrides: {
          root: {
            padding: ReactTheme.spacing(2, 3),
            minHeight: 40,
            overflow: "auto",
          },
        },
      },
      MuiToolbar: {
        styleOverrides: {
          root: {
            borderRadius: ReactTheme.spacing(2.75),
            boxShadow: `0 0px 6px ${fade(
              ReactTheme.palette.common.black,
              0.12
            )}`,
            display: "flex",
            justifyContent: "space-between",
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            display: "flex",
            alignItems: "flex-start !important",
            "& .MuiInputLabel-root": {
              position: "relative",
              textTransform: "uppercase",
              paddingLeft: ReactTheme.spacing(0.5),
              fontSize: ReactTheme.typography.caption.fontSize,
              "&.Mui-focused": {
                transition: ReactTheme.transitions.create(["color"], {
                  duration: ReactTheme.transitions.duration.standard,
                }),
              },
            },
            "& .MuiInputLabel-filled": {
              paddingBottom: 14,
              paddingLeft: ReactTheme.spacing(0.5),
            },
          },
        },
      },
      MuiFormHelperText: {
        styleOverrides: {
          root: {
            paddingLeft: ReactTheme.spacing(0),
            "&.Mui-focused": {
              color: ReactTheme.palette.primary.main,
              "&.Mui-error": {
                color: ReactTheme.palette.error.main,
              },
            },
          },
          contained: {
            marginLeft: 0,
            marginRight: 0,
          },
        },
      },
      MuiFormLabel: {
        styleOverrides: {
          root: {
            "&.Mui-focused": {
              color: ReactTheme.palette.primary.main,
              "&.Mui-error": {
                color: ReactTheme.palette.error.main,
              },
            },
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            borderRadius: 18,
            boxShadow: `0 0px 16px ${fade(
              ReactTheme.palette.common.black,
              0.12
            )}`,
            "&.MuiDialog-table": {
              paddingBottom: 0,
              "& .MuiTableContainer-root": {
                borderRadius: 0,
                "& .MuiToolbar-root": {
                  borderRadius: 0,
                  paddingRight: ReactTheme.spacing(1),
                },
              },
            },
          },
          paperWidthXs: {
            maxWidth: ReactTheme.spacing(64),
          },
        },
      },
      MuiDialogTitle: {
        styleOverrides: {
          root: {
            padding: ReactTheme.spacing(2.5, 3),
            color: ReactTheme.palette.primary.main,
          },
        },
      },
      MuiDialogContent: {
        styleOverrides: {
          root: {
            padding: ReactTheme.spacing(1.5, 3),
            "&.MuiDialogContent-noSpacing": {
              padding: 0,
            },
          },
          dividers: {
            padding: ReactTheme.spacing(3),
          },
        },
      },
      MuiDialogActions: {
        styleOverrides: {
          root: {
            padding: ReactTheme.spacing(1.5, 3),
            "& .MuiButton-outlined": {
              marginRight: ReactTheme.spacing(2),
            },
          },
        },
      },
      MuiSnackbar: {
        styleOverrides: {
          root: {
            width: "100%",
            maxWidth: 560,
          },
        },
      },
      MuiPickersToolbarButton: {
        styleOverrides: {
          toolbarBtn: {
            padding: "unset",
            color: ReactTheme.palette.common.white,
            "& .MuiPickersToolbarText-toolbarTxt": {
              lineHeight: "28px",
              color: ReactTheme.palette.common.white,
              fontSize: ReactTheme.typography.h6.fontSize,
            },
          },
        },
      },
      MuiPickersModal: {
        styleOverrides: {
          dialogRoot: {
            paddingTop: 0,
            paddingBottom: 0,
            "& .MuiDialogActions-root": {
              "& .MuiButtonBase-root": {
                color: ReactTheme.palette.primary.main,
              },
            },
          },
        },
      },
      MuiPickersToolbar: {
        styleOverrides: {
          toolbar: {
            borderRadius: 0,
            backgroundColor: ReactTheme.palette.primary.main,
          },
        },
      },
      MuiPickersDay: {
        styleOverrides: {
          current: {
            color: ReactTheme.palette.primary.main,
          },
          daySelected: {
            backgroundColor: ReactTheme.palette.primary.main,
            "&:hover": {
              backgroundColor: fade(ReactTheme.palette.primary.main, 0.8),
            },
            "&:focus": {
              backgroundColor: fade(ReactTheme.palette.primary.main, 0.7),
            },
          },
        },
      },
      MuiPickersYear: {
        styleOverrides: {
          root: {
            "&:focus": {
              color: ReactTheme.palette.primary.main,
            },
          },
          yearSelected: {
            color: ReactTheme.palette.primary.main,
            "&:hover": {
              color: fade(ReactTheme.palette.primary.main, 0.8),
            },
            "&:focus": {
              color: fade(ReactTheme.palette.primary.main, 0.7),
            },
          },
        },
      },
    },
  };
};

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
  const ReactTheme = createTheme(reactThemeData.theme);

  const reactThemeOverridesData = getReactThemeOverrides(alpha, ReactTheme);
  ReactTheme.components = reactThemeOverridesData.overrides;

  return ReactTheme;
};

export default initTheme;
