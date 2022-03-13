// import "./App.css";
import Toolbar from "../components/Toolbar/Toolbar";
import React, { Component, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import loginContext from "../Contexts/loginContext";

import Main from "./Main/Main";

const App = () => {
  const [loginState, setLoginState] = useState(false);
  const signOut = () => {
    localStorage.removeItem("token");
    setLoginState(false);
  };
  const triggerLoginStatus = () => {
    setLoginState(true);
  };
  return (
    <div>
      <BrowserRouter>
        <Toolbar signOut={signOut} loginStatus={loginState} />
        <Main triggerLoginStatus={triggerLoginStatus} />
      </BrowserRouter>
    </div>
  );
};

export default App;
