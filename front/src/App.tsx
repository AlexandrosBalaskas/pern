import React, { useEffect } from "react";
import "./App.css";
import api from "./axiosConfig";

function App() {
  const addme = () => {
    api({
      method: "post", //you can set what request you want to be
      url: "/schools",
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
      console.log(response);
      return response;
    });
  };

  const schools = () => {
    api({
      method: "get", //you can set what request you want to be
      url: "/schools",
      params: { filters: "" },
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      console.log(response);
      return response;
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img className="App-logo" alt="logo" />
        <button onClick={addme}>ADD</button>
        <button onClick={schools}>SCHOOLS</button>
        <button onClick={setupone}>SETUP</button>
      </header>
    </div>
  );
}

export default App;
