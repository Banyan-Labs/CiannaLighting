import { Dispatch } from 'redux';

import {
    setProject,
    setProjectError,
    setRoom,
    setRoomId,
    setProjectId,
    setAllProjects,
    setFilteredProjects,
    setProjectRooms,
    setUserProjects,
} from '../reducers/projectSlice';
import { ProjectType, RoomType } from '../reducers/projectSlice';
import { axiosPrivate } from '../../api/axios';

export const createProjectAction =
    (payload: ProjectType) =>
    async (dispatch: Dispatch): Promise<void> => {
        const axiosPriv = await axiosPrivate();
        try {
            const response = await axiosPriv.post('/create-project', payload);
            dispatch(setProjectId(response.data.project));
            dispatch(setProject(response.data.project));
        } catch (error: any) {
            dispatch(setProjectError(error.response.data));
        }
    };

export const createRoomAction =
    (payload: RoomType) =>
    async (dispatch: Dispatch): Promise<void> => {
        const axiosPriv = await axiosPrivate();
        try {
            const response = await axiosPriv.post('/create-room', payload);
            dispatch(setRoomId(response.data.room._id));
            dispatch(setRoom(response.data.room));
        } catch (error: any) {
            dispatch(setProjectError(error.response.data));
        }
    };

export const setTheRoom =
    (roomId: string) =>
    async (dispatch: Dispatch): Promise<void> => {
        const axiosPriv = await axiosPrivate();
        try {
            const response = await axiosPriv.post('/find-room', {
                _id: roomId,
            });
            dispatch(setRoomId(response.data.room._id));
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
        const axiosPriv = await axiosPrivate();
        try {
            const projects = await axiosPriv.post('/account-projects', {
                clientId: userId,
            });
            await dispatch(setUserProjects(projects.data));
        } catch (err) {
            console.log(err);
        }
    };

export const getProject =
    (payload: any) =>
    async (dispatch: Dispatch): Promise<void> => {
        const axioscall = await axiosPrivate();
        try {
            const project = await axioscall.post('/find-project', payload);
            dispatch(setProject(project.data.project));
            dispatch(setProjectId(project.data.project));
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
            console.log("Projects: ",projects)
            dispatch(setAllProjects(projects.data));
        } catch (err) {
            console.log(err);
        }
    };
export const getFilteredProjects =
    (payload: any) =>
    async (dispatch: Dispatch): Promise<void> => {
        const axioscall = await axiosPrivate();
        try {
            const projects = await axioscall.post('/get-projects', payload);
            console.log("Filtered Projects: ",projects)
            dispatch(setFilteredProjects(projects.data));
        } catch (err) {
            console.log(err);
        }
    };

    export const viewProjectRooms =
    (projectId: string) =>
    async (dispatch: Dispatch): Promise<void> => {
        const axioscall = await axiosPrivate();
        try {
            const response = await axioscall.post('/get-rooms', {
                projectId: projectId,
            });
            return response.data.rooms
        } catch (error: any) {
            dispatch(setProjectError(error.response.data));
        }
    };


    export const viewRoomLights =
    (roomId: string) =>
    async (dispatch: Dispatch): Promise<void> => {
        const axiosPriv = await axiosPrivate();
        try {
            const response = await axiosPriv.post('/get-lightSelections', {
                roomId: roomId,
            });
            console.log(response)
           return  response.data.lights
        } catch (error: any) {
            dispatch(setProjectError(error.response.data));
        }
    };