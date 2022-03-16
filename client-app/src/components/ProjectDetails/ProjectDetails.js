import React, { useEffect, useState } from "react";
import classes from "./ProjectDetails.module.css";
import ProgressBar from "../ProgressBar/ProgressBar";
import { useLocation } from "react-router-dom";
import Button from "../Button/Button";
const ProjectDetails = () => {
  const [amountEntered, setAmountEntered] = useState(0);
  const { state } = useLocation();
  useEffect(() => {
    console.log(state);
  }, []);

  const handlePutRequest = async (e) => {
    e.preventDefault();
    if (amountEntered <= 0) {
      alert("you must enter positive value!");
    } else if (
      Number(amountEntered) + Number(state.projectDetails.amountStart) >
      Number(state.projectDetails.amountEnd)
    )
      alert(
        "You added too much money! try again" +
          amountEntered +
          state.projectDetails.amountStart +
          " v" +
          state.projectDetails.amountEnd
      );
    else {
      let req = null;
      if (
        amountEntered + state.projectDetails.amountStart ===
        state.projectDetails.amountEnd
      ) {
        req = await fetch("http://localhost:1338/api/projects", {
          method: "PUT",
          headers: {
            "Access-Control-Allow-Headers": "X-Requested-With",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            titleProject: state.projectDetails.titleProject,
            newStatus: "completed",
            newAmount:
              Number(state.projectDetails.amountStart) + Number(amountEntered),
          }),
        });
      } else {
        {
          req = await fetch("http://localhost:1338/api/projects", {
            method: "PUT",
            headers: {
              "Access-Control-Allow-Headers": "X-Requested-With",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              titleProject: state.projectDetails.titleProject,
              newStatus: "in-progress",
              newAmount:
                Number(state.projectDetails.amountStart) +
                Number(amountEntered),
            }),
          });
        }
      }
      const data = await req.json();
      if (data.status === "ok") {
        return data.projects;
      } else {
        alert(data.error);
      }
    }
  };
  return (
    <div>
      <form className={classes.form} noValidate>
        <label className={classes.title}>
          <span className={classes.text}>
            {state.projectDetails.titleProject}
          </span>
        </label>
        <img
          className={classes.imagesProject}
          src={state.projectDetails.pictures[0].img_url}
          alt=""
        />
        <label className={classes.info}>
          {state.projectDetails.idea}
          <div
            // className={inputsStyles..join(" ")}
            style={{ display: "flex" }}
          ></div>
        </label>
        <p className={classes.movie_desc}>
          <a href={"http://" + state.projectDetails.video}>Link to video</a>
        </p>
        <ProgressBar
          value={state.projectDetails.amountStart}
          max={state.projectDetails.amountEnd}
        />
        <label>
          Amount left to collect
          <br />
          {state.projectDetails.amountEnd - state.projectDetails.amountStart}$
          {/* {inputError.phonenumber} */}
        </label>
        <input
          className={classes.input}
          type="number"
          placeholder="Enter amount wanted"
          value={amountEntered}
          onChange={(event) => {
            setAmountEntered(event.target.value);
          }}
        />
        <Button
          name="Click to invest the selected amount!"
          myFunction={handlePutRequest}
        />
      </form>
    </div>
  );
};

export default ProjectDetails;
