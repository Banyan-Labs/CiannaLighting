import React, { FC, useCallback, useEffect, useState } from "react";
import { useAppSelector } from "../../../app/hooks";
import { useNavigate } from "react-router-dom";
import Modal from "../../Modal/Modal";
import {
  FaPlus,
  FaChevronCircleLeft,
  FaChevronCircleRight,
  FaChevronRight,
} from "react-icons/fa";

// temporary data for UI purposes
import * as data from "./testProjectData.json";
import "../style/dashboard.scss";

const YourProjects: FC = () => {
  const { user } = useAppSelector(({ auth: user }) => user);
  const navigate = useNavigate();

  useEffect(() => {
    !user && navigate("/login" + user.name);
  }, [user]);

  const [openModal, setOpenModal] = useState(false);
  const projectRoute = useCallback(() => {
    const to = `/projects/${user.name}`;
    navigate(to);
  }, [user.name, navigate]);

  const testProjectData = JSON.parse(JSON.stringify(data)).data;
  const singleProject = testProjectData.map((project: any) => {
    project["key"] = project.name;
    return (
      <div
        className="single-project"
        style={{ backgroundColor: project.color }}
        onClick={projectRoute}
      >
        <span>
          Created: <strong>{project.date_created}</strong>
        </span>
        <span>
          Status: <strong>{project.status}</strong>
        </span>
        <div className="card-divider" />
        <h3>{project.name}</h3>
        <div className="view-details-block">
          <span>
            View Details <FaChevronRight className="view-details-chevron" />
          </span>
        </div>
      </div>
    );
  });

  return (
    <>
      <div className="dashboard-container">
        <div className="dashboard-project-overview">
          <h4>Project Overview</h4>
          <div className="dashboard-vertical-divider" />
        </div>
        <div className="dashboard-your-projects">
          <h4>Your Projects</h4>
          <div className="dashboard-vertical-divider" />
          <button
            className="dashboard-new-project-button"
            onClick={() => {
              setOpenModal(true);
            }}
          >
            <FaPlus />
          </button>
          <span className="dashboard-new-project-sub-text">New Project</span>
          <div className="your-projects-icons">
            <FaChevronCircleLeft id="your-project-icons-left" />

            <FaChevronCircleRight />
          </div>

          <div className="your-projects-section">
            {singleProject}
            <div className="your-projects-none">
              <span>You have no other projects.</span>
            </div>
          </div>
        </div>
      </div>
      <div className="lower-section-links">
        <a href="/all-projects" id="all-projects">
          All Projects
        </a>
        <a href="/archived" id="archived">
          Archived
        </a>
      </div>
      <div className="lower-section-table">No data to display.</div>
      {openModal && (
        <Modal openModal={openModal} closeModal={setOpenModal} user={user} />
      )}
    </>
  );
};

export default YourProjects;
