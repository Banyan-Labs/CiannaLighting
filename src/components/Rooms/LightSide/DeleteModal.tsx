/* eslint-disable react/no-unescaped-entities */
import React, { FC, useEffect} from 'react';
import { FaTimes } from 'react-icons/fa';
import useParams from '../../../app/utils';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { deleteLight, getRoomLights } from '../../../redux/actions/lightActions';
import '../../NewRoomModal/style/newRoomModal.css';
import { getProject, setTheRoom, getAllProjectRoomsAction } from '../../../redux/actions/projectActions';



type Props = {
    closeModal: React.Dispatch<React.SetStateAction<any>>;
    openModal: boolean;
    light: any;
    setDeleteLight: any;
};

export const DeleteModal: FC<Props> = ({ closeModal, openModal, light, setDeleteLight }) => {
    const storedProjId = useParams('projectId');
    const storedRoomId = useParams('roomId');
    const dispatch = useAppDispatch();

    const onSubmit = async () => {
        try {
            await dispatch(deleteLight({roomId: String(storedRoomId), _id: String(light._id)}))
          
        } catch (err) {
            console.log('Error: ' + err);
        }
        await dispatch(getProject({_id: String(storedProjId)}));
        dispatch(setTheRoom(String(storedRoomId)));
        dispatch(getAllProjectRoomsAction(String(storedProjId)));
        await dispatch(getRoomLights(String(storedRoomId)));
        closeModal(!openModal);
        setDeleteLight('');
    };

    return (
        <div className="new-room-modal-background">
            <div className="new-room-modal-container">
                <div className="modal-title-close-btn">
                    <button
                        onClick={() => {
                            closeModal(!openModal);
                            setDeleteLight('');
                        }}
                    >
                        {' '}
                        <FaTimes />
                    </button>
                </div>
                
                    <div className='d-flex justify-content-center align-items-center delete-Modal-container'>
                        <div className="new-room-modal-body">
                            <div>
                                <h4>Delete Light From Room</h4>
                                <div className="new-room-modal-footer">
                                    <button
                                    onClick={onSubmit}
                                        type="submit"
                                        className="delete-modal-button"
                                    >
                                        Delete Light
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    );
};
