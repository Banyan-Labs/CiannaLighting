import React, { FC } from 'react';
import { useAppSelector, useAppDispatch } from '../../../../app/hooks';
import './style/allProjects.scss';
import { FaRegCopy, FaBookReader, FaTrash } from 'react-icons/fa';
import { ROLES } from '../../../../app/constants';
import {axiosPrivate} from "../../../../api/axios"
import {createProjectAction, getUserProjects, getAllProjects} from "../../../../redux/actions/projectActions"

interface projectProps {
    setOpenModal: any;
    setProjectModal: any;
    proj: any;
    setDeleteProject: any;
    setProcessing: React.Dispatch<React.SetStateAction<boolean>>
}
interface LightREF {
    item_ID: string;
    rooms: string[]
  }

const ProjectMiniModal: FC<projectProps> = ({
    setOpenModal,
    setProjectModal,
    proj,
    setDeleteProject, 
    setProcessing
}) => {
    const { user } = useAppSelector(({ auth: user }) => user);
    const { setInactive } = useAppSelector(({project})=> project) 
    const dispatch = useAppDispatch();
    const inactiveLightCheck = () =>{
        let finalLightCheck: LightREF[] | [] = [];
        
        setInactive.forEach((item: string)=>{
            const inactive = proj.lightIDs.find((light:LightREF)=> light.item_ID === item);
            if(inactive && inactive !== undefined){
                finalLightCheck = [...finalLightCheck, inactive]
            }
            return item
        })
        console.log("finalLightCheck: ", finalLightCheck)
    }
    inactiveLightCheck()
    const copyOfProject = async (e: any) => {
        e.preventDefault();
        // FIND PROJECT WITH AXIOS
        setProcessing(true);
        const axiosPriv = await axiosPrivate();
        
        const attach = await axiosPriv.post('/get-attachments', {
            projId: proj._id,
        });
        let attachments = [];
        if (attach) {            
            attachments = attach.data.proj.pdf;
            if (attachments.length) {
                const payload = {
                    project: {...proj, clientId: user._id, clientName: user.name},
                    copy: 'project',
                    attachments: attachments,
                };
                try {
                    const response = await dispatch(
                        createProjectAction(payload)
                    );
                    dispatch(getUserProjects(user._id));
                    dispatch(getAllProjects());
                    setProcessing(false);
                    alert(`Copy of ${proj.name} created in your dashboard.`);
                    return response;
                } catch (error:any) {
                    throw new Error(error.message)
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
                    setProjectModal(proj);
                }}
                className="project-mini-modal-link"
            >
                <FaBookReader /> <p>Read Only</p>
            </div>
            {user.role === ROLES.Cmd ? (
                <div
                    onClick={() => {
                        setOpenModal(true);
                        setProjectModal(proj);
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
