import { Dispatch } from 'redux';
import { setRegion, setStatus, setError } from '../reducers/filterSlice';
import { axiosPrivate } from '../../api/axios';

export const getAllStatus =
    () =>
    async (dispatch: Dispatch): Promise<void> => {
        const axioscall = await axiosPrivate();
        try {
            const AllStatus = await axioscall.post('/public/s_r', {
                label: 'status',
            });
            dispatch(setStatus(AllStatus.data));
        } catch (error: any) {
            dispatch(setError(error.response.data));
        }
    };

export const getAllRegions =
    () =>
    async (dispatch: Dispatch): Promise<void> => {
        const axioscall = await axiosPrivate();
        try {
            const AllRegion = await axioscall.post('/public/s_r', {
                label: 'region',
            });
            dispatch(setRegion(AllRegion.data));
        } catch (error: any) {
            dispatch(setError(error.response.data));
        }
    };
