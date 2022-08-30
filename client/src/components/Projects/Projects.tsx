import React, { FC } from "react";
import { Navigate } from "react-router-dom";
import { AppProps } from "../../App";

import "./style/projects.scss";

const Projects: FC<AppProps>= ({user}) => {
  
  return (
    <>
      {Object.keys(user).length === 0 ? (
        <Navigate to="/login"/>
      ) : (
        <>This is the projects page.</>
      )}
    </>
  );
};

export default Projects;
