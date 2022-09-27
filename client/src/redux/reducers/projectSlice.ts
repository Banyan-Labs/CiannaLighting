import { createSlice } from '@reduxjs/toolkit';

export interface ProjectStateType {
    userProjects: any[];
    project: ProjectType | null;
    room: RoomType | null;
    error: any;
    projectId: string;
}

export type ProjectType = {
    name: string;
    clientId: string;
    clientName: string;
    region: string;
    status: string;
    description: string;
    rfp?: string;
    rooms?: string[];
};

export type RoomType = {
    clientId: string;
    projectId?: string;
    name: string;
    description: string;
    lights?: string[];
};

const initialState: ProjectStateType = {
    userProjects: [],
    project: null,
    room: null,
    error: null,
    projectId: '',
};

export const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        setProject: (state, action) => ({ ...state, project: action.payload }),
        setRoom: (state, action) => ({ ...state, room: action.payload }),
        setProjectError: (state, action) => ({
            ...state,
            error: action.payload,
        }),
        setProjectId: (state, action) => ({
            ...state,
            projectId: action.payload._id,
        }),
        resetRoom: (state) => ({ ...state, room: null }),
        resetProject: (state) => ({ ...state, project: null }),
        setUserProjects: (state, action) => ({
            ...state,
            userProjects: action.payload.projects,
        }),
    },
});

export const {
    setProject,
    setRoom,
    setProjectError,
    setProjectId,
    setUserProjects,
} = projectSlice.actions;
export default projectSlice.reducer;
