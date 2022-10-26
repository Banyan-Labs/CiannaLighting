import React, { FC, useEffect, useRef, useState } from 'react';
import { FaSlidersH, FaChevronUp, FaChevronDown } from 'react-icons/fa';
import { BsThreeDots } from 'react-icons/bs';
import './style/allProjects.scss';
import { getAllProjects } from '../../../../redux/actions/projectActions';
import { useAppSelector, useAppDispatch } from '../../../../app/hooks';
import Pagination from '../Pagination/Pagination';
import ProjectMiniModal from './ProjectMiniModal';


import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';

type Props = {
    renderedPage: string;
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};
type  ProjectType = {
    name: string;
    archived: boolean;
    clientId: string;
    clientName: string;
    region: string;
    status: string;
    description: string;
    rfp?: string;
    rooms?: string[];
}

const AllProjects: FC<Props> = ({
    renderedPage,
    currentPage,
    setCurrentPage,
}) => {
    const dispatch = useAppDispatch();
    const { allProjects } = useAppSelector(({ project }) => project);
    console.log(allProjects[0], 'weird')
    const [filterProjects, setFilterProjects] = useState('');
    filterProjects;
    const [projectOptionsModal, setProjectOptionsModal] =
        useState<boolean>(false);
    const [projectIndex, setProjectIndex] = useState<number | null>(null);
    const [sortedData, setSortedData] = useState<ProjectType[]>([])
    const [sortDirection, setSortDirection] = useState<number>(0)
    const [currentSort, setCurrentSort] = useState<string>("")
    // setSortedData(allProjects)
    

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
        }else if(sortDirection == 1){
            setSortDirection(2);
        }else{
            setSortDirection(0);
        }
    }else{
        setSortDirection(1)
    }

    }
    const setUpSortTrigger = (e:any,field: string) =>{
        // e.preventDefault()
        triggerDirection(field)
        let utilizedData:any = []
        console.log("direction: ", sortDirection)
        if(renderedPage == "All Projects"){
            utilizedData = activeProjects

        }else{
            utilizedData = archivedProjects
        }
        
        // const copyProjects: ProjectType[] = filteredProjects.slice()
        const sorted: any ={ 
            2: utilizedData,
            0: utilizedData.slice().sort((a:any, b:any)=> {
                if (a[field] < b[field]) {
                return -1;
              }
              if (a[String(field)] > b[String(field)]) {
                return 1;
              }
              return 0;
            }),
            1: utilizedData.slice().sort((a:any,b:any)=>{
                if (b[String(field)] < a[String(field)]) {
                return -1;
              }
              if (b[String(field)] > a[(field)]) {
                return 1;
              }
              return 0;
            })
        }
        console.log(sorted[sortDirection], "keyed sort")
        
        setSortedData(sorted[sortDirection]);
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
                                <BsThreeDots className="project-table-dots" />
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
                                <td className="projects-table-name" onClick={(e)=> setUpSortTrigger(e,'name')}> 
                                {/* include the onclick on all three of these */}
                                    Name {sortDisplay('name')}
                                    </td>
                                <td className="projects-table-designer" onClick={(e)=> setUpSortTrigger(e,'clientName')}>
                                    Designer {sortDisplay('clientName')}
                                </td>
                                <td className="projects-table-region" onClick={(e)=> setUpSortTrigger(e,'region')}>
                                    Region {sortDisplay('region')}
                                </td>
                                <td className="projects-table-status" onClick={(e)=> setUpSortTrigger(e,'status')}>
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
        </div>
    );
};
export default AllProjects;
