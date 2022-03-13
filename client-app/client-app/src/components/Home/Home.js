// import React, { useState, useEffect } from "react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
// import jwt from "jsonwebtoken";
import Project from "../Project/Project";
import e from "cors";

const wt_decode = (token) => {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace("-", "+").replace("_", "/");
  return JSON.parse(window.atob(base64));
};

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [tempProjects, setTempProjects] = useState("");
  const history = useNavigate();

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
      console.log(data.projects);
      setProjects(data.projects);
    } else {
      alert(data.error);
    }
    console.log(data);
  };
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
    await checkJWT();

    //   }
    // }
  }, []);

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
      setProjects(tempProjects);
      setTempProjects("");
    } else {
      alert(data.error);
    }
  };
  const getCurrDate = () => {
    const today = new Date();
    return (
      today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate()
    );
  };
  let reProjects = null;
  if (projects) {
    console.log(projects);
    reProjects = projects.map((prjVal, index) => {
      console.log(prjVal.pictures[0]);
      return (
        <div key={prjVal._id}>
          <Project
            idea={prjVal.idea}
            video={prjVal.video}
            pictures={prjVal.pictures}
            amount={prjVal.amount}
            date={getCurrDate()}
          />
        </div>
      );
    });
  }
  return (
    <>
      <div className="projectList-wrap">{reProjects}</div>
    </>
  );
};

export default Home;
