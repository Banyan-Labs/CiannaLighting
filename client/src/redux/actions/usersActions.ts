import { Dispatch } from 'redux';
import axios, { axiosPrivate } from '../../api/axios';
import { CreateUserType } from '../../app/typescriptTypes';
import { setUsers, setNewUser } from '../reducers/usersSlice';

export const getAllUsers =
    () =>
    async (dispatch: Dispatch): Promise<void> => {
        const axiosPriv = await axiosPrivate();

        const users = await axiosPriv.get('cmd/get-users');
        dispatch(setUsers(users.data));
    };

export const createUserAction =
    (user: CreateUserType) =>
    async (dispatch: Dispatch): Promise<void> => {
        const response = await axios.post('users/create/user', user);
        dispatch(setNewUser(response.data.user));
    };
