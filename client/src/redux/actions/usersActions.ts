import { Dispatch } from 'redux';

import { axiosPrivate } from '../../api/axios';
import { CreateUserType } from '../../app/typescriptTypes';
import {} from '../reducers/filterSlice';
import { setUsers, setNewUser, setStatus } from '../reducers/usersSlice';

export const getAllUsers =
    () =>
    async (dispatch: Dispatch): Promise<void> => {
        const axiosPriv = axiosPrivate();
        const users = await axiosPriv.get('cmd/get-users');

        if (users) {
            dispatch(setUsers(users.data));
        }
    };

export const createUserAction =
    (user: CreateUserType) =>
    async (dispatch: Dispatch): Promise<void> => {
        const axiosPriv = axiosPrivate();
        const response: any = await axiosPriv.post('cmd/create-user', user);

        if (response?.data) {
            dispatch(setNewUser(response.data.user));
            dispatch(setStatus('User created successfully.'));
        } else {
            dispatch(setStatus(response.response.data.message));
        }
    };
