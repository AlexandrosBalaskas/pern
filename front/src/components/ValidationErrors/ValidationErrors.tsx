import React from "react";
import { Box, Theme, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTranslation } from "react-i18next";
import { isArray } from "lodash";

const useStyles = makeStyles((theme: Theme) => ({
  text: {
    color: theme.palette.error.main,
    display: "block",
    marginBottom: theme.spacing(1),
  },
  textCompare: {
    color: theme.palette.info.main,
    display: "block",
    marginBottom: theme.spacing(1),
  },
}));

const getTranslationParts = (text: any) => {
  if (text.indexOf("#") < 0 && !isArray(text)) {
    return { msg: text };
  }

  const finalText = isArray(text) ? text[0] : text;
  const parts = finalText.split("#");

  try {
    return {
      msg: parts[0],
      options: JSON.parse(parts[1]),
    };
  } catch {
    return {
      msg: parts[0],
      options: {},
    };
  }
};

const ValidationErrors = ({
  clientErrors,
  dirty,
}: {
  clientErrors: Array<string>;
  dirty: boolean;
}) => {
  const styles = useStyles();
  const { t: translate } = useTranslation("common");

  const getValidationMessage = (error: any) => {
    console.log(error);
    // Avoid translating errors that contain the character : because translation message breaks
    if (error?.indexOf(":")) {
      return error;
    }

    const parts = getTranslationParts(error);

    console.log(parts.msg, "msg", parts.options, "options");

    return translate(parts.msg, parts.options);
  };

  if (clientErrors && clientErrors.length > 0 && dirty) {
    return (
      <Box>
        {clientErrors.map((error: any, index: number) => (
          <Typography
            key={index}
            variant="caption"
            className={styles.text}
            id="fieldError"
            aria-label={translate("validationErrorAriaLabel")}
            aria-description={translate("validationErrorAriaDescription")}
          >
            {translate(error)}
          </Typography>
        ))}
      </Box>
    );
  }
  return null;
};

export default ValidationErrors;
