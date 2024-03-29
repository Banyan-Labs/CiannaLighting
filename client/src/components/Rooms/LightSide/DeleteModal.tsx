/* eslint-disable react/no-unescaped-entities */
import React, { FC, useState, FormEvent } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
    deleteLight,
    getRoomLights,
} from '../../../redux/actions/lightActions';
import {
    getProject,
    setTheRoom,
    getAllProjectRoomsAction,
    deleteThisRoom,
    editThisRoom,
    getAttachments,
} from '../../../redux/actions/projectActions';
import { useParams } from '../../../app/utils';
import '../../NewRoomModal/style/newRoomModal.css';

type Props = {
    closeModal: React.Dispatch<React.SetStateAction<any>>;
    openModal: boolean;
    light: any;
    setDeleteLight: any;
    deleteRoom: any;
    setDeleteRoom: any;
    room: any;
    editRoom: any;
    setEditRoom: any;
};

export const DeleteModal: FC<Props> = ({
    closeModal,
    openModal,
    light,
    setDeleteLight,
    setDeleteRoom,
    deleteRoom,
    room,
    editRoom,
    setEditRoom,
}) => {
    const { roomLights, projectId } = useAppSelector(({ project }) => project);
    const storedProjId = useParams('projectId');
    const storedRoomId = useParams('roomId');
    const userId = useParams('_id');
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const onSubmit1 = async () => {
        const deleteLightMethod = async (light: any) => {
            await dispatch(
                deleteLight({
                    item_ID: light.item_ID,
                    roomId: String(storedRoomId),
                    _id: String(light._id),
                    projectId: projectId,
                })
            );
        };
        const deleteRoomMethod = async () => {
            const itemIDS = roomLights
                ? roomLights.map((room: any) => room.item_ID)
                : [];

            await dispatch(
                deleteThisRoom({
                    _id: String(storedRoomId),
                    projectId: String(storedProjId),
                    itemIDS: itemIDS,
                })
            );

            await dispatch(getProject({ _id: String(storedProjId) }));
            await dispatch(getAttachments(String(storedProjId)));
        };

        try {
            !deleteRoom
                ? await deleteLightMethod(light)
                : await deleteRoomMethod();
            deleteRoom
                ? navigate(
                      `/projects/ + ?_id= ${userId}&projectId=${storedProjId}`
                  )
                : null;
        } catch (err: any) {
            throw new Error(err.message);
        }

        await dispatch(getProject({ _id: String(storedProjId) }));
        await dispatch(getAttachments(String(storedProjId)));
        dispatch(setTheRoom(String(storedRoomId)));
        dispatch(getAllProjectRoomsAction(String(storedProjId)));
        await dispatch(getRoomLights(String(storedRoomId)));
        closeModal(!openModal);
        setDeleteLight('');
        setDeleteRoom(false);
    };

    const [roomDetails, setRoomDetails] = useState({
        name: room?.name,
        description: room?.description,
    });

    const handleFormInput = (e: FormEvent<HTMLInputElement>) => {
        setRoomDetails({
            ...roomDetails,
            [e.currentTarget.name]: e.currentTarget.value,
        });
    };

    const onSubmit = async (e: any) => {
        e.preventDefault();

        try {
            await dispatch(
                editThisRoom({
                    _id: room?._id,
                    ...roomDetails,
                    roomName: room?.name,
                    projectId: projectId,
                })
            );
            setRoomDetails({
                name: room?.name,
                description: room?.description,
            });
        } catch (err: any) {
            throw new Error(err.message);
        }

        await dispatch(getProject({ _id: String(storedProjId) }));
        await dispatch(getAttachments(String(storedProjId)));
        dispatch(getAllProjectRoomsAction(String(storedProjId)));
        await dispatch(getRoomLights(String(storedRoomId)));
        closeModal(!openModal);
        setEditRoom(false);
    };

    return (
        <div className="new-room-modal-background">
            <div className="new-room-modal-container">
                <div className="modal-title-close-btn">
                    <button
                        onClick={() => {
                            closeModal(!openModal);
                            setDeleteLight('');
                            setDeleteRoom(!deleteRoom);
                            setEditRoom(!editRoom);
                        }}
                    >
                        {' '}
                        <FaTimes />
                    </button>
                </div>
                {!editRoom ? (
                    <div className="delete-Modal-container">
                        <h4>
                            {deleteRoom
                                ? `Confirm delete of ${room.name}?`
                                : `Confirm delete of ${light.item_ID} from ${room.name}?`}
                        </h4>
                        <button
                            onClick={onSubmit1}
                            type="submit"
                            className="delete-modal-button"
                        >
                            {deleteRoom ? 'Delete Room' : 'Delete Light'}
                        </button>
                    </div>
                ) : (
                    <div>
                        <div className="new-room-modal-title">
                            <h3 className="modal-title">
                                {' '}
                                {`Edit ${room?.name}`}
                            </h3>
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
                                    placeholder={room?.name}
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
                                    placeholder={room?.description}
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
                                        Edit Room
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
