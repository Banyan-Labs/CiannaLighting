import { createSlice } from '@reduxjs/toolkit';
import { UserType } from '../../app/typescriptTypes';

export interface UsersStateType {
    users: UserType[];
    lastStatus: string;
}

const initialState: UsersStateType = {
    users: [],
    lastStatus: '',
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
        setStatus: (state, action) => ({
            ...state,
            lastStatus: action.payload,
        }),
    },
});

export const { setUsers, setNewUser, setStatus } = getAllUsersSlice.actions;
export default getAllUsersSlice.reducer;
