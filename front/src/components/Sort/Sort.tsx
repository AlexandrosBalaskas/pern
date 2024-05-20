import React from "react";
import classNames from "classnames";
import { makeStyles } from "@mui/styles";
import { Button, Theme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Assets } from "../Assets/Assets";

const sortIconsDistance = 12;

const useStyles = makeStyles((theme: Theme) => ({
  sortButtonContainer: {
    marginLeft: theme.spacing(1),
  },
  sortButton: {
    padding: 0,
    border: `2px transparent solid`,
    "&:hover, &:focus": {
      background: theme.palette.primary.light,
      borderRadius: "8px",
    },
  },
  sortButtonIcons: {
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "column",
    alignItems: "center",
    marginTop: `-${sortIconsDistance}px`,
  },
  sortButtonActive: {
    marginBottom: `-${sortIconsDistance}px`,
  },
  sortButtonInactive: {
    marginBottom: `-${sortIconsDistance}px`,
    color: theme.palette.action.disabled,
  },
  rightAlignment: {
    marginRight: "-8px",
  },
  headerContainer: { display: "flex", flexDirection: "row" },
}));

function SortButton({ header }: { header: any }) {
  const styles = useStyles();
  const { t: translate } = useTranslation("common");
  return (
    <div className={styles.sortButtonContainer}>
      <Button
        aria-label={translate("sortButtonAriaLabel")}
        aria-description={translate("sortButtonAriaDescription")}
        key={`sort-button-${header.getContext()}`}
        onClick={header.column.getToggleSortingHandler()}
        className={classNames({
          [styles.sortButton]: true,
        })}
      >
        <div className={styles.sortButtonIcons}>
          <Assets
            input="icons"
            name="ArrowDropUp"
            props={{
              fontSize: "small",
              className:
                header.column.getIsSorted() === "asc"
                  ? styles.sortButtonActive
                  : styles.sortButtonInactive,
            }}
          />
          <Assets
            input="icons"
            name="ArrowDropDown"
            props={{
              fontSize: "small",
              className:
                header.column.getIsSorted() === "desc"
                  ? styles.sortButtonActive
                  : styles.sortButtonInactive,
            }}
          />
        </div>
      </Button>
    </div>
  );
}

export default SortButton;
