import ProjectsNav from './ProjectPageLower/ProjectsNav';
import React, { FC, useEffect } from 'react';
import ProjectSummary from './ProjectSummary';
import ProjectAttachments from './ProjectAttachments';
import './style/projects.scss';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { getAllProjectRoomsAction } from '../../redux/actions/projectActions';
import useParams from '../../app/utils';
import { getProject } from '../../redux/actions/projectActions';
// import RoomDetails from "../Rooms/RoomDetails";

const Projects: FC = () => {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector(({ auth: user }) => user);
    const { userProjects } = useAppSelector(({ project }) => project);
    const { projectId } = useAppSelector(({ project }) => project);
    const { project } = useAppSelector(({ project }) => project);
    const passingProj = useParams('_id');
    const [storedProjId] = useParams('projectId');
    const latestProject = userProjects.slice(userProjects.length - 1);
    const defaultProjId = latestProject.map((p) => p._id);

    const fetchData1 = async () => {
        storedProjId
            ? await dispatch(getProject(String(storedProjId)))
            : await dispatch(getProject(String(defaultProjId)));
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
                <ProjectSummary user={user} details={project} />
                {/* <RoomDetails /> */}
                <ProjectAttachments />
            </div>
            <div>
                <ProjectsNav />
            </div>
        </>
    );
};
export default Projects;
