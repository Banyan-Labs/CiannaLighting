import { Dispatch } from 'redux';
import {
    setRoomLights,
    setProjectError,
    setCatalogLights,
    setCatalogConnect
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

export const createLight =
    (light: LightType) =>
    async (dispatch: Dispatch): Promise<void> => {
        const axiosPriv = await axiosPrivate();
        try {
             await axiosPriv.post('/create-lightSelection', {
                light: light,
            });
        } catch (error: any) {
            dispatch(setProjectError(error.response.data));
        }
    };


    export const deleteLight =
    (payload: any) =>
    async (dispatch: Dispatch): Promise<void> => {
        const axiosPriv = await axiosPrivate();
        try {
             await axiosPriv.post('/delete-lightSelection', payload);
        } catch (error: any) {
            dispatch(setProjectError(error.response.data));
        }
    };

    export const getEditLight =
    (payload: any) =>
    async (dispatch: Dispatch): Promise<void> => {
        console.log(payload)
        const axiosPriv = await axiosPrivate();
        try {
            const response = await axiosPriv.post('/find-light', payload);
            dispatch(setCatalogConnect(response.data.light))
            return response.data.light
        } catch (error: any) {
            dispatch(setProjectError(error.response.data));
        }
    };

    export const theEditLight =
    (payload: any, lightId: any) =>
    async (dispatch: Dispatch): Promise<void> => {
        const axiosPriv = await axiosPrivate();
        try {
            const response = await axiosPriv.post('/find-lightSelection', {...payload, _id:lightId});
        } catch (error: any) {
            dispatch(setProjectError(error.response.data));
        }
    };

