import ProjectsNav from "./ProjectPageLower/ProjectsNav";
import React, { FC } from "react";
import { Navigate } from "react-router-dom";
import { AppProps } from "../../App";
import ProjectSummary from "./ProjectSummary";
import ProjectAttachments from "./ProjectAttachments";

import dataHolding from "../Dashboard/YourProjects/projectDetails";

import "./style/projects.scss";
import RoomDetails from "../Rooms/RoomDetails";

const Projects: FC<AppProps> = ({ user }) => {
  let details = dataHolding.setData();
  return (
    <>
      {Object.keys(user).length === 0 ? (
        <Navigate to="/login" />
      ) : (
        <>
          <div className="projects-top-half">
            <ProjectSummary user={user} details={details} />
            {/* <RoomDetails /> */}
            <ProjectAttachments />
          </div>
          <div>
            <ProjectsNav />
          </div>
        </>
      )}
    </>
  );
};
export default Projects;
