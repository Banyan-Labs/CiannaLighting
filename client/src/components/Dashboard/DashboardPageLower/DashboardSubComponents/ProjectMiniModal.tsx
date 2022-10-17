import React, { FC } from 'react';
import './style/allProjects.scss';
import { FaRegCopy, FaRegEye, FaBan } from 'react-icons/fa';

const ProjectMiniModal: FC = () => {
    const herro = 'hello';
    return (
        <div className="project-mini-modal">
            <div className="project-mini-modal-link">
                <FaRegCopy />
                <p>Duplicate</p>
            </div>
            <div className="project-mini-modal-link">
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
