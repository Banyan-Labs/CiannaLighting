import React, { FC, useCallback, useEffect, useState } from "react";
import { AppProps } from "../../App";
import { useAppSelector } from "../../app/hooks";
import "./style/dashboard.scss";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Modal from "../Modal/Modal";
import {
  FaPlus,
  FaChevronCircleLeft,
  FaChevronCircleRight,
  FaAngleRight,
  FaChevronRight,
} from "react-icons/fa";

import "./style/dashboard.scss";
const Dashboard: FC = () => {
  const { user } = useAppSelector(({ auth: user }) => user);
  const navigate = useNavigate();

  useEffect(() => {
    !user && navigate("/login" + user.name);
  }, [user]);
  const testProjectData = [
    {
      name: "Salt Lake Temple",
      color: "#AC92EB",
      status: "New",
      description:
        "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam …",
      date_created: "08-02-2022",
      activity: [],
      rooms: [
        { name: "", description: "", lights: [] },
        { name: "", description: "", lights: [] },
      ],
      attachments: [],
      rfp: {
        header: "",
        schedule: "",
        scope: "",
        bid: "",
        submittals: "",
        quality_standards: "",
        contact_info: "",
      },
    },
    {
      name: "Name of Project",
      color: "#4FC1E8",
      status: "Canceled",
      description:
        "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam …",
      date_created: "08-02-2022",
      activity: [],
      rooms: [
        { name: "", description: "", lights: [] },
        { name: "", description: "", lights: [] },
      ],
      attachments: [],
      rfp: {
        header: "",
        schedule: "",
        scope: "",
        bid: "",
        submittals: "",
        quality_standards: "",
        contact_info: "",
      },
    },
  ];

  const [openModal, setOpenModal] = useState(false);
  const projectRoute = useCallback(() => {
    const to = `/projects/${user.name}`;
    navigate(to);
  }, [user.name, navigate]);

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
      {user.isAuth === true ? (
        <div style={{ paddingTop: "110px" }}>This is the dashboard.</div>
      ) : (
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
                <FaPlus /> <span>New Project</span>
              </button>
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
            <a id="view-all" href="/projects/all">
              View All <FaAngleRight id="view-all-angle-right" />
            </a>
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
            <Modal
              openModal={openModal}
              closeModal={setOpenModal}
              user={user}
            />
          )}
        </>
      )}
    </>
  );
};

export default Dashboard;
