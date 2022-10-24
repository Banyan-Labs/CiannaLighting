import { Dispatch } from 'redux';
import {
    setRoomLights,
    setProjectError,
    setCatalogLights,
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
            const response = await axiosPriv.post('/create-lightSelection', {
                light: light,
            });
        } catch (error: any) {
            dispatch(setProjectError(error.response.data));
        }
    };
