import React, { FC } from 'react';
import { useAppSelector } from '../../app/hooks';
import '../Dashboard/DashboardPageLower/DashboardSubComponents/style/allProjects.scss';
import { FaRegCopy, FaRegEye, FaBan, FaTrash } from 'react-icons/fa';
import { ROLES } from '../../app/constants';
import dataHolding from '../Dashboard/YourProjects/projectDetails';
import { useAppDispatch } from '../../app/hooks';
import {
    getProject,
    setTheYourProjects
} from '../../redux/actions/projectActions';

interface projectProps {
    setOpenModal: any;
    setProjectModal: any;
    project: any;
    setDeleteProject: any;
    setTypeOfProject: any;
    typeOfProject: any;
    yourProject: any;
}

const ProjectMiniModal: FC<projectProps> = ({
    setOpenModal,
    setProjectModal,
    project,
    setDeleteProject,
    typeOfProject,
}) => {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector(({ auth: user }) => user);

        const changeProject = async (prodId: string) => {
            await dispatch(getProject({ _id: prodId }));
            dataHolding.getData(project, "#d3b9b8");
        };

    const goToProject = () =>
    { 
       
       return (
            <div 
            onClick={async() => {
               await changeProject(project._id);
                await dispatch(setTheYourProjects(true));
            }}
            className="project-mini-modal-link"
        > 
            <FaRegEye /> <p>Go To Project</p>
        </div>
           )
    }
    
    return (
        <div className="project-mini-modal">
            <div className="project-mini-modal-link">
                <FaRegCopy />
                <p>Duplicate</p>
            </div>
            {typeOfProject === 'yourProjects' ? 
           goToProject() : 
           (
            <div 
            onClick={project?.clientId === user?._id ? async() => {
                await changeProject(project._id);
                await dispatch(setTheYourProjects(true));
             } : () => {
                setOpenModal(true);
                setProjectModal(project);
            }}
            className="project-mini-modal-link"
        > 
            <FaRegEye /> <p>{project?.clientId === user?._id ? 'Go To Project' : 'View'}</p>
        </div>
           ) 
            }
            

            <div className="doc-type">
                <FaBan />
                <span>Read Only</span>
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
