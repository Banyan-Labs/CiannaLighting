import React, { FC } from 'react';
import './style/allProjects.scss';
import { FaRegCopy, FaRegEye, FaBan } from 'react-icons/fa';

interface projectProps {
    setOpenModal: any;
    setProjectModal: any;
    project: any
}

const ProjectMiniModal: FC<projectProps> = ({ setOpenModal, setProjectModal, project }) => {
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
        </div>
    );
};

export default ProjectMiniModal;
