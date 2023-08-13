import React, { FC, useEffect, useState } from 'react';

import { ProjectType } from '../Dashboard/DashboardPageLower/DashboardNav';
import { getAttachments, getLightSelectionsForProject, getProject, setDefaults } from '../../redux/actions/projectActions';
import { getAllProjectRoomsAction } from '../../redux/actions/projectActions';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { getCatalogItems } from '../../redux/actions/lightActions';
import { useParams } from '../../app/utils';
import ProjectsNav from './ProjectPageLower/ProjectsNav';
import ProjectSummary from './ProjectSummary';
import AllProjectView from './AllProjectView';

import './style/projects.scss';

const Projects: FC = () => {
    const [renderedPage, setRenderedPage] = useState('All Projects');
    const [currentPage, setCurrentPage] = useState(1);
    const [sortedData, setSortedData] = useState<ProjectType[]>([]);
    const [sortDirection, setSortDirection] = useState<number>(0);
    const [currentSort, setCurrentSort] = useState<string>('');
    const [processing, setProcessing] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const { userProjects, projectId, project, yourProjects } = useAppSelector(
        ({ project }) => project
    );

    const [storedProjId] = useParams('projectId');
    const latestProject = userProjects?.slice(userProjects?.length - 1);
    const defaultProjId = latestProject?.map((p) => p._id)[0];
    const projectIdToUse: string = storedProjId ? storedProjId : defaultProjId;
    const fetchData1 = async () => {
        await dispatch(getProject({ _id: String(projectIdToUse) }))
        await dispatch(getAttachments(projectIdToUse))
        await dispatch(getLightSelectionsForProject(projectIdToUse));
        await dispatch(getCatalogItems());
    };

    useEffect(() => {
        fetchData1();
    }, [userProjects]);

    const fetchData = async () => {
        await dispatch(getAllProjectRoomsAction(projectIdToUse));
        await dispatch(getLightSelectionsForProject(projectIdToUse));
    };

    useEffect(() => {
        fetchData();
    }, [projectId]);

    useEffect(() => {
        if (yourProjects === false) {
            dispatch(setDefaults());
        } else {
            null
        }
    }, [yourProjects])

    return (
        <>
            {yourProjects === true ? (
                <>
                    <div className="projects-top-half">
                        <ProjectSummary
                            details={project}
                            processing={processing}
                            setProcessing={setProcessing}
                        />
                    </div>
                    <div>
                        <ProjectsNav processing={processing} />
                    </div>
                </>
            ) : (
                <div className="projects-bottom-half">
                    <div className="all-project-view-main-container">
                        <AllProjectView
                            renderedPage={renderedPage}
                            setRenderedPage={setRenderedPage}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            sortedData={sortedData}
                            setSortedData={setSortedData}
                            sortDirection={sortDirection}
                            setSortDirection={setSortDirection}
                            currentSort={currentSort}
                            setCurrentSort={setCurrentSort}
                            yourProject={yourProjects}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default Projects;
