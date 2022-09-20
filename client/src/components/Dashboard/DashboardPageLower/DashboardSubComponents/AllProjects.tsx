import React, { FC, useState } from 'react';
import { FaSlidersH } from 'react-icons/fa';
import { BsThreeDots } from 'react-icons/bs';
import './style/allProjects.scss';
import testData from './testData';
import Pagination from '../Pagination/Pagination';

const AllProjects: FC = () => {
    const [filterProjects, setFilterProjects] = useState('');
    filterProjects;
    const [projectList] = useState(testData);
    const [currentPage, setCurrentPage] = useState(1);
    const projectsPerPage = 5;
    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    const currentProjects = projectList.slice(
        indexOfFirstProject,
        indexOfLastProject
    );
    const paginate = (e: any, pageNumber: number) => {
        e.preventDefault();
        setCurrentPage(pageNumber);
        return currentPage;
    };

    const allProjectsTableDisplay = currentProjects.map((project, index) => {
        console.log(project.name);
        return (
            <tbody key={index}>
                <tr className="projects-table-dynamic-row">
                    <th className="projects-table-dynamic-name">
                        {project.name}
                    </th>
                    <td className="projects-table-dynamic-designer">
                        {project.clientName}
                    </td>
                    <td className="projects-table-dynamic-region">
                        {project.region}
                    </td>
                    {/* <td className="projects-table-dynamic-contact">{project.contact}</td> */}
                    <td className="projects-table-dynamic-status">
                        {project.status}
                    </td>
                    <td className="projects-table-dynamic-dots">
                        <BsThreeDots />
                    </td>
                </tr>
            </tbody>
        );
    });

    return (
        <div className="all-projects-container">
            <div>
                <div className="form-bar-button-container">
                    <input
                        className="dashboard-all-projects-search-bar"
                        type="text"
                        placeholder="Search"
                        onChange={(e) => setFilterProjects(e.target.value)}
                    />
                    <FaSlidersH className="dashboard-all-projects-submit" />
                </div>
                <div>
                    <table className="dashboard-all-projects-table">
                        <thead className="table-headers">
                            <tr className="rows">
                                <td className="projects-table-name">Name</td>
                                <td className="projects-table-designer">
                                    Designer
                                </td>
                                <td className="projects-table-region">
                                    Region
                                </td>
                                {/* <td className="projects-table-contact">Contact</td> */}
                                <td className="projects-table-status">
                                    Status
                                </td>
                                <td className="projects-table-dots"> </td>
                            </tr>
                        </thead>
                        {allProjectsTableDisplay}
                    </table>
                    <div className="pages-list">
                        <Pagination
                            totalProjects={projectList.length}
                            projectsPerPage={projectsPerPage}
                            paginate={paginate}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default AllProjects;
