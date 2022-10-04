import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from './reducers/authSlice';
import projectReducer from './reducers/projectSlice';
import userReducers from './reducers/usersSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        project: projectReducer,
        users: userReducers,
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
