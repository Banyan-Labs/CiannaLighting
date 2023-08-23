import { Dispatch } from 'redux';

import {
    setRoomLights,
    setProjectError,
    setCatalogLights,
    setCatalogConnect,
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

            dispatch(setRoomLights(response?.data?.lights));
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

            dispatch(setCatalogLights(response?.data?.items));

            if (response) {
                const inactiveFilter = response.data?.items?.filter(
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

export const createLight =
    (light: LightType) =>
    async (dispatch: Dispatch): Promise<void> => {
        const axiosPriv = axiosPrivate();

        try {
            await axiosPriv.post('/create-lightSelection', {
                light: light,
            });
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

            dispatch(setCatalogConnect(response?.data?.light));

            return response?.data?.light;
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

            dispatch(setCatalogLights(response?.data?.items));
        } catch (error: any) {
            dispatch(setProjectError(error.response.data));
            throw new Error(error.message);
        }
    };
