import React, { FC, useState } from "react";

// import * as data from "./projectLinks.json";
import "./style/projectNav.scss";
import Overview from './ProjectSubComponents/Overview'
import Rooms from './ProjectSubComponents/Rooms'
import Schedule from './ProjectSubComponents/Schedule'
import Activity from './ProjectSubComponents/Activity'
import Proposal from './ProjectSubComponents/Proposal'

// const links = JSON.parse(JSON.stringify(data)).links;

type Link = {
  label: string;
  
};




const ProjectsNav: FC = ({}) => {
const [renderedPage, setRenderedPage] = useState('Rooms')

  
  return (
    <>
      <nav className="projects-navbar-container">
        <div className="projects-link">Overview</div>
        <div className="projects-link">Rooms</div>
        <div className="projects-link">Schedule</div>
        <div className="projects-link">Activity</div>
        <div className="projects-link">Proposal</div>
        <div className="projects-navbar-vertical-divider" />
      </nav>
      <div>
        {renderedPage === 'Overview'?
        <Overview />:
        renderedPage === 'Rooms'?
        <Rooms />:
        renderedPage === 'Schedule'?
        <Schedule />:
        renderedPage === 'Activity'?
        <Activity />:
        renderedPage === 'Proposal'?
        <Proposal />:
        null
        }
      </div>
    </>
  );
};

export default ProjectsNav;
