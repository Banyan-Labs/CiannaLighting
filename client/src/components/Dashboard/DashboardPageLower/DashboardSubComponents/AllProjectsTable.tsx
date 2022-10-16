import React, { FC, useEffect, useState } from 'react';
import { FaSlidersH } from 'react-icons/fa';
import { BsThreeDots } from 'react-icons/bs';
import './style/allProjects.scss';
import { getAllProjects } from '../../../../redux/actions/projectActions';
import { useAppSelector, useAppDispatch } from '../../../../app/hooks';
import Pagination from '../Pagination/Pagination';
import ProjectMiniModal from './ProjectMiniModal';


type Props = {
    renderedPage: string
    currentPage: number
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const AllProjects: FC<Props> = ({renderedPage, currentPage, setCurrentPage}) => {
    const dispatch = useAppDispatch();
    const { allProjects } = useAppSelector(({ project }) => project);
    const [filterProjects, setFilterProjects] = useState('');
    filterProjects;
    const [projectOptionsModal, setProjectOptionsModal] =
        useState<boolean>(false);
    const [projectIndex, setProjectIndex] = useState<number | null>(null);
    
    const projectsPerPage = 5;

    useEffect(() => {
        dispatch(getAllProjects());
    }, []);

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
    const activeProjects = allProjects.filter((project)=> !project.archived);
    const archivedProjects = allProjects.filter((project)=> project.archived == true);
    const filteredProjects = renderedPage == "All Projects" ? activeProjects.slice(firstIndex, lastIndex) : archivedProjects.slice(firstIndex, lastIndex);
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
    const lastPage = Math.ceil(allProjects.length / projectsPerPage);
    console.log(filteredProjects, "filteredProj")

    const allProjectsTableDisplay = filteredProjects.map((project, index) => {
        const statusNoSpace = project.status.replace(/\s/g, '');
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
                        <span className={`statusColor${statusNoSpace}`}>
                            {project.status}
                        </span>
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
                                    totalProjects={ renderedPage === "All Projects" ? activeProjects.length-1 : archivedProjects.length-1}
                                    projectsPerPage={projectsPerPage}
                                    currentPage={currentPage}
                                    paginate={(page: number) => paginate(page)}
                                />
                               
                                {currentPage !== lastPage-1 && (
                                    <li
                                        onClick={() =>{console.log(currentPage, lastPage)
                                            setCurrentPage(currentPage + 1)}
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
