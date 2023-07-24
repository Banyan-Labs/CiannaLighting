import React, { FC } from 'react';
import { FaTrashAlt } from 'react-icons/fa';

import { useAppSelector } from '../../app/hooks';

interface ProjectSummaryProps {
    projectId: any;
}

const ProjectAttachments: FC<ProjectSummaryProps> = () => {
    const { attachments } = useAppSelector(({ project }) => project);

    const userAttachments = attachments
        ? attachments.map((file: any, index: any) => {
            const fileName = file?.split('/')[file.split('/').length - 1];
            const splitName = fileName?.split('-');
            const associatedItemID = splitName[0];
            const fileType = splitName[1];
            // remove the first two items of the array and join hwta's left for displayName
            let displayName = splitName?.splice(2).join('');

            if (displayName) {
                displayName = decodeURI(displayName)?.replace(/%2B/g, ' ');
            }

            return (
                <tbody key={index}>
                    <tr className="attachments-dynamic-row">
                        <td className="file-file-name">
                            <span className="text-italic">({associatedItemID})&nbsp;</span>&nbsp;
                            <span className="text-bold">&nbsp;{fileType}&nbsp;</span>&nbsp;
                            {displayName}
                        </td>
                        <td className="file-file-remove">
                            <FaTrashAlt
                            />
                        </td>
                    </tr>
                </tbody>
            );
        })
        : [];

    return (
        <div className="project-attachments-container">
            <div className="project-attachments-top-bar">
                <h3 className="project-attachment">Attachments</h3>
            </div>
            <div className="project-attachments-table-container">
                <table className="attachments-table">
                    <thead>
                        <tr>
                            <th className="attachments-file-name">File name</th>
                            <th className="attachments-file-remove">Remove</th>
                        </tr>
                    </thead>
                    {userAttachments}
                </table>
            </div>
        </div>
    );
};

export default ProjectAttachments;
