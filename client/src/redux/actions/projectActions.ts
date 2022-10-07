import { Dispatch } from 'redux';
import {
    setProject,
    setProjectError,
    setRoom,
    setProjectId,
    setAllProjects,
    setProjectRooms,
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

export const placingProjectAction =
    (payload: object) =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            dispatch(setProjectId(payload));
            dispatch(setProject(payload));
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
            // console.log(response, 'created room');
            dispatch(setRoom(response.data.room));
        } catch (error: any) {
            dispatch(setProjectError(error.response.data));
        }
    };

export const getAllProjectRoomsAction =
    (projectId: string) =>
    async (dispatch: Dispatch): Promise<void> => {
        const axioscall = await axiosPrivate();
        try {
            const response = await axioscall.post('/get-rooms', {
                projectId: projectId,
            });
            dispatch(setProjectRooms(response.data.rooms));
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

export const getAllProjects =
    () =>
    async (dispatch: Dispatch): Promise<void> => {
        const axioscall = await axiosPrivate();
        try {
            const projects = await axioscall.post('/get-projects');
            dispatch(setAllProjects(projects.data));
        } catch (err) {
            console.log(err);
        }
    };
