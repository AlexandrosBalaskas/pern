import React, { useState } from "react";
import { MoreVert } from "@mui/icons-material";
import {
  Menu,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Theme,
  alpha,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import AppIconButton from "../AppIconButton/AppIconButton";

const useStyles = makeStyles((theme: Theme) => ({
  menu: {
    "& .MuiListItem-button": {
      "&:hover": {
        backgroundColor: theme.palette.primary.light,
      },
      "& .MuiListItemIcon-root": {
        color: theme.palette.common.black,
      },
    },
  },
  menuPaper: {
    borderRadius: "8px",
    boxShadow: `0 0 8px ${alpha(theme.palette.common.black, 0.16)}`,
  },
  menuPaperTransparent: {
    backgroundColor: alpha(theme.palette.common.white, 0.64),
    "& .MuiListItem-button": {
      "&:hover": {
        backgroundColor: alpha(theme.palette.primary.light, 0.36),
      },
    },
  },
  avatarButton: {
    "&:hover,&:focus,&:active": {
      backgroundColor: theme.palette.secondary.light,
    },
  },
}));

export interface PopoverMenuProps {
  dataTestId: string;
  icon?: JSX.Element;
  isTransparent: boolean;
  label?: string;
  ariaLabel?: string;
  ariaDescription?: string;
  actions?: Array<{
    id: string;
    icon?: JSX.Element;
    label?: string;
    onClick: (actionId: string) => void;
  }>;
}

const PopoverMenu: React.FC<PopoverMenuProps> = ({
  dataTestId,
  icon = <MoreVert />,
  label,
  ariaLabel = "",
  ariaDescription = "",
  isTransparent,
  actions,
}) => {
  const styles = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const { t: translate } = useTranslation("common");

  const handleClick = (e: any) => {
    setAnchorEl(e.currentTarget);
  };

  return (
    <>
      <AppIconButton
        id={dataTestId}
        label={label || translate("popoverMenu")}
        onClick={handleClick}
        icon={icon}
        className={styles.avatarButton}
      />
      <Menu
        elevation={0}
        className={styles.menu}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: "center",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "left",
        }}
      >
        {actions &&
          actions
            .filter((action) => !!action)
            .map((action) => (
              <MenuItem
                id={`menu-action-${dataTestId}-${action?.id?.toUpperCase()}`}
                key={action.label}
                onClick={() => {
                  setAnchorEl(null);
                  action.onClick(action.id);
                }}
              >
                {action.icon && <ListItemIcon>{action.icon}</ListItemIcon>}
                <ListItemText primary={action.label} />
              </MenuItem>
            ))}
      </Menu>
    </>
  );
};

export default PopoverMenu;
