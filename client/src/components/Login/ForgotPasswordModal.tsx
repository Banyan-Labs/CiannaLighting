import React, { useRef, SyntheticEvent } from 'react';
import ModalBase from '../commons/ModalBase/ModalBase';

type ComponentProps = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
};

const ForgotPasswordModal = ({ isOpen, setIsOpen }: ComponentProps) => {
    const userEmail = useRef<HTMLInputElement>(null);

    const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(
            '🚀 ~ file: ForgotPasswordModal.tsx:13 ~ handleSubmit ~ event',
            event
        );
        console.log(
            '🚀 ~ file: ForgotPasswordModal.tsx:11 ~ ForgotPasswordModal ~ userEmail',
            userEmail.current?.value
        );
    };

    return (
        <ModalBase isShown={isOpen} setIsShown={setIsOpen} title="Forgot Password?">
            <form onSubmit={handleSubmit}>
                <input type="email" name="userEmail" ref={userEmail} placeholder="Enter login email" />
                <footer className='modal-card-foot'>
                    <button type="submit" className="modal-submit-button">
                        Submit
                    </button>
                    <button style={{ marginLeft: '12px'}} type="button" className="modal-cancel-button">
                        Cancel
                    </button>
                </footer>
            </form>
        </ModalBase>
    );
};

export default ForgotPasswordModal;
