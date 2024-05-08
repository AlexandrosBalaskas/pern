import React, { useEffect } from "react";
import {
  AppBar,
  Box,
  ButtonBase,
  Grid,
  Theme,
  Toolbar,
  Tooltip,
} from "@mui/material";
import { useKeycloak } from "@react-keycloak/web";

import { makeStyles } from "@mui/styles";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme: Theme) => ({
  logoButton: {
    border: `2px transparent solid`,
    "&:hover, &:focus": {
      backgroundColor: theme.palette.secondary.light,
      border: `2px ${theme.palette.common.black} solid`,
      borderRadius: "8px",
    },
  },
}));

export interface HeaderBarProps {
  logo?: any;
  onClickLogo: () => void;
  headerActions?: React.ReactNode;
}

const Header: React.FC<HeaderBarProps> = ({
  logo,
  onClickLogo,
  headerActions,
}) => {
  const { t: translate } = useTranslation("common");
  //   const { loadUserSuccess, loadUserFail } = useUser();
  //   const { keycloak } = useKeycloak();
  const styles = useStyles();

  //   useEffect(() => {
  //     keycloak
  //       .loadUserProfile()
  //       .then((user) => {
  //         loadUserSuccess({ ...user, partyRoleId: keycloak?.tokenParsed?.partyRoleId });
  //       })
  //       .catch((error) => loadUserFail(error));
  //   }, [keycloak, loadUserFail, loadUserSuccess]);

  return (
    <AppBar color="secondary" elevation={0}>
      <Toolbar>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item xs="auto">
            <Grid container spacing={1} alignItems="center">
              <Grid item xs="auto">
                <Tooltip title={translate("logoAriaLabel")}>
                  <ButtonBase
                    className={styles.logoButton}
                    onClick={() => onClickLogo()}
                  >
                    <img
                      style={{ height: 60 }}
                      src={logo}
                      alt={translate("logoAlt")}
                      aria-label={translate("logoAriaLabel")}
                      aria-description={translate("logoAriaDescription")}
                    />
                  </ButtonBase>
                </Tooltip>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs="auto">
            <Box display="flex" alignItems="center" justifyContent="flex-end">
              {headerActions}
            </Box>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
