import React, { FC, useState } from 'react';
import IdRooms from './AllRooms/IdRooms';
import { RiAddLine } from 'react-icons/ri';
import { NewRoomModal } from '../../../NewRoomModal/NewRoomModal';
import { useAppSelector } from '../../../../app/hooks';

const Rooms: FC = () => {
    const [openModal, setOpenModal] = useState(false);
    const { user } = useAppSelector(({ auth: user }) => user);
    const handleAddRoom = (e: any) => {
        e.preventDefault();
        setOpenModal(true);
    };

    return (
        <>
            <div className="room-container">
                <div className="add-room-button-container">
                    <div className="add-room-button" onClick={handleAddRoom}>
                        <RiAddLine className="add-sign" />
                        <p className="room-bottom-text">
                            Create rooms to manage your project
                        </p>
                    </div>
                    <IdRooms />
                </div>
            </div>
            {openModal && (
                <NewRoomModal
                    openModal={openModal}
                    closeModal={setOpenModal}
                    user={user}
                />
            )}
        </>
    );
};

export default Rooms;
