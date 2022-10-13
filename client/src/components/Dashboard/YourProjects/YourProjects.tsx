import React, { FC, useCallback, useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { useNavigate } from 'react-router-dom';
import { getUserProjects } from '../../../redux/actions/projectActions';
import Modal from '../../Modal/Modal';
import {
    FaPlus,
    FaChevronCircleLeft,
    FaChevronCircleRight,
    FaChevronRight,
} from 'react-icons/fa';
import { VscFileSubmodule } from 'react-icons/vsc';
import {
    AiOutlineCheckCircle,
    AiOutlineCloseCircle,
    AiOutlinePauseCircle,
    AiOutlineExclamationCircle,
} from 'react-icons/ai';

import dataHolding from './projectDetails';

import '../style/dashboard.scss';
import DashboardNav from '../DashboardPageLower/DashboardNav';

const YourProjects: FC = () => {
    const { user } = useAppSelector(({ auth: user }) => user);
    const { userProjects } = useAppSelector(({ project }) => project);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [openModal, setOpenModal] = useState(false);
    const projectRoute = useCallback(() => {
        const to = `/projects/${user.name}`;
        navigate(to);
    }, [user.name, navigate]);

    const [newProjects, setNewProjects] = useState(0);
    const [onHoldProjects, setOnHoldProjects] = useState(0);
    const [canceledProjects, setCanceledProjects] = useState(0);
    const [completedProjects, setCompletedProjects] = useState(0);

    useEffect(() => {
        dispatch(getUserProjects(user._id));
        let newProjectsNumber = 0;
        let onHoldProjectsNumber = 0;
        let canceledProjectsNumber = 0;
        let completedProjectsNumber = 0;

        if (userProjects.length != 0) {
            userProjects.map((project) => {
                if (project.status == 'New') {
                    newProjectsNumber = newProjectsNumber + 1;
                } else if (project.status == 'Hold') {
                    onHoldProjectsNumber = onHoldProjectsNumber + 1;
                } else if (project.status == 'Canceled') {
                    canceledProjectsNumber = canceledProjectsNumber + 1;
                } else if (project.status == 'Completed') {
                    completedProjectsNumber = completedProjectsNumber + 1;
                }
            });
            setNewProjects(newProjectsNumber);
            setOnHoldProjects(onHoldProjectsNumber);
            setCanceledProjects(canceledProjectsNumber);
            setCompletedProjects(completedProjectsNumber);
        }
    }, [user._id]);
    const projectColors = ['#AC92EB', '#4FC1E8', '#A0D568'];

    // displays the 4 most recent projects.
    const latestProjects = userProjects.slice(userProjects.length - 4);

    const singleProject = latestProjects.map((project: any, index: any) => {
        const color =
            projectColors[
                index > projectColors.length - 1
                    ? index - (userProjects.length - (projectColors.length + 1))
                    : index
            ];
        const changeProject = () => {
            dataHolding.getData(project, color);
        };
        const date = new Date(Date.parse(project.createdAt)).toDateString();
        return (
            <div
                className="single-project"
                style={{
                    backgroundColor: color,
                    borderTop: '1px solid #3c3c3c',
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
                        View Details{' '}
                        <FaChevronRight className="view-details-chevron" />
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
                    <div className="overview-vertical-divider" />
                    {/* Grid for project overview */}
                    <div className="overview-display">
                        {/* Total Projects */}
                        <VscFileSubmodule className="overview-total overview-icon-main" />
                        <div className="overview-total-title overview-label-main">
                            Total Projects
                        </div>
                        <div className="overview-total-num overview-num-main">
                            {userProjects.length}
                        </div>
                        {/* New Projects */}
                        <AiOutlineExclamationCircle className="overview-new overview-icon" />
                        <div className="overview-new-title overview-label">
                            New
                        </div>
                        <div className="overview-new-num overview-num">
                            {newProjects}
                        </div>
                        {/* On Hold Projects */}
                        <AiOutlinePauseCircle className="overview-hold overview-icon" />
                        <div className="overview-hold-title overview-label">
                            On Hold
                        </div>
                        <div className="overview-hold-num overview-num">
                            {onHoldProjects}
                        </div>
                        {/* Canceled Projects */}
                        <AiOutlineCloseCircle className="overview-canceled overview-icon" />
                        <div className="overview-canceled-title overview-label">
                            Canceled
                        </div>
                        <div className="overview-canceled-num overview-num">
                            {canceledProjects}
                        </div>
                        {/* Completed Projects */}
                        <AiOutlineCheckCircle className="overview-completed overview-icon" />
                        <div className="overview-completed-title overview-label">
                            Completed
                        </div>
                        <div className="overview-completed-num overview-num">
                            {completedProjects}
                        </div>
                    </div>
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
                    <span className="dashboard-new-project-sub-text">
                        New Project
                    </span>
                    <div className="your-projects-icons">
                        <FaChevronCircleLeft id="your-project-icons-left" />

                        <FaChevronCircleRight />
                    </div>

                    <div className="your-projects-section">
                        {singleProject}
                        {singleProject.length == 0 ? (
                            <div className="your-projects-none">
                                <span>You have no projects.</span>
                            </div>
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
            </div>
            <DashboardNav />
            {openModal && (
                <Modal openModal={openModal} closeModal={setOpenModal} />
            )}
        </>
    );
};

export default YourProjects;
