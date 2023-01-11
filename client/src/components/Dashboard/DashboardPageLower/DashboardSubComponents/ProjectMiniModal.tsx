import React, { FC } from 'react';
import { useAppSelector, useAppDispatch } from '../../../../app/hooks';
import './style/allProjects.scss';
import { FaRegCopy, FaRegEye, FaTrash } from 'react-icons/fa';
import { ROLES } from '../../../../app/constants';
import {axiosPrivate} from "../../../../api/axios"
import {createProjectAction, getUserProjects, getAllProjects} from "../../../../redux/actions/projectActions"

interface projectProps {
    setOpenModal: any;
    setProjectModal: any;
    project: any;
    setDeleteProject: any;
}

const ProjectMiniModal: FC<projectProps> = ({
    setOpenModal,
    setProjectModal,
    project,
    setDeleteProject,
}) => {
    const { user } = useAppSelector(({ auth: user }) => user);
    const dispatch = useAppDispatch();
    const copyOfProject = async (e: any) => {
        e.preventDefault();
        // FIND PROJECT WITH AXIOS
        const axiosPriv = await axiosPrivate();
        
        const attach = await axiosPriv.post('/get-attachments', {
            projId: project._id,
        });
        let attachments = [];
        if (attach) {
            console.log('ATTACH: ', attach);
            attachments = attach.data.proj.pdf;
            if (attachments.length) {
                const payload = {
                    project: {...project, clientId: user._id, clientName: user.name},
                    copy: 'project',
                    attachments: attachments,
                };
                try {
                    const response = await dispatch(
                        createProjectAction(payload)
                    );
                    dispatch(getUserProjects(user._id));
                    dispatch(getAllProjects());
                    alert(`Copy of ${project.name} created in your dashboard.`);
                    return response;
                } catch (error) {
                    console.log('Error in copyProject: ', error);
                    return error
                }
            }
        }
    };
    return (
        <div className="project-mini-modal">
            <div className="project-mini-modal-link" onClick={(e)=> copyOfProject(e)}>
                <FaRegCopy />
                <p>Duplicate</p>
            </div>
            <div
                onClick={() => {
                    setOpenModal(true);
                    setProjectModal(project);
                }}
                className="project-mini-modal-link"
            >
                <FaRegEye /> <p>View</p>
            </div>
            {user.role === ROLES.Cmd ? (
                <div
                    onClick={() => {
                        setOpenModal(true);
                        setProjectModal(project);
                        setDeleteProject(true);
                    }}
                    className="project-mini-modal-link"
                >
                    <FaTrash />
                    <p>Delete Project</p>
                </div>
            ) : (
                ''
            )}
        </div>
    );
};

export default ProjectMiniModal;
