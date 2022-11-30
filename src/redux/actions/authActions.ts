import axios from '../../api/axios';
import { Dispatch } from 'redux';
import { getAllProjects } from './projectActions';
import { setUser, logout, setAccessToken } from '../reducers/authSlice';


type SignInType = {
    email: string;
    password: string;
};

export const signInAction =
    (payload: SignInType) =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            getAllProjects();
            const response = await axios.post('public/login/user', payload, {
                withCredentials: true,
            });

             dispatch(setUser(response.data));
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
            console.log("Respnse in RefreshToken: ",response)
            dispatch(setAccessToken(response.data));
        } catch (error) {
            console.log("Error in refreshToken: ",error);
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
