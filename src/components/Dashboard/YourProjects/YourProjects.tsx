import React, { FC, useCallback, useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { useNavigate } from 'react-router-dom';
import {
    getProject,
    getUserProjects,
} from '../../../redux/actions/projectActions';
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
    const projectRoute = useCallback(
        (projId: string) => {
            const to = `/projects/+?_id= ${user._id}&projectId=${projId}`;
            navigate(to);
        },
        [user.name, navigate]
    );

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
    const projectColors = ['#AC92EB', '#4FC1E8', '#A0D568', '#AC92EB'];

    // displays the 4 most recent projects.
    const latestProjects =
        userProjects.length > 4
            ? userProjects.slice(userProjects.length - 4).reverse()
            : userProjects;

    const singleProject = latestProjects.map((project: any, index: any) => {
        const color =
            projectColors[
                index > projectColors.length - 1
                    ? index - (userProjects.length - (projectColors.length + 1))
                    : index
            ];

        const changeProject = (prodId: string) => {
            dispatch(getProject(prodId));
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
                    projectRoute(project._id);
                    changeProject(project._id);
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
                    <div className="dashboard-vertical-divider" />
                    <div className="dashboard-project-overview-info">
                        <div>
                            <VscFileSubmodule id="all-your-projects" />
                            <div className="all-your-projects-title">
                                Total Projects
                            </div>
                            <div className="number-of-all-projects">
                                {userProjects.length}
                            </div>
                        </div>
                        <div>
                            <AiOutlineExclamationCircle id="new-projects" />
                            <div className="new-projects-title">New</div>
                            <div className="number-of-new-projects">
                                {newProjects}
                            </div>
                        </div>
                        <div>
                            <AiOutlinePauseCircle id="on-hold-projects" />
                            <div className="on-hold-projects-title">
                                On Hold
                            </div>
                            <div className="number-of-on-hold-projects">
                                {onHoldProjects}
                            </div>
                        </div>
                        <div>
                            <AiOutlineCloseCircle id="canceled-projects" />
                            <div className="canceled-projects-title">
                                Canceled
                            </div>
                            <div className="number-of-canceled-projects">
                                {canceledProjects}
                            </div>
                        </div>
                        <div>
                            <AiOutlineCheckCircle id="completed-projects" />
                            <div className="completed-projects-title">
                                Completed
                            </div>
                            <div className="number-of-completed-projects">
                                {completedProjects}
                            </div>
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
                <Modal
                    openModal={openModal}
                    closeModal={setOpenModal}
                    user={user}
                />
            )}
        </>
    );
};

export default YourProjects;
