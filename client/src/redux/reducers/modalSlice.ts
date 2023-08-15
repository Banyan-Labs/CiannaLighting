import { createSlice } from '@reduxjs/toolkit';

export interface alertOpenStateType {
    status: any;
    // region: any;
    // error: any;
}

const initialState: alertOpenStateType = {
    status: false,
    // region: [],
    // error: null,
};

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        setAlertOpen: (state, action) => ({
            ...state,
            status: action?.payload?.data,
        }),
    //     setRegion: (state, action) => ({
    //         ...state,
    //         region: action?.payload?.data,
    //     }),
    //     setError: (state, action) => ({ ...state, error: action.payload }),
    },
});

export const { setAlertOpen } = modalSlice.actions;
export default modalSlice.reducer;
