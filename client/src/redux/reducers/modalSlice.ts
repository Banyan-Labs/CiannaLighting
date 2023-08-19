import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AlertOpenPayload {
  isOpen: boolean;
}

interface AlertMessagePayload {
  alertMessage: string;
}

const initialState: AlertOpenPayload & AlertMessagePayload = {
  isOpen: false,
  alertMessage: '',
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setAlertOpen: (state, action: PayloadAction<AlertOpenPayload>) => {
      state.isOpen = action.payload.isOpen;
    },
    setAlertMessage: (state, action: PayloadAction<AlertMessagePayload>) => {
      state.alertMessage = action.payload.alertMessage;
    },
  },
});

export const { setAlertOpen, setAlertMessage } = modalSlice.actions;
export default modalSlice.reducer;
