// import "./App.css";
import Toolbar from "../components/Toolbar/Toolbar";
import React, { Component, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import loginContext from "../Contexts/loginContext";

import Main from "./Main/Main";

const App = () => {
  const [loginState, setLoginState] = useState(false);
  const [loginAuth, setLoginAuth] = useState("");
  const signOut = () => {
    localStorage.removeItem("token");
    setLoginState(false);
  };
  const triggerLoginStatus = (authStatus) => {
    setLoginState(true);
    setLoginAuth(authStatus);
    console.log(loginAuth);
  };
  return (
    <div>
      <BrowserRouter>
        <Toolbar
          loginAuth={loginAuth}
          signOut={signOut}
          loginStatus={loginState}
        />
        <Main triggerLoginStatus={triggerLoginStatus} />
      </BrowserRouter>
    </div>
  );
};

export default App;
