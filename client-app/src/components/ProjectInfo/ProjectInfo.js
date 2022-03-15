import React from "react";
import classes from "./ProjectInfo.module.css";
import ProgressBar from "../ProgressBar/ProgressBar";
const ProjectInfo = () => {
  return (
    <div>
      <form className={classes.form} noValidate>
        <label className={classes.title}>Project name</label>
        <img
          className={classes.imagesProject}
          src="https://images-na.ssl-images-amazon.com/images/I/91bsMwU7IzL._RI_.jpg"
          alt=""
        />
        <label className={classes.info}>
          Harry Potter is a series of seven fantasy novels written by British
          author J. K. Rowling. The novels chronicle the lives of a young
          wizard, Harry Potter, and his friends Hermione Granger and Ron
          Weasley, all of whom are students at Hogwarts School of Witchcraft and
          Wizardry. The main story arc concerns Harry's struggle against Lord
          Voldemort, a dark wizard who intends to become immortal, overthrow the
          wizard governing body known as the Ministry of Magic and subjugate all
          wizards and Muggles (non-magical people). The series was originally
          published in English by Bloomsbury in the United Kingdom and
          Scholastic Press in the United States. All versions around the world
          are printed by Grafica Veneta in Italy.[1] A series of many genres,
          including fantasy, drama, coming of age, and the British school story
          (which includes elements of mystery, thriller, adventure, horror, and
          romance), the world of Harry Potter explores numerous themes and
          includes many cultural meanings and references.[2] According to
          Rowling, the main theme is death.[3] Other major themes in the series
          include prejudice, corruption, and madness.[4]
          <div
            // className={inputsStyles..join(" ")}
            style={{ display: "flex" }}
          >
            {/* <ClipLoader
              css={{ marginLeft: "2%", marginTop: "0.5%" }}
              size={15}
              color={"#123abc"} */}
            {/* loading={loadingEmail} */}
            {/* /> */}
            {/* {loadingEmail ? null : emailAvailabilityLogo} */}
          </div>
          {/* {inputError.email} */}
        </label>
        <label>
          Video link
          {/* {inputError.password} */}
        </label>
        <ProgressBar value={60} max={100} />
        <label>
          Amount to reach End date
          {/* {inputError.phonenumber} */}
        </label>
        <button className={classes.edit}>edit</button>
      </form>
    </div>
  );
};

export default ProjectInfo;
