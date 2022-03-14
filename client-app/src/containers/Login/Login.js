import React, { useState, useEffect, useContext } from "react";
import classes from "./Login.module.css";
// import loginContext from "../../Contexts/loginContext";
import BarLoader from "react-spinners/BarLoader";
import ClipLoader from "react-spinners/ClipLoader";
import NotAvailableIcon from "../../Assets/NotAvailableEmailIcon/X-icon.png";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsgInvalid, setErrorMsgInvalid] = useState(null);
  const [emailAvailabilityLogo, setEmailAvailabilityLogo] = useState(null);
  const [loadingValidation, setLoadingValidation] = useState(false);
  let loginForm = null;

  const validateUserWithDB = async (username, password) => {
    const response = await fetch("http://localhost:1338/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: username,
        password: password,
      }),
    });

    const data = await response.json();
    if (data.user) {
      localStorage.setItem("token", data.user);
      console.log(data.auth);
      props.triggerLoginStatus(data.auth);
      navigate("/");

      // switch (data.auth) {
      //   case "admin":
      //     props.triggerLoginStatus("admin");
      //     navigate("/");
      //     break;
      //   case "admin":
      //     props.triggerLoginStatus("investor");
      //     navigate("/");
      //     break;
      //   case "admin":
      //     props.triggerLoginStatus("project_manager");
      //     navigate("/");
      //     break;
      //   default:
      //     break;
      // }
      // alert("Login successful");
    } else {
      alert("please check your username and password");
    }

    console.log(data);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setLoadingValidation(true);

    if (
      username.length === 0 ||
      !username.includes("@") ||
      !username.includes(".") ||
      password.length < 6
    ) {
      setTimeout(() => {
        setLoadingValidation(false);
      }, 150);
      setErrorMsgInvalid(
        <h2 className={classes.inputError}>
          Error, Email address or username is not formatted correctly. Please
          add it and try again!
        </h2>
      );
      setEmailAvailabilityLogo(null);
    } else {
      setErrorMsgInvalid(null);
      setEmailAvailabilityLogo(
        <img className={classes.xicon} src={NotAvailableIcon} alt="x-icon" />
      );
      validateUserWithDB(username, password);
    }
  };

  if (
    false
    // state.loginSpinnerStatus
    // || state.loginStatus
  ) {
    loginForm = null;
  } else {
    loginForm = (
      <form className={classes.form} onSubmit={handleSubmit}>
        <label className={classes.label}>
          Email
          <div
            // className={inputsStyles.email.join(" ")}
            style={{ display: "flex" }}
          >
            <input
              className={classes.input}
              type="text"
              placeholder="Enter email"
              value={username}
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />
          </div>
        </label>
        <label className={classes.label}>
          Password
          <div
            // className={inputsStyles.email.join(" ")}
            style={{ display: "flex" }}
          >
            <input
              className={classes.input}
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </div>
        </label>
        <div style={{ display: "flex", padding: "4px" }}>
          <ClipLoader
            css={{ marginLeft: "2%", marginTop: "0.5%", padding: "10px" }}
            size={20}
            color={"#123abc"}
            loading={loadingValidation}
          />
          {loadingValidation ? null : (
            <>
              {emailAvailabilityLogo} {errorMsgInvalid}
            </>
          )}
        </div>

        <input
          type="submit"
          value="Login"
          className={classes.submit}
          style={{ cursor: "pointer" }}
        />
      </form>
    );
  }

  return (
    <div className={classes.Login}>
      <BarLoader
        height={5}
        width={"100%"}
        color={"#123abc"}
        // loading={state.loginSpinnerStatus}
      />
      {
        //   state.loginSpinnerStatus ? null :
        loginForm
      }
    </div>
  );
};

export default Login;
