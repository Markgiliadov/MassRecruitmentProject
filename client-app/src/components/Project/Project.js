import React from "react";
import "./Project.module.css";
import styled from "styled-components";

const ProjectCContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 280px;
  box-shadow: 0 3px 10px 0 #aaa;
  cursor: pointer;
`;
const CoverImage = styled.img`
  object-fit: cover;
  height: 250px;
`;
const ProjectName = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: black;
  margin: 15px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const InfoColumn = styled.div`
  display: flex;
  flex-direction: col;
  justify-content: space-between;
`;
const ProjectInfo = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: black;
  white-space: nowrap;
  overflow: hidden;
  text-transform: capitalize;
  text-overflow: ellipsis;
`;
const Project = (props) => {
  //   const { name, img, info } = props.project;

  return (
    <ProjectCContainer>
      <CoverImage
        src="https://earthsky.org/upl/2018/06/ocean-apr27-2020-Cidy-Chai-North-Pacific-scaled-e1591491800783.jpeg"
        alt=""
      />
      <ProjectName>Memory Card - HP</ProjectName>
      <InfoColumn>
        <ProjectInfo> abc ehjkf dlkd;slkd </ProjectInfo>
        <ProjectInfo>
          <i className="fa-solid fa-location-dot" />
          Israel
        </ProjectInfo>
      </InfoColumn>
    </ProjectCContainer>
  );
};
export default Project;
