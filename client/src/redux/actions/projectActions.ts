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
    setYourProjects,
    setFilteredProjNone,
    setPersonalizedDefaults,
    setAttachments,
    setLightSelections,
} from '../reducers/projectSlice';
import { RoomType } from '../reducers/projectSlice';
import { axiosPrivate } from '../../api/axios';
import logging from 'config/logging';

export const createProjectAction =
    (payload: any) =>
        async (dispatch: Dispatch): Promise<void> => {
            const axiosPriv = axiosPrivate();

            try {
                const response = await axiosPriv.post('/create-project', {
                    ...payload?.project,
                    copy: payload.copy,
                });

                if (response) {
                    dispatch(setProjectId(response.data.project));
                    dispatch(setProject(response.data.project));
                    dispatch(setProjectRooms([]));
                } else {
                    null;
                }
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

                dispatch(setRoomId(response?.data?.room?._id));
                dispatch(setRoom(response?.data?.room));
            } catch (error: any) {
                dispatch(setProjectError(error.response.data));
            }
        };

export const setTheRoom =
    (roomId: string) =>
        async (dispatch: Dispatch): Promise<void> => {
            const axiosPriv = axiosPrivate();

            try {
                const response = await axiosPriv.post('/find-room', {
                    _id: roomId,
                });

                dispatch(setRoomId(response?.data?.room?._id));
                dispatch(setRoom(response?.data?.room));
            } catch (error: any) {
                dispatch(setProjectError(error.message));
            }
        };
export const setRoomIdToDefault =
    () =>
        async (dispatch: Dispatch): Promise<void> => {
            try {
                dispatch(setRoomId(''))
            } catch (error: any) {
                throw new Error('Error setting roomID to default.')
            }
        }

export const getAllProjectRoomsAction =
    (projectId: string) =>
        async (dispatch: Dispatch): Promise<void> => {
            const axioscall = axiosPrivate();

            try {
                const response = await axioscall.post('/get-rooms', {
                    projectId: projectId,
                });

                dispatch(setProjectRooms(response?.data?.rooms));
            } catch (error: any) {
                dispatch(setProjectError(error.response.data));
                throw new Error(error.message);
            }
        };

export const getUserProjects =
    (userId: string) =>
        async (dispatch: Dispatch): Promise<void> => {
            const axiosPriv = axiosPrivate();

            try {
                const projects = await axiosPriv.post('/account-projects', {
                    clientId: userId,
                });

                dispatch(setUserProjects(projects?.data));
            } catch (error: any) {
                throw new Error(error.message);
            }
        };

export const setTheYourProjects =
    (payload: boolean) =>
        async (dispatch: Dispatch): Promise<void> => {
            dispatch(setYourProjects(payload));
        };

export const getProject =
    (payload: any) =>
        async (dispatch: Dispatch): Promise<void> => {
            if (!payload._id) return;

            const axioscall = axiosPrivate();

            try {
                const project = await axioscall.post('/find-project', payload);

                if (project) {
                    dispatch(setProject(project.data?.project));
                    dispatch(setProjectId(project.data?.project));
                }
            } catch (error: any) {
                throw new Error(error.message);
            }
        };

export const getAllProjects =
    () =>
        async (dispatch: Dispatch): Promise<void> => {
            const axioscall = axiosPrivate();

            try {
                const projects = await axioscall.post('/get-projects');

                if (projects) {
                    dispatch(setAllProjects(projects.data));
                }
            } catch (error: any) {
                throw new Error(error.message);
            }
        };

export const getAttachments =
    ( projectId: string ) =>
        async (dispatch: Dispatch): Promise<any> => {
            const axioscall: any = axiosPrivate();

            try {
                const attachments: any = await axioscall.post('/get-attachments', { projectId });

                if (attachments?.data?.files?.length) {
                    dispatch(setAttachments(attachments.data.files));

                    return attachments.data.files;
                } else {
                    dispatch(setAttachments([]));
                    return [];
                }
            } catch (error: any) {
                throw new Error(error.message);
            }
        };

export const getLightSelectionsForProject =
    ( projectId: string ) =>
        async (dispatch: Dispatch): Promise<any> => {
            const axioscall: any = axiosPrivate();

            try {
                const lightSelections: any = await axioscall.post('/get-lightSelections-for-project', { projectId });

                if (lightSelections?.data?.lightSelections?.length) {
                    dispatch(setLightSelections(lightSelections.data.lightSelections));

                    return lightSelections.data.lightSelections;
                } else {
                    dispatch(setLightSelections([]));
                    return [];
                }
            } catch (error: any) {
                throw new Error(error.message);
            }
        };
            
export const getFilteredProjects =
    (payload: any, extraFilter: any) =>
        async (dispatch: Dispatch): Promise<void> => {
            const axioscall = axiosPrivate();

            try {
                const projects = await axioscall.post('/get-projects', {
                    ...payload,
                    ...extraFilter,
                });

                if (extraFilter.filter === 'allProjects') {
                    dispatch(setFilteredProjects(projects?.data?.projects));

                    return projects?.data?.projects;
                } else {
                    dispatch(setFilteredProjects(projects?.data?.filterProj));

                    return projects?.data?.filterProj;
                }
            } catch (error: any) {
                throw new Error(error.message);
            }
        };
export const setFilterProjNone =
    () =>
        async (dispatch: Dispatch): Promise<void> => {
            try {
                dispatch(setFilteredProjNone());
            } catch (error: any) {
                throw new Error(error.message);
            }
        };

export const viewProjectRooms =
    (projectId: string) =>
        async (dispatch: Dispatch): Promise<void> => {
            const axioscall = axiosPrivate();

            try {
                const response = await axioscall.post('/get-rooms', {
                    projectId: projectId,
                });

                return response?.data?.rooms;
            } catch (error: any) {
                dispatch(setProjectError(error.response.data));
                throw new Error(error.message);
            }
        };

export const viewRoomLights =
    (roomId: string) =>
        async (dispatch: Dispatch): Promise<any> => {
            const axiosPriv = axiosPrivate();

            try {
                const response = await axiosPriv.post('/get-lightSelections', {
                    roomId: roomId,
                });

                return response.data.lights;
            } catch (error: any) {
                dispatch(setProjectError(error.response.data));
                throw new Error(error.message);
            }
        };

export const deleteThisProject = (payload: any) => async () => {
    const axiosPriv = axiosPrivate();

    try {
        const projects = await axiosPriv.post('/delete-project', payload);

        return projects?.data;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const deleteThisRoom = (payload: any) => async () => {
    const axiosPriv = axiosPrivate();
    logging.info(payload, 'deleteThisRoom');

    try {
        const room = await axiosPriv.post('/delete-room', payload);

        return room.data;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const editThisRoom =
    (payload: any) =>
        async (dispatch: Dispatch): Promise<void> => {
            const axiosPriv = axiosPrivate();

            try {
                const response = await axiosPriv.post('/find-room', payload);

                dispatch(setRoomId(response?.data?.room?._id));
                dispatch(setRoom(response?.data?.room));
            } catch (error: any) {
                dispatch(setProjectError(error.response.data));
                throw new Error(error.message);
            }
        };
export const setDefaults =
    () =>
        async (dispatch: Dispatch): Promise<void> => {
            try {
                dispatch(setPersonalizedDefaults());
            } catch (error: any) {
                throw new Error('error setting defaults!');
            }
        };
