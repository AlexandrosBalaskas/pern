import { useMemo } from "react";
import { Box, Divider, Drawer, Theme, Typography } from "@mui/material";
import AppIconButton from "../AppIconButton/AppIconButton";
import { Assets } from "../Assets/Assets";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    overflowY: "auto",
    overflowX: "hidden",
    "&:hover": {
      cursor: "default",
    },
  },
  header: {
    width: "100%",
    height: 64,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    position: "absolute",
    zIndex: 9999,
  },
  content: {},
}));

const QuickDrawer = ({
  drawerId,
  onClose,
  children,
  closeButtonId,
  title,
  variant,
}: {
  drawerId: string;
  onClose?: () => void;
  children: Array<JSX.Element> | JSX.Element | null;
  closeButtonId: string;
  title: string;
  variant?: "persistent" | "permanent" | "temporary" | undefined;
}) => {
  const styles = useStyles();

  const isPersistent = useMemo(() => {
    return variant === "persistent";
  }, [variant]);

  return <></>;
};

export default QuickDrawer;
