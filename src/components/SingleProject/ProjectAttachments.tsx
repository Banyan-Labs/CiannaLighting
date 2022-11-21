import React, { FC, useState, } from 'react';
import { FaPaperclip } from 'react-icons/fa';
import { FaTrashAlt } from 'react-icons/fa';
import {ModalAttachments} from './ModalAttachments.tsx';
import { useAppSelector } from '../../app/hooks';

interface ProjectSummaryProps {
    details: any;
}

const ProjectAttachments:  FC<ProjectSummaryProps> = ({ details }) => {
    const [openModal, setOpenModal] = useState(false);
    const [attachDelete, setAttachDelete] = useState(false);
    const { projectAttach } = useAppSelector(
        ({ project }) => project
    );
    const [type, setType] = useState(true);
    const Images = projectAttach?.images
    const PDF = projectAttach.pdf
    
    const userAttachments = Images?.length > 0 ?  Images?.map((file:any, index:any) => {
        
            return (
                <tbody key={index}>
                    <tr className="attachments-dynamic-row">
                        <td className="file-file-name"><a >Name</a> </td>
                        <td className="file-file-name"><a href={file}>Image</a> </td>
                        <td className="file-file-name"><a >Size</a> </td>
                        <td className="file-file-remove">
                        <FaTrashAlt onClick={() => {
                           setOpenModal(true) 
                           setAttachDelete(true)
                        }
                            } />
                        </td>
                    </tr>
                </tbody>
            )
    }) : '';
    const PDFAttachments = PDF?.length > 0 ?  PDF?.map((file:any, index:any) => {
        return (
            <tbody key={index}>
                <tr className="attachments-dynamic-row">
                    <td className="file-file-name"><a >Name</a> </td>
                    <td className="file-file-name"><a href={file}>PDF</a> </td>
                    <td className="file-file-name"><a >Size</a> </td>
                    <td  className="file-file-remove">
                        <FaTrashAlt onClick={() => {
                           setOpenModal(true) 
                           setAttachDelete(true)
                        }
                            } />
                    </td>
                </tr>
            </tbody>
        )
}) : '';
    return (
        <div className="project-attachments-container">
            <div className="project-attachments-top-bar">
                <h3 className="project-attachment">Attachments</h3>
                <FaPaperclip  onClick={() => {
                                setOpenModal(true);
                            }} className="paperclip-icon" />
                <p className="attach-file-text">Attach file</p>
            </div>
            <div className="project-attachments-table-container">
                <table className="attachments-table">
                    <thead>
                        <tr>
                            <th className="attachments-file-name">File Name</th>
                            <th onClick={() => setType(!type)} className="attachments-file-name type-file">{type ? '- Images' : '- PDF'}</th>
                            <th className="attachments-file-size">Size</th>
                            <th> </th>
                        </tr>
                    </thead>{

                    }
                    {type === true ? userAttachments : PDFAttachments }
                    
                </table>
            </div>
            {/* <div className="project-attachments-view-all">
                <p>View All</p>
            </div> */}
            {openModal && (
                <ModalAttachments
                    openModal={openModal}
                    closeModal={setOpenModal}
                    project={details}
                    attachDelete={attachDelete}
                    setAttachDelete={setAttachDelete}
                />
            )}
        </div>
    );
};

export default ProjectAttachments;
