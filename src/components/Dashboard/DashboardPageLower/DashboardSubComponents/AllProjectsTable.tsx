import React, { FC, useEffect, useState } from 'react';
import Pagination from '../Pagination/Pagination';
import ProjectMiniModal from './ProjectMiniModal';
import { BsThreeDots } from 'react-icons/bs';
import { ProjectType } from '../DashboardNav';
import { getAllProjects } from '../../../../redux/actions/projectActions';
import { useAppSelector, useAppDispatch } from '../../../../app/hooks';
import { FaSlidersH, FaChevronUp, FaChevronDown } from 'react-icons/fa';
import './style/allProjects.scss';

import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import { FilterModal } from '../../../FilterModal/FilterParams';
import { ViewModal } from './ViewModal';

type Props = {
    renderedPage: string;
    currentPage: number;
    sortDirection: number;
    currentSort: string;
    sortedData: ProjectType[];
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    setSortedData: React.Dispatch<React.SetStateAction<ProjectType[]>>;
    setSortDirection: React.Dispatch<React.SetStateAction<number>>;
    setCurrentSort: React.Dispatch<React.SetStateAction<string>>;
};

const AllProjects: FC<Props> = ({
    renderedPage,
    currentPage,
    setCurrentPage,
    sortDirection,
    currentSort,
    sortedData,
    setSortedData,
    setSortDirection,
    setCurrentSort,
}) => {
    const dispatch = useAppDispatch();
    const [openModal2, setOpenModal2] = useState(false);
    const [deleteProject, setDeleteProject] = useState(false);
    const [projectModal, setProjectModal] = useState(null);
    const { allProjects, filterQueryProjects } = useAppSelector(
        ({ project }) => project
    );
    const [projectOptionsModal, setProjectOptionsModal] =
        useState<boolean>(false);
    const [projectIndex, setProjectIndex] = useState<number | null>(null);
    const projectsPerPage = 5;
    const [openModal, setOpenModal] = useState(false);
    const [parsedData, setParsedData] = useState<ProjectType[]>([]);
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
    const triggerDirection = (field: string) => {
        if (field == currentSort) {
            if (sortDirection == 0) {
                setSortDirection(1);
                setUpSortTrigger(field, 1);
            } else if (sortDirection == 1) {
                setSortDirection(2);
                setUpSortTrigger(field, 2);
            } else {
                setSortDirection(0);
                setUpSortTrigger(field, 0);
            }
        } else {
            setSortDirection(1);
            setUpSortTrigger(field, 1);
        }
    };
    const setUpSortTrigger = (field: string, direction: number) => {
        let utilizedData: any = [];
        console.log('direction: ', sortDirection);
        if (renderedPage == 'All Projects') {
            utilizedData = activeProjects;
        } else {
            utilizedData = archivedProjects;
            return;
        }
        const sorted: any = {
            0: utilizedData,
            1: utilizedData.slice().sort((a: any, b: any) => {
                if (a[field] < b[field]) {
                    return -1;
                }
                if (a[String(field)] > b[String(field)]) {
                    return 1;
                }
                return 0;
            }),
            2: utilizedData.slice().sort((a: any, b: any) => {
                if (b[String(field)] < a[String(field)]) {
                    return -1;
                }
                if (b[String(field)] > a[field]) {
                    return 1;
                }
                return 0;
            }),
        };
        setSortedData(sorted[direction]);
        setCurrentSort(field);
    };

    const lastIndex = currentPage * projectsPerPage;
    const firstIndex = lastIndex - projectsPerPage;

    const searchFilter = (e: any, data: any) => {
        const searchValue: string = e.currentTarget.value.toLowerCase();
        const checkSearchVal = /^[A-Za-z0-9 ]+$/.test(searchValue);
        console.log(checkSearchVal);
        try {
            checkSearchVal;
        } catch (error: any) {
            alert('Please no special characters.');
            console.log('error in searchfield: ', error.message);
        }
        if (searchValue === '') {
            setParsedData(data);
            return data;
        } else if (checkSearchVal && searchValue.length) {
            const searchData = data.filter((item: ProjectType) => {
                const searchItem = {
                    clientName: item.clientName,
                    name: item.name,
                    status: item.status,
                    region: item.region,
                };
                const itemVals: any = Object.values(searchItem);
                let doesMatch = false;
                itemVals.map((item: string) => {
                    const regCheck = new RegExp(searchValue, 'g').test(
                        item.toLowerCase()
                    );
                    if (regCheck) {
                        doesMatch = true;
                    }
                });
                if (Boolean(doesMatch) === true) {
                    return item;
                } else {
                    return '';
                }
            });
            setParsedData(searchData);
            return searchData;
        } else {
            alert('Please no special characters.');
        }
    };

    const reduxData = filterQueryProjects.length
        ? filterQueryProjects.slice()
        : allProjects.slice();
    const activeProjects = (parsedData.length ? parsedData : reduxData).filter(
        (project) => !project.archived
    );
    const archivedProjects = (
        parsedData.length ? parsedData : reduxData
    ).filter((project) => project.archived == true);

    const filteredProjects = sortedData.length
        ? sortedData.slice(firstIndex, lastIndex)
        : renderedPage == 'All Projects'
        ? activeProjects.reverse().slice(firstIndex, lastIndex)
        : archivedProjects.reverse().slice(firstIndex, lastIndex);
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
    const lastPage = Math.ceil(reduxData.length / projectsPerPage);
    const sortDisplay = (field: string) => {
        const directionCall: any = {
            0: '',
            1: <FaChevronUp className="sort-chevron" />,
            2: <FaChevronDown className="sort-chevron" />,
        };
        if (field == currentSort) {
            return directionCall[sortDirection];
        } else {
            return directionCall[0];
        }
    };

    const allProjectsTableDisplay = filteredProjects.map((project, index) => {
        const statusNoSpace = project.status.replace(/\s/g, '');
        return (
            <tbody key={index}>
                <tr
                    className="projects-table-dynamic-row"
                    style={index > 3 ? { borderBottom: 'none' } : {}}
                >
                    <th className="projects-table-dynamic-name">
                        {project.name}
                    </th>
                    <td className="projects-table-dynamic-designer">
                        {project.clientName}
                    </td>
                    <td className="projects-table-dynamic-region">
                        {project.region}
                    </td>
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
                                <BsThreeDots className="project-table-dots" />
                            </span>
                        </div>
                        {projectOptionsModal && projectIndex === index && (
                            <ProjectMiniModal
                                setOpenModal={setOpenModal2}
                                setProjectModal={setProjectModal}
                                project={project}
                                setDeleteProject={setDeleteProject}
                            />
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
                    <div className="list__group">
                        <input
                            className="form__field"
                            type="text"
                            placeholder="Search"
                            onChange={(e) => searchFilter(e, reduxData)}
                        />
                        <label htmlFor="description" className="form__label">
                            Search
                        </label>
                    </div>
                    <FaSlidersH
                        className="dashboard-all-projects-submit"
                        onClick={() => setOpenModal(true)}
                        style={{ background: '#3f3c39', color: '#c09d5b' }}
                    />
                </div>
                <div>
                    <div className="dashboard-all-projects">
                        <table className="dashboard-all-projects-table">
                            <thead className="table-headers">
                                <tr className="rows">
                                    <td
                                        className="projects-table-name"
                                        onClick={() => triggerDirection('name')}
                                    >
                                        Name {sortDisplay('name')}
                                    </td>
                                    <td
                                        className="projects-table-designer"
                                        onClick={() =>
                                            triggerDirection('clientName')
                                        }
                                    >
                                        Designer {sortDisplay('clientName')}
                                    </td>
                                    <td
                                        className="projects-table-region"
                                        onClick={() =>
                                            triggerDirection('region')
                                        }
                                    >
                                        Region {sortDisplay('region')}
                                    </td>
                                    <td
                                        className="projects-table-status"
                                        onClick={() =>
                                            triggerDirection('status')
                                        }
                                    >
                                        Status {sortDisplay('status')}
                                    </td>
                                    <td className="projects-table-dots"></td>
                                </tr>
                            </thead>
                            {allProjectsTableDisplay}
                        </table>
                    </div>

                    <div className="pages-list">
                        <nav>
                            {renderedPage == 'All Projects' ? (
                                <div className="table-showing">
                                    Showing{' '}
                                    {currentPage * projectsPerPage -
                                        (projectsPerPage - 1)}
                                    -
                                    {currentPage * projectsPerPage >
                                    reduxData.length - archivedProjects.length
                                        ? reduxData.length -
                                          archivedProjects.length
                                        : currentPage * projectsPerPage}{' '}
                                    of{' '}
                                    {(parsedData.length
                                        ? parsedData.length
                                        : reduxData.length) -
                                        archivedProjects.length}
                                </div>
                            ) : (
                                <div className="table-showing">
                                    Showing{' '}
                                    {currentPage * projectsPerPage -
                                        (projectsPerPage - 1)}
                                    -
                                    {currentPage * projectsPerPage >
                                    archivedProjects.length
                                        ? archivedProjects.length
                                        : currentPage * projectsPerPage}{' '}
                                    of {archivedProjects.length}
                                </div>
                            )}

                            <ul className="pagination">
                                {currentPage > 1 && (
                                    <li
                                        onClick={() =>
                                            setCurrentPage(currentPage - 1)
                                        }
                                        className="page-link"
                                    >
                                        <MdNavigateBefore
                                            className="arrow-pagination"
                                            id="arrow-pag-before"
                                        />
                                    </li>
                                )}
                                <Pagination
                                    totalProjects={
                                        renderedPage === 'All Projects'
                                            ? activeProjects.length - 1
                                            : archivedProjects.length - 1
                                    }
                                    projectsPerPage={projectsPerPage}
                                    currentPage={currentPage}
                                    paginate={(page: number) => paginate(page)}
                                />
                                {currentPage !== lastPage - 1 && (
                                    <li
                                        onClick={() => {
                                            setCurrentPage(currentPage + 1);
                                        }}
                                        className="page-link"
                                    >
                                        <MdNavigateNext
                                            className="arrow-pagination"
                                            id="arrow-pag-next"
                                        />
                                    </li>
                                )}
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
            {openModal2 && (
                <ViewModal
                    openModal={openModal2}
                    closeModal={setOpenModal2}
                    projectModal={projectModal}
                    setProjectModal={setProjectModal}
                    deleteProject={deleteProject}
                    setDeleteProject={setDeleteProject}
                />
            )}
            {openModal && (
                <FilterModal openModal={openModal} closeModal={setOpenModal} />
            )}
        </div>
    );
};
export default AllProjects;
