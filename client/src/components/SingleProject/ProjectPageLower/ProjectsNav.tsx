import React, { FC, useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

import Rooms from './ProjectSubComponents/Rooms';
import Activity from './ProjectSubComponents/Activity';
import Proposal from './ProjectSubComponents/Proposal';

import './style/projectNav.scss';

type ProjectNavProps = {
    processing: boolean;
};

const ProjectsNav: FC<ProjectNavProps> = ({ processing }) => {
    const [renderedPage, setRenderedPage] = useState('Rooms');
    const componentRef: any = useRef<any>();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

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
            <div className="d-flex col-12 m-0 p-0 justify-content-center align-items-center">
                <div className={processing ? 'processing' : 'process-none'}>
                    <h2>...Processing</h2>
                </div>
                {renderedPage === 'Rooms' ? (
                    <Rooms />
                ) : renderedPage === 'Activity' ? (
                    <Activity />
                ) : renderedPage === 'Proposal' ? (
                    <div className="proposal_container">
                        <Proposal ref={componentRef} />
                        <button className="print_btn" onClick={handlePrint}>
                            Print
                        </button>
                    </div>
                ) : null}
            </div>
        </>
    );
};

export default ProjectsNav;
