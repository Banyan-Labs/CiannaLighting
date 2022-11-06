import React, { FC } from 'react';
import './style/allProjects.scss';
import { FaRegCopy, FaRegEye, FaBan, FaTrash} from 'react-icons/fa';
import { ROLES } from '../../../../app/constants'; 

interface projectProps {
    setOpenModal: any;
    setProjectModal: any;
    project: any;
    setDeleteProject: any;
}

const ProjectMiniModal: FC<projectProps> = ({ setOpenModal, setProjectModal, project, setDeleteProject }) => {
    console.log(ROLES.Cmd)
    return (
        <div className="project-mini-modal">
            <div className="project-mini-modal-link">
                <FaRegCopy />
                <p>Duplicate</p>
            </div>
            <div onClick={() => {
                setOpenModal(true)
                setProjectModal(project)
            }
            }
                className="project-mini-modal-link">
                <FaRegEye /> <p>View</p>
            </div>

            <div className="doc-type">
                <FaBan />
                <span>Read Only</span>
            </div>
            {ROLES.Cmd === '6677'  ? 
            (
            <div onClick={() => {
                setOpenModal(true)
                setProjectModal(project)
                setDeleteProject(true);
            }
            } className="project-mini-modal-link" >
                <FaTrash />
                <p>Delete Project</p>
            </div>
            )
            : ''}

        </div>
    );
};

export default ProjectMiniModal;
