import React, { FC, SyntheticEvent, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRegCopy, FaTrash, FaPlay, FaBookReader } from 'react-icons/fa';

import { useAppSelector } from '../../app/hooks';
import { ROLES } from '../../app/constants';
import dataHolding from '../Dashboard/YourProjects/projectDetails';
import { useAppDispatch } from '../../app/hooks';
import {
    getAttachments,
    getProject,
    setTheYourProjects
} from '../../redux/actions/projectActions';
import { LightREF } from '../../redux/reducers/projectSlice';
import { ProjectType } from '../Dashboard/DashboardPageLower/DashboardNav';

import '../Dashboard/DashboardPageLower/DashboardSubComponents/style/allProjects.scss';

interface projectProps {
    setOpenModal: any;
    setProjectModal: any;
    project: any;
    setDeleteProject: any;
    setTypeOfProject: any;
    typeOfProject: any;
    yourProject: any;
    setInactiveList: React.Dispatch<React.SetStateAction<LightREF[]>>;
    setProjectHold: React.Dispatch<React.SetStateAction<ProjectType | null>>;
    inactiveModalTrigger: () => void;
    copyOfProject: (e: SyntheticEvent, proj: ProjectType) => Promise<void>;
}

const ProjectMiniModal: FC<projectProps> = ({
    setOpenModal,
    setProjectModal,
    project,
    setDeleteProject,
    typeOfProject,
    setInactiveList,
    setProjectHold,
    inactiveModalTrigger,
    copyOfProject
}) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { user } = useAppSelector(({ auth: user }) => user);
    const { setInactive } = useAppSelector(({ project }) => project);

    const inactiveLightCheck = (e: SyntheticEvent) => {
        e.preventDefault();

        let finalLightCheck: LightREF[] | [] = [];

        setInactive.forEach((item: string) => {
            const inactive = project.lightIDs.find(
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

    const changeProject = async (prodId: string) => {
        await dispatch(getProject({ _id: prodId }));
        await dispatch(getAttachments(prodId));
        dataHolding.getData(project);
    };

    const projectRoute = useCallback(
        (projId: string) => {
            const to = `/project/+?_id= ${user._id}&projectId=${projId}`;

            navigate(to);
        },
        [user.name, navigate]
    );
    
    const goToProject = () => {
        return (
            <div
                onClick={async () => {
                    await changeProject(project._id);
                    projectRoute(project._id);
                    await dispatch(setTheYourProjects(true));
                }}
                className="project-mini-modal-link"
            >
                <FaPlay /> <p>Go To Project</p>
            </div>
        );
    };

    return (
        <div className="project-mini-modal">
            <div
                className="project-mini-modal-link"
                onClick={(e) => inactiveLightCheck(e)}
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
            {user.role === ROLES.Admin ? (
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
