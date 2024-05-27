import { useMemo } from "react";
import { Box, Divider, Drawer, Theme, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import useDrawer from "../../store/drawer/useDrawer";
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
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    position: "absolute",
    zIndex: 9999,
    backgroundColor: theme.palette.common.white,
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  content: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(9),
  },
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
  const { t: translate } = useTranslation(["common", "accessibility"]);

  const { open, closeDrawer } = useDrawer(drawerId);

  const isPersistent = useMemo(() => {
    return variant === "persistent";
  }, [variant]);

  return (
    <Drawer
      open={open}
      onClose={onClose}
      anchor="right"
      variant={variant}
      ModalProps={{
        keepMounted: !isPersistent,
      }}
    >
      <Box
        className={styles.container}
        style={{ minWidth: "35vw", maxWidth: "45vw" }}
      >
        <Box className={styles.header}>
          <Typography variant="h6" color="primary">
            {translate(title)}
          </Typography>
          <AppIconButton
            id={closeButtonId}
            label={translate("close")}
            onClick={() => {
              closeDrawer();
              onClose && onClose();
            }}
            icon={
              <Assets
                input="icons"
                name="Close"
                props={{ className: "primary" }}
              />
            }
          />
        </Box>
        <Divider />
        <Box className={styles.content}>{children}</Box>
      </Box>
    </Drawer>
  );
};

export default QuickDrawer;
