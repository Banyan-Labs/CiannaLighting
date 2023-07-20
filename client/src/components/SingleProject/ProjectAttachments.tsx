import React, { FC } from 'react';
import { FaTrashAlt } from 'react-icons/fa';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { deleteSpecFile } from '../../redux/actions/lightActions';

interface ProjectSummaryProps {
    details: any;
}

const ProjectAttachments: FC<ProjectSummaryProps> = () => {
    const { project, attachments } = useAppSelector(({ project }) => project);

    const dispatch = useAppDispatch();

    const deleteAttachments = async (attachment: string) => {
        if (project) {
            await dispatch(
                deleteSpecFile({ projId: project._id, item: attachment })
            );
        }
    };

    const userAttachments = attachments
        ? attachments.map((file: any, index: any) => {
            let fileName = file?.split('/')[file.split('/').length - 1];
            fileName = fileName?.split('-');
            fileName?.shift();
            fileName = fileName?.join('-');

            if (fileName) {
                fileName = decodeURI(fileName)?.replace(/%2B/g, ' ');
            }

            return (
                <tbody key={index}>
                    <tr className="attachments-dynamic-row">
                        <td className="file-file-name">{fileName}</td>
                        <td className="file-file-remove">
                            <FaTrashAlt
                                onClick={() => deleteAttachments(file)}
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
