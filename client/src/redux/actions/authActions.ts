import axiosSrc, { AxiosError } from 'axios';
import axios, { axiosPrivate } from '../../api/axios';
import { Dispatch } from 'redux';
import { getAllProjects } from './projectActions';
import {
    setUser,
    logout,
    setAccessToken,
    setLogs,
    setError,
} from '../reducers/authSlice';

type SignInType = {
    email: string;
    password: string;
};

type userLogType = {
    name: string;
    userId: string;
    // ipAddress: string;
    role: string;
};

export const signInAction =
    (payload: SignInType) =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            getAllProjects();
            const response = await axios.post('public/login/user', payload, {
                withCredentials: true,
            });

            const log: userLogType = {
                userId: response.data.user._id,
                name: response.data.user.name,
                role: response.data.user.role,
            };
            await axios.post('public/create-log', log, {
                // withCredentials: true,
            });
            dispatch(setUser(response.data));
        } catch (error: any | AxiosError) {
            console.log('>>>>>>>>>>>>>>>>>>>>>>>>', error);
            if (axiosSrc.isAxiosError(error)) {
                const axiosErr: AxiosError = error;
                const errorMessage =
                    axiosErr.response?.data === undefined
                        ? {
                              message:
                                  'Unable to fetch Geolocation. Please disable ad blocking for this site to continue.',
                          }
                        : axiosErr.response.data;
                dispatch(setError(errorMessage));
            } else throw new Error(error.message);
        }
    };

export const getAllLogs =
    () =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            const axiosPriv = axiosPrivate();
            const response = await axiosPriv.post('cmd/getAllLogs', {
                withCredentials: true,
            });
            dispatch(setLogs(response.data));
        } catch (error: any) {
            throw new Error(error.message);
        }
    };

export const refreshToken =
    () =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            const response = await axios.get('rf/refresh', {
                withCredentials: true,
            });
            if (response) {
                dispatch(setAccessToken(response.data));
            }
        } catch (error: any) {
            throw new Error(error.message);
        }
    };

export const deleteTheLog = (_id: string) => async (): Promise<void> => {
    try {
        const axiosPriv = axiosPrivate();
        await axiosPriv.post(
            'cmd/deleteLog',
            { _id },
            {
                withCredentials: true,
            }
        );
    } catch (error: any) {
        throw Error(error.message);
    }
};
export const logoutAction =
    (email: string) =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            await axios.post(
                'public/log_out/user',
                {
                    email,
                },
                { withCredentials: true }
            );
            dispatch(logout());
        } catch (error: any) {
            throw new Error(error.message);
        }
    };
export const dismissErrorAction =
    () =>
    async (dispatch: Dispatch): Promise<void> => {
        dispatch(setError(null));
    };
