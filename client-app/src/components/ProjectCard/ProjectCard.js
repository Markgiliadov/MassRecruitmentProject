import React, { useEffect, useState } from "react";
import classes from "./ProjectCard.module.css";
import Status from "../Status/Status";
import ProgressBar from "../ProgressBar/ProgressBar";
import Button from "../Button/Button";
import { NavLink } from "react-router-dom";

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
  return (
    <div className={classes.movie_card}>
      {/* <NavLink to=""/> */}
      <img className={classes.Images} src={props.pictures[0].img_url} alt="" />
      <Status label="Finished" />
      <h3 className={classes.movie_header}>{props.titleProject}</h3>
      <div className={classes.locandina}>
        <p>created at {props.date}</p>
      </div>
      {/* {prjPics} */}
      <p className={classes.movie_desc}>
        <a href={props.video}>Link to video</a>
      </p>
      <text className={classes.text} value={props.idea} />
      <p className={classes.movie_social}>
        Amount to collect {props.amountStart}
      </p>
      <footer>
        <div className="create-info">
          <div>
            <ProgressBar value={60} max={100} />
            <p>Ending at: {props.date} </p>
          </div>
        </div>
        <NavLink
          className={classes.button1}
          // exact
          // activeStyle={{ backgroundColor: "red" }}
          to={{ pathname: "/AddProject" }}
        >
          Visit Project Page
        </NavLink>
      </footer>
    </div>
  );
};
export default Project;
