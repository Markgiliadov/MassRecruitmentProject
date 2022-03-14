import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import classes from "./Administrator.module.css";
import ListOfObjects from "../../ObjectListTemplate/ListOfObjects";

const Administrator = (props) => {
  const [tempArr, setTempArr] = useState([]);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getDataFromDB();
    setTempArr([...tempArr, "hi1", "hi2", "hi3"]);
  }, []);
  const getDataFromDB = async () => {
    const reqUsers = await fetch("http://localhost:1338/api/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
    });
    const reqProjects = await fetch("http://localhost:1338/api/projects", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const dataUsers = await reqUsers.json();
    const dataProjects = await reqProjects.json();
    if (dataUsers.status === "ok") {
      console.log(dataProjects.projects);
      console.log(dataUsers.users);
      console.log(typeof dataProjects.projects);
      console.log(typeof dataUsers.users);
      setUsers(dataUsers.users);
      if (dataProjects.status === "ok") setProjects(dataProjects.projects);
    } else {
      alert("ERR");
    }
  };

  return (
    <>
      <h1 className={classes.h1}>List of users</h1>
      <div style={{ display: "flex", overflowX: "scroll" }}>
        {/* {users ?  */}
        <ListOfObjects data={users} />
        {/* : <>None</>} */}
      </div>
      <h1 className={classes.h1}>List of projects</h1>
      <div style={{ display: "flex", overflowX: "scroll" }}>
        <ListOfObjects data={projects} />
      </div>
    </>
  );
};

export default Administrator;
