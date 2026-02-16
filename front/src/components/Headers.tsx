import React, { useEffect, useState } from "react";
import PopoverMenu from "./Popover/Menu";
import { Avatar, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTranslation } from "react-i18next";
import { Assets } from "./Assets/Assets";
import { deepOrange } from "@mui/material/colors";
import GenericSelect from "./AutoComplete/Select";
// import { doLogout } from "../keycloak";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    position: "relative",
    right: "25px",
    display: "flex",
    flexDirection: "row",
  },
  selectContainer: {
    position: "relative",
    top: "5px",
    left: "50px",
    "& .MuiOutlinedInput-notchedOutline": {
      width: "150px",
      height: "47px",
    },
    "& .MuiAutocomplete-input": { minWidth: "150px !important" },
  },
}));

function Headers() {
  const styles = useStyles();
  const { t: translate, i18n } = useTranslation("common");
  const [language, setLanguage] = useState("en");
  const items = [
    { code: "en", label: "English" },
    { code: "ger", label: "German" },
  ];
  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);
  const actions = [
    {
      id: "Logout",
      icon: <Assets input="icons" name="ExitToApp" />,
      label: `${translate("logout")}`,
      onClick: () => {
        // doLogout();
      },
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
        alignItems: "center",
      }}
    >
      <div></div>
      <div className={styles.container}>
        <GenericSelect
          id={"select-language"}
          value={language}
          className={styles.selectContainer}
          onChange={(e: any) => setLanguage(e.target.value)}
          options={items}
        />
        <PopoverMenu
          dataTestId={"profile-menu-IRM"}
          isTransparent={false}
          icon={<Avatar sx={{ bgcolor: deepOrange[500] }}>A</Avatar>}
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
