import { parseFileName } from 'helpers/utils';
import React, { FC } from 'react';
import { FaTimes } from 'react-icons/fa';

import { useAppSelector } from '../../app/hooks';

interface ProjectSummaryProps {
    projectId: any;
    closeModal: React.Dispatch<React.SetStateAction<any>>;
    openModal: boolean;
}

const ProjectAttachments: FC<ProjectSummaryProps> = (props) => {
    const { attachments } = useAppSelector(({ project }) => project);
    const closeModal = props.closeModal;
    const openModal = props.openModal;
    const downloadFile = (file: any, fileName: any) => {
        const a = document.createElement('a');

        a.href = file;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };
    const camelCaseToTitleCase = (camelCase: string) => {
        const spaced = camelCase.replace(/([A-Z])/g, ' $1').toLowerCase();
        const titleCase = spaced.replace(/(^|[\s\t]+)\w/g, function (match) {
            return match.toUpperCase();
        });

        return titleCase;
    }


    const userAttachments = attachments
        ? attachments.map((file: any, index: any) => {
            const fileName = file?.split('/')[file.split('/').length - 1];
            const { itemId, fieldName, originalName } = parseFileName(fileName);
            let fileType = camelCaseToTitleCase(fieldName);
            fileType = fileType?.slice(0, fileType?.length - 1);
            let displayName = '';

            if (originalName) {
                displayName = decodeURI(originalName)?.replace(/%2B/g, ' ');
            }

            return (
                <tr key={index} className="attachments-dynamic-row" onClick={() => { downloadFile(file, displayName) }}>
                    <td className="">
                        <span className="text-bold">{itemId}</span>
                    </td>
                    <td className="">
                        <span className="text-bold">{fileType}</span>
                    </td>
                    <td className="">
                        <p>{displayName}</p>
                    </td>
                </tr>
            );
        })
        : [];

    return (
        <div className="new-project-modal-background">
            <div className="attachments-modal-container p-3">
                <div className="modal-title-close-btn">
                    <button
                        onClick={() => {
                            closeModal(!openModal);
                        }}
                    >
                        {' '}
                        <FaTimes />
                    </button>
                </div>
                <div className="align-items-center d-flex flex-column">
                    <div className="project-attachments-top-bar">
                        <h3 className="project-attachment">Attachments</h3>
                    </div>
                    <div className="project-attachments-table-container mb-3">
                        <table className="attachments-table">
                            <thead>
                                <tr>
                                    <th className="">Item ID</th>
                                    <th className="">Type</th>
                                    <th className="">Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userAttachments}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectAttachments;
