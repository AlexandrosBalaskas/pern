import React, { useMemo, useCallback, useState } from "react";
import { Theme, Typography } from "@mui/material";
import { ActionButtonProps } from "./ActionButton.d";
import { useNavigate } from "react-router-dom";
import { Assets } from "../Assets/Assets";
import ConfirmationDialog from "../ConfirmationDialog/ConfirmationDialog";
import api from "../../axiosConfig";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme: Theme) => ({
  icon: { marginRight: 16, fontSize: 10 },
  menuItem: {
    "&:hover": {},
    cursor: "pointer",
    alignItems: "center",
    display: "flex",
    justifyContent: "flex-start",
  },
}));

const ActionButton = ({ id, action, onCall, pageId }: ActionButtonProps) => {
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

  const onButtonClick = () => {
    if (confirm || warningOnClick) {
      setOpenModal(true);
    } else if (type === "redirect") {
      navigate(`/page/${pageId}/${id}`);
    }
  };

  const onSubmit = () => {
    api.delete(`${pageId}/${id}`).then((res) => {
      onCall && onCall();
    });
  };

  const onClose = useCallback(() => setOpenModal(false), []);

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
            <Typography id={`${action.title}-action-btn`}>{title}</Typography>
          )}
        </div>
      )}
      {showConfirmation && (
        <ConfirmationDialog
          open={openModal}
          onClose={onClose}
          title={"confirm"}
          message={"confirmationActionMessage"}
          choices={[
            { label: "cancel", variant: "outlined" },
            {
              label: "confirm",
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
