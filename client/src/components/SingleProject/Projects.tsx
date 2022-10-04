import ProjectsNav from './ProjectPageLower/ProjectsNav';
import React, { FC, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import ProjectSummary from './ProjectSummary';
import ProjectAttachments from './ProjectAttachments';
import dataHolding from '../Dashboard/YourProjects/projectDetails';
import './style/projects.scss';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { placingProjectAction } from '../../redux/actions/projectActions';
// import RoomDetails from "../Rooms/RoomDetails";

const Projects: FC = () => {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector(({ auth: user }) => user);
    const { userProjects } = useAppSelector(({ project }) => project);
    const latestProject = userProjects.slice(userProjects.length - 1);
    const details = dataHolding.setData();

    useEffect(() => {
        const Color = '#AC92EB';
        Object.keys(details.data).length === 0
            ? latestProject.map(
                  (project: any) => dataHolding.getData(project, Color),
                  dispatch(placingProjectAction(details.data))
              )
            : dispatch(placingProjectAction(details.data));
    }, [details.data]);

    return (
        <>
            {Object.keys(user).length === 0 ? (
                <Navigate to="/login" />
            ) : (
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
            )}
        </>
    );
};
export default Projects;
