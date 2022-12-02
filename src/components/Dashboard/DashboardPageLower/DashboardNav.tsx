import React, { FC, useState } from 'react';
import AllProjects from './DashboardSubComponents/AllProjectsTable';
import './style/dashboardNav.scss';
export type ProjectType = {
    name: string;
    archived: boolean;
    clientId: string;
    clientName: string;
    region: string;
    status: string;
    description: string;
    rfp?: string;
    rooms?: string[];
};
const DashboardNav: FC = () => {
    const [renderedPage, setRenderedPage] = useState('All Projects');
    const [currentPage, setCurrentPage] = useState(1);
    const [sortedData, setSortedData] = useState<ProjectType[]>([]);
    const [sortDirection, setSortDirection] = useState<number>(0);
    const [currentSort, setCurrentSort] = useState<string>('');
    const setSortToDefault = () => {
        setSortedData([]);
        setSortDirection(0);
        setCurrentSort('');
    };
    return (
        <>
            <div className="lower-section-links">
                <a
                    id="all-projects"
                    onClick={() => {
                        setCurrentPage(1);
                        setRenderedPage('All Projects');
                        setSortToDefault();
                    }}
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
                    onClick={() => {
                        setCurrentPage(1);
                        setRenderedPage('Archived');
                        setSortToDefault();
                    }}
                    className={
                        renderedPage === 'Archived'
                            ? 'lower-active'
                            : 'not-active'
                    }
                >
                    Archived
                </a>
            </div>
            <AllProjects
                renderedPage={renderedPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                sortedData={sortedData}
                setSortedData={setSortedData}
                sortDirection={sortDirection}
                setSortDirection={setSortDirection}
                currentSort={currentSort}
                setCurrentSort={setCurrentSort}
            />
        </>
    );
};

export default DashboardNav;
