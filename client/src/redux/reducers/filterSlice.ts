import { createSlice } from '@reduxjs/toolkit';

export interface filterStateType {
    status: any;
    region: any;
    error: any;
}

const initialState: filterStateType = {
    status: [],
    region: [],
    error: null,
};

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setStatus: (state, action) => ({
            ...state,
            status: action.payload.data,
        }),
        setRegion: (state, action) => ({
            ...state,
            region: action.payload.data,
        }),
        setError: (state, action) => ({ ...state, error: action.payload }),
    },
});

export const { setStatus, setError, setRegion } = filterSlice.actions;
export default filterSlice.reducer;
