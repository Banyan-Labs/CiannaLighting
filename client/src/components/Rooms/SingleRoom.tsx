import React, { FC, useState } from 'react';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import ReactTooltip from 'react-tooltip';

interface SingleRoomProps {
    light: any;
    project: any;
    image: any;
    editLightFunc: any;
    deleteLightFunc: any;
}

const SingleRoom: FC<SingleRoomProps> = ({
    light,
    project,
    image,
    editLightFunc,
    deleteLightFunc,
}) => {
    const [isCollapsed, setIsCollapsed] = useState(true);

    return (
        <div className="single-room-container d-flex flex-column">
            <div className="first-light-section d-flex justify-content-between">
                <div className=" me-1">
                    <img className="lightImg" src={image} alt={light.name} />
                </div>
                <div className="d-flex flex-column col-6 ms-1">
                    <div className="d-flex flex-row justify-content-between">
                        <div className="project-name">
                            <span className="project-tag">
                                Quantity ({light?.quantity || 0})
                            </span>
                        </div>

                        {!project?.archived && (
                            <div className="d-flex icon-container">
                                <FaRegEdit
                                    data-for="edit"
                                    data-tip="Edit Light"
                                    className="m-2 edit-icon"
                                    onClick={() => editLightFunc(light)}
                                />
                                <FaRegTrashAlt
                                    onClick={() => deleteLightFunc(light)}
                                    data-for="delete"
                                    data-tip="Delete Light"
                                    className="m-2 archive-icon"
                                />
                                <ReactTooltip id="edit" />
                                <ReactTooltip id="delete" />
                            </div>
                        )}
                    </div>
                    <div>
                        <div className="project-name">
                            <span className="project-tag">Item ID</span>
                            <p className="m-0">{light?.item_ID}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="project-name">
                    <p
                        className={
                            isCollapsed
                                ? 'cursor-pointer d-flex mt-0 project-tag collapsed'
                                : 'align-items-center cursor-pointer d-flex mt-0 project-tag expanded'
                        }
                        onClick={() => setIsCollapsed(!isCollapsed)}
                    >
                        Light Details
                    </p>
                </div>
            </div>
            {!isCollapsed && (
                <div className="d-flex collapse-content flex-wrap my-2 mx-auto p-2 justify-content-between">
                    <div className="d-flex col-5 py-1 justify-content-between flex-wrap">
                        <div>Exterior Finish:</div>
                        <div className="grey">{light.exteriorFinish}</div>
                    </div>
                    <div className="d-flex col-5 py-1 justify-content-between flex-wrap">
                        <div>Finish Treatment:</div>
                        <div className="grey">{light.finishTreatment}</div>
                    </div>
                    <div className="d-flex col-5 py-1 justify-content-between flex-wrap">
                        <div>Interior Finish:</div>
                        <div className="grey">{light.interiorFinish}</div>
                    </div>
                    <div className="d-flex col-5 py-1 justify-content-between flex-wrap">
                        <div>Environment:</div>
                        <div className="grey">{light.environment}</div>
                    </div>
                    <div className="d-flex col-5 py-1 justify-content-between flex-wrap">
                        <div>Safety Cert:</div>
                        <div className="grey">{light.safetyCert}</div>
                    </div>
                    <div className="d-flex col-5 py-1 justify-content-between flex-wrap">
                        <div>Project Voltage:</div>
                        <div className="grey">{light.projectVoltage}</div>
                    </div>
                    <div className="d-flex col-5 py-1 justify-content-between flex-wrap">
                        <div>Socket Type:</div>
                        <div className="grey">{light.socketType}</div>
                    </div>
                    <div className="d-flex col-5 py-1 justify-content-between flex-wrap">
                        <div>Mounting:</div>
                        <div className="grey">{light.mounting}</div>
                    </div>
                    <div className="d-flex col-5 py-1 justify-content-between flex-wrap">
                        <div>Lens Material:</div>
                        <div className="grey">{light.lensMaterial}</div>
                    </div>
                    <div className="d-flex col-5 py-1 justify-content-between flex-wrap">
                        <div>Crystal Type:</div>
                        <div className="grey">{light.crystalType}</div>
                    </div>
                    <div className="d-flex col-5 py-1 justify-content-between flex-wrap">
                        <div>Treatment:</div>
                        <div className="grey">{light.treatment}</div>
                    </div>
                    <div className="d-flex col-5 py-1 justify-content-between flex-wrap">
                        <div>Crystal Pin Color:</div>
                        <div className="grey">
                            <span>{light.crystalPinColor}</span>
                        </div>
                    </div>
                    <div className="d-flex col-5 py-1 justify-content-between flex-wrap">
                        <div>Crystal Bulb Cover:</div>
                        <div className="grey">{light.crystalBulbCover}</div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SingleRoom;
