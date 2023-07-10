import React, { ReactElement, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { FaTimes } from 'react-icons/fa';

import './modalBase.scss';

type ModalBaseProps = {
    children?: ReactElement | ReactElement[] | false | null;
    isShown: boolean;
    setIsShown: (isShown: boolean) => void;
    title?: string;

};

const ModalBase = ({
    children,
    isShown,
    setIsShown,
    title
}: ModalBaseProps) => {
    const handleEscape = (event: KeyboardEvent): any => {
        if (event.key === 'Escape') setIsShown(false);
    };

    useEffect(() => {
        if (isShown) document.addEventListener('keydown', handleEscape, false);
        return () =>
            document.removeEventListener('keydown', handleEscape, false);
    }, [handleEscape, isShown]);

    return isShown
        ? createPortal(
            <div className="modal-container">
                <div className="modal-wrapper">
                    <header className="modal-card-head">
                        <button
                            className="delete"
                            aria-label="close"
                            onClick={() => setIsShown(false)}
                        >
                            <FaTimes />
                        </button>
                        {title && (
                            <h3 className="modal-card-title">{title}</h3>
                        )}
                    </header>

                    <section className="modal-card-body">{children}</section>
                </div>
            </div>,
            document.body
        )
        : null;
};

export default ModalBase;
