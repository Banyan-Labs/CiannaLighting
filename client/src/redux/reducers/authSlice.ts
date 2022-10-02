import { createSlice } from '@reduxjs/toolkit';
import { UserType } from '../../app/typescriptTypes';

export interface AuthStateType {
    user: UserType;
    error: any;
    accessToken: string;
}

const initialState: AuthStateType = {
    user: { _id: '', name: '', email: '', role: '' },
    error: null,
    accessToken: '',
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
                user: action.payload.user,
                accessToken: action.payload.accessToken,
            };
        },
        setUserOnRefresh: (state, action) => ({
            ...state,
            user: action.payload.authUser,
        }),
        setAccessToken: (state, action) => {
            console.log(action);
            localStorage.setItem('token', action.payload.accessToken);
            localStorage.setItem('role', action.payload.user.role);
            return {
                ...state,
                accessToken: action.payload.accessToken,
                user: action.payload.user,
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

export const { setUser, setError, logout, setAccessToken, setUserOnRefresh } =
    authSlice.actions;
export default authSlice.reducer;
