import React from "react";
import { useKeycloak } from "@react-keycloak/web";
import { useTranslation } from "react-i18next";
import AppIconButton from "../AppIconButton/AppIconButton";
import { Assets } from "../Assets/Assets";

const Logout = () => {
  // const { keycloak } = useKeycloak();
  const { t: translate } = useTranslation(["accessibility", "common"]);

  return (
    <AppIconButton
      id="logout-btn"
      label={translate("logout")}
      onClick={() => {
        // keycloak.logout();
      }}
      size="medium"
      icon={<Assets input="icons" name="ExitToApp" />}
    />
  );
};

export default Logout;
