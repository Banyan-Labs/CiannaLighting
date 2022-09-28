import { Dispatch } from 'redux';
import axios from '../../api/axios';
import {
    setUser,
    setError,
    logout,
    setAccessToken,
} from '../reducers/authSlice';

type SignInType = {
    email: string;
    password: string;
};

export type UserType = {
    name: string;
    email: string;
    password: string;
    isAuth?: boolean;
};

export const signInAction =
    (payload: SignInType) =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            const response = await axios.post('public/login/user', payload);
            localStorage.setItem('token', response.data.accessToken);
            dispatch(setUser(response.data));
        } catch (error: any) {
            dispatch(setError(error.response.data));
        }
    };

export const logoutAction =
    (email: string) =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            await axios.post('public/log_out/user', {
                email,
            });
            dispatch(logout());
        } catch (error) {
            console.log(error);
        }
    };
(payload: SignInType) =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            const response = await axios.post('users/login/user', payload);
            dispatch(setUser(response.data.User));
        } catch (error: any) {
            dispatch(setError(error.response.data));
        }
    };

export const createUserAction =
    (user: UserType) =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            const response = await axios.post('users/create/user', user);
            dispatch(setUser(response.data.user));
        } catch (error: any) {
            console.log(error);
            dispatch(setError(error.response.data));
        }
    };

export const refreshToken =
    () =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            const response = await axios.get('refresh', {
                withCredentials: true,
            });
            dispatch(setAccessToken(response.data.accessToken));
        } catch (error) {
            console.log(error);
        }
    };
