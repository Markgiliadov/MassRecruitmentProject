import React from "react";
import classes from "./UserTemplateCard.module.css";
const UserTemplateCard = (userData) => {
  console.log(userData.userData);
  return (
    <div className={classes.movie_card}>
      {/* <img className={classes.Images} src={props.pictures[0].img_url} alt="" /> */}
      {/* <Status label="Finished" /> */}
      <h3 className={classes.movie_header}>{userData.userData.name}</h3>

      {/* <div className={classes.locandina}> */}
      {/* <p>created at {userData.date}</p> */}
      {/* </div> */}
      {/* {prjPics} */}
      <p className={classes.movie_desc}> {userData.userData.email}</p>
      <p className={classes.text}>{userData.userData.phonenumber}</p>
      <p className={classes.text}>{userData.userData.auth}</p>
      {/* <p className={classes.movie_social}> Amount to collect {props.amount}</p> */}
      {/* <footer>
        <div className="create-info">
          <div>
            <ProgressBar value={60} max={100} />
            <p>finish date: {props.date} </p>
          </div>
        </div>
      </footer> */}
    </div>
  );
};

export default UserTemplateCard;
