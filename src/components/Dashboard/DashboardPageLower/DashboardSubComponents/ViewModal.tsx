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
                    <div>
                        <button className={roomLight ? 'd-none' : ''} onClick={() => setTabProject(true)}>Project</button>
                        <button className={roomLight ? 'd-none' : ''} onClick={() => setTabProject(false)}>Rooms</button>
                    </div>
                    <div className="new-room-modal-body">
                        {tabProject ?
                            (<div>
                                <h4>{projectModal.name}</h4>
                                <div className="new-room-modal-footer">
                                </div>
                            </div>) : !roomLight ?
                                (
                                    <div>
                                        {rooms.length > 0 ? rooms.map(
                                            (r: any, index = r.indexOf(r)) => {
                                                return (
                                                    <div key={index}>
                                                        <h4>{r?.name}</h4>
                                                        {r?.lights.length > 0 ? (
                                                            <button onClick={() => fetchRoomLight(String(r._id))}>{r?.lights.length}</button>
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
                                :
                                (
                                    <div>
                                         <button onClick={() => setRoomLight(null)}>Back to Project</button>
                                        {roomLight?.map(
                                            (l: any, index = l.indexOf(l)) => {
                                                return (
                                                    <div key={index}>
                                                       
                                                        <h4>{l?.exteriorFinish}</h4>
                                                        </div>
                                                )}) }
                                    </div>
                                )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};
