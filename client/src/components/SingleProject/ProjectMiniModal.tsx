import React, { FC, useCallback } from 'react';
import { useAppSelector } from '../../app/hooks';
import { useNavigate } from 'react-router-dom';
import '../Dashboard/DashboardPageLower/DashboardSubComponents/style/allProjects.scss';
import { FaRegCopy, FaTrash, FaPlay, FaBookReader } from 'react-icons/fa';
import { ROLES } from '../../app/constants';
import dataHolding from '../Dashboard/YourProjects/projectDetails';
import { useAppDispatch } from '../../app/hooks';
import {
    getProject,
    setTheYourProjects,
    createProjectAction,
    getUserProjects,
    getAllProjects,
} from '../../redux/actions/projectActions';
import { axiosPrivate } from '../../api/axios';

interface projectProps {
    setOpenModal: any;
    setProjectModal: any;
    project: any;
    setDeleteProject: any;
    setTypeOfProject: any;
    typeOfProject: any;
    yourProject: any;
    setProcessing: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProjectMiniModal: FC<projectProps> = ({
    setOpenModal,
    setProjectModal,
    project,
    setDeleteProject,
    typeOfProject,
    setProcessing,
}) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { user } = useAppSelector(({ auth: user }) => user);

    const changeProject = async (prodId: string) => {
        await dispatch(getProject({ _id: prodId }));
        dataHolding.getData(project, '#d3b9b8');
    };

    const projectRoute = useCallback(
        (projId: string) => {
            const to = `/projects/+?_id= ${user._id}&projectId=${projId}`;
            navigate(to);
        },
        [user.name, navigate]
    );
    const goToProject = () => {
        return (
            <div
                onClick={async () => {
                    await changeProject(project._id);
                    await projectRoute(project._id);
                    await dispatch(setTheYourProjects(true));
                }}
                className="project-mini-modal-link"
            >
                <FaPlay /> <p>Go To Project</p>
            </div>
        );
    };
    const copyOfProject = async (e: any) => {
        e.preventDefault();
        // FIND PROJECT WITH AXIOS
        setProcessing(true);
        const axiosPriv = axiosPrivate();

        const attach = await axiosPriv.post('/get-attachments', {
            projId: project._id,
        });
        let attachments = [];
        if (attach) {
            attachments = attach.data.proj.pdf;
            if (attachments.length) {
                const payload = {
                    project: {
                        ...project,
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
                    alert(`Copy of ${project.name} created in your dashboard.`);
                    return response;
                } catch (error: any) {
                    throw new Error(error.message);
                }
            }
        }
    };

    return (
        <div className="project-mini-modal">
            <div
                className="project-mini-modal-link"
                onClick={(e) => copyOfProject(e)}
            >
                <FaRegCopy />
                <p>Duplicate</p>
            </div>
            {typeOfProject === 'yourProjects' ? (
                goToProject()
            ) : (
                <div
                    onClick={
                        project?.clientId === user?._id
                            ? async () => {
                                  await changeProject(project._id);
                                  await projectRoute(project._id);
                                  await dispatch(setTheYourProjects(true));
                              }
                            : () => {
                                  setOpenModal(true);
                                  setProjectModal(project);
                              }
                    }
                    className="project-mini-modal-link"
                >
                    {project.clientId === user._id ? (
                        <FaPlay />
                    ) : (
                        <FaBookReader />
                    )}{' '}
                    <p>
                        {project?.clientId === user?._id
                            ? 'Go To Project'
                            : 'Read Only'}
                    </p>
                </div>
            )}
            {user.role === ROLES.Cmd ? (
                <div
                    onClick={() => {
                        setOpenModal(true);
                        setProjectModal(project);
                        setDeleteProject(true);
                    }}
                    className="project-mini-modal-link"
                >
                    <FaTrash />
                    <p>Delete Project</p>
                </div>
            ) : (
                ''
            )}
        </div>
    );
};

export default ProjectMiniModal;
