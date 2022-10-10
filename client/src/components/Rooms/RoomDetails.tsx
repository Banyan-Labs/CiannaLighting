import React, { FC } from 'react';
import useParams from '../../app/utils';
import './style/roomDetails.scss';
import { FaRegEdit, FaRegClone, FaRegTrashAlt, FaCircle } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';

const RoomDetails: FC = () => {
    console.log(useParams('_id'));
    return (
        <div className="room-details-container">
            <div className="room-details-summary">
                <div className="room-details-top">
                    <div className="back-to-projects">
                        <AiOutlineClose className="room-details-close-button" />
                    </div>
                    <div>
                        <p className="room-details-project-name">
                            Salt Lake Temple
                            <FaCircle className="room-details-circle-icon" />
                        </p>
                    </div>
                </div>

                <div className="room-details-room-name-bar">
                    <div className="project-summary-name-and-date">
                        <h3 className="project-summary-project-name">
                            113 Baptistry
                        </h3>
                        <p className="project-summary-date">
                            Created on August 2, 2022
                        </p>
                    </div>
                    <div className="project-summary-icons">
                        <FaRegEdit className="edit-icon" />
                        <div></div>
                        <FaRegClone className="clone-icon" />
                        <div></div>
                        <FaRegTrashAlt className="trash-icon" />
                    </div>
                </div>
                <div className="project-summary-text-container">
                    <h4>Description:</h4>
                    <p className="project-summary-description-text">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Corrupti aperiam repudiandae inventore pariatur saepe
                        dolorum, quisquam corporis earum, tempore mollitia sint
                        consequatur velit facilis laboriosam modi cupiditate
                        natus. Animi, vero. Lorem ipsum dolor sit
                    </p>
                    <h4>Lights:</h4>
                    <div className="room-description-light-divider"></div>
                    <div className="room-description-light-container">
                        <p className="room-description-no-lights">
                            no lights in this room
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomDetails;
