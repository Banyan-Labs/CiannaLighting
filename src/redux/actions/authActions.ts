import axios from '../../api/axios';
import { Dispatch } from 'redux';
import { getAllProjects } from './projectActions';
import { setUser, logout, setAccessToken, setLogs } from '../reducers/authSlice';
import { axiosPrivate } from '../../api/axios';

type SignInType = {
    email: string;
    password: string;
};

type userLogType = {
    name: string;
    userId: string;
    ipAddress: string;
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
            const res = await axios.get('https://geolocation-db.com/json/');
            // console.log(res.data, response);

            const log: userLogType = {
                userId: response.data.user._id,
                name: response.data.user.name,
                role: response.data.user.role,
                ipAddress: res.data.IPv4,
            };
            // console.log(log);
            await axios.post('public/create-log', log, {
                withCredentials: true,
            });
            dispatch(setUser(response.data));
        } catch (error: any) {
            console.log('Error message: ', error.message);
        }
    };

    export const getAllLogs =
    () =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            const axiosPriv = await axiosPrivate();
            const response = await axiosPriv.post('cmd/getAllLogs', {
                withCredentials: true,
            });
            // console.log(response, 'hello')
            dispatch(setLogs(response.data));
        } catch (error: any) {
            console.log('Error message: ', error.message);
        }
    };

export const refreshToken =
    () =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            const response = await axios.get('rf/refresh', {
                withCredentials: true,
            });
            console.log('Respnse in RefreshToken: ', response);
            await dispatch(setAccessToken(response.data));
        } catch (error) {
            console.log('Error in refreshToken: ', error);
            throw error;
        }
    };

    export const deleteTheLog =
    (_id: string) =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            const axiosPriv = await axiosPrivate();
            const response = await axiosPriv.post('cmd/deleteLog', {_id}, {
                withCredentials: true,
            });
            // console.log('delete log', response);
            
        } catch (error) {
            console.log('Error in refreshToken: ', error);
            throw error;
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
        } catch (error) {
            console.log(error);
            throw error;
        }
    };
(payload: SignInType) =>
    async (dispatch: Dispatch): Promise<void> => {
        const response = await axios.post('users/login/user', payload);
        dispatch(setUser(response.data.User));
    };
