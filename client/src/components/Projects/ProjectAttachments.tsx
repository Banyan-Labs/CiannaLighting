import React, { FC } from "react";
import { FaPaperclip } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
const ProjectAttachments: FC = ({}) => {
  const testAttachmentData = [
    {
      fileName: "22.2022 Incredibly illuminating file",
      fileSize: "6.1MB",
    },
    {
      fileName: "23.16 Prepare to be irradiated",
      fileSize: "1MB",
    },
    {
      fileName: "123.456 Coruscating incandescence",
      fileSize: "456MB",
    },
  ];
  const userAttachments = testAttachmentData.map((file) => {
    return (
      <tr className="attachments-dynamic-row">
        <td className="file-file-name">{file.fileName}</td>
        <td className="file-file-size">{file.fileSize}</td>
        <td className="file-file-remove">
          <FaTrashAlt />
        </td>
      </tr>
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
          <tr>
            <th className="attachments-file-name">File name</th>
            <th className="attachments-file-size">File size</th>
            <th> </th>
          </tr>
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
