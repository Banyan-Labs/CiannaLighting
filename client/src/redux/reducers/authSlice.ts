import { createSlice } from '@reduxjs/toolkit';
import { UserType } from '../../app/typescriptTypes';

export interface AuthStateType {
    user: UserType;
    error: any;
    accessToken: string;
}

const initialState: AuthStateType = {
    user: { _id: '', name: '', email: '' },
    error: null,
    accessToken: '',
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => ({
            ...state,
            user: action.payload.user,
            accessToken: action.payload.accessToken,
        }),
        setError: (state, action) => ({ ...state, error: action.payload }),
        logout: () => initialState,
        setAccessToken: (state, action) => ({
            ...state,
            accessToken: action.payload,
        }),
        removeToken: (state) => ({ ...state, accessToken: '' }),
    },
});

export const { setUser, setError, logout, setAccessToken, removeToken } =
    authSlice.actions;
export default authSlice.reducer;
