import React, { FC, useState, useEffect } from 'react';
import ReactTooltip from 'react-tooltip';
import { FaRegEdit, FaRegClone, FaCircle, FaArchive } from 'react-icons/fa';
import { RiArchiveDrawerFill } from 'react-icons/ri';
import { BsChevronLeft } from 'react-icons/bs';
import dataHolding from '../Dashboard/YourProjects/projectDetails';
import {
    getProject,
    getAllProjects,
    getUserProjects,
    setTheYourProjects,
} from '../../redux/actions/projectActions';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { ProjectType } from '../Dashboard/DashboardPageLower/DashboardNav';
import { axiosPrivate } from '../../api/axios';
import Modal from '../Modal/Modal';
import { getAllRegions, getAllStatus } from '../../redux/actions/filterActions';
interface ProjectSummaryProps {
    details: any;
}

const ProjectSummary: FC<ProjectSummaryProps> = ({ details }) => {
    const [openModal, setOpenModal] = useState(false);
    const [editProject, setEditProject] = useState(false);
    const dispatch = useAppDispatch();
    // const statusOfArchive = details.archived ?  'Restor' : 'Archiv'
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
                    activity: details.archived ? 'Restor' : 'Archiv',
                })
            );
            details?.archived === true
                ? alert('This project was restored')
                : alert('This project was archived');
        } catch (error: any) {
            console.log('Error archiving item: ', error.message);
            alert('Can not archive project.');
        }
    };

    useEffect(() => {
        dispatch(getAllStatus());
        dispatch(getAllRegions());
    }, []);

    const copyOfProject = async (e: any, project: ProjectType) => {
        e.preventDefault();
        const axiosPriv = await axiosPrivate();
        const payload = { ...project, copy: 'project' };
        try {
            const response = await axiosPriv.post('/create-project', payload);
            dispatch(getUserProjects(details.clientId));
            dispatch(getAllProjects());
            alert(`Copy of ${project.name} created in your dashboard.`);
            return response.data;
        } catch (error) {
            console.log('Error in copyProject: ', error);
        }
    };

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
                            onClick={(e) => copyOfProject(e, details)}
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
        </div>
    );
};

export default ProjectSummary;
