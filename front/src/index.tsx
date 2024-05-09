import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import { DEFAULT_TRANSLATIONS } from "./translations";
import initTheme, {
  getExternalBasicTheme,
  getExternalTheme,
  getExternalThemeOverrides,
} from "./themes/theme";
import { ThemeProvider } from "@mui/material";
i18next.init({
  interpolation: { escapeValue: false }, // React already does escaping
  lng: "en",
  resources: {
    en: DEFAULT_TRANSLATIONS, // 'common' is our custom namespace
  },
});

const theme: any = initTheme(
  getExternalBasicTheme,
  getExternalTheme,
  getExternalThemeOverrides
);
console.log(theme, "theme");
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

// const keycloakProviderInitOptions = {
//   onLoad: "login-required",
//   checkLoginIframe: false,
//   pkceMethod: "S256",
// };
root.render(
  <Router>
    {/* <ReactKeycloakProvider
      authClient={keycloak}
      initOptions={keycloakProviderInitOptions}
      autoRefreshToken={false}
    > */}
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <I18nextProvider i18n={i18next}>
          <App />
        </I18nextProvider>
      </ThemeProvider>
    </Provider>
    {/* </ReactKeycloakProvider> */}
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
