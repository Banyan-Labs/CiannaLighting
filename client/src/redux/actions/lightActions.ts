import { Dispatch } from 'redux';

import {
    setRoomLights,
    setProjectError,
    setCatalogLights,
    setCatalogConnect,
    setAttachments,
    setProposals,
    setInactiveLights,
} from '../reducers/projectSlice';
import { axiosPrivate } from '../../api/axios';
import { LightType } from '../reducers/projectSlice';

export const getRoomLights =
    (roomId: string) =>
        async (dispatch: Dispatch): Promise<void> => {
            const axiosPriv = await axiosPrivate();
            try {
                const response = await axiosPriv.post('/get-lightSelections', {
                    roomId: roomId,
                });

                dispatch(setRoomLights(response.data.lights));
            } catch (error: any) {
                dispatch(setProjectError(error.response.data));
            }
        };

export const getCatalogItems =
    () =>
        async (dispatch: Dispatch): Promise<void> => {
            const axiosPriv = await axiosPrivate();

            try {
                const response = await axiosPriv.post('/public/get-catalog');

                dispatch(setCatalogLights(response.data.items));

                if (response) {
                    const inactiveFilter = response.data.items.filter(
                        (item: any) => !item.isActive
                    );
                    const inactiveList = inactiveFilter.map(
                        (item: any) => item.item_ID
                    );

                    dispatch(setInactiveLights(inactiveList));
                }
            } catch (error: any) {
                dispatch(setProjectError(error.response.data));
            }
        };

export const setSpecFile =
    (payload: any, newAttach: boolean) => async (dispatch: Dispatch) => {
        const axiosPriv = axiosPrivate();

        try {
            const response = (endpoint: string) => {
                return axiosPriv.post(endpoint, payload);
            };

            if (newAttach === true) {
                const answer = await response('/new-attachments');

                if (answer) {
                    dispatch(setAttachments(answer.data.attachments.pdf));
                }
            } else {
                dispatch(setAttachments([]));

                const answer = await response('/get-attachments');

                console.log("resp in get attach: ", answer.status)
                if (answer.status === 200) {
                    dispatch(setAttachments(answer.data.proj.pdf));
                } else {
                    dispatch(setAttachments([]));
                }
            }
        } catch (error: any) {
            dispatch(setProjectError(error.reponse));
            throw new Error(error.message);
        }
    };
export const deleteSpecFile = (payload: any) => async (dispatch: Dispatch) => {
    const axiosPriv = axiosPrivate();

    try {
        const response = await axiosPriv.post('/delete-attachments', payload);

        dispatch(setAttachments(response.data.projectAttach.pdf));

        if (response) {
            const runIDS = payload.lights.map((prop: any) => prop._id);
            const finished = runIDS.length;
            let i = 0;

            while (i < finished) {
                const proposal = await axiosPriv.post('/delete-props', {
                    lightID: runIDS[i],
                });

                if (proposal) {
                    i += 1;
                }
            }

            if (i == finished) {
                const proposalSet = await axiosPriv.post('/get-proposals', {
                    projectId: payload.projectId,
                });

                if (proposalSet) {
                    dispatch(setProposals(proposalSet.data.proposal));
                }
            }
        }
    } catch (error: any) {
        dispatch(setProjectError(error.response));
        throw new Error(error.message);
    }
};

export const createLight =
    (light: LightType) =>
        async (dispatch: Dispatch): Promise<void> => {
            const axiosPriv = axiosPrivate();

            try {
                const created = await axiosPriv.post('/create-lightSelection', {
                    light: light,
                });

                if (created) {
                    const proposal = await axiosPriv.post('/update-rfp', {
                        light: { ...light, lightID: created.data.light._id },
                    });

                    if (proposal) {
                        const proposalSet = await axiosPriv.post('/get-proposals', {
                            projectId: light.projectId,
                        });

                        if (proposalSet) {
                            dispatch(setProposals(proposalSet.data.proposal));
                        }
                    }
                }
            } catch (error: any) {
                dispatch(setProjectError(error.response.data));
                throw new Error(error.message);
            }
        };

export const deleteLight =
    (payload: any) =>
        async (dispatch: Dispatch): Promise<void> => {
            const axiosPriv = axiosPrivate();

            try {
                await axiosPriv.post('/delete-lightSelection', payload);
            } catch (error: any) {
                dispatch(setProjectError(error.response.data));
                throw new Error(error.message);
            }
        };

export const getEditLight =
    (payload: any) =>
        async (dispatch: Dispatch): Promise<void> => {
            const axiosPriv = axiosPrivate();

            try {
                const response = await axiosPriv.post('/find-light', payload);

                dispatch(setCatalogConnect(response.data.light));

                return response.data.light;
            } catch (error: any) {
                dispatch(setProjectError(error.response.data));
                throw new Error(error.message);
            }
        };

export const theEditLight =
    (payload: any, lightId: any) =>
        async (dispatch: Dispatch): Promise<void> => {
            const axiosPriv = axiosPrivate();

            try {
                const response = await axiosPriv.post('/find-lightSelection', {
                    ...payload,
                    _id: lightId,
                });

                if (response) {
                    const propEdit = await axiosPriv.post('/edit-props', {
                        ...payload,
                        lightID: lightId,
                    });

                    if (propEdit) {
                        const proposalSet = await axiosPriv.post('/get-proposals', {
                            projectId: payload.projectId,
                        });

                        if (proposalSet) {
                            dispatch(setProposals(proposalSet.data.proposal));
                        }
                    }
                }

                return response.data;
            } catch (error: any) {
                dispatch(setProjectError(error.response.data));
                throw new Error(error.message);
            }
        };

export const filterCatalogItems =
    (payload: any) =>
        async (dispatch: Dispatch): Promise<void> => {
            const axiosPriv = axiosPrivate();

            try {
                const response = await axiosPriv.post(
                    '/public/get-catalog',
                    payload
                );
                
                dispatch(setCatalogLights(response.data.items));
            } catch (error: any) {
                dispatch(setProjectError(error.response.data));
                throw new Error(error.message);
            }
        };
