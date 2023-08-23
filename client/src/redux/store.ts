import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';

import authReducer from './reducers/authSlice';
import projectReducer from './reducers/projectSlice';
import filterSlice from './reducers/filterSlice';
import modalSlice from './reducers/modalSlice';
import userReducers from './reducers/usersSlice';

const reducers = combineReducers({
    auth: authReducer,
    project: projectReducer,
    filter: filterSlice,
    users: userReducers,
    modal: modalSlice,
})

export const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware();
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
