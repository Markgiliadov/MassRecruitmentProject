import React from "react";
import UserTemplateCard from "./UserTemplateCard";
import ProjectTemplateCard from "./ProjectTemplateCard";
const ListOfObjects = (data) => {
  let newArr = null;
  if (Object.values(data)) {
    console.log(Object.values(data)[0]);
    newArr = Object.values(data)[0].map((objData, index) => {
      console.log(objData, "SDSD");
      return (
        <div key={index}>
          {"auth" in objData ? (
            <UserTemplateCard userData={objData} />
          ) : (
            <ProjectTemplateCard projectData={objData} />
          )}
        </div>
      );
    });
  }
  return <>{newArr}</>;
};

export default ListOfObjects;
