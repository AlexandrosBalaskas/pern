import { useMemo, useCallback, useState } from "react";
import { Theme, Typography } from "@mui/material";
import { ActionButtonProps } from "./ActionButton.d";
import { useNavigate } from "react-router-dom";
import { Assets } from "../Assets/Assets";
import { useTranslation } from "react-i18next";
import ConfirmationDialog from "../ConfirmationDialog/ConfirmationDialog";
import { makeStyles } from "@mui/styles";
import useTable from "../../store/table/useTable";
import { useKeycloak } from "@react-keycloak/web";

const useStyles = makeStyles((theme: Theme) => ({
  icon: { marginRight: 16, fontSize: 10 },
  menuItem: {
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
    },
    padding: theme.spacing(1, 2),
    cursor: "pointer",
    alignItems: "center",
    display: "flex",
    justifyContent: "flex-start",
  },
}));

const ActionButton = ({
  id,
  action,
  pageId,
  setSnackbarOpen,
}: ActionButtonProps) => {
  const styles = useStyles();
  const {
    style = "button",
    icon,
    disabled = false,
    confirm = false,
    type,
    warningOnClick,
    isIcon = false,
    customStyles,
    title,
  } = action;
  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);
  const { keycloak } = useKeycloak();

  const { deleteRow } = useTable(pageId);

  const onButtonClick = () => {
    if (confirm || warningOnClick) {
      setOpenModal(true);
    } else if (type === "redirect") {
      navigate(`/page/${pageId}/${id}`);
    }
  };

  const onSubmit = useCallback(() => {
    if (
      keycloak.hasRealmRole("hasDeleteRole") ||
      pageId === "priceBooks" ||
      pageId === "quickTexts"
    ) {
      deleteRow(id);
    } else {
      setSnackbarOpen && setSnackbarOpen(true);
    }
  }, [id, setSnackbarOpen, pageId]);

  const onClose = useCallback(() => setOpenModal(false), []);

  const { t: translate } = useTranslation(["common", "accessibility"]);

  const isMenu = useMemo(() => {
    return style === "menu";
  }, [style]);

  const isSimple = useMemo(() => {
    return style === "simple";
  }, [style]);

  const isGroup = useMemo(() => {
    return style === "inner-menu";
  }, [style]);

  const defaultIcon = useMemo(() => {
    if (icon === "DELETE") {
      return <Assets input="icons" name="Delete" />;
    }
    if (icon === "EDIT") {
      return <Assets input="icons" name="Edit" />;
    }
    if (icon === "VIEW") {
      return <Assets input="icons" name="Visibility" />;
    }
    return <Assets input="icons" name={icon || ""} />;
  }, [icon]);

  const showConfirmation = useMemo(() => {
    return confirm;
  }, [confirm]);

  return (
    <>
      {(isMenu || isSimple) && !isGroup && !isIcon && (
        <div
          className={styles.menuItem}
          onClick={disabled ? () => 0 : onButtonClick}
          id={`menu-action-${id}-${action?.title?.toUpperCase()}`}
          style={customStyles}
        >
          {icon && <div className={styles.icon}>{defaultIcon}</div>}
          {title && (
            <Typography id={`${action.title}-action-btn`}>
              {translate(title)}
            </Typography>
          )}
        </div>
      )}
      {showConfirmation && (
        <ConfirmationDialog
          open={openModal}
          onClose={onClose}
          title={translate("confirm")}
          message={translate("confirmationActionMessage")}
          choices={[
            { label: translate("cancel"), variant: "outlined" },
            {
              label: translate("confirm"),
              variant: "contained",
              action: onSubmit,
            },
          ]}
        />
      )}
    </>
  );
};

export default ActionButton;
