import { createSlice } from '@reduxjs/toolkit';

const initialState: any = {
    userProjects: [],
    project: {},
};

export const projectSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        setUserProjects: (state, action) => ({
            ...state,
            userProjects: action.payload,
        }),
    },
});

export const { setUserProjects } = projectSlice.actions;
export default projectSlice.reducer;
