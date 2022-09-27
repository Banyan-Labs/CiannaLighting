import { Dispatch } from 'redux';
import {
    setProject,
    setProjectError,
    setRoom,
    setProjectId,
} from '../reducers/projectSlice';
import { ProjectType, RoomType } from '../reducers/projectSlice';
import { axiosPrivate } from '../../api/axios';
import { setUserProjects } from '../reducers/projectSlice';

export const createProjectAction =
    (payload: ProjectType) =>
    async (dispatch: Dispatch): Promise<void> => {
        const axioscall = await axiosPrivate();
        try {
            const response = await axioscall.post('/create-project/', payload);
            dispatch(setProjectId(response.data.project));
            dispatch(setProject(response.data.project));
        } catch (error: any) {
            dispatch(setProjectError(error.response.data));
        }
    };

export const createRoomAction =
    (payload: RoomType) =>
    async (dispatch: Dispatch): Promise<void> => {
        const axioscall = await axiosPrivate();
        try {
            const response = await axioscall.post('/create-room', payload);
            console.log(response);
            dispatch(setRoom(response.data.room));
        } catch (error: any) {
            dispatch(setProjectError(error.response.data));
        }
    };

export const getUserProjects =
    (userId: string) =>
    async (dispatch: Dispatch): Promise<void> => {
        const axioscall = await axiosPrivate();
        try {
            const projects = await axioscall.post('/account-projects', {
                clientId: userId,
            });
            dispatch(setUserProjects(projects.data));
        } catch (err) {
            console.log(err);
        }
    };
