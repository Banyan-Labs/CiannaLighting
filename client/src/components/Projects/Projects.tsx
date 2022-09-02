import React, { FC } from "react";
import ProjectAttachments from "./ProjectAttachments";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import ProjectSummary from "./ProjectSummary";
import ProjectsNav from "./ProjectPageLower/ProjectsNav";
import "./style/projects.scss";


const Projects: FC = ({}) => {
  const { user } = useParams();
  
  return (
    <>
      <Navbar user={user} setUser={() => ""} />
      <div className="projects-top-half">
        <ProjectSummary />
        <ProjectAttachments />
      </div>
      <div>
        <ProjectsNav />
      </div>
     
    
    </>
  );
};

export default Projects;
