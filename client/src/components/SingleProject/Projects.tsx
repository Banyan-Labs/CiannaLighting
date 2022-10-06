import ProjectsNav from './ProjectPageLower/ProjectsNav';
import React, { FC, useEffect } from 'react';
import ProjectSummary from './ProjectSummary';
import ProjectAttachments from './ProjectAttachments';
import dataHolding from '../Dashboard/YourProjects/projectDetails';
import './style/projects.scss';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
    placingProjectAction,
    getAllProjectRoomsAction,
} from '../../redux/actions/projectActions';
// import RoomDetails from "../Rooms/RoomDetails";

const Projects: FC = () => {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector(({ auth: user }) => user);
    const { userProjects } = useAppSelector(({ project }) => project);
    const details = dataHolding.setData();

    const fetchData = async () => {
        const latestProject = await userProjects.slice(userProjects.length - 1);
        const projectId = String(details.data._id);
        const Color = '#AC92EB';
        Object.keys(details.data).length === 0 ||
        Object.keys(details.color).length === 0
            ? latestProject.map(
                  (project: any) => dataHolding.getData(project, Color),
                  await dispatch(placingProjectAction(details.data))
              )
            : await dispatch(placingProjectAction(details.data));
        await dispatch(getAllProjectRoomsAction(String(projectId)));
    };

    useEffect(() => {
        fetchData();
    }, [userProjects]);

    useEffect(() => {
        fetchData();
    }, [details.data]);

    return (
        <>
            <div className="projects-top-half">
                <ProjectSummary user={user} details={details} />
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
