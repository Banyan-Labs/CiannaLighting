import React, { FC, SyntheticEvent } from 'react';
import { FaRegCopy, FaBookReader, FaTrash } from 'react-icons/fa';

import { useAppSelector } from '../../../../app/hooks';
import { ROLES } from '../../../../app/constants';
import { ProjectType } from '../DashboardNav';
import { LightREF } from '../../../../redux/reducers/projectSlice';

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
    const { user } = useAppSelector(({ auth: user }) => user);
    const { setInactive } = useAppSelector(({ project }) => project);

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
                onClick={() => {
                    setOpenModal(true);
                    setProjectModal(proj);
                }}
                className="project-mini-modal-link"
            >
                <FaBookReader /> <p>Read Only</p>
            </div>
            {user.role === ROLES.Cmd ? (
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
            )}
        </div>
    );
};

export default ProjectMiniModal;
