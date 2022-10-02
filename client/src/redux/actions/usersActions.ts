import { Dispatch } from 'redux';
import { axiosPrivate } from '../../api/axios';
import { setUsers } from '../reducers/usersSlice';

export const getAllUsers =
    () =>
    async (dispatch: Dispatch): Promise<void> => {
        const axios = await axiosPrivate();

        const users = await axios.get('cmd/get-users');
        console.log(users);
        dispatch(setUsers(users.data));
    };
