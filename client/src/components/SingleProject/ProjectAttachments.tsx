import React, { FC } from 'react';
import { FaPaperclip } from 'react-icons/fa';
import { FaTrashAlt } from 'react-icons/fa';

const ProjectAttachments: FC = () => {
    const testAttachmentData = [
        {
            id: 1,
            fileName: '22.2022 Incredibly illuminating file',
            fileSize: '6.1MB',
        },
        {
            id: 2,
            fileName: '23.16 Prepare to be irradiated',
            fileSize: '1MB',
        },
        {
            id: 3,
            fileName: '123.456 Coruscating incandescence',
            fileSize: '456MB',
        },
    ];
    const userAttachments = testAttachmentData.map((file, index) => {
        return (
            <tbody key={index}>
                <tr className="attachments-dynamic-row">
                    <td className="file-file-name">{file.fileName}</td>
                    <td className="file-file-size">{file.fileSize}</td>
                    <td className="file-file-remove">
                        <FaTrashAlt />
                    </td>
                </tr>
            </tbody>
        );
    });
    return (
        <div className="project-attachments-container">
            <div className="project-attachments-top-bar">
                <h3 className="project-attachment">Attachments</h3>
                <FaPaperclip className="paperclip-icon" />
                <p className="attach-file-text">Attach file</p>
            </div>
            <div className="project-attachments-table-container">
                <table className="attachments-table">
                    <thead>
                        <tr>
                            <th className="attachments-file-name">File name</th>
                            <th className="attachments-file-size">File size</th>
                            <th> </th>
                        </tr>
                    </thead>

                    {userAttachments}
                </table>
            </div>
            <div className="project-attachments-view-all">
                <p>View All</p>
            </div>
        </div>
    );
};

export default ProjectAttachments;
