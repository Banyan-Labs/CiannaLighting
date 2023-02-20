import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import authReducer from './reducers/authSlice';
import projectReducer from './reducers/projectSlice';
import filterSlice from './reducers/filterSlice';
import userReducers from './reducers/usersSlice';

const reducers = combineReducers({
    auth: authReducer,
    project: projectReducer,
    filter: filterSlice,
    users: userReducers,
})

export const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(createLogger()),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
