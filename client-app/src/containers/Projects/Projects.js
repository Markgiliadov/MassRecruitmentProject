import React, { useState, useEffect } from "react";
import classes from "./Projects.module.css";
import { useNavigate } from "react-router-dom";
const initialInputState = {
  idea: "",
  video: "",
  pictures: [],
  amount: 0,
};

const wt_decode = (token) => {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace("-", "+").replace("_", "/");
  return JSON.parse(window.atob(base64));
};

const Projects = () => {
  const [projects, setProjects] = useState("");
  const [tempProjects, setTempProjects] = useState("");
  const history = useNavigate();

  const initialInputStyle = [classes.input, ""];
  const [project, setProject] = useState(initialInputState);

  useEffect(async () => {
    const token = localStorage.getItem("token");

    console.log(token);
    if (token) {
      console.log("h");
      const user = wt_decode(token);
      console.log(user);
      if (!user) {
        localStorage.removeItem("token");
        history.replace("/Login");
      } else {
        console.log("checking jwt");
        await checkJWT();
      }
    }
  }, []);

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
    console.log(
      "before adding to db:" + project.idea,
      project.video,
      project.pictures,
      project.amount
    );
    const req = await fetch("http://localhost:1338/api/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        idea: project.idea,
        video: project.video,
        pictures: project.pictures,
        amount: project.amount,
      }),
    });
    console.log(req);
    const data = await req.json();
    console.log(data, data.projects);
    if (data.status === "ok") {
      setProjects(tempProjects);
      setTempProjects("");
    } else {
      alert(data.error);
    }
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
  return (
    <div>
      <form className={classes.form} onSubmit={handleSubmit} noValidate>
        <label className={classes.label}>
          Project idea
          <div
            // className={inputsStyles..join(" ")}
            style={{ display: "flex" }}
          >
            <textarea
              className={initialInputStyle}
              style={{ border: "none", padding: "0" }}
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
          <input
            className={initialInputStyle}
            name="pictures"
            type="url"
            placeholder="Enter picture URL"
            value={project.pictures}
            onChange={(e) => handleInputChange(e)}
          />
          {/* {inputError.name} */}
        </label>
        <label className={classes.label}>
          Amount to reach
          <input
            className={initialInputStyle}
            name="amount"
            type="number"
            placeholder="Amount"
            value={project.amount}
            onChange={(e) => handleInputChange(e)}
          />
          {/* {inputError.phonenumber} */}
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
