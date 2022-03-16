import React, { useEffect, useState } from "react";
import classes from "./Toolbar.module.css";
import { NavLink } from "react-router-dom";
import Button from "../Button/Button";
// import { useState } from "react";
// import Logo from "../Logo/Logo";
// import loginContext from "../../Contexts/loginContext";
// import LoginSideDrawer from "../LoginSideDrawer/LoginSideDrawer";
const Toolbar = (props) => {
  // const { state, dispatch } = useContext(loginContext);
  const [myLoginState, SetMyLoginState] = useState(props.loginStatus);
  useEffect(() => {
    console.log(props.loginAuth);
    if (localStorage.getItem("token")) SetMyLoginState(true);
    else {
      SetMyLoginState(false);
    }
  }, []);
  return (
    <div className={classes.Toolbar}>
      {/* <Logo /> */}
      {/* Hello <span className={classes.text}>Hello {props.loginAuth}</span> */}
      <div
        style={{
          display: "flex",
          alignContent: "center",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {props.loginStatus ? (
          <span className={classes.text}>Hello {props.loginAuth}</span>
        ) : null}

        <NavLink
          className={classes.button1}
          // exact
          // activeStyle={{ backgroundColor: "red" }}
          to={{ pathname: "/" }}
        >
          Home
        </NavLink>
        <NavLink
          className={classes.button1}
          // exact
          // activeStyle={{ backgroundColor: "red" }}
          to={{ pathname: "/AddNewProject" }}
        >
          Add new project
        </NavLink>
        {!props.loginStatus ? (
          <>
            <NavLink className={classes.button1} to={{ pathname: "/Login" }}>
              Sign in
            </NavLink>
            <NavLink className={classes.button1} to={{ pathname: "/Register" }}>
              Register
            </NavLink>
          </>
        ) : (
          <>
            {props.loginAuth === "admin" ? (
              <NavLink
                className={classes.button1}
                // exact
                // activeStyle={{ backgroundColor: "red" }}
                to={{ pathname: "/Administrator" }}
              >
                Administrator
              </NavLink>
            ) : null}
            <Button
              className={classes.button1}
              style={{
                cursor: "pointer",
                height: "52px",
                paddingBottom: "1.05em",
                marginRight: "0.7em",
                // fontWeight: "400",
                fontSize: "14px",
              }}
              myFunction={props.signOut}
              name="Sign Out"
            />
            {/* <div className={classes.container}> */}

            {/* </div> */}
          </>
        )}
        {/* 
      <NavLink className={classes.button1} to={{ pathname: "/About" }}>
        About
      </NavLink> */}
      </div>
    </div>
  );
};

export default Toolbar;
