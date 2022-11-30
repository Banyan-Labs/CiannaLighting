import React, { FC, useEffect } from 'react';
import useParams from '../../app/utils';
import ProjectsNav from './ProjectPageLower/ProjectsNav';
import ProjectSummary from './ProjectSummary';
import ProjectAttachments from './ProjectAttachments';
import { getProject } from '../../redux/actions/projectActions';
import { getAllProjectRoomsAction } from '../../redux/actions/projectActions';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import './style/projects.scss';
import { setSpecFile } from '../../redux/actions/lightActions';

const Projects: FC = () => {
    const dispatch = useAppDispatch();
    const { userProjects, projectId, project } = useAppSelector(
        ({ project }) => project
    );
    const [storedProjId] = useParams('projectId');
    const latestProject = userProjects.slice(userProjects.length - 1);
    const defaultProjId = latestProject.map((p) => p._id);
    const fetchData1 = async () => {
        storedProjId
            ? await dispatch(getProject({ _id: String(storedProjId) }))
            : await dispatch(getProject({ _id: String(defaultProjId) }));
        await dispatch(setSpecFile({projId: storedProjId, edit: ""}, false))
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
            <div className="projects-top-half">
                <ProjectSummary details={project} />
                {/* <RoomDetails /> */}
                <ProjectAttachments details={project}/>
            </div>
            <div>
                <ProjectsNav />
            </div>
        </>
    );
};
export default Projects;
