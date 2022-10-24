import React, { FC, useState } from 'react';
import './style/roomDetails.scss';
import { BsChevronLeft } from 'react-icons/bs';
import { useAppSelector } from '../../app/hooks';
import { FaRegEdit, FaRegClone, FaRegTrashAlt, FaCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import dataHolding from '../Dashboard/YourProjects/projectDetails';
import Default from '../../assets/stairway.jpeg';

const RoomDetails: FC = () => {
    const { room, project, roomLights } = useAppSelector(
        ({ project }) => project
    );
    const [isCollapsed, setIsCollapsed] = useState(true);
    const newLights = roomLights ? roomLights.slice().reverse() : [];
    const date = new Date(Date.parse(room?.createdAt)).toDateString();

    const Color =
        Object.keys(dataHolding.setData().color).length === 0
            ? '#AC92EB'
            : dataHolding.setData().color;

    const { user } = useAppSelector(({ auth: user }) => user);
    const { projectId } = useAppSelector(({ project }) => project);

    const singleRoom = newLights?.map((light: any, index: any) => {
        return (
            <div className="single-room-container d-flex row" key={index}>
                <div className="first-light-section col-12 d-flex">
                    <img className="lightImg" src={Default} alt={light.name} />
                    <div className="d-flex row first-section-name">
                        <div>
                            <h4 className="m-0">{light.acrylicOptions}</h4>
                            <p className="m-0">LLC</p>
                        </div>
                        <div className="d-flex align-items-end">
                            <p className="m-0 edit-link"> Edit</p>
                            <p className="m-0 remove-link">Remove</p>
                        </div>
                    </div>
                    <p className="qty">
                        Qty. <span>{light.quantity}</span>
                    </p>
                </div>
                <div
                    className={`second-light-section col-12 d-flex collapse-content `}
                >
                    <div className="col-6 d-flex row second-left-section">
                        <div className="d-flex">
                            <h5 className="m-0 col-6">Exterior Finish:</h5>
                            <p className="m-0 col-6 d-flex">
                                {light.exteriorFinish}
                            </p>
                        </div>
                        <div className="d-flex">
                            <h5 className="m-0 col-6">Interior Finish:</h5>
                            <p className="m-0 col-6 d-flex">
                                {light.interiorFinish}
                            </p>
                        </div>
                        <div className="d-flex ">
                            <h5 className="m-0 col-6">Environment:</h5>
                            <p className="m-0 d-flex col-6">
                                {light.environment}
                            </p>
                        </div>
                        <div className="d-flex">
                            <h5 className="m-0 col-6">Safety Cert:</h5>
                            <p className="m-0 col-6">{light.safetyCert}</p>
                        </div>
                        <div className="d-flex ">
                            <h5 className="m-0 col-6">Project Voltage:</h5>
                            <p className="m-0 col-6">{light.projectVoltage}</p>
                        </div>
                        <div className="d-flex">
                            <h5 className="m-0 col-6">Socket Type:</h5>
                            <p className="m-0 col-6">{light.socketType}</p>
                        </div>
                        <div className="d-flex ">
                            <h5 className="m-0 col-6">Mounting:</h5>
                            <p className="m-0 col-6">{light.mounting}</p>
                        </div>
                    </div>
                    <div className="col-7 d-flex row second-right-section ">
                        <div className="d-flex justify-content-end right-section-inner">
                            <h5 className="m-0 col-6">Lens Material:</h5>
                            <p className="m-0 col-6">{light.lensMaterial}</p>
                        </div>
                        <div className="d-flex justify-content-end right-section-inner">
                            <h5 className="m-0 col-6">Options:</h5>
                            <p className="m-0 col-6">{light.glassOptions}</p>
                        </div>
                        <div className="d-flex justify-content-end right-section-inner">
                            <h5 className="m-0 col-6">Crystal Type:</h5>
                            <p className="m-0 col-6">{light.crystalType}</p>
                        </div>
                        <div className="d-flex justify-content-end right-section-inner">
                            <h5 className="m-0 col-6">Options:</h5>
                            <p className="m-0 col-6">
                                {light.crystalPinType} <br />
                                <span>{light.crystalPinColor}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    });

    return (
        <div
            className="roomDetail-container m-0 container
         d-flex row col-12 col-lg-5"
        >
            <div className="col-12 d-flex row m-0">
                <div className="back-to-project col-6">
                    <Link
                        to={`/projects/ ?_id= ${user._id}&projectId=${projectId}`}
                    >
                        <BsChevronLeft className="chevron-icon" /> Back to
                        Project
                    </Link>
                </div>
                <div className="col-6 d-flex justify-content-end">
                    <p className="project-name">
                        <span className="project-tag">Project</span> <br />
                        {project?.name}
                        <FaCircle
                            style={{ color: String(Color) }}
                            className="room-details-circle-icon"
                        />
                    </p>
                </div>
            </div>

            <div className="col-12 m-0 d-flex ">
                <div className="project-date ">
                    <h3 className="">{room?.name}</h3>

                    <p className="">Created: {date}</p>
                </div>
                <div className=" icon-container d-flex align-items-center justify-content-center">
                    <FaRegEdit className="m-2 room-icons" />
                    <FaRegClone className="m-2 room-icons" />
                    <FaRegTrashAlt className="m-2 room-icons" />
                </div>
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
                        View Room Lights <span>{isCollapsed ? '-' : '+'} </span>
                    </h4>
                </div>
                <div className="room-description-light-divider"></div>

                <div
                    className={
                        !isCollapsed
                            ? 'container-for-light-cards-off '
                            : 'container-for-light-cards'
                    }
                >
                    {room?.lights?.length != 0 && isCollapsed === true ? (
                        singleRoom
                    ) : (
                        <div className="container-no-lights d-flex justify-content-center align-items-center col-12">
                            <p className="">
                                {isCollapsed === false && roomLights.length > 0
                                    ? 'Show Room Lights.'
                                    : 'No lights for this room.'}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RoomDetails;
