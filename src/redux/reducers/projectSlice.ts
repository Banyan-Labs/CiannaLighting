import { createSlice } from '@reduxjs/toolkit';

export interface ProjectStateType {
    userProjects: any[];
    allProjects: any[];
    project: ProjectType | null;
    projectRooms: any[];
    room: RoomType | null;
    error: any;
    projectId: string;
    roomId: string;
    roomLights: [];
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
    createdAt?: any;
};

const initialState: ProjectStateType = {
    userProjects: [],
    allProjects: [],
    project: null,
    projectRooms: [],
    room: null,
    roomId: '',
    error: null,
    projectId: '',
    roomLights: [],
};

export const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        setProject: (state, action) => ({ ...state, project: action.payload }),
        setAllProjects: (state, action) => ({
            ...state,
            allProjects: action.payload.projects,
        }),
        setRoom: (state, action) => ({ ...state, room: action.payload }),
        setRoomId: (state, action) => ({ ...state, roomId: action.payload }),
        setProjectRooms: (state, action) => ({
            ...state,
            projectRooms: action.payload,
        }),
        setProjectError: (state, action) => ({
            ...state,
            error: action.payload,
        }),
        setProjectId: (state, action) => ({
            ...state,
            projectId: action.payload._id,
        }),
        setRoomLights: (state, action) => ({
            ...state,
            roomLights: action.payload,
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
    setAllProjects,
    setProjectRooms,
    setRoomId,
    setRoomLights,
} = projectSlice.actions;
export default projectSlice.reducer;
