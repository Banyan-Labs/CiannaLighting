import React, { FC, useEffect, useState } from 'react';
import IdRooms from './AllRooms/IdRooms';
import { RiAddLine } from 'react-icons/ri';
import { NewRoomModal } from '../../../NewRoomModal/NewRoomModal';
import { useAppSelector, useAppDispatch } from '../../../../app/hooks';
import { setSpecFile } from '../../../../redux/actions/lightActions';

const Rooms: FC = () => {
    const dispatch = useAppDispatch()
    const [openModal, setOpenModal] = useState(false);
    const { user } = useAppSelector(({ auth: user }) => user);
    const { projectId } = useAppSelector(({ project }) => project);

    useEffect(()=>{
        dispatch(setSpecFile({"projId": projectId, "edit": ""}, false))
    },[])

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
