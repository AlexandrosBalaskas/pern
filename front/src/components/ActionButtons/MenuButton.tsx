import React, { useState } from "react";
import { Menu, Theme, PopoverOrigin } from "@mui/material";
import { makeStyles } from "@mui/styles";
import AppIconButton from "../AppIconButton/AppIconButton";
import { Assets } from "../Assets/Assets";
import ActionButton from "./ActionButton";

const useStyles = makeStyles((theme: Theme) => ({
  menu: {
    "& .MuiList-padding": {
      paddingTop: 0,
      paddingBottom: 0,
    },
    "& .MuiListItem-button": {
      "&:hover": {},
      "& .MuiListItemIcon-root": {},
    },
  },
}));

const anchorOrigin = {
  vertical: "center",
  horizontal: "right",
} as PopoverOrigin;

const transformOrigin = {
  vertical: "center",
  horizontal: "left",
} as PopoverOrigin;

export default function MenuActionButton({
  id,
  index,
  actions,
  onCall,
  pageId,
}: any) {
  const styles = useStyles();

  const [anchor, setAnchor] = useState(null);

  const onMenuClick = (e: any) => {
    setAnchor(e.currentTarget);
  };

  return (
    <>
      <AppIconButton
        id={`${id}-menuButton-${index}`}
        label={"menuButton"}
        onClick={onMenuClick}
        icon={<Assets input="icons" name="MoreVert" />}
      />
      <Menu
        anchorEl={anchor}
        elevation={0}
        className={styles.menu}
        keepMounted
        open={!!anchor}
        onClose={() => setAnchor(null)}
        onClick={() => setAnchor(null)}
        anchorOrigin={anchorOrigin}
        transformOrigin={transformOrigin}
      >
        {actions?.map((action: any, index: any) => (
          <ActionButton
            key={`${action.title}-${index}-${
              action?.source?.id ||
              action?.source?.code ||
              action?.source?.notificationId
            } || 'default'`}
            id={id}
            action={action}
            onCall={onCall}
            pageId={pageId}
          />
        ))}
      </Menu>
    </>
  );
}