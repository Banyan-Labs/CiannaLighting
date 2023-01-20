import { Dispatch } from 'redux';
import { axiosPrivate } from '../../api/axios';
import { CreateUserType } from '../../app/typescriptTypes';
import { setUsers, setNewUser } from '../reducers/usersSlice';

export const getAllUsers =
    () =>
    async (dispatch: Dispatch): Promise<void> => {
        const axiosPriv = await axiosPrivate();
        try {
            if (axiosPriv) {
                const users = await axiosPriv.get('cmd/get-users');
                dispatch(setUsers(users.data));
            }
        } catch (error) {
            throw Error('Error getting all users');
        }
    };

export const createUserAction =
    (user: CreateUserType) =>
    async (dispatch: Dispatch): Promise<void> => {
        const axiosPriv = await axiosPrivate();
        try {
            if (axiosPriv) {
                const response = await axiosPriv.post('cmd/create-user', user);
                dispatch(setNewUser(response.data.user));
            }
        } catch (error) {
            throw Error('Error getting all users');
        }
    };
