import React, { useState, useEffect } from "react";
import classes from "./AddNewProject.module.css";
import { useNavigate } from "react-router-dom";
import Moment from "moment";
// import DatePicker from "../../components/DatePicker/DatePiker";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLocation } from "react-router-dom";
import ProjectDetails from "../../components/ProjectDetails/ProjectDetails";
const initialInputState = {
  titleProject: "",
  idea: "",
  statusProject: "Started",
  video: "",
  pictures: [],
  amountStart: 0,
  amountEnd: 0,
  endDate: "",
};

const wt_decode = (token) => {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace("-", "+").replace("_", "/");
  return JSON.parse(window.atob(base64));
};

const Projects = () => {
  const [inputPicArr, setPicArr] = useState([{ url: "" }]);
  const [projects, setProjects] = useState("");
  const [tempProjects, setTempProjects] = useState("");
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);
  const { state } = useLocation();
  const initialInputStyle = [classes.input, ""];
  const [project, setProject] = useState(initialInputState);

  useEffect(async () => {
    const token = localStorage.getItem("token");
    console.log(state);
    // console.log(token);
    if (token) {
      const user = wt_decode(token);
      console.log(state.projectDetails);
      setProject({
        ...project,
        titleProject: state.projectDetails.titleProject,
      });
      if (!user) {
        localStorage.removeItem("token");
        navigate.replace("/Login");
      } else {
        console.log("checking jwt");
        await checkJWT();
      }
    }
  }, []);
  const getCurrDate = () => {
    const today = new Date();
    return (
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      (today.getDate() + 1)
    );
  };
  useEffect(() => {
    console.log(project.endDate);
  }, [project.endDate]);

  const checkJWT = async () => {
    console.log("entering jwt");
    const req = await fetch("http://localhost:1338/api/projects", {
      // method: "GET",
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });
    console.log(req);
    const data = await req.json();
    console.log(data);
    if (data.status === "ok") {
      setProjects(data.projects);
    } else {
      alert(data.error);
    }
    console.log(data);
  };
  const addOrUpdateProject = async () => {
    console.log("before adding to db:" + project.endDate);
    const req = await fetch("http://localhost:1338/api/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        titleProject: project.titleProject,
        idea: project.idea,
        statusProject: project.statusProject,
        video: project.video,
        pictures: project.pictures,
        amountStart: project.amountStart,
        amountEnd: project.amountEnd,
        createdDate: getCurrDate(),
        endDate: project.endDate,
      }),
    });
    console.log(req);
    const data = await req.json();
    console.log(data, data.projects);
    if (data.status === "ok") {
      navigate("/");
      setProjects(tempProjects);
      setTempProjects("");
    } else {
      alert(data.error);
    }
  };

  const handleDateChanged = (date) => {
    const offsetDate = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    );
    console.log(offsetDate);
    setProject({ ...project, endDate: offsetDate });
  };
  const handleInputChange = (e) => {
    let val = e.target.value;
    let vName = e.target.name;
    setProject({ ...project, [vName]: val });
    // console.log(project.idea, project.video, project.pictures, project.amount);
    // validation(vName, val, e);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(project.idea, project.video, project.pictures, project.amount);

    addOrUpdateProject();
  };

  const handelAdd = () => {
    setPicArr([...inputPicArr, { url: "" }]);
  };

  const handelRemove = (index) => {
    const values = [...inputPicArr];
    values.splice(index, 1);
    setPicArr(values);
  };
  return (
    <div>
      <form className={classes.form} onSubmit={handleSubmit} noValidate>
        <label className={classes.label}>
          Project name
          <input
            className={initialInputStyle}
            name="titleProject"
            type="text"
            placeholder="Enter the name project"
            value={project.titleProject}
            onChange={(e) => handleInputChange(e)}
          />
        </label>
        <label className={classes.label}>
          Project idea
          <div
            // className={inputsStyles..join(" ")}
            style={{ display: "flex" }}
          >
            <textarea
              className={initialInputStyle}
              style={{ border: "outset", padding: "0" }}
              name="idea"
              type="text"
              placeholder="Type your idea here"
              value={project.idea}
              onChange={(e) => {
                // setEmailAvailabilityLogo(null);
                // setLoadingEmail(false);
                // clearTimeout(checkEmailAvailablityTrigger);
                handleInputChange(e);
              }}
            />
            {/* <ClipLoader
              css={{ marginLeft: "2%", marginTop: "0.5%" }}
              size={15}
              color={"#123abc"} */}
            {/* loading={loadingEmail} */}
            {/* /> */}
            {/* {loadingEmail ? null : emailAvailabilityLogo} */}
          </div>
          {/* {inputError.email} */}
        </label>
        <label className={classes.label}>
          Video link
          <input
            className={initialInputStyle}
            name="video"
            type="text"
            placeholder="Enter the video URL"
            value={project.video}
            onChange={(e) => handleInputChange(e)}
          />
          {/* {inputError.password} */}
        </label>

        <label className={classes.label}>
          Add pictures
          {inputPicArr.map((picArr, index) => (
            <input
              key={index}
              className={initialInputStyle}
              name="pictures"
              type="url"
              placeholder="Enter picture URL"
              // value={project.pictures}
              onChange={(e) => handleInputChange(e)}
            />
          ))}
          {/* {inputError.name} */}
          <button type="button" onClick={handelAdd}>
            +
          </button>
          <button type="button" onClick={handelRemove}>
            -
          </button>
        </label>

        <label className={classes.label}>
          Amount to reach
          <input
            className={initialInputStyle}
            name="amountEnd"
            type="number"
            placeholder="Amount to reach"
            value={project.amountEnd}
            onChange={(e) => handleInputChange(e)}
          />
          {/* {inputError.phonenumber} */}
        </label>
        <label className={classes.label}>
          Would you like to invest? (Optional) Please enter amount:
          <input
            className={initialInputStyle}
            name="amountStart"
            type="number"
            placeholder="Amount to reach"
            value={project.amountStart}
            onChange={(e) => handleInputChange(e)}
          />
          {/* {inputError.phonenumber} */}
        </label>

        <label className={classes.label}>
          Set end date :
          <DatePicker
            name="endDate"
            // type={DatePicker}
            selected={project.endDate}
            value={project.endDate}
            onChange={(date) => handleDateChanged(date)}

            // value={project.endDate}
          />
        </label>
        <input
          type="submit"
          value="Add new project"
          className={classes.submit}
          style={{ cursor: "pointer", height: "45px", marginTop: "5px" }}
        />
      </form>
    </div>
  );
};

export default Projects;
