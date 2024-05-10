import React, { useEffect } from "react";
import "./App.css";
import api from "./axiosConfig";
import AppRoutes from "./components/AppRoutes";

function App() {
  const addme = () => {
    api({
      method: "post", //you can set what request you want to be
      url: "/accounts",
      data: {
        accountName: "asafdfs",
        website: "six stree5t",
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const setupone = () => {
    api.get("/setup").then((response) => {
      return response;
    });
  };

  const schools = () => {
    api({
      method: "get", //you can set what request you want to be
      url: "/accounts",
      params: { filters: "" },
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      return response;
    });
  };

  return (
    <div className="App">
      <button onClick={addme}>ADD</button>
      <button onClick={schools}>SCHOOLS</button>
      <button onClick={setupone}>SETUP</button>
      <AppRoutes></AppRoutes>
    </div>
  );
}

export default App;
