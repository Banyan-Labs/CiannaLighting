import { createSlice } from '@reduxjs/toolkit';
import { UserType } from '../../app/typescriptTypes';

export interface UsersStateType {
    users: UserType[];
}

const initialState: UsersStateType = {
    users: [],
};

export const getAllUsersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsers: (state, action) => ({
            ...state,
            users: action.payload.users,
        }),
        setNewUser: (state, action) => ({
            ...state,
            user: action.payload,
            users: [action.payload, ...state.users],
        }),
    },
});

export const { setUsers, setNewUser } = getAllUsersSlice.actions;
export default getAllUsersSlice.reducer;
