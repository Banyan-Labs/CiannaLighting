import React, { FC, useEffect, useRef, useState } from 'react';
import { FaSlidersH, FaChevronUp, FaChevronDown } from 'react-icons/fa';
import { BsThreeDots } from 'react-icons/bs';
import './style/allProjects.scss';
import { getAllProjects } from '../../../../redux/actions/projectActions';
import { useAppSelector, useAppDispatch } from '../../../../app/hooks';
import Pagination from '../Pagination/Pagination';
import ProjectMiniModal from './ProjectMiniModal';
import { ProjectType } from '../DashboardNav';
import { ViewModal } from './ViewModal';


import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';

type Props = {
    renderedPage: string;
    currentPage: number;
    sortDirection:number, 
    currentSort:string,
    sortedData: ProjectType[], 
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    setSortedData:React.Dispatch<React.SetStateAction<ProjectType[]>>
    setSortDirection:React.Dispatch<React.SetStateAction<number>>,
    setCurrentSort:React.Dispatch<React.SetStateAction<string>>
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
    setCurrentSort
    
}) => {
    const dispatch = useAppDispatch();
    const { allProjects } = useAppSelector(({ project }) => project);
    const [openModal, setOpenModal] = useState(false);
    const [projectModal, setProjectModal] = useState(null);
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
    const triggerDirection = (field: string) =>{
        if(field == currentSort){
        if(sortDirection == 0){
            setSortDirection(1);
            setUpSortTrigger(field, 1);
        }else if(sortDirection == 1){
            setSortDirection(2);
            setUpSortTrigger(field, 2);
        }else{
            setSortDirection(0);
            setUpSortTrigger(field, 0);
        }
    }else{
        setSortDirection(1);
        setUpSortTrigger(field, 1);
    }

    }
    const setUpSortTrigger = (field: string, direction: number) =>{
        let utilizedData:any = []
        console.log("direction: ", sortDirection)
        if(renderedPage == "All Projects"){
            utilizedData = activeProjects

        }else{
            utilizedData = archivedProjects
        }
        const sorted: any ={ 
            0: utilizedData,
            1: utilizedData.slice().sort((a:any, b:any)=> {
                if (a[field] < b[field]) {
                return -1;
              }
              if (a[String(field)] > b[String(field)]) {
                return 1;
              }
              return 0;
            }),
            2: utilizedData.slice().sort((a:any,b:any)=>{
                if (b[String(field)] < a[String(field)]) {
                return -1;
              }
              if (b[String(field)] > a[(field)]) {
                return 1;
              }
              return 0;
            })
        }
        setSortedData(sorted[direction]);
        setCurrentSort(field);
        
    }


    const lastIndex = currentPage * projectsPerPage;
    const firstIndex = lastIndex - projectsPerPage;
    const activeProjects = allProjects.filter((project) => !project.archived);
    console.log( "Direction: ",sortDirection)
    const archivedProjects = allProjects.filter(
        (project) => project.archived == true
    );
    
    const filteredProjects = sortedData.length ? sortedData.slice(firstIndex, lastIndex) : renderedPage == "All Projects" ? activeProjects.slice(firstIndex, lastIndex) : archivedProjects.slice(firstIndex, lastIndex);
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
    const lastPage = Math.ceil(allProjects.length / projectsPerPage);
    const sortDisplay = (field: string) =>{
        const directionCall: any = {
            0: "",
            1: <FaChevronUp className='sort-chevron'/>,
            2: <FaChevronDown className='sort-chevron'/>
        }
        if(field == currentSort){
            console.log("F, CS, SD: ",field, currentSort, sortDirection)
            return directionCall[sortDirection]
        }else{
            return directionCall[0]
        }
        
    }
    
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
                            <ProjectMiniModal setOpenModal={setOpenModal} setProjectModal={setProjectModal} project={project} />
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
                                <td className="projects-table-name" onClick={()=> triggerDirection('name')}> 
                                    Name {sortDisplay('name')}
                                    </td>
                                <td className="projects-table-designer" onClick={()=> triggerDirection('clientName')}>
                                    Designer {sortDisplay('clientName')}
                                </td>
                                <td className="projects-table-region" onClick={()=> triggerDirection('region')}>
                                    Region {sortDisplay('region')}
                                </td>
                                <td className="projects-table-status" onClick={()=> triggerDirection('status')}>
                                    Status {sortDisplay('status')}
                                </td>
                                <td className="projects-table-dots"> </td>
                            </tr>
                        </thead>
                        {allProjectsTableDisplay}
                    </table>
                    <div className="pages-list">
                        <nav>
                            {renderedPage == 'All Projects' ? (
                                <div className="table-showing">
                                    Showing{' '}
                                    {currentPage * projectsPerPage -
                                        (projectsPerPage - 1)}
                                    -
                                    {currentPage * projectsPerPage >
                                    allProjects.length - archivedProjects.length
                                        ? allProjects.length -
                                          archivedProjects.length
                                        : currentPage * projectsPerPage}{' '}
                                    of{' '}
                                    {allProjects.length -
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
            {openModal && (
                    <ViewModal
                        openModal={openModal}
                        closeModal={setOpenModal}
                        projectModal={projectModal}
                        setProjectModal={setProjectModal}
                    /> 
                )}
        </div>
    );
};
export default AllProjects;
