import React, { FC, useState, useCallback } from 'react';
import ReactTooltip from 'react-tooltip';
import { BsChevronLeft } from 'react-icons/bs';
import { FaRegEdit, FaRegClone, FaRegTrashAlt, FaCircle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

import { DeleteModal } from './LightSide/DeleteModal';
import { axiosPrivate } from '../../api/axios';
import { getEditLight } from '../../redux/actions/lightActions';
import { useAppSelector } from '../../app/hooks';
import { useAppDispatch } from '../../app/hooks';
import { setTheYourProjects } from '../../redux/actions/projectActions';
import { CopyType } from 'app/constants';

import './style/roomDetails.scss';
import { getStatusClass } from 'app/utils';
import SingleRoom from './SingleRoom';

interface lightProps {
    setEditLight: any;
    setCatalogItem: any;
}

const RoomDetails: FC<lightProps> = ({ setEditLight, setCatalogItem }) => {
    const [openModal, setOpenModal] = useState(false);
    const { room, project, roomLights, setAllCatalog } = useAppSelector(
        ({ project }) => project
    );

    const dispatch = useAppDispatch();
    const [deleteLight, setDeleteLight] = useState('');
    const [deleteRoom, setDeleteRoom] = useState(false);
    const [editRoom, setEditRoom] = useState(false);
    const newLights = roomLights ? roomLights.slice().reverse() : [];
    const date = new Date(Date.parse(room?.createdAt)).toDateString();
    const { user } = useAppSelector(({ auth: user }) => user);
    const { projectId } = useAppSelector(({ project }) => project);

    const deleteLightFunc = (light: any) => {
        setDeleteLight(light);
        setOpenModal(true);
    };

    const setTheData = async (light: any, response: any) => {
        await setCatalogItem(response);
        setEditLight(light);
    };

    const editLightFunc = async (light: any) => {
        const response = await dispatch(
            getEditLight({ item_ID: String(light.item_ID) })
        );

        setTheData(light, response);
    };

    const navigate = useNavigate();
    const projectRoute = useCallback(
        (projId: string) => {
            const to = `/projects/+?_id= ${user._id}&projectId=${projId}`;

            navigate(to);
        },
        [user.name, navigate]
    );

    const copyRoom = async (e: any) => {
        e.preventDefault();

        const axiosPriv = await axiosPrivate();
        const projectId: string = project?._id ?? '';
        const copyRoom = [room?._id];
        const payload = {
            _id: projectId,
            rooms: copyRoom,
            copy: CopyType.ROOM,
            clientId: room?.clientId,
        };

        try {
            const response = await axiosPriv.post('/create-project', payload);

            alert(`Copy of ${room?.name} created in ${project?.name}.`);
            projectRoute(projectId);
            await dispatch(setTheYourProjects(true));

            return response;
        } catch (error: any) {
            throw new Error(error.message);
        }
    };

    return (
        <div>
            <div className="col-12 d-flex justify-content-between align-items-center m-0 mt-2 back-button-container">
                <div className="back-to-project">
                    <Link to={`/projects/ ?_id= ${user._id}&projectId=${projectId}`}>
                        <BsChevronLeft className="chevron-icon" /> Back to Project
                    </Link>
                </div>
            </div>
            <div className="ms-3">
                <div className="project-name room-detail-section">
                    <span className="project-tag">Project</span>
                    <div className="project-title-with-status-icon">
                        <h3 className="m-0">{project?.name}</h3>
                        <FaCircle
                            className={`room-details-circle-icon ${getStatusClass(project?.status || '')} background-unset`}
                        />
                    </div>
                </div>

                <div className="room-detail-section">
                    <div className="project-name">
                        <div className="d-flex flex-row justify-content-between">
                            <div>
                                <span className="project-tag">Room</span>
                                <div className="project-title-with-status-icon">
                                    <h4 className="m-0">{room?.name}</h4>
                                </div>
                            </div>
                            {
                                !project?.archived && (
                                    <div className="icon-container d-flex align-items-center justify-content-center">
                                        <FaRegEdit
                                            data-for="edit"
                                            data-tip="Edit Room"
                                            className="m-2 edit-icon"
                                            onClick={() => {
                                                setOpenModal(true);
                                                setEditRoom(true);
                                            }}
                                        />
                                        <FaRegClone
                                            data-for="copy"
                                            data-tip="Copy Room"
                                            className="m-2 clone-icon"
                                            onClick={(e) => copyRoom(e)}
                                        />
                                        <FaRegTrashAlt
                                            onClick={() => {
                                                setOpenModal(true);
                                                setDeleteRoom(true);
                                            }}
                                            data-for="delete"
                                            data-tip="Delete Room"
                                            className="m-2 archive-icon"
                                        />
                                        <ReactTooltip id="edit" />
                                        <ReactTooltip id="copy" />
                                        <ReactTooltip id="delete" />
                                    </div>
                                )
                            }
                        </div>
                        <div className="project-date d-flex flex-column">
                            <p className="">Created: {date}</p>
                        </div>
                    </div>
                    <div>
                        <div className="project-name">
                            <span className="project-tag">Description</span>
                            <p className="m-0">{room?.description}</p>
                        </div>
                    </div>
                </div>

                <div className="container-for-light-cards mt-3">
                    {
                        newLights?.map((light: any) => {
                            const item =
                                setAllCatalog && setAllCatalog.length
                                    ? setAllCatalog.find(
                                        (item: any) => item.item_ID === light.item_ID
                                    ) : null;
                            const image = item?.images?.length ? item.images[0] : '';

                            return (
                                <SingleRoom 
                                light={light} 
                                project={project} 
                                image={image} 
                                editLightFunc={editLightFunc}
                                deleteLightFunc={deleteLightFunc}
                                key={light._id} />
                            );
                        })
                    }
                </div>

            </div>

            {
                openModal && (
                    <DeleteModal
                        openModal={openModal}
                        closeModal={setOpenModal}
                        light={deleteLight}
                        setDeleteLight={setDeleteLight}
                        deleteRoom={deleteRoom}
                        setDeleteRoom={setDeleteRoom}
                        room={room}
                        editRoom={editRoom}
                        setEditRoom={setEditRoom}
                    />
                )
            }
        </div >
    );
};

export default RoomDetails;
