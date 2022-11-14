import React, { FC, useState } from 'react';
import Rooms from './ProjectSubComponents/Rooms';
import Activity from './ProjectSubComponents/Activity';
import Proposal from './ProjectSubComponents/Proposal';

import './style/projectNav.scss';

const ProjectsNav: FC = () => {
    const [renderedPage, setRenderedPage] = useState('Rooms');

    return (
        <>
            <nav className="projects-navbar-container">
                <div
                    className={
                        renderedPage === 'Rooms'
                            ? 'projects-link  projects-active'
                            : ' projects-link projects-not-active'
                    }
                    onClick={() => setRenderedPage('Rooms')}
                >
                    Rooms
                </div>
                <div
                    className={
                        renderedPage === 'Activity'
                            ? 'projects-link  projects-active'
                            : ' projects-link projects-not-active'
                    }
                    onClick={() => setRenderedPage('Activity')}
                >
                    Activity
                </div>
                <div
                    className={
                        renderedPage === 'Proposal'
                            ? 'projects-link  projects-active'
                            : ' projects-link projects-not-active'
                    }
                    onClick={() => setRenderedPage('Proposal')}
                >
                    Proposal
                </div>
                <div className="projects-navbar-vertical-divider" />
            </nav>
            <div>
                { renderedPage === 'Rooms' ? (
                    <Rooms />
                ) : renderedPage === 'Activity' ? (
                    <Activity />
                ) : renderedPage === 'Proposal' ? (
                    <Proposal />
                ) : null}
            </div>
        </>
    );
};

export default ProjectsNav;
