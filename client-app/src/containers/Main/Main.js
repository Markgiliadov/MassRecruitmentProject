import React from "react";
import { Routes, Route } from "react-router-dom";
import Projects from "../Projects/Projects";
import Home from "../../components/Home/Home";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Administrator from "../Administrator/Administrator";
import ProjectInfo from "../../components/ProjectInfo/ProjectInfo";
// import Appforgag from "../../components/Movie/MovieInformation/Appforgag";
// import loginContext from "../../Contexts/loginContext";
const Main = (props) => {
  // const { state, dispatch } = useContext(loginContext);

  return (
    <>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/Administrator" exact element={<Administrator />} />
        <Route path="/Projects" element={<Projects />} />
        <Route path="/ProjectInfo" element={<ProjectInfo />} />
        <Route
          path="/Login"
          element={<Login triggerLoginStatus={props.triggerLoginStatus} />}
        />
        <Route path="/Register" element={<Register />} />

        {/* <Route path="/:id" render={(props) => <Appforgag {...props} />} /> */}
        {/* <Route path="" exact element={Home} /> */}
        {/* <Route path="*" render={(props) => <Register {...props} />} /> */}
      </Routes>
    </>
  );
};

export default Main;
