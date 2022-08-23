import React, { FC } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

import "./style/projects.scss";

const Projects: FC = ({}) => {
  const { user } = useParams();
  return (
    <>
      <Navbar user={user} />
      This is projects page.
    </>
  );
};

export default Projects;
