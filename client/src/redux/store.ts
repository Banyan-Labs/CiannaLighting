import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from './reducers/authSlice';
import projectReducer from './reducers/projectSlice';
import filterSlice from './reducers/filterSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        project: projectReducer,
        filter: filterSlice,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
