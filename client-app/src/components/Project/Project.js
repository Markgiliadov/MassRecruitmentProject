import React from "react";
import "./Project.css";
import Status from "../Status/Status";
import ProgressBar from "../ProgressBar/ProgressBar";

const Project = () => {
  return (
    <div className="project-wrap">
      <img
        className="project-poster"
        src="https://images-na.ssl-images-amazon.com/images/I/91bsMwU7IzL._RI_.jpg"
        alt=""
      />
      <Status label="Finshed" />
      <h3>Harry Poter</h3>
      <div className="create-info">
        <p>create at </p>
      </div>
      <p className="project-info">
        Harry Potter is a series of seven fantasy novels written by British
        author J. K. Rowling. The novels chronicle the lives of a young wizard,
        Harry Potter, and his friends Hermione Granger and Ron Weasley, all of
        whom are students at Hogwarts School of Witchcraft and Wizardry. The
        main story arc concerns Harry's struggle against Lord Voldemort, a dark
        wizard who intends to become immortal, overthrow the wizard governing
        body known as the Ministry of Magic and subjugate all wizards and
        Muggles (non-magical people).
      </p>
      <footer>
        <div className="create-info">
          <div>
            <ProgressBar value={60} max={100} />
            <p>finsh date </p>
          </div>
        </div>
      </footer>
      <img
        className="project-poster"
        src="https://images-na.ssl-images-amazon.com/images/I/91bsMwU7IzL._RI_.jpg"
        alt=""
      />
      <Status label="Finshed" />
      <h3>Harry Poter</h3>
      <div className="create-info">
        <p>create at </p>
      </div>
      <p className="project-info">
        Harry Potter is a series of seven fantasy novels written by British
        author J. K. Rowling. The novels chronicle the lives of a young wizard,
        Harry Potter, and his friends Hermione Granger and Ron Weasley, all of
        whom are students at Hogwarts School of Witchcraft and Wizardry. The
        main story arc concerns Harry's struggle against Lord Voldemort, a dark
        wizard who intends to become immortal, overthrow the wizard governing
        body known as the Ministry of Magic and subjugate all wizards and
        Muggles (non-magical people).
      </p>
      <footer>
        <div className="create-info">
          <div>
            <ProgressBar value={60} max={100} />
            <p>finsh date </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default Project;
