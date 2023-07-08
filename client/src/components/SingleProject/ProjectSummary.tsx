import React, { FC, useState, useEffect, SyntheticEvent } from 'react';
import { FaRegEdit, FaRegClone, FaCircle, FaArchive } from 'react-icons/fa';
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
} from '../../redux/actions/projectActions';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { ProjectType } from '../Dashboard/DashboardPageLower/DashboardNav';
import { getAllRegions, getAllStatus } from '../../redux/actions/filterActions';
import { LightREF } from '../../redux/reducers/projectSlice';
import { axiosPrivate } from '../../api/axios';
import dataHolding from '../Dashboard/YourProjects/projectDetails';
import Modal from '../Modal/Modal';
import InactiveNotification from '../InactiveNotification/InactiveNotification';

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

        const axiosPriv = axiosPrivate();
        const attach = await axiosPriv.post('/get-attachments', {
            projId: proj._id,
        });
        let attachments = [];

        if (attach) {
            attachments = attach.data.proj.pdf;

            if (attachments.length) {
                const payload = {
                    project: {
                        ...proj,
                        clientId: user._id,
                        clientName: user.name,
                    },
                    copy: 'project',
                    attachments: attachments,
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
            }
        }
    };

    const Color =
        dataHolding.setData().color &&
        Object.keys(dataHolding.setData().color).length > 0
            ? dataHolding.setData().color
            : '#AC92EB';

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

            details?.archived === true
                ? alert('This project was restored')
                : alert('This project was archived');
        } catch (error: any) {
            alert('Can not archive project.');
            throw new Error(error.message);
        }
    };

    useEffect(() => {
        dispatch(getAllStatus());
        dispatch(getAllRegions());
        dispatch(setRoomIdToDefault());
    }, []);

    const date = new Date(Date.parse(details?.createdAt)).toDateString();
    
    return (
        <div className="project-summary-container">
            <div className="projects-summary">
                <div className="back-to-projects">
                    <button
                        className="back-to-all-projects"
                        onClick={() => dispatch(setTheYourProjects(false))}
                    >
                        <BsChevronLeft className="chevron-icon" /> Back to
                        Projects
                    </button>
                </div>
                <div className="project-summary-top-bar">
                    <div className="project-summary-name-and-date">
                        <h3 className="project-summary-project-name">
                            {details?.name}
                            <FaCircle
                                className="circle-icon"
                                style={{ color: String(Color) }}
                            />
                        </h3>
                        <p className="project-summary-date">Created: {date}</p>
                    </div>
                    <div className="project-summary-icons">
                        <FaRegEdit
                            onClick={() => {
                                setOpenModal(true);
                                setEditProject(true);
                            }}
                            className="edit-icon"
                            data-for="edit"
                            data-tip="Edit Project"
                        />
                        <div></div>
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
                                    : 'Archive'
                            }
                            className="archive-icon"
                            onClick={(e) => archiveSet(e)}
                        />

                        <RiArchiveDrawerFill
                            data-for="ab"
                            data-tip={`${details?.name} is archived`}
                            className={
                                details?.archived
                                    ? 'archive-icon archive-show-option'
                                    : 'd-none'
                            }
                        />

                        <ReactTooltip id="ab" />
                        <ReactTooltip id="copy" />
                        <ReactTooltip id="edit" />
                        <ReactTooltip id="archive" />
                    </div>
                    <div className="project-summary-status">
                        <p className="status">Status: {details?.status}</p>
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
