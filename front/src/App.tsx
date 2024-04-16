import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import api from "./axiosConfig";

function App() {
  useEffect(() => {
    api.get("/months").then((response) => {
      console.log(response, "respone");
      return response;
    });
  }, []);

  const addme = () => {
    api({
      method: "post", //you can set what request you want to be
      url: "/add",
      data: {
        name: "nikps",
        location: "six stree5t",
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
    api.get("/schools").then((response) => {
      console.log(response);
      return response;
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={addme}>ADD</button>
        <button onClick={schools}>SCHOOLS</button>
        <button onClick={setupone}>SETUP</button>
      </header>
    </div>
  );
}

export default App;
