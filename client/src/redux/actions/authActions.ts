import { Dispatch } from 'redux';
import { createHttpRequest } from '../../api/requestTypes';
import { setUser, setError, logout } from '../reducers/authSlice';

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

const baseUrl = 'http://localhost:1337/api/'; // will be replaced with .env variables.

export const signInAction =
  (payload: SignInType) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      const response = await createHttpRequest(
        baseUrl + 'user/login/user',
        payload
      );
      console.log(response.data);
      dispatch(setUser(response.data.user));
    } catch (error: any) {
      dispatch(setError(error.response.data));
    }
  };

export const logoutAction =
  (email: string) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      await createHttpRequest(baseUrl + 'user/log_out/user', {
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
            const response = await createHttpRequest(
                baseUrl + 'users/login/user',
                payload
            );
            dispatch(setUser(response.data.User));
        } catch (error: any) {
            dispatch(setError(error.response.data));
        }
    };

export const createUserAction =
    (user: UserType) =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            const response = await createHttpRequest(
                baseUrl + 'users/create/user',
                user
            );
            dispatch(setUser(response.data.user));
        } catch (error: any) {
            console.log(error);
            dispatch(setError(error.response.data));
        }
    };
