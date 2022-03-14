import React, { useEffect, useState } from "react";
import classes from "./UserTemplateCard.module.css";
import Status from "../components/Status/Status";
import ProgressBar from "../components/ProgressBar/ProgressBar";
const ProjectTemplateCard = (projectData) => {
  const [thisData, setThisData] = useState([]);
  //   useEffect(() => {
  //     for (let i in projectData) setThisData({ ...thisData, i: projectData[i] });
  //     thisData.map((s) => console.log(s));
  //   }, []);
  //   console.log("HERE:" + Object.keys(projectData.));
  return (
    <div className={classes.movie_card}>
      <img
        className={classes.Images}
        src={projectData.projectData.pictures[0].img_url}
        alt=""
      />
      <Status label="Finished" />
      <h3 className={classes.movie_header}>
        {projectData.projectData.titleProject}
      </h3>
      <div className={classes.locandina}>
        <p>created at {projectData.projectData.date}</p>
      </div>
      <p className={classes.movie_desc}>
        video {projectData.projectData.video}
      </p>
      <p className={classes.text}>{projectData.projectData.idea}</p>
      <p className={classes.movie_social}>
        Amount to collect {projectData.projectData.amount}
      </p>
      <footer>
        <div className="create-info">
          <div>
            <ProgressBar value={60} max={100} />
            <p>finish date: {projectData.projectData.date} </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProjectTemplateCard;
