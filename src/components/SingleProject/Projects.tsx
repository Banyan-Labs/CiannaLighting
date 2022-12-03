import React, { FC, useEffect, useState } from 'react';
import useParams from '../../app/utils';
import ProjectsNav from './ProjectPageLower/ProjectsNav';
import ProjectSummary from './ProjectSummary';
import ProjectAttachments from './ProjectAttachments';
import { getProject } from '../../redux/actions/projectActions';
import { getAllProjectRoomsAction } from '../../redux/actions/projectActions';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import './style/projects.scss';
import AllProjectView from './AllProjectView';

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

const Projects: FC = () => {
    const [renderedPage, setRenderedPage] = useState('All Projects');
    const [currentPage, setCurrentPage] = useState(1);
    const [sortedData, setSortedData] = useState<ProjectType[]>([]);
    const [sortDirection, setSortDirection] = useState<number>(0);
    const [currentSort, setCurrentSort] = useState<string>('');
    const dispatch = useAppDispatch();
    const { userProjects, projectId, project } = useAppSelector(
        ({ project }) => project
    );
    const [yourProject, setYourProject] = useState(false);
    const [storedProjId] = useParams('projectId');
    const latestProject = userProjects.slice(userProjects.length - 1);
    const defaultProjId = latestProject.map((p) => p._id);
    const fetchData1 = async () => {
        storedProjId
            ? await dispatch(getProject({ _id: String(storedProjId) }))
            : await dispatch(getProject({ _id: String(defaultProjId) }));
    };

    useEffect(() => {
        fetchData1();
    }, [userProjects]);

    const fetchData = async () => {
        storedProjId
            ? await dispatch(getAllProjectRoomsAction(String(storedProjId)))
            : await dispatch(getAllProjectRoomsAction(String(defaultProjId)));
    };

    useEffect(() => {
        fetchData();
    }, [projectId]);

    return (
        <>
        {yourProject === true ? 
            (
                <>
            <div className="projects-top-half">
                <ProjectSummary details={project} setYourProject={setYourProject} />
                {/* <RoomDetails /> */}
                <ProjectAttachments details={project}/>
            </div>
            <div>
                <ProjectsNav />
            </div>
           </>
            ) :
                (
               <div className='projects-bottom-half'> 
               <div className='all-project-view-main-container'>
                <AllProjectView
                renderedPage={renderedPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                sortedData={sortedData}
                setSortedData={setSortedData}
                sortDirection={sortDirection}
                setSortDirection={setSortDirection}
                currentSort={currentSort}
                setCurrentSort={setCurrentSort}
                yourProject={yourProject}
                 setYourProject={setYourProject}
                 />
                 </div>
               </div>
            )}
        </>
    );
};
export default Projects;
