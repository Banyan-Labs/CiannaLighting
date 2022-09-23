import React, { FC, useState } from 'react';
import { RiAddLine } from 'react-icons/ri';
import { useAppSelector } from '../../../../app/hooks';
import { NewRoomModal } from '../../../NewRoomModal/NewRoomModal';

const Rooms: FC = () => {
    const [openModal, setOpenModal] = useState(false);
    const { user } = useAppSelector(({ auth: user }) => user);

    const handleAddRoom = (e: any) => {
        e.preventDefault();
        setOpenModal(true);
    };

    return (
        <>
            <div>
                <div className="add-room-button-container">
                    <div className="add-room-button" onClick={handleAddRoom}>
                        <RiAddLine className="add-sign" />
                    </div>
                    <p className="no-room-text">No rooms in this project</p>
                </div>
                <p className="room-bottom-text">
                    Create rooms to manage your project
                </p>
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
