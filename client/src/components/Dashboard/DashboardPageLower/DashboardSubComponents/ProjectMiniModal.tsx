import React, { FC } from 'react';
import './style/allProjects.scss';
import { FaCopy, FaEye, FaBan } from 'react-icons/fa';

const ProjectMiniModal: FC = () => {
    const herro = 'hello';
    return (
        <div className="project-mini-modal">
            <div>
                <FaCopy />
                <p>Duplicate</p>
            </div>
            <div>
                <FaEye /> <p>View</p>
            </div>

            <div className="doc-type">
                <FaBan />
                <p>Read Only</p>
            </div>
        </div>
    );
};

export default ProjectMiniModal;
