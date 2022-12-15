import { Dispatch } from 'redux';
import {
    setRoomLights,
    setProjectError,
    setCatalogLights,
    setCatalogConnect,
    setAttachments,
    setProposals,
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
        } catch (error: any) {
            dispatch(setProjectError(error.response.data));
        }
    };

export const setSpecFile =
    (payload: any, newAttach: boolean) => async (dispatch: Dispatch) => {
        const axiosPriv = await axiosPrivate();
        console.log('pay&status:', payload, newAttach);
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
                if (answer) {
                    dispatch(setAttachments(answer.data.proj.pdf));
                } else {
                    dispatch(setAttachments([]));
                }
            }
        } catch (error: any) {
            console.log('ERROR IN SPECS: ', error);
            dispatch(setProjectError(error.reponse));
        }
    };
export const deleteSpecFile = (payload: any) => async (dispatch: Dispatch) => {
    const axiosPriv = await axiosPrivate();
    try {
        const response = await axiosPriv.post('/delete-attachments', payload);
        dispatch(setAttachments(response.data.projectAttach.pdf));
    } catch (error: any) {
        dispatch(setProjectError(error.response));
    }
};

export const createLight =
    (light: LightType) =>
    async (dispatch: Dispatch): Promise<void> => {
        const axiosPriv = await axiosPrivate();
        try {
            await axiosPriv.post('/create-lightSelection', {
                light: light,
            });
            const proposal = await axiosPriv.post('/update-rfp', {
                light: light,
            });
            if (proposal) {
                const proposalSet = await axiosPriv.post('/get-proposals', {
                    projectId: light.projectId,
                });
                if (proposalSet) {
                    console.log('PROPOSAL STUFF: ', proposalSet);
                    dispatch(setProposals(proposalSet.data.proposal));
                }
            }
        } catch (error: any) {
            dispatch(setProjectError(error.response.data));
        }
    };

export const deleteLight =
    (payload: any) =>
    async (dispatch: Dispatch): Promise<void> => {
        const axiosPriv = await axiosPrivate();
        try {
            console.log('payloadDELETE:', payload);
            const response = await axiosPriv.post(
                '/delete-lightSelection',
                payload
            );
            console.log('successDELETE: ', response);
        } catch (error: any) {
            dispatch(setProjectError(error.response.data));
        }
    };

export const getEditLight =
    (payload: any) =>
    async (dispatch: Dispatch): Promise<void> => {
        console.log(payload);
        const axiosPriv = await axiosPrivate();
        try {
            const response = await axiosPriv.post('/find-light', payload);
            dispatch(setCatalogConnect(response.data.light));
            return response.data.light;
        } catch (error: any) {
            dispatch(setProjectError(error.response.data));
        }
    };

export const theEditLight =
    (payload: any, lightId: any) =>
    async (dispatch: Dispatch): Promise<void> => {
        const axiosPriv = await axiosPrivate();
        try {
            const response = await axiosPriv.post('/find-lightSelection', {
                ...payload,
                _id: lightId,
            });
            /**
             * need to set up the rfp & proposal dispatches here
             *  */ 
            return response.data;
        } catch (error: any) {
            dispatch(setProjectError(error.response.data));
        }
    };

export const filterCatalogItems =
    (payload: any) =>
    async (dispatch: Dispatch): Promise<void> => {
        const axiosPriv = await axiosPrivate();
        try {
            console.log("cataPAY: ", payload)
            const response = await axiosPriv.post(
                '/public/get-catalog',
                payload
            );
            console.log("respCAT: ", response)
            dispatch(setCatalogLights(response.data.items));
        } catch (error: any) {
            dispatch(setProjectError(error.response.data));
        }
    };
