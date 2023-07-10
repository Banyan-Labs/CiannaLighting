import React, { useRef, SyntheticEvent, useState } from 'react';
import axios, { AxiosError } from 'axios';

import ModalBase from '../commons/ModalBase/ModalBase';
import logging from 'config/logging';

type ComponentProps = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
};

const ForgotPasswordModal = ({ isOpen, setIsOpen }: ComponentProps) => {
    const userEmail = useRef<HTMLInputElement>(null);
    const [statusDetails, setStatusDetails] = useState<{
        [key: string]: any;
    } | null>(null);

    const closeStatusDetails = () => {
        setStatusDetails(null);
        setIsOpen(false);
    };

    const showStatusDetails = statusDetails !== null;

    const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formEle = event.currentTarget;

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/public/forgot-password`,
                { email: userEmail.current?.value }
            );

            if (response.status === 200) {
                formEle.reset();
                setStatusDetails(() => ({
                    success: true,
                    message: response.data.message,
                }));
            }
        } catch (error: any | AxiosError) {
            const axiosErr: AxiosError = error;

            if (axios.isAxiosError(error) && axiosErr?.response?.status) {
                switch (axiosErr.response.status) {
                    case 404:
                        setStatusDetails(() => ({
                            success: false,
                            error: 'User not found',
                        }));
                        break;
                    case 400:
                        setStatusDetails(() => ({
                            success: false,
                            error: 'Password reset currently pending',
                        }));
                        break;
                    default:
                        setStatusDetails(() => ({
                            success: false,
                            error: 'Request failed',
                        }));
                        break;
                }
            } else {
                logging.error(error.message, "ForgotPasswordModal");
                throw Error(error);
            }
        }
    };

    return (
        <ModalBase
            isShown={isOpen}
            setIsShown={setIsOpen}
            title="Forgot Password?"
        >
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="userEmail"
                    ref={userEmail}
                    placeholder="Enter login email"
                />
                <footer className="modal-card-foot">
                    <button type="submit" className="modal-submit-button">
                        Submit
                    </button>
                    <button
                        style={{ marginLeft: '12px' }}
                        type="button"
                        className="modal-cancel-button"
                        onClick={() => setIsOpen(false)}
                    >
                        Cancel
                    </button>
                </footer>
            </form>
            <ModalBase
                isShown={showStatusDetails}
                setIsShown={closeStatusDetails}
            >
                {showStatusDetails &&
                    (statusDetails.success ? (
                        <p>{statusDetails.message}</p>
                    ) : (
                        <p>{statusDetails.error}</p>
                    ))}
            </ModalBase>
        </ModalBase>
    );
};

export default ForgotPasswordModal;
