import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import { FaPlus, FaChevronRight, FaFolderOpen } from 'react-icons/fa';
import {
    AiOutlineCloseCircle,
    AiOutlinePauseCircle,
    AiOutlineExclamationCircle,
    AiOutlinePlayCircle,
    AiOutlineClockCircle,
} from 'react-icons/ai';
import {
    IoIosArrowDropleftCircle,
    IoIosArrowDroprightCircle,
} from 'react-icons/io';
import { RiArchiveDrawerFill } from 'react-icons/ri';

import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { getAttachments, getProject, getUserProjects } from '../../../redux/actions/projectActions';
import Modal from '../../Modal/Modal';
import dataHolding from './projectDetails';
import DashboardNav from '../DashboardPageLower/DashboardNav';
import { setTheYourProjects } from '../../../redux/actions/projectActions';
import logging from 'config/logging';
import { getStatusClass } from 'app/utils';

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

    const [configureProjectCount, setConfigureProjectCount] = useState(0);
    const [completedProjectCount, setcompletedProjectCount] = useState(0);
    const [savedProjectCount, setSavedProjectCount] = useState(0);
    const [holdProjectCount, setHoldProjectCount] = useState(0);
    const [templateProjectCount, setTemplateProjectCount] = useState(0);

    // Scroll using arrows - Your Projects section
    const ref = useRef<HTMLDivElement>(null);
    const scroll = (scrollAmount: number) => {
        ref.current ? (ref.current.scrollLeft += scrollAmount) : null;
    };

    useEffect(() => {
        logging.info(user, 'YourProjects');
        dispatch(getUserProjects(user._id));

        let configureProjectsCount = 0;
        let completedProjectCountCount = 0;
        let savedProjectsCount = 0;
        let holdProjectsCount = 0;
        let templateProjectsCount = 0;

        if (filteredProjects?.length) {
            filteredProjects.forEach((project) => {
                switch (project.status) {
                    case 'Configure / Design':
                        configureProjectsCount = configureProjectsCount + 1;
                        break;
                    case 'RFP / Completed':
                        completedProjectCountCount = completedProjectCountCount + 1;
                        break;
                    case 'Saved Projects':
                        savedProjectsCount = savedProjectsCount + 1;
                        break;
                    case 'On Hold':
                        holdProjectsCount = holdProjectsCount + 1;
                        break;
                    case 'Template / New':
                        templateProjectsCount = templateProjectsCount + 1;
                        break
                }
            });

            setConfigureProjectCount(configureProjectsCount);
            setcompletedProjectCount(completedProjectCountCount);
            setSavedProjectCount(savedProjectsCount);
            setHoldProjectCount(holdProjectsCount);
            setTemplateProjectCount(templateProjectsCount);
        }
    }, [user._id, userProjects?.length]);

    const filteredProjects = userProjects?.filter(
        (project: any) => project.archived === false
    ) || [];
    const singleProject = filteredProjects.map((project: any, index: any) => {
        const changeProject = async (prodId: string) => {
            await dispatch(getProject({ _id: prodId }));
            await dispatch(getAttachments(prodId));
            
            dataHolding.getData(project);
        };
        const date = new Date(Date.parse(project.createdAt)).toDateString();

        return (
            <div
                className={`single-project ${getStatusClass(project.status)}`}
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
                        data-tip={`${project?.name} is awarded.`}
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
                        < FaFolderOpen className="overview-total overview-icon-main" />
                        <div className="overview-total-title overview-label-main">
                            Total Projects
                        </div>
                        <div className="overview-total-num overview-num-main">
                            {filteredProjects?.length}
                        </div>

                        <AiOutlineExclamationCircle className="overview-configure overview-icon" />
                        <div className="overview-configure-title overview-label">
                            Configure / Design
                        </div>
                        <div className="overview-configure-num overview-num">
                            {configureProjectCount}
                        </div>

                        <AiOutlinePlayCircle className="overview-completed overview-icon" />
                        <div className="overview-completed-title overview-label">
                            RFP / Completed
                        </div>
                        <div className="overview-completed-num overview-num">
                            {completedProjectCount}
                        </div>

                        <AiOutlinePauseCircle className="overview-saved overview-icon" />
                        <div className="overview-saved-title overview-label">
                           Saved Projects
                        </div>
                        <div className="overview-saved-num overview-num">
                            {savedProjectCount}
                        </div>

                        <AiOutlineCloseCircle className="overview-hold overview-icon" />
                        <div className="overview-hold-title overview-label">
                            On Hold
                        </div>
                        <div className="overview-hold-num overview-num">
                            {holdProjectCount}
                        </div>

                        <AiOutlineClockCircle className="overview-template overview-icon" />
                        <div className="overview-template-title overview-label">
                            Template / New
                        </div>
                        <div className="overview-template-num overview-num">
                            {templateProjectCount}
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
                        {singleProject?.length == 0 ? (
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
