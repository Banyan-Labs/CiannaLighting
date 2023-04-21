import React, { FC, SyntheticEvent, useState } from 'react';
import { LightREF } from '../../redux/reducers/projectSlice';
import { ProjectType } from '../Dashboard/DashboardPageLower/DashboardNav';
import { FaTimes } from 'react-icons/fa';
import './style/inactive.scss';
type InactiveProps = {
    inactiveList: LightREF[];
    projectHold: ProjectType | null;
    clearInactiveModal: () => void;
    copyOfProject: (e: SyntheticEvent, proj: ProjectType) => Promise<void>;
};
const InactiveNotification: FC<InactiveProps> = ({
    inactiveList,
    projectHold,
    clearInactiveModal,
    copyOfProject,
}) => {
    const [copied, setCopied] = useState(false);
    const triggerCopying = (e: SyntheticEvent) => {
        e.preventDefault();
        setTimeout(() => {
            clearInactiveModal();
            if (projectHold) {
                copyOfProject(e, projectHold);
            }
            setCopied(false);
        }, 3000);
    };
    const copyList = (e: SyntheticEvent): void => {
        e.preventDefault();
        const newList = inactiveList
            .map((item) => `(${item.item_ID}: ${item.rooms.join(', ')})`)
            .join('\n');
        navigator.clipboard.writeText(newList);
        setCopied(true);
        triggerCopying(e);
    };
    return (
        <div className="new-project-modal-background">
            <div className="new-project-modal-container">
                <div className="modal-title-close-btn">
                    <button
                        onClick={() => {
                            clearInactiveModal();
                        }}
                    >
                        {' '}
                        <FaTimes />
                    </button>
                </div>
                <div className="inactive-main">
                    {copied ? (
                        <div className="center-thanks">
                            {' '}
                            Thank you! List has been copied!{' '}
                        </div>
                    ) : (
                        <div className="center-description">
                            <div className="description">
                                Please copy this list and update these lights
                                found in these rooms to be using an available
                                product before submitting your proposal. Dont
                                forget to save this !
                            </div>
                            <ul className="item-rooms">
                                {inactiveList.map((item, index) => {
                                    return (
                                        <li key={index}>
                                            {item.item_ID}: {item.rooms.join(', ')}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    )}
                    {!copied && (
                        <button
                            className="copy-button"
                            onClick={(e) => copyList(e)}
                        >
                            Copy List
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
export default InactiveNotification;
