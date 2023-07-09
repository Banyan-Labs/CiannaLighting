import { Dispatch } from 'redux';

import {
    setProposals,
    setRfp,
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
} from '../reducers/projectSlice';
import { RoomType } from '../reducers/projectSlice';
import { axiosPrivate } from '../../api/axios';
import { ActionType } from 'app/constants';
import logging from 'config/logging';

export const createProjectAction =
    (payload: any) =>
        async (dispatch: Dispatch): Promise<void> => {
            const axiosPriv = axiosPrivate();

            try {
                const response = await axiosPriv.post('/create-project', {
                    ...payload.project,
                    copy: payload.copy,
                });

                if (response) {
                    dispatch(setProjectId(response.data.project));
                    dispatch(setProject(response.data.project));
                    dispatch(setProjectRooms([]));

                    if (
                        payload.copy &&
                        payload.copy.length &&
                        payload.attachments
                    ) {
                        const generateRandomId = (): string =>
                            Math.random().toString(36).substr(2, 9);
                        const attach = payload.attachments.map(
                            (attachment: string) => {
                                {
                                    return {
                                        projId: response.data.project._id,
                                        pdf: [attachment],
                                        images: [
                                            {
                                                lightId:
                                                    'COPY' +
                                                    String(generateRandomId()),
                                                attachments: attachment,
                                            },
                                        ],
                                        edit: ActionType.ADD,
                                    };
                                }
                            }
                        );
                        const attachThis = async (load: any) => {
                            const wait = await axiosPriv.post(
                                '/new-attachments',
                                load
                            );
                            if (wait) {
                                return 'done';
                            }
                        };
                        const end = attach.length;
                        let i = 0;

                        while (i < end) {
                            const done = await attachThis(attach[i]);

                            if (done) {
                                i += 1;
                            }
                        }
                    }

                    const getRfp = await axiosPriv.post('/get-rfps', {
                        projectId: response.data.project._id,
                    });

                    if (getRfp) {
                        dispatch(setRfp(getRfp.data.rfp[0]));

                        const proposalSet = await axiosPriv.post('/get-proposals', {
                            projectId: response.data.project._id,
                        });

                        if (proposalSet) {
                            dispatch(setProposals(proposalSet.data.proposal));
                        } /* TAKE THIS OUT FIRE ANOTHER THING TO GET THE PROPOSAL TO FIRE IN REDUX! */
                    }
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

                dispatch(setRoomId(response.data.room._id));
                dispatch(setRoom(response.data.room));
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

                dispatch(setRoomId(response.data.room._id));
                dispatch(setRoom(response.data.room));
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

                dispatch(setProjectRooms(response.data.rooms));
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

                dispatch(setUserProjects(projects.data));
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
            const axioscall = axiosPrivate();

            try {
                const project = await axioscall.post('/find-project', payload);

                if (project) {
                    dispatch(setProject(project.data.project));
                    dispatch(setProjectId(project.data.project));

                    const proposalSet = await axioscall.post('/get-proposals', {
                        projectId: project.data.project._id,
                    });

                    if (proposalSet) {
                        dispatch(setProposals(proposalSet.data.proposal));

                        if (
                            payload.projectName != payload.name ||
                            payload.region != payload.projectRegion
                        ) {
                            const exchangeLoad = {
                                type: 'project',
                                name: payload.projectName,
                                newName: payload.name,
                                projectId: payload._id,
                                region: payload.region,
                                projectRegion: payload.projectRegion,
                            };

                            await axioscall.post('/name-exchange', exchangeLoad);
                        }

                        const getRfp = await axioscall.post('/get-rfps', {
                            projectId: project.data.project._id,
                        });

                        if (getRfp) {
                            dispatch(setRfp(getRfp.data.rfp[0]));
                        }
                    }
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
                    dispatch(setFilteredProjects(projects.data.projects));

                    return projects.data.projects;
                } else {
                    dispatch(setFilteredProjects(projects.data.filterProj));

                    return projects.data.filterProj;
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

                return response.data.rooms;
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

        return projects.data;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const deleteThisRoom = (payload: any) => async () => {
    const axiosPriv = axiosPrivate();
    logging.info(`${JSON.stringify(payload)}`, 'deleteThisRoom')
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

                if (payload.roomName != payload.name) {
                    const exchangeLoad = {
                        type: 'room',
                        name: payload.roomName,
                        newName: payload.name,
                        projectId: payload.projectId,
                    };

                    await axiosPriv.post('/name-exchange', exchangeLoad);
                }
                
                dispatch(setRoomId(response.data.room._id));
                dispatch(setRoom(response.data.room));
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
