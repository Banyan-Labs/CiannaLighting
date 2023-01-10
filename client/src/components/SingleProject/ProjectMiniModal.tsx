import React, { FC, useCallback } from 'react';
import { useAppSelector } from '../../app/hooks';
import { useNavigate } from 'react-router-dom';
import '../Dashboard/DashboardPageLower/DashboardSubComponents/style/allProjects.scss';
import { FaRegCopy, FaRegEye, FaTrash } from 'react-icons/fa';
import { ROLES } from '../../app/constants';
import dataHolding from '../Dashboard/YourProjects/projectDetails';
import { useAppDispatch } from '../../app/hooks';
import {
    getProject,
    setTheYourProjects,
} from '../../redux/actions/projectActions';

interface projectProps {
    setOpenModal: any;
    setProjectModal: any;
    project: any;
    setDeleteProject: any;
    setTypeOfProject: any;
    typeOfProject: any;
    yourProject: any;
}

const ProjectMiniModal: FC<projectProps> = ({
    setOpenModal,
    setProjectModal,
    project,
    setDeleteProject,
    typeOfProject,
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
    console.log(project, "minimodal")

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
                <FaRegEye /> <p>Go To Project</p>
            </div>
        );
    };

    return (
        <div className="project-mini-modal">
            <div className="project-mini-modal-link">
                <FaRegCopy />
                {/* make copy capabilities */}
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
                    <FaRegEye />{' '}
                    <p>
                        {project?.clientId === user?._id
                            ? 'Go To Project'
                            : 'View'}
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
