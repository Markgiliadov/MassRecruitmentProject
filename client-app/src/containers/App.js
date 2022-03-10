// import "./App.css";
import Toolbar from "../components/Toolbar/Toolbar";
import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
const signOut = () => {};

function App() {
  return (
    <div>
      <BrowserRouter>
        <Toolbar signOut={signOut} loginStatus={true} />
      </BrowserRouter>
    </div>
  );
}

export default App;
