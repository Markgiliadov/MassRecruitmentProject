import React from "react";
import UserTemplateCard from "./UserTemplateCard";
import Project from "../components/ProjectCard/ProjectCard";
const ListOfObjects = (data) => {
  let newArr = null;
  if (Object.values(data)) {
    console.log(Object.values(data)[0]);
    newArr = Object.values(data)[0].map((objData, index) => {
      console.log(objData, "SDSD");
      return (
        <div key={index}>
          {"auth" in objData ? (
            <>
              <UserTemplateCard userData={objData} />
            </>
          ) : null}
        </div>
      );
    });
  }
  return <>{newArr}</>;
};

export default ListOfObjects;
