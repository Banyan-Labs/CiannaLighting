import { Dispatch } from 'redux';
import { createHttpRequest } from '../../api/requestTypes';
import { setUser, setError, logout } from '../reducers/authSlice';

type SignInType = {
  email: string;
  password: string;
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
      const response = await createHttpRequest(baseUrl + 'users/log_out/user', {
        email,
      });
      dispatch(logout());
    } catch (error) {
      console.log(error);
    }
  };
