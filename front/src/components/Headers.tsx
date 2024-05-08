import React from "react";
import PopoverMenu from "./Popover/Menu";
import { Avatar, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTranslation } from "react-i18next";
import { Assets } from "./Assets/Assets";

const useStyles = makeStyles((theme: Theme) => ({
  container: { position: "relative", right: "25px" },
}));

function Headers() {
  const styles = useStyles();
  const { t: translate } = useTranslation("common");
  const actions = [
    {
      id: "Logout",
      icon: <Assets input="icons" name="ExitToApp" />,
      label: "Logout",
      onClick: () => {},
      // keycloak.logout(),
    },
  ];
  return (
    <header
      id="header"
      className="header fixed-top d-flex align-items-center"
      style={{
        boxShadow: "0 3px 6px rgba(0, 0, 0, 0.16)",
        height: "64px",
        width: "100%",
        justifyContent: "space-between",
        display: "flex",
      }}
    >
      <div></div>
      <div className={styles.container}>
        <PopoverMenu
          dataTestId={"profile-menu-IRM"}
          isTransparent={false}
          icon={<Assets input="icons" name="ExitToApp" />}
          actions={actions}
          label={translate("profilePicture")}
          ariaLabel={translate("profilePicture")}
          ariaDescription={translate("profilePictureAriaDescription")}
        />
      </div>
    </header>
  );
}

export default Headers;
