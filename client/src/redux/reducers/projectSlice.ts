import { createSlice } from '@reduxjs/toolkit';

export interface ProjectStateType {
    userProjects: any[];
    project: any;
}

const initialState: ProjectStateType = {
    userProjects: [],
    project: {},
};

export const projectSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        setUserProjects: (state, action) => ({
            ...state,
            userProjects: action.payload.projects,
        }),
    },
});

export const { setUserProjects } = projectSlice.actions;
export default projectSlice.reducer;
