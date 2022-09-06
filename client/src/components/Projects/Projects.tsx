import React, { FC } from "react";
import { Navigate } from "react-router-dom";
import { AppProps } from "../../App";

import ProjectSummary from "./ProjectSummary";
import ProjectAttachments from "./ProjectAttachments";

import "./style/projects.scss";

const Projects: FC<AppProps> = ({ user }) => {
  return (
    <>
      {Object.keys(user).length === 0 ? (
        <Navigate to="/login" />
      ) : (
        <>
          <div className="projects-top-half">
            <ProjectSummary />
            <ProjectAttachments />
          </div>
        </>
      )}
    </>
  );
};

export default Projects;
