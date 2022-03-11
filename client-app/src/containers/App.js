// import "./App.css";
import Toolbar from "../components/Toolbar/Toolbar";
import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
<<<<<<< HEAD
import Home from "../components/Home/Home";
=======
import Main from "./Main/Main";
>>>>>>> 8ff342250ed19cd0e3a9f28d0aa7392aeb82826b
const signOut = () => {};

function App() {
  return (
    <div>
      <BrowserRouter>
        <Toolbar signOut={signOut} loginStatus={true} />
<<<<<<< HEAD
        <Home />
=======
        <Main />
>>>>>>> 8ff342250ed19cd0e3a9f28d0aa7392aeb82826b
      </BrowserRouter>
    </div>
  );
}

export default App;
