import React from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'app/hooks';
import { setAlertOpen, setAlertMessage } from 'redux/reducers/modalSlice';

import './style/alertModal.scss';

const AlertModal = () => {
    const dispatch = useDispatch();
    const { isOpen, alertMessage } = useAppSelector((state) => state.modal);

    const handleClose = () => {
        dispatch(setAlertOpen({ isOpen: false }));
        dispatch(setAlertMessage({ alertMessage: '' }));
    };

    return (
        <>
            {isOpen && (
                <div className={`alert-modal is-active`}>
                    <div
                        className="alert-modal-background"
                        onClick={handleClose}
                    />
                    <div className="alert-modal-card">
                        <header className="alert-modal-card-head">
                            <p className="alert-modal-card-title">
                                Confirmation
                            </p>
                        </header>
                        <section className="alert-modal-card-body">
                            {alertMessage}
                        </section>
                        <footer className="alert-modal-card-foot">
                            <button
                                className="alert-modal-button"
                                onClick={handleClose}
                            >
                                Close
                            </button>
                        </footer>
                    </div>
                </div>
            )}
        </>
    );
};

export default AlertModal;
