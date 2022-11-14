import { createSlice } from '@reduxjs/toolkit';

export interface ProjectStateType {
    userProjects: any[];
    allProjects: any[];
    filterQueryProjects: any[];
    project: ProjectType | null;
    projectRooms: any[];
    room: RoomType | null;
    error: any;
    projectId: string;
    roomId: string;
    roomLights: [];
    setAllCatalog: any[];
    catalogConnectLight: any[] | null;
}

type Activity = {
    createUpdate: string;
    rooms: string[];
    archiveRestore: string[];
    status: string[]
}

export type ProjectType = {
    _id?: string;
    archived?: boolean;
    name: string;
    clientId: string;
    clientName: string;
    region: string;
    status: string;
    description: string;
    rfp?: string;
    rooms?: string[];
    activity?: Activity;
};

export type LightType = {
    exteriorFinish: string;
    interiorFinish: string;
    environment: string;
    safetyCert: string;
    projectVoltage: string;
    socketType: string;
    lensMaterial: string;
    glassOptions: string;
    acrylicOptions: string;
    crystalType: string;
    crystalPinType: string;
    crystalPinColor: string;
    mounting: string;
    item_ID: string;
    roomName: string;
    roomId: string;
    projectId: string;
    clientId: string;
    quantity: number;
};

export type RoomType = {
    _id?: string;
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
    filterQueryProjects: [],
    project: null,
    projectRooms: [],
    room: null,
    roomId: '',
    error: null,
    projectId: '',
    roomLights: [],
    setAllCatalog: [],
    catalogConnectLight: null
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
        setFilteredProjects: (state, action) => ({
            ...state,
            filterQueryProjects: action.payload.projects,
        }),
        setRoom: (state, action) => ({ ...state, room: action.payload }),
        setRoomId: (state, action) => ({ ...state, roomId: action.payload }),
        setProjectRooms: (state, action) => ({
            ...state,
            projectRooms: action.payload,
        }),
        setCatalogLights: (state, action) => ({
            ...state,
            setAllCatalog: action.payload,
        }),
        setCatalogConnect: (state, action) => ({
            ...state,
            catalogConnectLight: action.payload,
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
    setFilteredProjects,
    setProjectRooms,
    setRoomId,
    setRoomLights,
    setCatalogLights,
    setCatalogConnect
} = projectSlice.actions;
export default projectSlice.reducer;
