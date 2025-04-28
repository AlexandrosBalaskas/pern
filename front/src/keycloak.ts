import Keycloak from "keycloak-js";

import { AxiosRequestConfig } from "axios";

// Access Token Lifespan minValidity in seconds
const minValidity = 5;

// Setup Keycloak instance as needed
// Pass initialization options as required or leave blank to load from 'keycloak.json'
const keycloak = new Keycloak({
  url: "https://alexanderbalaskas.site:8443/",
  realm: "master",
  clientId: "react-client",
});

const doLogin = keycloak.login;

const doLogout = keycloak.logout;

const getToken = () => keycloak.token;

const hasDeleteRole = () => keycloak.hasRealmRole("hasDeleteRole");

const isAuthenticated = () => !!keycloak.token;

// @ts-ignore
const getUsername = () => keycloak.tokenParsed?.preferred_username;

export {
  doLogin,
  doLogout,
  getToken,
  isAuthenticated,
  getUsername,
  hasDeleteRole,
};
export default keycloak;
