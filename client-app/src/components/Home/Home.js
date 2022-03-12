// import React, { useState, useEffect } from "react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
// import jwt from "jsonwebtoken";
import Project from "../Project/Project";

const wt_decode = (token) => {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace("-", "+").replace("_", "/");
  return JSON.parse(window.atob(base64));
};

const Home = () => {
  //   const [data, setData] = useState();
  const history = useNavigate();

  const checkJWT = async () => {
    const req = await fetch("http://localhost:1338/Projects", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });
    const data = req.json();
    console.log(data);
  };
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const user = wt_decode(token);
      if (!user) {
        localStorage.removeItem("token");
        history.replace("/Login");
      } else {
        checkJWT();
      }
    }
  }, []);
  return (
    // <div className="projectList-wrap">
    //   {data.map((projectKey) => (
    //     <Project project={projectKey} />
    //   ))}
    // </div>
    <div className="projectList-wrap">
      <Project />
      <Project />
      <Project />
    </div>
  );
};

export default Home;
