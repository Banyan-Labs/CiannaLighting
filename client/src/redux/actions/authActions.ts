import { Dispatch } from 'redux';
import axios, { axiosPrivate } from '../../api/axios';
import {
    setUser,
    logout,
    setAccessToken,
    removeToken,
} from '../reducers/authSlice';

type SignInType = {
    email: string;
    password: string;
};
import { UserType, CreateUserType } from '../../app/typescriptTypes';

export const signInAction =
    (payload: SignInType) =>
    async (dispatch: Dispatch): Promise<void> => {
        const response = await axios.post('public/login/user', payload);
        localStorage.setItem('token', response.data.accessToken);
        dispatch(setUser(response.data));
    };

export const getUser =
    (email: string) =>
    async (dispatch: Dispatch): Promise<void> => {
        const axiosInst = await axiosPrivate();

        const response = await axiosInst.post('find-user', { email });
        dispatch(setUser(response.data.user));
    };

export const createUserAction =
    (user: CreateUserType) =>
    async (dispatch: Dispatch): Promise<void> => {
        const response = await axios.post('users/create/user', user);
        dispatch(setUser(response.data.user));
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
            dispatch(removeToken());
            throw error;
        }
    };

export const logoutAction =
    (email: string) =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            await axios.post('public/log_out/user', {
                email,
            });
            localStorage.removeItem('token');
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
