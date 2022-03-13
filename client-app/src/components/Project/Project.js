import React, { useEffect, useState } from "react";
import "./Project.css";
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
  //comment
  return (
    <div className="project-wrap">
      <img
        className="project-poster"
        src="https://images-na.ssl-images-amazon.com/images/I/91bsMwU7IzL._RI_.jpg"
        alt=""
      />
      <Status label="Finished" />
      <h3>{props.idea}</h3>
      <div className="create-info">
        <p>created at {props.date}</p>
      </div>
      {prjPics}
      <p className="project-info">
        {props.video}
        Amount to collect {props.amount}
      </p>
      <footer>
        <div className="create-info">
          <div>
            <ProgressBar value={60} max={100} />
            <p>finish date: {props.date} </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default Project;
