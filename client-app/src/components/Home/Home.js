// import React, { useState, useEffect } from "react";
import React from "react";
import "./Home.css";
import jwt from "jsonwebtoken";
import Project from "../Project/Project";

const Home = () => {
  //   const [data, setData] = useState();
  const history = useHistory();
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const user = jwt.decode(token);
      if (!user) {
        localStorage.removeItem("token");
        history.replace("/Login");
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
