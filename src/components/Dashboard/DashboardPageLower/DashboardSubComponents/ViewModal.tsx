/* eslint-disable react/no-unescaped-entities */
import React, { FC } from 'react';
import { FaTimes } from 'react-icons/fa';
import './style/allProjects.scss';




type Props = {
    closeModal: React.Dispatch<React.SetStateAction<any>>;
    openModal: boolean;
    setProjectModal: any;
    projectModal: any;
};

export const ViewModal: FC<Props> = ({closeModal, openModal, projectModal, setProjectModal }) => {
   console.log(projectModal)

    return (
        <div className="project-modal-background">
            <div className="project-modal-container">
                <div className="project-modal-close-btn">
                    <button
                        onClick={() => {
                            closeModal(!openModal);
                            setProjectModal(null);
                        }}
                    >
                        {' '}
                        <FaTimes />
                    </button>
                </div>
                
                    <div className=''>
                        <div className="new-room-modal-body">
                            <div>
                                <h4>{projectModal.name}</h4>
                                <div className="new-room-modal-footer">
                                    <button
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
