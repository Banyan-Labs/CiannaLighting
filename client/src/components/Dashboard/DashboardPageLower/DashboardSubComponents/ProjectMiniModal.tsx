import React, { FC, SyntheticEvent, useCallback } from 'react';
import { FaRegCopy, FaBookReader, FaTrash, FaPlay } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '../../../../app/hooks';
import { ROLES } from '../../../../app/constants';
import { ProjectType } from '../DashboardNav';
import { LightREF } from '../../../../redux/reducers/projectSlice';
import dataHolding from '../../../Dashboard/YourProjects/projectDetails';
import {
    getAttachments,
    getLightSelectionsForProject,
    getProject,
    setTheYourProjects
} from '../../../../redux/actions/projectActions';
import { useAppDispatch } from '../../../../app/hooks';

import './style/allProjects.scss';

interface projectProps {
    setOpenModal: any;
    setProjectModal: any;
    proj: any;
    setDeleteProject: any;
    setInactiveList: React.Dispatch<React.SetStateAction<LightREF[]>>;
    setProjectHold: React.Dispatch<React.SetStateAction<ProjectType | null>>;
    inactiveModalTrigger: () => void;
    copyOfProject: (e: SyntheticEvent, proj: ProjectType) => Promise<void>;
}

const ProjectMiniModal: FC<projectProps> = ({
    setOpenModal,
    setProjectModal,
    proj,
    setDeleteProject,
    inactiveModalTrigger,
    setInactiveList,
    setProjectHold,
    copyOfProject,
}) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { user } = useAppSelector(({ auth: user }) => user);
    const { setInactive } = useAppSelector(({ project }) => project);

    const changeProject = async (prodId: string) => {
        await dispatch(getProject({ _id: prodId }));
        await dispatch(getAttachments(prodId));
        dataHolding.getData(proj);
    };

    const projectRoute = useCallback(
        (projId: string) => {
            const to = `/project/+?_id= ${user._id}&projectId=${projId}`;

            navigate(to);
        },
        [user.name, navigate]
    );

    const inactiveLightCheck = (e: SyntheticEvent) => {
        e.preventDefault();

        let finalLightCheck: LightREF[] | [] = [];

        setInactive.forEach((item: string) => {
            const inactive = proj.lightIDs.find(
                (light: LightREF) => light.item_ID === item
            );

            if (inactive && inactive !== undefined) {
                finalLightCheck = [...finalLightCheck, inactive];
            }

            return item;
        });

        if (finalLightCheck && finalLightCheck.length) {
            setInactiveList(finalLightCheck);
            setProjectHold(proj);
            inactiveModalTrigger();

            return true;
        } else {
            copyOfProject(e, proj);

            return false;
        }
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
            <div
                onClick={
                    proj?.clientId === user?._id
                        ? async () => {
                            await dispatch(setTheYourProjects(true));
                            await dispatch(getLightSelectionsForProject(proj._id));
                            await dispatch(getAttachments(proj._id))
                            changeProject(proj._id);
                            projectRoute(proj._id);
                        }
                        : () => {
                            setOpenModal(true);
                            setProjectModal(proj);
                        }
                }
                className="project-mini-modal-link"
            >
                {proj.clientId === user._id ? (
                    <FaPlay />
                ) : (
                    <FaBookReader />
                )}{' '}
                <p>
                    {proj?.clientId === user?._id
                        ? 'Go To Project'
                        : 'Read Only'}
                </p>
            </div>
            {
                user.role === ROLES.Admin ? (
                    <div
                        onClick={() => {
                            setOpenModal(true);
                            setProjectModal(proj);
                            setDeleteProject(true);
                        }}
                        className="project-mini-modal-link"
                    >
                        <FaTrash />
                        <p>Delete Project</p>
                    </div>
                ) : (
                    ''
                )
            }
        </div >
    );
};

export default ProjectMiniModal;
