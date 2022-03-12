// import React, { useState, useEffect } from "react";
import React from "react";
import "./Home.css";

import Project from "../Project/Project";

const Home = () => {
  //   const [data, setData] = useState();

  //   useEffect(() => {
  //     fetch("./data")
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setData(data);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }, []);
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
