import React, { FC } from 'react';
import './style/allProjects.scss';
import { FaRegCopy, FaRegEye, FaBan } from 'react-icons/fa';

const ProjectMiniModal: FC = () => {
    const herro = 'hello';
    return (
        <div className="project-mini-modal">
            <div>
                <FaRegCopy />
                <p>Duplicate</p>
            </div>
            <div>
                <FaRegEye /> <p>View</p>
            </div>

            <div className="doc-type">
                <FaBan />
                <p>Read Only</p>
            </div>
        </div>
    );
};

export default ProjectMiniModal;
