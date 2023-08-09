import React, { FC, useState, useCallback } from 'react';
import ReactTooltip from 'react-tooltip';
import { BsChevronLeft } from 'react-icons/bs';
import { FaRegEdit, FaRegClone, FaRegTrashAlt, FaCircle } from 'react-icons/fa';
import uuid from 'react-uuid';
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
    const [isCollapsed, setIsCollapsed] = useState(true);
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

    const singleRoom = newLights?.map((light: any) => {
        const item =
            setAllCatalog && setAllCatalog.length
                ? setAllCatalog.find(
                    (item: any) => item.item_ID === light.item_ID
                ) : null;
        const image = item?.images?.length ? item.images[0] : '';

        return (
            <div className="single-room-container d-flex row" key={uuid()}>
                <div className="first-light-section d-flex mb-2">
                    <img
                        className="lightImg"
                        src={image ? image : ''}
                        alt={light.name}
                    />
                    <div className="d-flex row first-section-name">
                        <div className="">
                            <h3>{light.item_ID}</h3>
                            <h4 className="m-0">{light.acrylicOptions}</h4>
                            <p className="m-0">LLC</p>
                        </div>
                    </div>
                    {!project?.archived && (
                        <div className="d-flex col-6 align-items-center ms-auto">
                            <button
                                className="m-0 edit-link"
                                onClick={() => editLightFunc(light)}
                            >
                                {' '}
                                Edit
                            </button>
                            <button
                                onClick={() => deleteLightFunc(light)}
                                className="m-0 remove-link"
                            >
                                Remove
                            </button>
                        </div>
                    )}
                    <p className="qty">
                        Qty. <span>{light.quantity}</span>
                    </p>
                </div>
                <div className="d-flex collapse-content mt-4 flex-wrap">
                    <div className="d-flex col-6 py-1">
                        <div className="col-7">
                            Exterior Finish:
                        </div>
                        <div className="grey">
                            {light.exteriorFinish}
                        </div>
                    </div>
                    <div className="d-flex col-6 py-1">
                        <div className="col-7">
                            Interior Finish:
                        </div>
                        <div className="grey">
                            {light.interiorFinish}
                        </div>
                    </div>
                    <div className="d-flex col-6 py-1">
                        <div className="col-7">
                            Environment:
                        </div>
                        <div className="grey">
                            {light.environment}
                        </div>
                    </div>
                    <div className="d-flex col-6 py-1">
                        <div className="col-7">
                            Safety Cert:
                        </div>
                        <div className="grey">
                            {light.safetyCert}
                        </div>
                    </div>
                    <div className="d-flex col-6 py-1">
                        <div className="col-7">
                            Project Voltage:
                        </div>
                        <div className="grey">
                            {light.projectVoltage}
                        </div>
                    </div>
                    <div className="d-flex col-6 py-1">
                        <div className="col-7">
                            Socket Type:
                        </div>
                        <div className="grey">
                            {light.socketType}
                        </div>
                    </div>
                    <div className="d-flex col-6 py-1">
                        <div className="col-7">
                            Mounting:
                        </div>
                        <div className="grey">
                            {light.mounting}
                        </div>
                    </div>
                    <div className="d-flex col-6 py-1">
                        <div className="col-7">
                            Lens Material:
                        </div>
                        <div className="grey">
                            {light.lensMaterial}
                        </div>
                    </div>
                    <div className="d-flex col-6 py-1">
                        <div className="col-7">
                            Options:
                        </div>
                        <div className="grey">
                            {light.glassOptions}
                        </div>
                    </div>
                    <div className="d-flex col-6 py-1">
                        <div className="col-7">
                            Crystal Type:
                        </div>
                        <div className="grey">
                            {light.crystalType}
                        </div>
                    </div>
                    <div className="d-flex col-6 py-1">
                        <div className="col-7">
                            Options:
                        </div>
                        <div className="grey">
                            {light.crystalPinType} <br />
                            <span>{light.crystalPinColor}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    });

    return (
        <div>
            <div className="col-12 d-flex justify-content-between align-items-center m-0 mt-2 back-button-container">
                <div className="back-to-project">
                    <Link to={`/projects/ ?_id= ${user._id}&projectId=${projectId}`}>
                        <BsChevronLeft className="chevron-icon" /> Back to Project
                    </Link>
                </div>
                <div className="project-name">
                    <span className="project-tag">Project</span> <br />
                    <div className="project-title-with-status-icon">
                        {project?.name}
                        <FaCircle
                            className={`room-details-circle-icon ${getStatusClass(project?.status || '')} background-unset`}
                        />
                    </div>
                </div>
            </div>

            <div className="col-7 d-flex mt-4 justify-content-between">
                <div className="project-date d-flex flex-column">
                    <h3 className="m-0">{room?.name}</h3>
                    <p className="">Created: {date}</p>
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
            <div className="">
                <div className="description-container">
                    <h4>Description:</h4>
                    <p className="">{room?.description}</p>
                </div>
                <div className="d-flex justify-content-between">
                    <h4 className="light-number">
                        Lights: <span>({roomLights?.length})</span>
                    </h4>

                    <h4
                        className="collapse-button"
                        onClick={() => setIsCollapsed(!isCollapsed)}
                    >
                        {isCollapsed ? 'Expand' : 'Collapse'} <span>{isCollapsed ? '+' : '-'}</span>
                    </h4>
                </div>
                {/* <div className="room-description-light-divider"></div> */}

                <div
                    className={
                        isCollapsed
                            ? 'container-for-light-cards-off '
                            : 'container-for-light-cards'
                    }
                >
                    {room?.lights?.length != 0 && !isCollapsed ? (
                        singleRoom
                    ) : (
                        <div className="container-no-lights d-flex justify-content-center align-items-center col-12">
                            <p className="">
                                {isCollapsed && roomLights.length > 0
                                    ? 'Expand for light details.'
                                    : 'No lights for this room.'}
                            </p>
                        </div>
                    )}
                </div>
            </div>
            {openModal && (
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
            )}
        </div>
    );
};

export default RoomDetails;
