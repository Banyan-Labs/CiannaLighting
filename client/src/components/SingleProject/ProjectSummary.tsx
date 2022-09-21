import React, { FC } from "react";
import { FaRegEdit, FaRegClone, FaCircle, FaArchive } from "react-icons/fa";
import { BsChevronLeft } from "react-icons/bs";
import { AppProps } from "../../App";
import { Link } from "react-router-dom";

interface ProjectSummaryProps {
  user: AppProps[];
  details: any;
}

const ProjectSummary: FC<ProjectSummaryProps> = ({ user, details }) => {
  const date = new Date(Date.parse(details.createdAt)).toDateString();
  return (
    <div className="project-summary-container">
      <div className="projects-summary">
        <div className="back-to-projects">
          <Link to={`/projects/all/${user}`}>
            <BsChevronLeft className="chevron-icon" /> Back to Projects
          </Link>
        </div>
        <div className="project-summary-top-bar">
          <div className="project-summary-name-and-date">
            <h3 className="project-summary-project-name">
              {details.name}
              <FaCircle
                className="circle-icon"
                style={{ color: details.color }}
              />
            </h3>
            <p className="project-summary-date">Created: {date}</p>
          </div>
          <div className="project-summary-icons">
            <FaRegEdit className="edit-icon" />
            <div></div>
            <FaRegClone className="clone-icon" />
            <div></div>
            <FaArchive className="archive-icon" />
          </div>
          <div className="project-summary-status">
            <p className="status">Status: {details.status}</p>
          </div>
        </div>
        <div className="project-summary-text-container">
          <p>Description:</p>
          <p className="project-summary-description-text">
            {details.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectSummary;
