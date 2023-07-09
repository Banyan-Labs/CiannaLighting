import React, { FC, SyntheticEvent, useEffect, useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { FaSlidersH, FaChevronUp, FaChevronDown } from 'react-icons/fa';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';

import { ProjectType } from '../Dashboard/DashboardPageLower/DashboardNav';
import {
    getAllProjects,
    setFilterProjNone,
    getUserProjects,
    createProjectAction,
    setDefaults,
} from '../../redux/actions/projectActions';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { FilterModal } from '../FilterModal/FilterParams';
import { ViewModal } from '../Dashboard/DashboardPageLower/DashboardSubComponents/ViewModal';
import { LightREF } from '../../redux/reducers/projectSlice';
import { axiosPrivate } from '../../api/axios';
import Pagination from '../Dashboard/DashboardPageLower/Pagination/Pagination';
import ProjectMiniModal from './ProjectMiniModal';
import InactiveNotification from '../InactiveNotification/InactiveNotification';
import { CopyType } from 'app/constants';
import { findClosestSystemStatus } from 'app/utils';

import '../Dashboard/DashboardPageLower/DashboardSubComponents/style/allProjects.scss';

type Props = {
    renderedPage: string;
    setRenderedPage: React.Dispatch<React.SetStateAction<string>>;
    currentPage: number;
    sortDirection: number;
    currentSort: string;
    sortedData: ProjectType[];
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    setSortedData: React.Dispatch<React.SetStateAction<ProjectType[]>>;
    setSortDirection: React.Dispatch<React.SetStateAction<number>>;
    setCurrentSort: React.Dispatch<React.SetStateAction<string>>;
    yourProject: any;
};

const AllProjectView: FC<Props> = ({
    renderedPage,
    setRenderedPage,
    currentPage,
    setCurrentPage,
    sortDirection,
    currentSort,
    sortedData,
    setSortedData,
    setSortDirection,
    setCurrentSort,
    yourProject,
}) => {
    const dispatch = useAppDispatch();
    const [openModal2, setOpenModal2] = useState(false);
    const [deleteProject, setDeleteProject] = useState(false);
    const [projectModal, setProjectModal] = useState(null);
    const { userProjects, allProjects, filterQueryProjects } = useAppSelector(
        ({ project }) => project
    );
    const [typeOfProject, setTypeOfProject] = useState('yourProjects');
    const filterThis =
        typeOfProject === 'yourProjects' ? userProjects : allProjects;
    const [projectOptionsModal, setProjectOptionsModal] =
        useState<boolean>(false);
    const [projectIndex, setProjectIndex] = useState<number | null>(null);
    const projectsPerPage = 11;
    const [openModal, setOpenModal] = useState(false);
    const [parsedData, setParsedData] = useState<ProjectType[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [processing, setProcessing] = useState(false);
    const { user } = useAppSelector(({ auth: user }) => user);
    const [inactiveClearModal, setInactiveClearModal] =
        useState<boolean>(false);
    const [inactiveList, setInactiveList] = useState<LightREF[] | []>([]);
    const [projectHold, setProjectHold] = useState<ProjectType | null>(null);

    // Input Field handler
    const handleUserInput = (e: any) => {
        setInputValue(e.currentTarget.value);
    };

    // Reset Input Field handler
    const resetInputField = () => {
        setInputValue('');
    };

    //  Reset sort direction
    const setSortToDefault = () => {
        setSortedData([]);
        setSortDirection(0);
        setCurrentSort('');
    };
    const inactiveModalTrigger = (): void => {
        setInactiveClearModal(true);
        onMouseOut();
    };
    const clearInactiveModal = () => {
        setInactiveList([]);
        setProjectHold(null);
        setInactiveClearModal(false);
    };
    const copyOfProject = async (e: SyntheticEvent, proj: ProjectType) => {
        e.preventDefault();
        // FIND PROJECT WITH AXIOS
        setProcessing(true);

        const axiosPriv = axiosPrivate();
        const attach = await axiosPriv.post('/get-attachments', {
            projId: proj._id,
        });
        let attachments = [];

        if (attach) {
            attachments = attach.data.proj.pdf;

            if (attachments.length) {
                const payload = {
                    project: {
                        ...proj,
                        clientId: user._id,
                        clientName: user.name,
                    },
                    copy: CopyType.PROJECT,
                    attachments: attachments,
                };

                try {
                    const response = await dispatch(
                        createProjectAction(payload)
                    );

                    dispatch(getUserProjects(user._id));
                    dispatch(getAllProjects());
                    setProcessing(false);
                    alert(`Copy of ${proj.name} created in your dashboard.`);

                    return response;
                } catch (error: any) {
                    throw new Error(error.message);
                }
            }
        }
    };

    useEffect(() => {
        dispatch(getAllProjects());
        dispatch(setFilterProjNone());
        dispatch(setDefaults());
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

        try {
            checkSearchVal;
        } catch (error: any) {
            alert('Please no special characters.');
            return error;
        }

        if (searchValue === '') {
            setParsedData(data);

            return data;
        } else if (checkSearchVal && searchValue.length) {
            const correctSearch = filterQueryProjects.length > 0 ? filterQueryProjects : data;
            const searchData = correctSearch.filter((item: ProjectType) => {
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

    const reduxData = filterQueryProjects?.length
        ? filterQueryProjects.slice()
        : filterThis.slice();
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
    const lastPage = Math.ceil(
        typeOfProject === 'yourProjects'
            ? userProjects.length
            : allProjects.length / projectsPerPage
    );
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
                    <td className="projects-table-dynamic-status">
                        <span className={`statusColor${findClosestSystemStatus(project.status)}`}>
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
                                typeOfProject={typeOfProject}
                                setTypeOfProject={setTypeOfProject}
                                yourProject={yourProject}
                                copyOfProject={copyOfProject}
                                setInactiveList={setInactiveList}
                                setProjectHold={setProjectHold}
                                inactiveModalTrigger={inactiveModalTrigger}
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
                            value={inputValue}
                            placeholder="Search"
                            onChange={async (e) => {
                                handleUserInput(e);
                                if (
                                    typeOfProject === 'yourProjects' &&
                                    filterQueryProjects.length > 0
                                ) {
                                    searchFilter(e, filterQueryProjects);
                                }
                                if (
                                    typeOfProject === 'allProjects' &&
                                    filterQueryProjects.length > 0
                                ) {
                                    searchFilter(e, filterQueryProjects);
                                }
                                if (typeOfProject === 'yourProjects') {
                                    searchFilter(e, userProjects);
                                }
                                if (typeOfProject === 'allProjects') {
                                    searchFilter(e, allProjects);
                                } else searchFilter(e, reduxData);
                            }}
                        />
                        <label htmlFor="description" className="form__label1">
                            Search
                        </label>
                    </div>
                    <FaSlidersH
                        className="dashboard-all-projects-submit"
                        onClick={async () => {
                            await resetInputField();
                            await setParsedData([]);
                            await dispatch(setFilterProjNone());
                            setOpenModal(true);
                        }}
                        style={{ background: '#3f3c39', color: '#c09d5b' }}
                    />
                    <div className="personal-section-links">
                        <a
                            id="all-projects"
                            onClick={() => {
                                setCurrentPage(1);
                                setRenderedPage('All Projects');
                                setSortToDefault();
                            }}
                            className={
                                renderedPage === 'All Projects'
                                    ? 'personal-active'
                                    : 'personal-not-active'
                            }
                        >
                            Active Projects
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
                                    ? 'personal-active'
                                    : 'personal-not-active'
                            }
                        >
                            Archived
                        </a>
                    </div>

                    <div className="button-filter-container d-flex justify-content-end align-items-center">
                        <div
                            className={
                                processing ? 'processing' : 'process-none'
                            }
                        >
                            <h2>...Processing</h2>
                        </div>
                        <div className="button-toggler">
                            <button
                                className={
                                    typeOfProject === 'allProjects'
                                        ? 'all-project-button'
                                        : 'type-project-btn'
                                }
                                onClick={async () => {
                                    await resetInputField();
                                    await dispatch(setFilterProjNone());
                                    await setParsedData([]);
                                    await setTypeOfProject('allProjects');
                                }}
                            >
                                All Projects
                            </button>
                            <button
                                className={
                                    typeOfProject === 'yourProjects'
                                        ? 'your-projects-button'
                                        : 'type-project-btn'
                                }
                                onClick={async () => {
                                    await resetInputField();
                                    await setSortToDefault();
                                    await dispatch(setFilterProjNone());
                                    await setParsedData([]);
                                    await setTypeOfProject('yourProjects');
                                }}
                            >
                                Your Projects
                            </button>
                        </div>
                    </div>
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
                                    <td className="projects-table-dots"> </td>
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
                                            ? activeProjects.length
                                            : archivedProjects.length
                                    }
                                    projectsPerPage={projectsPerPage}
                                    currentPage={currentPage}
                                    paginate={(page: number) => paginate(page)}
                                />
                                {(currentPage !== lastPage && (activeProjects.length || archivedProjects.length)) && (
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
                <FilterModal
                    openModal={openModal}
                    closeModal={setOpenModal}
                    typeOfProject={typeOfProject}
                />
            )}
            {inactiveClearModal && (
                <InactiveNotification
                    inactiveList={inactiveList}
                    projectHold={projectHold}
                    clearInactiveModal={clearInactiveModal}
                    copyOfProject={copyOfProject}
                />
            )}
        </div>
    );
};

export default AllProjectView;
