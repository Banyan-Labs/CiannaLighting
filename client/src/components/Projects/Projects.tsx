import React, { FC } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

import "./style/projects.scss";

const Projects: FC = ({}) => {
  const { user } = useParams();
  return (
    <>
      <Navbar user={user} setUser={() => ""} />
      This is projects page.
    </>
  );
};

export default Projects;
