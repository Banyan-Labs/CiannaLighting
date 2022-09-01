import React, { FC } from "react";
import { Navigate } from "react-router-dom";
import { AppProps } from "../../App";

import Navbar from "../Navbar/Navbar";
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
          <Navbar user={user} setUser={() => ""} />
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
