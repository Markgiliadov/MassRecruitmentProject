// import React, { useState, useEffect } from "react";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import classes from "./Home.module.css";
// import jwt from "jsonwebtoken";
import ProjectCard from "../ProjectCard/ProjectCard";
import moment from "moment";
import e from "cors";

const wt_decode = (token) => {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace("-", "+").replace("_", "/");
  return JSON.parse(window.atob(base64));
};

const Home = () => {
  const [projectsInProgress, setProjectsInProgress] = useState([]);
  const [projectsIncomplete, setProjectsIncomplete] = useState([]);
  const [projectsComplete, setProjectsComplete] = useState([]);
  const [tempProjects, setTempProjects] = useState("");
  const history = useNavigate();
  useEffect(async () => {
    // const token = localStorage.getItem("token");
    // console.log(token);
    // if (token) {
    //   console.log("h");
    //   const user = wt_decode(token);
    //   console.log(user);
    //   if (!user) {
    //     localStorage.removeItem("token");
    //     history.replace("/Login");
    //   } else {
    //     console.log("checking jwt");
    await getProjectsInProgressFromDB();
    await getProjectsIncompleteFromDB();
    await getProjectsCompleteFromDB();

    //   }
    // }
  }, []);
  const getProjectsInProgressFromDB = async () => {
    setProjectsInProgress(await getDataFromDB("in-progress"));
  };
  const getProjectsIncompleteFromDB = async () => {
    setProjectsIncomplete(await getDataFromDB("incomplete"));
  };
  const getProjectsCompleteFromDB = async () => {
    setProjectsComplete(await getDataFromDB("completed"));
  };
  const getDataFromDB = async (typeOfProjects) => {
    console.log("entering jwt");
    const req = await fetch("http://localhost:1338/api/projects", {
      method: "GET",
      headers: {
        // "Access-Control-Allow-Headers": "X-Requested-With",
        "Content-Type": "application/json",
        "Project-Type": typeOfProjects,
      },
    });
    console.log(req);
    const data = await req.json();
    console.log(data);
    if (data.status === "ok") {
      console.log(data.projects);
      return data.projects;
    } else {
      alert(data.error);
    }
    console.log(data);
  };

  const updateProjects = async (e) => {
    e.preventDefault();
    const req = await fetch("http://localhost:1338/api/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        projects: tempProjects,
      }),
    });
    console.log(req);
    const data = await req.json();
    console.log(data, data.projects);
    if (data.status === "ok") {
      setProjectsInProgress(tempProjects);
      setTempProjects("");
    } else {
      alert(data.error);
    }
  };
  const getFormattedDate = (date) => {
    const day = date.split("-")[2].split("T")[0];
    const month = date.split("-")[1];
    const year = date.split("-")[0];

    return day + "-" + month + "-" + year;
  };

  const formatDate = (date) => {
    const currentMonth = date.getMonth();
    const monthString = currentMonth >= 10 ? currentMonth : `0${currentMonth}`;
    const currentDate = date.getDate();
    const dateString = currentDate >= 10 ? currentDate : `0${currentDate}`;
    return `${date.getFullYear()}-${monthString}-${currentDate}`;
  };
  let inProgressProjects = null;
  let incompleteProjects = null;
  let completeProjects = null;
  if (projectsInProgress) {
    console.log(projectsInProgress);
    console.log(typeof projectsInProgress);
    inProgressProjects = projectsInProgress.map((prjVal, index) => {
      console.log(prjVal.pictures[0]);

      console.log(getFormattedDate(prjVal.endDate));
      return (
        <div key={prjVal._id}>
          <ProjectCard
            titleProject={prjVal.titleProject}
            idea={prjVal.idea}
            video={prjVal.video}
            pictures={prjVal.pictures}
            amountStart={prjVal.amountStart}
            amountEnd={prjVal.amountEnd}
            status={prjVal.status}
            createdDate={prjVal.createdDate}
            endDate={prjVal.endDate}
            date={getFormattedDate(prjVal.endDate)}
          />
        </div>
      );
    });
  }
  if (projectsIncomplete) {
    console.log(typeof projectsIncomplete);
    incompleteProjects = projectsIncomplete.map((prjVal, index) => {
      console.log(prjVal.pictures[0]);
      return (
        <div key={prjVal._id}>
          <ProjectCard
            titleProject={prjVal.titleProject}
            idea={prjVal.idea}
            video={prjVal.video}
            pictures={prjVal.pictures}
            amountStart={prjVal.amountStart}
            amountEnd={prjVal.amountEnd}
            status={prjVal.status}
            createdDate={getFormattedDate(prjVal.createdDate)}
            endDate={prjVal.endDate}
            date={getFormattedDate(prjVal.endDate)}
          />
        </div>
      );
    });
  }
  if (projectsComplete) {
    console.log(typeof projectsComplete);
    completeProjects = projectsComplete.map((prjVal, index) => {
      console.log(prjVal.pictures[0]);
      return (
        <div key={prjVal._id}>
          <ProjectCard
            titleProject={prjVal.titleProject}
            idea={prjVal.idea}
            video={prjVal.video}
            pictures={prjVal.pictures}
            amountStart={prjVal.amountStart}
            amountEnd={prjVal.amountEnd}
            status={prjVal.status}
            createdDate={prjVal.createdDate}
            endDate={prjVal.endDate}
            date={getFormattedDate(prjVal.endDate)}
          />
        </div>
      );
    });
  }
  return (
    <>
      <h1 className={classes.h1}>In-progress projects</h1>
      <div style={{ overflowX: "scroll" }} className={classes.projectList_wrap}>
        {inProgressProjects}
      </div>
      <h1 className={classes.h1}>Incomplete projects</h1>
      {/* {incompleteProjects ? ( */}
      <div style={{ overflowX: "scroll" }} className={classes.projectList_wrap}>
        {incompleteProjects}
      </div>
      {/* ) : null} */}

      <h1 className={classes.h1}>Completed projects</h1>
      <div style={{ overflowX: "scroll" }} className={classes.projectList_wrap}>
        {completeProjects}
      </div>
    </>
  );
};

export default Home;
