import { createSlice } from '@reduxjs/toolkit';

export interface ProjectStateType {
    project: ProjectType | null;
    room: RoomType | null;
    error: any;
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
    projectId: string;
    name: string;
    description: string;
    lights?: string[];
};

const initialState: ProjectStateType = {
    project: null,
    room: null,
    error: null,
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
        resetRoom: (state) => ({ ...state, room: null }),
        resetProject: (state) => ({ ...state, project: null }),
    },
});

export const { setProject, setRoom, setProjectError } = projectSlice.actions;
export default projectSlice.reducer;
