import React, { useEffect, useState } from "react";
import classes from "./Project.module.css";
import Status from "../Status/Status";
import ProgressBar from "../ProgressBar/ProgressBar";

const Project = (props) => {
  let prjPics = null;

  if (props.pictures[0]) {
    prjPics = props.pictures.map((pic) => {
      return (
        <div key={pic._id}>
          {pic.img_url}
          {pic.img_description}
        </div>
      );
    });
  }
  console.log(props.titleProject);
  return (
    <div className={classes.movie_card}>
      <img className={classes.Images} src={props.pictures[0].img_url} alt="" />
      <Status label="Finished" />
      <h3 className={classes.movie_header}>{props.titleProject}</h3>
      <div className={classes.locandina}>
        <p>created at {props.date}</p>
      </div>
      {/* {prjPics} */}
      <p className={classes.movie_desc}> video {props.video}</p>
      <text className={classes.text} value={props.idea} />
      <p className={classes.movie_social}> Amount to collect {props.amount}</p>
      <footer>
        <div className="create-info">
          <div>
            <ProgressBar value={60} max={100} />
            <p>finish date: {props.date} </p>
          </div>
        </div>
      </footer>
    </div>
    // <div className={classes.container}>
    //   <div className={classes.movie_card}>
    //     <div className={classes.movie_header}>
    //       <img className={classes.Images} src={props.image} alt="Movie" />
    //     </div>
    //     <div className={classes.movie_content}>
    //       <div className={classes.movie_content_header}></div>
    //     </div>
    //   </div>
    // </div>
  );
};
export default Project;
