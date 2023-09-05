import { createSlice } from '@reduxjs/toolkit';
import { UserType } from '../../app/typescriptTypes';

export interface AuthStateType {
    user: UserType;
    error: null | { message: string };
    logs: any[];
}

const initialState: AuthStateType = {
    user: { _id: '', name: '', email: '', role: '', token: '' },
    error: null,
    logs: [],
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            localStorage.setItem('token', action.payload.accessToken);
            localStorage.setItem('role', action.payload.user.role);

            return {
                ...state,
                user: {
                    ...action.payload.user,
                    token: action.payload.accessToken,
                },
            };
        },
        setLogs: (state, action) => {
            return {
                ...state,
                logs: action.payload.logs,
            };
        },
        setAccessToken: (state, action) => {
            localStorage.setItem('token', action.payload.accessToken);
            localStorage.setItem('role', action.payload.user.role);

            return {
                ...state,
                user: {
                    ...action.payload.user,
                    token: action.payload.accessToken,
                },
            };
        },
        logout: () => {
            localStorage.removeItem('token');
            localStorage.removeItem('role');

            return initialState;
        },
        setError: (state, action) => ({ ...state, error: action.payload }),
    },
});

export const { setUser, setError, logout, setAccessToken, setLogs } =
    authSlice.actions;
export default authSlice.reducer;
