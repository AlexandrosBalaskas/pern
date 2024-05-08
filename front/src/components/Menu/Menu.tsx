import React from "react";
import { Menu as MUIMenu, MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";
import AppIconButton from "../AppIconButton/AppIconButton";
import { Assets } from "../Assets/Assets";

type MenuProps = {
  styles?: any;
  children: JSX.Element[] | JSX.Element;
  id?: string;
};

export default function Menu({
  children,
  styles,
  id = "defaultMenu",
}: MenuProps) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { t: translate } = useTranslation(["accessibility", "common"]);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuItems = React.Children.map(children, (child, index) => {
    if (!child) {
      return null;
    }

    return <MenuItem key={index}>{child}</MenuItem>;
  });

  return (
    <div style={styles}>
      <AppIconButton
        id={"add-menu-btn"}
        label={translate("addForm")}
        onClick={handleClick}
        icon={<Assets input="icons" name="MoreVert" />}
      />
      <MUIMenu
        id={id}
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
      >
        {menuItems}
      </MUIMenu>
    </div>
  );
}
