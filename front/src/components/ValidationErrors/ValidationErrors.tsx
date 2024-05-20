import React from "react";
import { Box, Theme, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTranslation } from "react-i18next";

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

const ValidationErrors = ({
  clientErrors,
  dirty,
}: {
  clientErrors: Array<string>;
  dirty: boolean;
}) => {
  const styles = useStyles();
  const { t: translate } = useTranslation("common");

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
            {error}
          </Typography>
        ))}
      </Box>
    );
  }
  return null;
};

export default ValidationErrors;
