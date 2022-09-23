import React, { FC, FormEvent, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { createRoomAction } from '../../redux/actions/projectActions';
import { RoomType } from '../../redux/reducers/projectSlice';
import '../Modal/style/modal.scss';

type Props = {
    closeModal: React.Dispatch<React.SetStateAction<any>>;
    openModal: boolean;
    user: any;
};

export const NewRoomModal: FC<Props> = ({ closeModal, openModal, user }) => {
    const { projectId } = useAppSelector(({ project }) => project);
    const [roomDetails, setRoomDetails] = useState({
        name: '',
        description: '',
    });

    const dispatch = useAppDispatch();

    const handleFormInput = (e: FormEvent<HTMLInputElement>) => {
        setRoomDetails({
            ...roomDetails,
            [e.currentTarget.name]: e.currentTarget.value,
        });
    };

    const onSubmit = async (e: any) => {
        e.preventDefault();
        console.log('submitted');
        try {
            if (projectId) {
                const newRoom = {
                    clientId: user.id,
                    projectId: projectId,
                    name: roomDetails.name,
                    description: roomDetails.description,
                };
                dispatch(createRoomAction(newRoom));
            }
            setRoomDetails({
                name: '',
                description: '',
            });
            closeModal(!openModal);
        } catch (err) {
            console.log('Error: ' + err);
        }
    };

    return (
        <div className="new-project-modal-background">
            <div className="new-project-modal-container">
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
                <div className="new-project-modal-title">
                    <h3 className="modal-title">New Project</h3>
                </div>
                <div className="new-project-modal-body">
                    <form onSubmit={onSubmit}>
                        <label
                            className="new-project-modal-labels"
                            htmlFor="name"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            className="new-project-modal-inputs"
                            placeholder="Ex. 113 Baptistry"
                            value={roomDetails.name}
                            onChange={(e) => handleFormInput(e)}
                            required
                        />
                        <label
                            className="new-project-modal-labels"
                            htmlFor="description"
                        >
                            Description
                        </label>
                        <input
                            name="description"
                            id="description"
                            type="text"
                            className="new-project-modal-inputs"
                            placeholder="Description of the project..."
                            value={roomDetails.description}
                            onChange={(e) => handleFormInput(e)}
                            required
                        ></input>
                        <span className="max-text-span">
                            <small className="max-text">500 max</small>
                        </span>
                        <div className="new-project-modal-footer">
                            <button
                                type="submit"
                                className="new-project-modal-button"
                                onClick={(e) => onSubmit(e)}
                            >
                                Create Room
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
