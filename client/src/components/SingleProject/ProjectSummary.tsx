import React, { FC, useState, useEffect, SyntheticEvent } from 'react';
import { FaRegEdit, FaRegClone, FaCircle, FaArchive, FaFileAlt } from 'react-icons/fa';
import { RiArchiveDrawerFill } from 'react-icons/ri';
import { BsChevronLeft } from 'react-icons/bs';
import ReactTooltip from 'react-tooltip';

import {
    createProjectAction,
    getProject,
    getAllProjects,
    getUserProjects,
    setTheYourProjects,
    setRoomIdToDefault,
    getAttachments,
} from '../../redux/actions/projectActions';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { ProjectType } from '../Dashboard/DashboardPageLower/DashboardNav';
import { getAllRegions } from '../../redux/actions/filterActions';
import { LightREF } from '../../redux/reducers/projectSlice';
import Modal from '../Modal/Modal';
import InactiveNotification from '../InactiveNotification/InactiveNotification';
import { CopyType } from 'app/constants';
import { getStatusClass } from 'app/utils';
import ProjectAttachments from './ProjectAttachments';

interface ProjectSummaryProps {
    details: any;
    processing: boolean;
    setProcessing: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProjectSummary: FC<ProjectSummaryProps> = ({
    details,
    setProcessing,
}) => {
    const [openModal, setOpenModal] = useState(false);
    const [showAttachmentModal, setShowAttachmentModal] = useState(false);
    const [editProject, setEditProject] = useState(false);
    const { setInactive } = useAppSelector(({ project }) => project);
    const { user } = useAppSelector(({ auth: user }) => user);
    const dispatch = useAppDispatch();
    const [inactiveClearModal, setInactiveClearModal] =
        useState<boolean>(false);
    const [inactiveList, setInactiveList] = useState<LightREF[] | []>([]);
    const [projectHold, setProjectHold] = useState<ProjectType | null>(null);
    const inactiveModalTrigger = (): void => {
        setInactiveClearModal(true);
    };
    const clearInactiveModal = () => {
        setInactiveList([]);
        setProjectHold(null);
        setInactiveClearModal(false);
    };

    const inactiveLightCheck = (e: SyntheticEvent, project: ProjectType) => {
        e.preventDefault();

        let finalLightCheck: LightREF[] | [] = [];

        setInactive.forEach((item: string) => {
            const inactive = project.lightIDs?.find(
                (light: LightREF) => light.item_ID === item
            );

            if (inactive && inactive !== undefined) {
                finalLightCheck = [...finalLightCheck, inactive];
            }

            return item;
        });
        if (finalLightCheck && finalLightCheck.length) {
            setInactiveList(finalLightCheck);
            setProjectHold(project);
            inactiveModalTrigger();

            return true;
        } else {
            copyOfProject(e, project);

            return false;
        }
    };
    const copyOfProject = async (e: SyntheticEvent, proj: ProjectType) => {
        e.preventDefault();
        // FIND PROJECT WITH AXIOS
        setProcessing(true);

        const payload = {
            project: {
                ...proj,
                clientId: user._id,
                clientName: user.name,
            },
            copy: CopyType.PROJECT
        };

        try {
            const response = await dispatch(
                createProjectAction(payload)
            );

            dispatch(getUserProjects(user._id));
            dispatch(getAllProjects());
            setProcessing(false);
            alert(`Copy of ${proj.name} created in your dashboard.`);

            return response;
        } catch (error: any) {
            throw new Error(error.message);
        }
    };

    const archiveSet = async (e: any) => {
        e.preventDefault();

        try {
            await dispatch(
                getProject({
                    _id: details._id,
                    archived: !details.archived,
                    activity: details.archived ? 'Restore' : 'Archive',
                })
            );
            await dispatch(getAttachments(details._id));

            details?.archived === true
                ? alert('This project was restored')
                : alert('This project was marked as awarded');
        } catch (error: any) {
            alert('Can not mark project as awarded.');
            throw new Error(error.message);
        }
    };

    const showAttachments = async () => {
        await dispatch(getAttachments(details._id));
        setShowAttachmentModal(true);
    };

    useEffect(() => {
        dispatch(getAllRegions());
        dispatch(setRoomIdToDefault());
    }, []);

    const date = new Date(Date.parse(details?.createdAt)).toDateString();

    return (
        <div className="project-summary-container col-12">
            <div className="d-flex justify-content-between align-items-center mt-2 back-button-container mx-4">
                <div className="back-to-project">
                    <a
                        className="back-to-all-projects"
                        onClick={() => dispatch(setTheYourProjects(false))}
                    >
                        <BsChevronLeft className="chevron-icon" /> Back to Projects
                    </a>
                </div>
                <div className="project-summary-status">
                    <p className="status">Status: {details?.status}</p>
                </div>
            </div>
            <div className="projects-summary mx-4">
                <div className="col-7 d-flex justify-content-between">
                    <div className="project-summary-name-and-date">
                        <h3 className="align-items-center d-flex justify-content-between project-summary-project-name">
                            <div className="project-title-with-status-icon">
                                {details?.name}
                                <FaCircle
                                    className={`circle-icon ${getStatusClass(details?.status || '')} background-unset`}
                                />
                            </div>
                            {
                                details?.archived && (
                                    <RiArchiveDrawerFill
                                        data-for="ab"
                                        data-tip="Awarded"
                                        className="archive-show-option"
                                    />
                                )
                            }

                        </h3>
                        <p className="project-summary-date">Created: {date}</p>
                    </div>
                    <div className="icon-container d-flex align-items-center justify-content-center">
                        {
                            !details?.archived && (
                                <FaRegEdit
                                    onClick={() => {
                                        setOpenModal(true);
                                        setEditProject(true);
                                    }}
                                    className="edit-icon"
                                    data-for="edit"
                                    data-tip="Edit Project"
                                />
                            )
                        }
                        <FaRegClone
                            data-for="copy"
                            data-tip="Copy Project"
                            className="clone-icon"
                            onClick={(e) => inactiveLightCheck(e, details)}
                        />
                        <FaArchive
                            data-for="archive"
                            data-tip={
                                details?.archived === true
                                    ? 'Restore'
                                    : 'Mark awarded'
                            }
                            className="clone-icon"
                            onClick={(e) => archiveSet(e)}
                        />
                        <FaFileAlt
                            data-for="archive"
                            data-tip="Attachments"
                            className="archive-icon"
                            onClick={() => showAttachments()}
                        />

                        <ReactTooltip id="ab" />
                        <ReactTooltip id="copy" />
                        <ReactTooltip id="edit" />
                        <ReactTooltip id="archive" />
                    </div>
                </div>
                <div className="project-summary-text-container">
                    <p>Description:</p>
                    <p className="project-summary-description-text">
                        {details?.description}
                    </p>
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
            {showAttachmentModal && (
                <ProjectAttachments
                    openModal={showAttachmentModal}
                    closeModal={setShowAttachmentModal}
                    projectId={details?._id}
                />
            )}
            {inactiveClearModal && (
                <InactiveNotification
                    inactiveList={inactiveList}
                    projectHold={projectHold}
                    clearInactiveModal={clearInactiveModal}
                    copyOfProject={copyOfProject}
                />
            )}
        </div>
    );
};

export default ProjectSummary;
