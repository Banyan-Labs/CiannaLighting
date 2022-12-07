import React, { FC, useState } from 'react';
import { FaPaperclip } from 'react-icons/fa';
import { FaTrashAlt } from 'react-icons/fa';
import { ModalAttachments } from './ModalAttachments.tsx';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { deleteSpecFile } from '../../redux/actions/lightActions';
import { LightType } from '../../redux/reducers/projectSlice';

interface ProjectSummaryProps {
    details: any;
}

const ProjectAttachments: FC<ProjectSummaryProps> = ({ details }) => {
    const [openModal, setOpenModal] = useState(false);

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
              const fileName = file.match(/(?<=\d{9,}-)(\w+)/g);
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
            <div className="project-attachments-view-all">
                <p>View All</p>
            </div>
        </div>
    );
};

export default ProjectAttachments;
