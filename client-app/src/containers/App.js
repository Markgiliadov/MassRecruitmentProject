// import "./App.css";
import Toolbar from "../components/Toolbar/Toolbar";
import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import Home from "../components/Home/Home";
const signOut = () => {};

function App() {
  return (
    <div>
      <BrowserRouter>
        <Toolbar signOut={signOut} loginStatus={true} />
        <Home />
      </BrowserRouter>
    </div>
  );
}

export default App;
