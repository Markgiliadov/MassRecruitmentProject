import React, { useEffect, useState } from "react";
import classes from "./ProjectCard.module.css";
import Status from "../Status/Status";
import ProgressBar from "../ProgressBar/ProgressBar";
import { NavLink } from "react-router-dom";

const Project = (props) => {
  console.log(props.createdDate);
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
  return (
    <div className={classes.movie_card}>
      <img className={classes.Images} src={props.pictures[0].img_url} alt="" />
      <Status label={props.status} />
      <h1 style={{ fontSize: "20px" }} className={classes.movie_header}>
        {props.titleProject}
      </h1>
      <div className={classes.locandina}>
        <p>
          created at <strong> {props.createdDate}</strong>
        </p>
      </div>
      <p className={classes.movie_desc}>
        <a href={"http://" + props.video}>Link to video</a>
      </p>
      <text className={classes.text} value={props.idea} />
      <p className={classes.movie_social}>
        Amount to collect{" "}
        {props.amountEnd - props.amountStart > 0
          ? props.amountEnd - props.amountStart
          : null}
        $
      </p>

      <footer>
        <div className="create-info">
          <div>
            <ProgressBar value={props.amountStart} max={props.amountEnd} />
            <p>Ending at: {props.date} </p>
          </div>
        </div>
        <NavLink
          className={classes.button1}
          state={{ projectDetails: props }}
          to={{
            pathname: `/ProjectDetails/${props.titleProject}`,
          }}
        >
          Visit Product Page
        </NavLink>
        <NavLink
          className={classes.button1}
          state={{ projectDetails: props }}
          to={{
            pathname: `/AddNewProject/${props.titleProject}`,
          }}
        >
          Edit
        </NavLink>
      </footer>
    </div>
  );
};
export default Project;
