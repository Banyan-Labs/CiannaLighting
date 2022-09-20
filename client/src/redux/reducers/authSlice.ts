import { createSlice } from '@reduxjs/toolkit';

export interface AuthStateType {
    user: any;
    error: any;
}

const initialState: AuthStateType = {
    user: {},
    error: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => ({ ...state, user: action.payload }),
        setError: (state, action) => ({ ...state, error: action.payload }),
        logout: (state) => ({ ...state, user: {} }),
    },
});

export const { setUser, setError, logout } = authSlice.actions;
export default authSlice.reducer;
