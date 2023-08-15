import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AlertOpenStateType {
    alertOpen: boolean;
    error: any;
}

const initialState: AlertOpenStateType = {
    alertOpen: false,
    error: null,
};

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        setAlertOpen: (state, action: PayloadAction<boolean>) => {
            state.alertOpen = action.payload;
        },
    },
});

export const { setAlertOpen } = modalSlice.actions;
export default modalSlice.reducer;
