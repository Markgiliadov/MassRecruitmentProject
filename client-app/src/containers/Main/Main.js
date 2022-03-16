import React from "react";
import { Routes, Route } from "react-router-dom";
import AddNewProject from "../AddNewProject/AddNewProject";
import Home from "../../components/Home/Home";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Administrator from "../Administrator/Administrator";
import ProjectDetails from "../../components/ProjectDetails/ProjectDetails";

// import Appforgag from "../../components/Movie/MovieInformation/Appforgag";
// import loginContext from "../../Contexts/loginContext";
const Main = (props) => {
  // const { state, dispatch } = useContext(loginContext);

  return (
    <>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/Administrator" exact element={<Administrator />} />
        <Route path="/AddNewProject" element={<AddNewProject />} />
        <Route
          path="/Login"
          element={<Login triggerLoginStatus={props.triggerLoginStatus} />}
        />
        <Route path="/Register" element={<Register />} />
        <Route exact path="/ProjectDetails/:id" element={<ProjectDetails />} />
        <Route exact path="/AddNewProject/:id" element={<AddNewProject />} />
        {/* <Route path="/:id" render={(props) => <Appforgag {...props} />} /> */}
        {/* <Route path="" exact element={Home} /> */}
        {/* <Route path="*" render={(props) => <Register {...props} />} /> */}
      </Routes>
    </>
  );
};

export default Main;
