import React, { FC, useState } from 'react';
import AllProjects from './DashboardSubComponents/AllProjects';
import Archived from './DashboardSubComponents/Archived';
import './style/dashboardNav.scss';

const DashboardNav: FC = () => {
    const [renderedPage, setRenderedPage] = useState('All Projects');
    return (
        <>
            <div className="lower-section-links">
                <a
                    id="all-projects"
                    onClick={() => setRenderedPage('All Projects')}
                    className={
                        renderedPage === 'All Projects'
                            ? 'lower-active'
                            : 'not-active'
                    }
                >
                    All Projects
                </a>
                <a
                    id="archived"
                    onClick={() => setRenderedPage('Archived')}
                    className={
                        renderedPage === 'Archived'
                            ? 'lower-active'
                            : 'not-active'
                    }
                >
                    Archived
                </a>
            </div>
            <div>
                {renderedPage === 'All Projects' ? (
                    <AllProjects />
                ) : renderedPage === 'Archived' ? (
                    <Archived />
                ) : null}
            </div>
        </>
    );
};

export default DashboardNav;
