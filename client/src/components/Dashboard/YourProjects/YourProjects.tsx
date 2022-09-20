import React, { FC, useCallback, useEffect, useState } from "react";
import { useAppSelector } from "../../../app/hooks";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "../../Modal/Modal";
import {
  FaPlus,
  FaChevronCircleLeft,
  FaChevronCircleRight,
  FaChevronRight,
} from "react-icons/fa";

import dataHolding from "./projectDetails";

// temporary data for UI purposes
import * as data from "./testProjectData.json";
import "../style/dashboard.scss";
import DashboardNav from "../DashboardPageLower/DashboardNav";

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

  const [projectDetails, setProjectDetails] = useState([]);

  const getAllProjects = () => {
    axios
      .post("http://localhost:1337/api/projects/account-projects/", {
        clientId: user.id,
      })
      .then((res) => {
        setProjectDetails(res.data.projects);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getAllProjects();
  }, []);

  const projectColors = ["#AC92EB", "#4FC1E8", "#A0D568"];

  const singleProject = projectDetails.map((project: any, index: any) => {
    const changeProject = () => {
      project.color =
        projectColors[index > projectColors.length - 1 ? 0 : index];
      dataHolding.getData(project);
    };
    const date = new Date(Date.parse(project.updatedAt)).toDateString();
    return (
      <div
        className="single-project"
        style={{
          backgroundColor:
            projectColors[index > projectColors.length - 1 ? 0 : index],
        }}
        onClick={() => {
          projectRoute();
          changeProject();
        }}
        key={index}
      >
        <span>
          Created: <strong>{date}</strong>
        </span>
        <span>
          Status: <strong>{project.status}</strong>
        </span>
        <div className="card-divider" />
        <h3>{project.name}</h3>
        <div className="view-details-block" key={index}>
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
      <DashboardNav />
      {openModal && (
        <Modal openModal={openModal} closeModal={setOpenModal} user={user} />
      )}
    </>
  );
};

export default YourProjects;
