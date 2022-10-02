import React, { FC, useEffect, useState } from 'react';
import { FaSlidersH } from 'react-icons/fa';
import { BsThreeDots } from 'react-icons/bs';
import './style/allProjects.scss';
import testData from './testData';
import Pagination from '../Pagination/Pagination';
import ProjectMiniModal from './ProjectMiniModal';

const AllProjects: FC = () => {
    const [filterProjects, setFilterProjects] = useState('');
    filterProjects;
    const [projectOptionsModal, setProjectOptionsModal] =
        useState<boolean>(false);
    const [projectIndex, setProjectIndex] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const projectsPerPage = 5;

    const onMouseOver = (index: number | null) => {
        setProjectOptionsModal(true);
        setProjectIndex(index);
    };
    const onMouseOut = () => {
        setProjectOptionsModal(false);
        setProjectIndex(null);
    };

    const lastIndex = currentPage * projectsPerPage;
    const firstIndex = lastIndex - projectsPerPage;
    const currentProjects = testData.slice(firstIndex, lastIndex);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const lastPage = Math.ceil(testData.length / projectsPerPage);

    const allProjectsTableDisplay = currentProjects.map((project, index) => {
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
                    <td
                        className="projects-table-dynamic-dots"
                        onMouseOver={() => onMouseOver(index)}
                        onMouseLeave={() => onMouseOut()}
                    >
                        <div className="align-modal-dots">
                            <span className="bs-three-dots-container">
                                <BsThreeDots />
                            </span>
                        </div>
                        {projectOptionsModal && projectIndex === index && (
                            <ProjectMiniModal />
                        )}
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
                        <nav>
                            <ul className="pagination">
                                {currentPage > 1 && (
                                    <li
                                        onClick={() =>
                                            setCurrentPage(currentPage - 1)
                                        }
                                        className="page-link"
                                    >
                                        &lt;
                                    </li>
                                )}
                                <Pagination
                                    totalProjects={testData.length}
                                    projectsPerPage={projectsPerPage}
                                    paginate={(page: number) => paginate(page)}
                                />
                                {currentPage !== lastPage && (
                                    <li
                                        onClick={() =>
                                            setCurrentPage(currentPage + 1)
                                        }
                                        className="page-link"
                                    >
                                        &gt;
                                    </li>
                                )}
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default AllProjects;
