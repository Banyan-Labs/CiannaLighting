import React, { FC, useState, useEffect, SyntheticEvent, useCallback } from 'react';
import { FaRegEdit, FaRegClone, FaArchive, FaFileAlt } from 'react-icons/fa';
import { RiAddLine } from 'react-icons/ri';

import { BsChevronLeft } from 'react-icons/bs';
import ReactTooltip from 'react-tooltip';
import { useNavigate } from 'react-router-dom';

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
import ProjectAttachments from './ProjectAttachments';
import { setAlertOpen, setAlertMessage } from 'redux/reducers/modalSlice';
import Activity from './ProjectPageLower/ProjectSubComponents/Activity';
import Proposal from './ProjectPageLower/ProjectSubComponents/Proposal';
import IdRooms from './ProjectPageLower/ProjectSubComponents/AllRooms/IdRooms';
import { NewRoomModal } from 'components/NewRoomModal/NewRoomModal';

interface ProjectSummaryProps {
    details: any;
    processing: boolean;
    setProcessing: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProjectSummary: FC<ProjectSummaryProps> = ({
    details,
    setProcessing,
    processing
}) => {
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(false);
    const [showAttachmentModal, setShowAttachmentModal] = useState(false);
    const [editProject, setEditProject] = useState(false);
    const [openRoomModal, setOpenRoomModal] = useState(false);
    const [renderedPage, setRenderedPage] = useState('Rooms');
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
            copy: CopyType.PROJECT,
        };

        try {
            const response = await dispatch(createProjectAction(payload));

            dispatch(getUserProjects(user._id));
            dispatch(getAllProjects());
            setProcessing(false);
            dispatch(setAlertOpen({ isOpen: true }));
            dispatch(
                setAlertMessage({
                    alertMessage: `Copy of ${proj.name} created in your dashboard.`
                })
            );

            // alert(`Copy of ${proj.name} created in your dashboard.`);

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

            const alertMessage =
                details?.archived === true
                    ? 'This project was restored.'
                    : 'This project was marked as awarded.';

            dispatch(setAlertOpen({ isOpen: true }));
            dispatch(setAlertMessage({ alertMessage }));

            // ? alert('This project was restored')
            // : alert('This project was marked as awarded');
        } catch (error: any) {
            dispatch(setAlertOpen({ isOpen: true }));
            dispatch(
                setAlertMessage({
                    alertMessage: 'Cannot mark project as awarded.'
                })
            );

            // alert('Can not mark project as awarded.');
            throw new Error(error.message);
        }
    };
    const projectsRoute = useCallback(
        (projId: string) => {
            const to = `/projects/+?_id= ${user._id}&projectId=${projId}`;

            navigate(to);
        },
        [user.name, navigate]
    );

    const handleAddRoom = (e: any) => {
        e.preventDefault();
        setOpenRoomModal(true);
    };

    const showAttachments = async () => {
        setShowAttachmentModal(true);
    };

    useEffect(() => {
        dispatch(getAllRegions());
        dispatch(setRoomIdToDefault());
    }, []);

    useEffect(() => {
        dispatch(getAttachments(details?._id));
    }, [details]);

    return (
        <div className="project-summary-container col-12">
            <div className="d-flex justify-content-between align-items-center mt-2 back-button-container mx-4">
                <div className="back-to-project">
                    <a
                        className="back-to-all-projects"
                        onClick={() => {
                            dispatch(setTheYourProjects(false))
                            projectsRoute(details._id);
                        }}
                    >
                        <BsChevronLeft className="chevron-icon" /> Back to
                        Projects
                    </a>
                </div>
            </div>
            <div className="projects-summary mx-5">
                <div className="d-flex justify-content-between align-items-baseline">
                    <div className="d-flex flex-row align-items-baseline">
                        <h2 className="me-3">
                            {details?.name}
                        </h2>
                        <p className="ms-3">Status: {details?.status}</p>
                    </div>
                    <nav className="projects-navbar-container">
                        <div
                            className={
                                renderedPage === 'Rooms'
                                    ? 'projects-link projects-active mx-4'
                                    : ' projects-link projects-not-active mx-4'
                            }
                            onClick={() => setRenderedPage('Rooms')}
                        >
                            Rooms
                        </div>
                        <div
                            className={
                                renderedPage === 'Activity'
                                    ? 'projects-link projects-active mx-4'
                                    : ' projects-link projects-not-active mx-4'
                            }
                            onClick={() => setRenderedPage('Activity')}
                        >
                            Activity
                        </div>
                        <div
                            className={
                                renderedPage === 'Proposal'
                                    ? 'projects-link projects-active mx-4'
                                    : ' projects-link projects-not-active mx-4'
                            }
                            onClick={() => setRenderedPage('Proposal')}
                        >
                            Proposal
                        </div>
                    </nav>
                    <div className="d-flex align-items-center justify-content-center">
                        {
                            !details?.archived && (
                                <>
                                    <FaRegEdit
                                        data-for="edit"
                                        data-tip="Edit Project"
                                        onClick={() => {
                                            setOpenModal(true);
                                            setEditProject(true);
                                        }}
                                        className="edit-icon mx-2"
                                    />
                                    <ReactTooltip id="edit" />
                                </>
                            )
                        }
                      
                        <FaRegClone
                            data-for="copy"
                            data-tip="Copy Project"
                            className="clone-icon mx-2"
                            onClick={(e) => inactiveLightCheck(e, details)}
                        />
                        <ReactTooltip id="copy" />

                        <FaArchive
                            data-for="archive"
                            data-tip={
                                details?.archived === true
                                    ? 'Restore'
                                    : 'Mark awarded'
                            }
                            className="clone-icon mx-2"
                            onClick={(e) => archiveSet(e)}
                        />
                        <ReactTooltip id="archive" />
                        <FaFileAlt
                            data-for="archive"
                            data-tip="Attachments"
                            className="archive-icon mx-2"
                            onClick={() => showAttachments()}
                        />
                        <ReactTooltip id="archive" />

                        <button className="align-items-center d-flex flex-row room-button ms-2 p-3" onClick={handleAddRoom}>
                            <RiAddLine className="add-sign me-1" />
                            Add Room
                        </button>
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-center mx-5">
                <div className={processing ? 'processing' : 'process-none'}>
                    <h2>...Processing</h2>
                </div>
                {renderedPage === 'Rooms' ? (
                    <IdRooms />
                ) : renderedPage === 'Activity' ? (
                    <Activity />
                ) : renderedPage === 'Proposal' ? (
                    <div className="proposal_container">
                        <Proposal />
                    </div>
                ) : null}
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
            {openRoomModal && (
                <NewRoomModal
                    openModal={openRoomModal}
                    closeModal={setOpenRoomModal}
                    user={user}
                />
            )}
        </div>
    );
};

export default ProjectSummary;
