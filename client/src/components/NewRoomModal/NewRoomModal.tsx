/* eslint-disable react/no-unescaped-entities */
import React, { FC, FormEvent, useState, useEffect, useCallback } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
    createRoomAction,
    getAllProjectRoomsAction,
} from '../../redux/actions/projectActions';
import './style/newRoomModal.css';

type Props = {
    closeModal: React.Dispatch<React.SetStateAction<any>>;
    openModal: boolean;
    user: any;
};

export const NewRoomModal: FC<Props> = ({ closeModal, openModal, user }) => {
    const { roomId, room, projectId } = useAppSelector(
        ({ project }) => project
    );
    const navigate = useNavigate();
    const [roomDetails, setRoomDetails] = useState({
        name: '',
        description: '',
    });
    const [roomCreated, setRoomCreated] = useState<boolean>(false);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getAllProjectRoomsAction(projectId));
    }, [room]);

    const projectRoute = useCallback(
        (roomId: string) => {
            const to = `/createLight/ + ?_id= ${user._id}&roomId=${roomId}&projectId=${projectId}`;
            navigate(to);
        },
        [user.name, navigate]
    );

    const handleFormInput = (e: FormEvent<HTMLInputElement>) => {
        setRoomDetails({
            ...roomDetails,
            [e.currentTarget.name]: e.currentTarget.value,
        });
    };

    const onSubmit = async (e: any) => {
        e.preventDefault();
        try {
            if (projectId) {
                const newRoom = {
                    clientId: user._id,
                    projectId: projectId,
                    name: roomDetails.name,
                    description: roomDetails.description,
                };
                dispatch(createRoomAction(newRoom));
                setRoomCreated(!roomCreated);
            }
            setRoomDetails({
                name: '',
                description: '',
            });
        } catch (err) {
            console.log('Error: ' + err);
        }
    };

    return (
        <div className="new-room-modal-background">
            <div className="new-room-modal-container">
                <div className="modal-title-close-btn">
                    <button
                        onClick={() => {
                            closeModal(!openModal);
                        }}
                    >
                        {' '}
                        <FaTimes />
                    </button>
                </div>
                {!roomCreated ? (
                    <div>
                        <div className="new-room-modal-title">
                            <h3 className="modal-title">New Room</h3>
                        </div>
                        <div className="new-room-modal-body">
                            <form onSubmit={onSubmit}>
                                <label
                                    className="new-room-modal-labels"
                                    htmlFor="name"
                                >
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="new-room-modal-inputs"
                                    placeholder="Ex. 113 Baptistry"
                                    value={roomDetails.name}
                                    onChange={(e) => handleFormInput(e)}
                                    required
                                />
                                <label
                                    className="new-room-modal-labels"
                                    htmlFor="description"
                                >
                                    Description
                                </label>
                                <input
                                    name="description"
                                    id="description"
                                    type="text"
                                    className="new-room-modal-inputs"
                                    placeholder="Description of the project..."
                                    value={roomDetails.description}
                                    onChange={(e) => handleFormInput(e)}
                                    required
                                ></input>
                                <span className="max-text-span">
                                    <small className="max-text">500 max</small>
                                </span>
                                <div className="new-room-modal-footer">
                                    <button
                                        type="submit"
                                        className="new-room-modal-button"
                                    >
                                        Create Room
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                ) : (
                    <div className="new-lights-prompt-container">
                        <div className="new-room-modal-title">
                            <h3 className="modal-title">
                                You've created a new Room!
                            </h3>
                        </div>
                        <div className="new-lights-prompt">
                            <p className="new-room-name">{room?.name}</p>
                            <div className="hr" />
                            <p className="next-step-label">
                                Next, let's add some lights from the catalog.
                            </p>
                        </div>
                        <div className="new-room-modal-footer">
                            <button
                                type="submit"
                                className="new-room-modal-button"
                                onClick={() => projectRoute(String(roomId))}
                            >
                                Add lights
                            </button>
                        </div>
                        <div className="skip-lights-container">
                            <button
                                className="skip-lights-step"
                                onClick={() => closeModal(!openModal)}
                            >
                                Skip, I will add lights later.
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
