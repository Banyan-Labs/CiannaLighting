import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    users: {},
};

export const getAllUsersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsers: (state, action) => ({ ...state, users: action.payload }),
    },
});

export const { setUsers } = getAllUsersSlice.actions;
export default getAllUsersSlice.reducer;
