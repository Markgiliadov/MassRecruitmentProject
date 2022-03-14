import React, { useState, useEffect, useContext } from "react";
// import loginContext from "../../Contexts/loginContext";
import classes from "./Register.module.css";
import ClipLoader from "react-spinners/ClipLoader";
import NotAvailableIcon from "../../Assets/NotAvailableEmailIcon/X-icon.png";
import { useNavigate } from "react-router-dom";

// import { FirebaseContext } from "../../FirebaseAuth/index";
const initialInputStyle = [classes.input, ""];
// const initialErrorMsgStyle = [classes.inputErrorInvisible, ""];
const initialInputState = {
  email: "",
  password: "",
  name: "",
  phonenumber: "",
  auth: "",
};

const Register = (props) => {
  //   const Firebase = useContext(FirebaseContext);
  //   const { state, dispatch } = useContext(loginContext);
  const [inputError, setInputError] = useState(initialInputState);

  const errorMessages = {
    badEmail: {
      emailUnavailable: (
        <h2 className={classes.inputUnavailable}>
          This Email is already taken, please try a different one and try again!
        </h2>
      ),
      emailAt: (
        <h2 className={classes.inputError}>
          Error, Email address needs to contain '@', please add it and try
          again!
        </h2>
      ),
      emailDot: (
        <h2 className={classes.inputError}>
          Error, Email address needs to contain '.', please add it and try
          again!
        </h2>
      ),
      emailLength: (
        <h2 className={classes.inputError}>
          Error, Email address username and domain needs to be at least 2 chars,
          2 chars respectively! please add it and try again!
        </h2>
      ),
      emailAfterDotLength: (
        <h2 className={classes.inputError}>
          Error, Email address domain extension(ie: '.com') needs to be at least
          2 chars, please add it and try again!
        </h2>
      ),
      emailBeforeDotLength: (
        <h2 className={classes.inputError}>
          Error, Email address domain (ie: @ -this part-) needs to be at least 1
          char, please add it and try again!
        </h2>
      ),
    },
    password: (
      <p className={classes.inputError}>
        Error, Password can not be less than 6 chars/numbers!
      </p>
    ),
    name: (
      <h2 className={classes.inputError}>
        Error, your Name can not be less than 3, or bigger than 24 chars!
      </h2>
    ),
    phonenumber: {
      notNumeric: (
        <h2 className={classes.inputError}>
          Error, Phonenumber can not contain letters or symbols!
        </h2>
      ),
      badLength: (
        <h2 className={classes.inputError}>
          Error, Phonenumber can not be less than 10 numbers!
        </h2>
      ),
    },
  };
  const navigate = useNavigate();
  const [user, setUser] = useState(initialInputState);
  const [inputsStyles, setInputsStyles] = useState({
    email: initialInputStyle,
    password: initialInputStyle,
    name: initialInputStyle,
    phonenumber: initialInputStyle,
  });
  const [loadingEmail, setLoadingEmail] = useState(false);
  const [checkEmailAvailablityTrigger, setCheckEmailAvailabilityTrigger] =
    useState(null);
  const initialValidationStatus = Object.keys(user).length;
  const [wrongPathMsg, setWrongPathMsg] = useState("");
  const [emailAvailabilityLogo, setEmailAvailabilityLogo] = useState(null);
  let registrationForm = null;
  useEffect(() => {
    if (localStorage.getItem("JWT")) {
      navigate("/");
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const isInputValidated = inputValidation();
    if (
      //isInputValidated === initialValidationStatus && // if all 4 error inputs don't contain errors
      user.email &&
      user.password &&
      user.name &&
      user.phonenumber
    ) {
      handleRegister(e);
    } else {
      console.log(
        user.email.length,
        user.password.length,
        user.name.length,
        user.phonenumber.length
      );
      alert("you must enter correct input!");
    }
  };
  const inputValidation = () => {
    let count = initialValidationStatus;
    Object.entries(inputError).map((ie) => {
      if (ie[1].toString()) count = count - 1;
      return count;
    });
  };

  const handleRegister = async (e) => {
    const response = await fetch("http://localhost:1338/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: user.email,
        password: user.password,
        name: user.name,
        phonenumber: user.phonenumber,
        auth: user.auth,
      }),
    });

    const data = await response.json();
    console.log(data.status);
    if (data.status === "ok") {
      navigate("/Login");
    }
  };
  const handleEmailAvailabilityLogo = (emailAvailable) => {
    console.log(emailAvailable);
    if (emailAvailable) {
      console.log(user.email);
      setEmailAvailabilityLogo(
        <svg
          className={classes.checkmark}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 52 52"
        >
          <circle
            className={classes.checkmark__circle}
            cx="26"
            cy="26"
            r="25"
            fill="none"
          />
          <path
            className={classes.checkmark__check}
            fill="none"
            d="M14.1 27.2l7.1 7.2 16.7-16.8"
          />
        </svg>
      );
      setLoadingEmail(false);
    } else if (emailAvailable === false) {
      setEmailAvailabilityLogo(
        <img className={classes.xicon} src={NotAvailableIcon} alt="x-icon" />
      );
      setLoadingEmail(false);
      // setEmailAvailabilityLogo(null);
    }
  };

  const checkDBforEmail = async () => {
    let emailavailable = null;
    let emailUnavailable = null;
    console.log(user.email);
    const response = await fetch(
      "http://localhost:1338/api/registerEmailTest",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
        }),
      }
    );

    const data = await response.json();
    console.log(data.status);
    if (!(data.status === "ok")) {
      setInputs("email", true, errorMessages.badEmail.emailUnavailable, true);
      handleEmailAvailabilityLogo(false);
    } else {
      emailavailable = true;
      setLoadingEmail(() => false);
      handleEmailAvailabilityLogo(true);
    }

    // if (emailUnavailable) handleEmailAvailabilityLogo(false);
    // else handleEmailAvailabilityLogo(true);
  };
  // const checkEmailAvailablity = async (valueEn) => {
  //   const db = Firebase.getFirestore();

  //   await db
  //     .collection("users")
  //     .get()
  //     .then((querySnapshot) => {
  //       querySnapshot.forEach((doc) => {
  //         if (doc.data().email === valueEn) {
  //           setInputs(
  //             "email",
  //             true,
  //             errorMessages.badEmail.emailUnavailable,
  //             true
  //           );
  //           emailUnavailable = true;
  //         } else {
  //           emailavailable = true;
  //           setLoadingEmail(() => false);
  //         }
  //       });
  //     });
  //   console.log(emailavailable, "OTHJER " + emailUnavailable);
  //   if (emailUnavailable) handleEmailAvailabilityLogo(false);
  //   else handleEmailAvailabilityLogo(true);
  // };
  const handleEmailBadFormat = (valueEn) => {
    let firstStr = "";
    let secondStr = "";
    let thirdStr = "";
    // let tempVal = "";
    let afterAt = "";

    if (valueEn.includes("@")) {
      [firstStr, afterAt] = valueEn.split("@");
      secondStr = afterAt;
      if (firstStr.length > 1 && secondStr.length > 2) {
        setInputs("email", false);
        setInputs("email", false);
        if (afterAt.includes(".")) {
          [secondStr, thirdStr] = afterAt.split(".");
          if (secondStr.length > 0) {
            if (thirdStr.length > 1) {
              setInputs("email", false);
              setLoadingEmail(true);
              setCheckEmailAvailabilityTrigger(
                // setTimeout(() => {
                checkDBforEmail()
              );
              // }, 1000)
              // );
            } else {
              setInputs(
                "email",
                true,
                errorMessages.badEmail.emailAfterDotLength
              );
            }
          } else
            setInputs(
              "email",
              true,
              errorMessages.badEmail.emailBeforeDotLength
            );
        } else setInputs("email", true, errorMessages.badEmail.emailDot);
      } else setInputs("email", true, errorMessages.badEmail.emailLength);
    } else setInputs("email", true, errorMessages.badEmail.emailAt);
  };
  const handlePasswordBadFormat = (valueEn) => {
    if (valueEn.length < 6) setInputs("password", true, errorMessages.password);
    else setInputs("password", false);
  };
  const handleNameBadFormat = (valueEn) => {
    if (valueEn.length < 3 || valueEn.length > 24)
      setInputs("name", true, errorMessages.name);
    else setInputs("name", false);
  };
  const handlePhonenumberBadFormat = (valueEn, e) => {
    if (isNaN(valueEn) || valueEn.match(/\./g) || /\s/.test(valueEn))
      setInputs("phonenumber", true, errorMessages.phonenumber.notNumeric);
    else if (valueEn.length < 10 && valueEn.length > 0)
      setInputs("phonenumber", true, errorMessages.phonenumber.badLength);
    else setInputs("phonenumber", false);
  };
  const setInputs = (keyInput, dangerStyle, errorProp, emailUnavailable) => {
    if (emailUnavailable) {
      setInputsStyles({
        ...inputsStyles,
        [keyInput]: [classes.input, classes.inputChangeUnavailable],
      });
      setInputError({
        ...inputError,
        [keyInput]: errorProp,
      });
    }
    if (dangerStyle) {
      setInputsStyles({
        ...inputsStyles,
        [keyInput]: [classes.input, classes.inputChangeError],
      });
      setInputError({
        ...inputError,
        [keyInput]: errorProp,
      });
    } else {
      setInputsStyles({
        ...inputsStyles,
        [keyInput]: [classes.input, classes.inputChange],
      });
      setInputError({
        ...inputError,
        [keyInput]: "",
      });
    }
  };
  const validation = (inputName, valueEn, e) => {
    if (valueEn.length > 0)
      switch (inputName) {
        case "email":
          handleEmailBadFormat(valueEn);

          break;
        case "password":
          handlePasswordBadFormat(valueEn);

          break;
        case "name":
          handleNameBadFormat(valueEn);

          break;
        case "phonenumber":
          handlePhonenumberBadFormat(valueEn);

          break;
        default: {
          setInputsStyles({ ...inputsStyles });
          setInputError({ ...inputError });
        }
      }
    else {
      setInputsStyles({ ...inputsStyles, [inputName]: initialInputStyle });
      setInputError({ ...inputError, [inputName]: "" });
    }
  };
  useEffect(() => {
    //here you will have correct value in userInput
    console.log(user.email);
    checkDBforEmail();
  }, [user.email]);
  const handleInputChange = (e) => {
    let val = e.target.value;
    let vName = e.target.name;
    setUser({
      ...user,
      [vName]: val,
    });
    validation(vName, val, e);
  };

  if (
    true
    //   !state.loginStatus
  )
    registrationForm = (
      <form className={classes.form} onSubmit={handleSubmit} noValidate>
        <label className={classes.label}>
          Email
          <div
            className={inputsStyles.email.join(" ")}
            style={{ display: "flex" }}
          >
            <input
              className={inputsStyles.email.join(" ")}
              style={{ border: "none", padding: "0" }}
              name="email"
              type="email"
              placeholder="Email"
              value={user.email}
              onChange={(e) => {
                setEmailAvailabilityLogo(null);
                setLoadingEmail(false);
                clearTimeout(checkEmailAvailablityTrigger);
                handleInputChange(e);
              }}
            />
            <ClipLoader
              css={{ marginLeft: "2%", marginTop: "0.5%" }}
              size={15}
              color={"#123abc"}
              loading={loadingEmail}
            />
            {loadingEmail ? null : emailAvailabilityLogo}
          </div>
          {inputError.email}
        </label>
        <label className={classes.label}>
          Password
          <input
            className={inputsStyles.password.join(" ")}
            name="password"
            type="password"
            placeholder="Password"
            value={user.password}
            onChange={(e) => handleInputChange(e)}
          />
          {inputError.password}
        </label>
        <label className={classes.label}>
          Name
          <input
            className={inputsStyles.name.join(" ")}
            name="name"
            type="name"
            placeholder="Name"
            value={user.name}
            onChange={(e) => handleInputChange(e)}
          />
          {inputError.name}
        </label>
        <label className={classes.label}>
          Phonenumber
          <input
            className={inputsStyles.phonenumber.join(" ")}
            name="phonenumber"
            type="phonenumber"
            placeholder="Phone Number"
            value={user.phonenumber}
            onChange={(e) => handleInputChange(e)}
          />
          {inputError.phonenumber}
        </label>
        <label className={classes.label}>
          Type of user
          <div
            style={{
              display: "flex",
              alignItems: "center",
              // padding: "5%",
              marginLeft: "15%",
            }}
          >
            <input
              // className={inputsStyles.phonenumber.join(" ")}
              style={{ margin: "5%" }}
              name="auth"
              type="radio"
              placeholder="Type"
              value="investor"
              onChange={(e) => handleInputChange(e)}
            />
            Investor
            <input
              // className={inputsStyles.phonenumber.join(" ")}
              style={{ margin: "5%" }}
              name="auth"
              type="radio"
              placeholder="Type"
              value="Project Manager"
              onChange={(e) => handleInputChange(e)}
            />
            Project Manager
          </div>
        </label>
        <input
          type="submit"
          value="Register"
          className={classes.submit}
          style={{ cursor: "pointer", height: "45px", marginTop: "5px" }}
        />
      </form>
    );
  return (
    <>
      {wrongPathMsg}
      {registrationForm}
    </>
  );
};

export default Register;
