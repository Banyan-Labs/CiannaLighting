import React, { FC, useState } from "react";

// import * as data from "./projectLinks.json";
import "./style/projectNav.scss";
import Overview from "./ProjectSubComponents/Overview";
import Rooms from "./ProjectSubComponents/Rooms";
import Schedule from "./ProjectSubComponents/Schedule";
import Activity from "./ProjectSubComponents/Activity";
import Proposal from "./ProjectSubComponents/Proposal";

const ProjectsNav: FC = () => {
  const [renderedPage, setRenderedPage] = useState("Rooms");

  return (
    <>
      <nav className="projects-navbar-container">
        <div
          className={
            renderedPage === "Overview"
              ? "projects-link  projects-active"
              : " projects-link projects-not-active"
          }
          onClick={() => setRenderedPage("Overview")}
        >
          Overview
        </div>
        <div
          className={
            renderedPage === "Rooms"
              ? "projects-link  projects-active"
              : " projects-link projects-not-active"
          }
          onClick={() => setRenderedPage("Rooms")}
        >
          Rooms
        </div>
        <div
          className={
            renderedPage === "Schedule"
              ? "projects-link  projects-active"
              : " projects-link projects-not-active"
          }
          onClick={() => setRenderedPage("Schedule")}
        >
          Schedule
        </div>
        <div
          className={
            renderedPage === "Activity"
              ? "projects-link  projects-active"
              : " projects-link projects-not-active"
          }
          onClick={() => setRenderedPage("Activity")}
        >
          Activity
        </div>
        <div
          className={
            renderedPage === "Proposal"
              ? "projects-link  projects-active"
              : " projects-link projects-not-active"
          }
          onClick={() => setRenderedPage("Proposal")}
        >
          Proposal
        </div>
        <div className="projects-navbar-vertical-divider" />
      </nav>
      <div>
        {renderedPage === "Overview" ? (
          <Overview />
        ) : renderedPage === "Rooms" ? (
          <Rooms />
        ) : renderedPage === "Schedule" ? (
          <Schedule />
        ) : renderedPage === "Activity" ? (
          <Activity />
        ) : renderedPage === "Proposal" ? (
          <Proposal />
        ) : null}
      </div>
    </>
  );
};

export default ProjectsNav;
