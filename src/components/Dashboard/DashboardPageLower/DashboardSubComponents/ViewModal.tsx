/* eslint-disable react/no-unescaped-entities */
import React, { FC, useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import './style/allProjects.scss';
import { useAppDispatch } from '../../../../app/hooks';
import { viewProjectRooms, viewRoomLights } from '../../../../redux/actions/projectActions';




type Props = {
    closeModal: React.Dispatch<React.SetStateAction<any>>;
    openModal: boolean;
    setProjectModal: any;
    projectModal: any;
};

export const ViewModal: FC<Props> = ({ closeModal, openModal, projectModal, setProjectModal }) => {
    const [tabProject, setTabProject] = useState(true);
    const [rooms, setRooms] = useState<any>(null);
    const [roomLight, setRoomLight] = useState<any>(null);
    const dispatch = useAppDispatch();

    const fetchData = async () => {
        const response = await dispatch(viewProjectRooms(projectModal._id))
        await setRooms(response)
    }
    useEffect(() => {
        fetchData()
        setRooms
    }, [])

    const fetchRoomLight = async (roomId: any) => {
        const response = await dispatch(viewRoomLights(roomId));
        console.log(response);
        await setRoomLight(response)
    }
    const date = new Date(Date.parse(projectModal?.createdAt)).toDateString();
    const [isCollapsed, setIsCollapsed] = useState(true);

    return (
        <div className="project-modal-background">
            <div className="project-modal-container">
                <div className="project-modal-close-btn">
                    <button
                        onClick={() => {
                            closeModal(!openModal);
                            setProjectModal(null);
                        }}
                    >
                        {' '}
                        <FaTimes />
                    </button>
                </div>
                <div className='project-modal-inner-container'>
                    <h2>{projectModal?.name}</h2>
                    <div className='button-display-view-container'>
                        <button className={tabProject ? 'viewActive' : ''} onClick={() => setTabProject(true)}>Details</button>
                        <button className={tabProject ? 'btn-right' : 'viewActive btn-right'}  onClick={() => setTabProject(false)}>Rooms</button>
                    </div> 
                    <div className="new-room-modal-body">
                        {tabProject ?
                            (<div className='project-view-container d-flex row'>
                                <h5 className='col-4'>Created </h5>
                                <span className='col-8'>{date}</span>
                                <h5 className='col-4'>Designer </h5>
                                <span className='col-8'>{projectModal?.clientName}</span>
                                <h5 className='col-4'>Region </h5>
                                <span className='col-8'>{projectModal?.region}</span>
                                <h5 className='col-4'>Description </h5>
                                <span className='col-8'>{projectModal?.description}</span>
                            </div>) : 
                                (
                                    <div>
                                        {rooms.length > 0 ? rooms.map(
                                            (r: any, index = r.indexOf(r)) => {
                                                return (
                                                    <div className='d-flex row' key={index}>
                                                        <h4 className='col-12'>{r?.name}</h4>
                                                        <h4 className='col-3'>Created</h4>
                                                        <span className='col-9'>{new Date(Date.parse(r?.createdAt)).toDateString()}</span>
                                                        <h4 className='col-3'>Description</h4>
                                                        <span className='col-9'>{r?.description}</span>
                                                        {r?.lights.length > 0 ? (
                                                            <div className='d-flex justify-content-between'>
                                                            <h4>Lights({r?.lights.length})</h4>
                                                            <button onClick={() => fetchRoomLight(String(r._id))}>{isCollapsed ? '-' : '+'} 
                                                            </button>
                                                            </div>
                                                        ) : (
                                                            <h4>No Lights In this room</h4>
                                                        )
                                                        }
                                                    </div>
                                                );
                                            }
                                        ) :
                                            (
                                                <h4>no rooms in this project</h4>
                                            )
                                        }

                                    </div>
                                )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};


// :
// (
//     <div>
//          <button onClick={() => setRoomLight(null)}>Back to Project</button>
//         {roomLight?.map(
//             (l: any, index = l.indexOf(l)) => {
//                 return (
//                     <div key={index}>
                       
//                         <h4>{l?.exteriorFinish}</h4>
//                         </div>
//                 )}) }
//     </div>
// )