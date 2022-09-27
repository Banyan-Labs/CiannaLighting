import { createSlice } from '@reduxjs/toolkit';

export interface AuthStateType {
    user: any;
    error: any;
    accessToken: string;
}

const initialState: AuthStateType = {
    user: {},
    error: null,
    accessToken: '',
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => ({ ...state, user: action.payload.user }),
        setError: (state, action) => ({ ...state, error: action.payload }),
        logout: (state) => ({ ...state, user: {} }),
        setAccessToken: (state, action) => ({
            ...state,
            accessToken: action.payload,
        }),
    },
});

export const { setUser, setError, logout, setAccessToken } = authSlice.actions;
export default authSlice.reducer;
