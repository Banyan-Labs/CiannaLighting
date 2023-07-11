import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import { FaPlus, FaChevronRight } from 'react-icons/fa';
import { VscFileSubmodule } from 'react-icons/vsc';
import {
    AiOutlineCheckCircle,
    AiOutlineCloseCircle,
    AiOutlinePauseCircle,
    AiOutlineExclamationCircle,
    AiOutlinePlayCircle
} from 'react-icons/ai';
import {
    IoIosArrowDropleftCircle,
    IoIosArrowDroprightCircle,
} from 'react-icons/io';
import { RiArchiveDrawerFill } from 'react-icons/ri';

import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { getProject, getUserProjects } from '../../../redux/actions/projectActions';
import Modal from '../../Modal/Modal';
import dataHolding from './projectDetails';
import DashboardNav from '../DashboardPageLower/DashboardNav';
import { setSpecFile } from '../../../redux/actions/lightActions';
import { setTheYourProjects } from '../../../redux/actions/projectActions';
import logging from 'config/logging';
import { findClosestSystemStatus } from 'app/utils';

import '../style/dashboard.scss';

const YourProjects: FC = () => {
    const { user } = useAppSelector(({ auth: user }) => user);
    const { userProjects } = useAppSelector(({ project }) => project);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [openModal, setOpenModal] = useState(false);
    const [editProject, setEditProject] = useState(false);

    const projectRoute = useCallback(
        (projId: string) => {
            const to = `/projects/+?_id= ${user._id}&projectId=${projId}`;
            navigate(to);
        },
        [user.name, navigate]
    );

    const [newProjects, setNewProjects] = useState(0);
    const [inProgressProjects, setInProgressProjects] = useState(0);
    const [onHoldProjects, setOnHoldProjects] = useState(0);
    const [canceledProjects, setCanceledProjects] = useState(0);
    const [completedProjects, setCompletedProjects] = useState(0);

    // Scroll using arrows - Your Projects section
    const ref = useRef<HTMLDivElement>(null);
    const scroll = (scrollAmount: number) => {
        ref.current ? (ref.current.scrollLeft += scrollAmount) : null;
    };

    useEffect(() => {
        logging.info(user, 'YourProjects');
        dispatch(getUserProjects(user._id));

        let newProjectsNumber = 0;
        let onHoldProjectsNumber = 0;
        let canceledProjectsNumber = 0;
        let completedProjectsNumber = 0;
        let inProgressProjectsNumber = 0;

        if (userProjects.length != 0) {
            userProjects.map((project) => {
                const closestSystemStatus = findClosestSystemStatus(project.status);

                switch (closestSystemStatus) {
                    case 'New':
                        newProjectsNumber = newProjectsNumber + 1;
                        break;
                    case 'Complete':
                        completedProjectsNumber = completedProjectsNumber + 1;
                        break;
                    case 'Hold':
                        onHoldProjectsNumber = onHoldProjectsNumber + 1;
                        break;
                    case 'Cancel':
                        canceledProjectsNumber = canceledProjectsNumber + 1;
                        break;
                    default:
                        inProgressProjectsNumber = inProgressProjectsNumber + 1;
                }
            });

            setNewProjects(newProjectsNumber);
            setInProgressProjects(inProgressProjectsNumber);
            setOnHoldProjects(onHoldProjectsNumber);
            setCanceledProjects(canceledProjectsNumber);
            setCompletedProjects(completedProjectsNumber);
        }
    }, [user._id, userProjects.length]);

    const singleProject = userProjects.map((project: any, index: any) => {
        const changeProject = async (prodId: string) => {
            await dispatch(getProject({ _id: prodId }));
            await dispatch(
                setSpecFile({ projId: prodId, edit: '' }, false)
            );
            dataHolding.getData(project);
        };
        const date = new Date(Date.parse(project.createdAt)).toDateString();

        return (
            <div
                className={`single-project statusColor${findClosestSystemStatus(project.status)}`}
                onClick={async () => {
                    await dispatch(setTheYourProjects(true));
                    changeProject(project._id);
                    projectRoute(project._id);

                }}
                key={index}
            >
                <span>
                    Created: <strong>{date}</strong>
                </span>
                <div className="d-flex align-items-end justify-content-between">
                    <span>
                        Status: <strong>{project.status}</strong>
                    </span>

                    <RiArchiveDrawerFill
                        data-for="ab"
                        data-tip={`${project?.name} is archived`}
                        className={
                            project?.archived
                                ? 'archive-icon archive-show-option'
                                : 'd-none'
                        }
                    />

                    <ReactTooltip id="ab" />
                </div>
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
    })
        .reverse();

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
                        {/* In Progress Projects */}
                        <AiOutlinePlayCircle className="overview-in-progress overview-icon" />
                        <div className="overview-in-progress-title overview-label">
                            In Progress
                        </div>
                        <div className="overview-in-progress-num overview-num">
                            {inProgressProjects}
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
                        <FaPlus className="submit-icon" />
                        <span className="dashboard-new-project-sub-text">
                            New Project
                        </span>
                    </button>
                    <div className="your-projects-icons">
                        <IoIosArrowDropleftCircle
                            id="your-project-icons-left"
                            className="your-projects-buttons"
                            onClick={() => {
                                scroll(-200);
                            }}
                        />

                        <IoIosArrowDroprightCircle
                            className="your-projects-buttons"
                            onClick={() => {
                                scroll(200);
                            }}
                        />
                    </div>

                    <div className="your-projects-section" ref={ref}>
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
                    editProject={editProject}
                    setEditProject={setEditProject}
                />
            )}
        </>
    );
};

export default YourProjects;
