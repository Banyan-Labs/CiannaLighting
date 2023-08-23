import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import { FaChevronRight, FaFolderOpen } from 'react-icons/fa';
import { RiAddLine, RiArchiveDrawerFill } from 'react-icons/ri';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import {
    getProject,
    getUserProjects,
} from '../../../redux/actions/projectActions';
import Modal from '../../Modal/Modal';
import dataHolding from './projectDetails';
import { setTheYourProjects } from '../../../redux/actions/projectActions';
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
            const to = `/project/+?_id= ${user._id}&projectId=${projId}`;
            navigate(to);
        },
        [user.name, navigate]
    );

    const [configureProjectCount, setConfigureProjectCount] = useState(0);
    const [completedProjectCount, setcompletedProjectCount] = useState(0);
    const [savedProjectCount, setSavedProjectCount] = useState(0);
    const [holdProjectCount, setHoldProjectCount] = useState(0);
    const [templateProjectCount, setTemplateProjectCount] = useState(0);

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
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
                        completedProjectCountCount =
                            completedProjectCountCount + 1;
                        break;
                    case 'Saved Projects':
                        savedProjectsCount = savedProjectsCount + 1;
                        break;
                    case 'On Hold':
                        holdProjectsCount = holdProjectsCount + 1;
                        break;
                    case 'Template / New':
                        templateProjectsCount = templateProjectsCount + 1;
                        break;
                }
            });

            setConfigureProjectCount(configureProjectsCount);
            setcompletedProjectCount(completedProjectCountCount);
            setSavedProjectCount(savedProjectsCount);
            setHoldProjectCount(holdProjectsCount);
            setTemplateProjectCount(templateProjectsCount);
        }
    }, [userProjects?.length]);

    const filteredProjects =
        userProjects?.filter((project: any) => project.archived === false) ||
        [];
    const singleProject = filteredProjects
        .map((project: any, index: any) => {
            const changeProject = async (prodId: string) => {
                await dispatch(getProject({ _id: prodId }));

                dataHolding.getData(project);
            };
            const date = new Date(Date.parse(project.createdAt)).toDateString();

            return (
                <div
                    className={`single-project m-3 ${getStatusClass(
                        project.status
                    )}`}
                    onClick={async () => {
                        await dispatch(setTheYourProjects(true));
                        changeProject(project._id);
                        projectRoute(project._id);
                    }}
                    key={index}
                >
                    <div className="d-flex flex-column">
                        <span>
                            Created: <strong>{date}</strong>
                        </span>
                        <span>
                            Status: <strong>{project.status}</strong>
                        </span>
                    </div>
                    <div className="d-flex align-items-end justify-content-between">

                        {
                            project.archived && (
                                <>
                                    <RiArchiveDrawerFill
                                        data-for="ab"
                                        data-tip={`${project?.name} is awarded.`}
                                        className="archive-icon archive-show-option"
                                    />

                                    <ReactTooltip id="ab" />
                                </>
                            )
                        }
                    </div>
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
                <div className="dashboard-project-overview mx-5 no-wrap">
                    <div className="align-items-center d-flex flex-row">
                        <h4>My Projects</h4>
                        <div className="overview-vertical-divider mx-5" />
                        <FaFolderOpen className="overview-icon-main mx-1" />
                        <div className="align-items-baseline overview-configure-title">
                            Total Projects
                            <div className="mx-2 num">
                                {filteredProjects?.length}
                            </div>
                        </div>
                    </div>
                    <div className="align-items-center d-flex flex-row flex-wrap">
                        <div className="align-items-baseline d-flex flex-row mx-2">
                            <div className="overview-configure-title overview-label">
                                Configure / Design
                            </div>
                            <div className="mx-2 num">
                                {configureProjectCount}
                            </div>
                        </div>
                        <div className="align-items-baseline d-flex flex-row mx-2">
                            <div className="overview-completed-title overview-label">
                                RFP / Completed
                            </div>
                            <div className="mx-2 num">
                                {completedProjectCount}
                            </div>
                        </div>
                        <div className="align-items-baseline d-flex flex-row mx-2">
                            <div className="overview-saved-title overview-label">
                                Saved Projects
                            </div>
                            <div className="mx-2 num">
                                {savedProjectCount}
                            </div>
                        </div>
                        <div className="align-items-baseline d-flex flex-row mx-2">
                            <div className="overview-hold-title overview-label">
                                On Hold
                            </div>
                            <div className="mx-2 num">
                                {holdProjectCount}
                            </div>
                        </div>
                        <div className="align-items-baseline d-flex flex-row mx-2">
                            <div className="overview-template-title overview-label">
                                Template / New
                            </div>
                            <div className="mx-2 num">
                                {templateProjectCount}
                            </div>
                        </div>
                    </div>
                    <div>
                        <button className="align-items-center d-flex flex-row room-button ms-2 p-3" onClick={() => {
                            setOpenModal(true);
                        }}>
                            <RiAddLine className="add-sign me-1" />
                            New Project
                        </button>
                    </div>
                </div>
                <div className="your-rooms mx-5">
                    <div className="your-rooms-section d-flex flex-wrap" ref={ref}>
                        {singleProject}
                        {singleProject?.length === 0 && (
                            <div className="your-projects-none">
                                <span>No active projects at this time.</span>
                            </div>
                        )}
                    </div>

                </div>
            </div>

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
