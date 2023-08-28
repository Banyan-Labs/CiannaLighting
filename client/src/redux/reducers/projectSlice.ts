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
    filteredCatalog: any[];
    setInactive: string[];
    attachments: any[];
    selections: any[];
    catalogConnectLight: any[] | null;
    yourProjects: boolean;
}

export type Activity = {
    createUpdate: string;
    rooms: string[];
    archiveRestore: string[];
    status: string[];
};
export interface LightREF {
    item_ID: string;
    rooms: string[];
}

export type ProjectType = {
    _id?: string;
    archived?: boolean;
    lightIDs?: LightREF[];
    copy?: string;
    name: string;
    clientId: string;
    clientName: string;
    region: string;
    status: string;
    description: string;
    rooms?: string[];
    attachments?: string[];
    activity?: Activity;
};

export type LightType = {
    exteriorFinish: string;
    finishTreatment: string;
    interiorFinish: string;
    environment: string;
    safetyCert: string;
    projectVoltage: string;
    socketType: string;
    lensMaterial: string;
    crystalType: string;
    treatment: string;
    crystalBulbCover: string;
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
    roomId: '',
    projectId: '',
    project: null,
    room: null,
    error: null,
    catalogConnectLight: null,
    yourProjects: false,
    userProjects: [],
    allProjects: [],
    filterQueryProjects: [],
    projectRooms: [],
    roomLights: [],
    setAllCatalog: [],
    filteredCatalog: [],
    setInactive: [],
    attachments: [],
    selections: [],
};
/**
 * project
 * projectRooms
 * room
 * roomId
 * projectId
 * attachments
 */

export const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        setProject: (state, action) => ({ ...state, project: action.payload }),
        setAttachments: (state, action) => ({
            ...state,
            attachments: action.payload,
        }),
        setLightSelections: (state, action) => ({
            ...state,
            selections: action.payload,
        }),
        setAllProjects: (state, action) => ({
            ...state,
            allProjects: action.payload?.projects,
        }),
        setFilteredProjects: (state, action) => ({
            ...state,
            filterQueryProjects: action.payload,
        }),
        setFilteredProjNone: (state) => ({
            ...state,
            filterQueryProjects: [],
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
        setFilteredCatalogLights: (state, action) => ({
            ...state,
            filteredCatalog: action.payload,
        }),
        setInactiveLights: (state, action) => ({
            ...state,
            setInactive: action.payload,
        }),
        setYourProjects: (state, action) => ({
            ...state,
            yourProjects: action.payload,
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
            projectId: action.payload?._id,
        }),
        setRoomLights: (state, action) => ({
            ...state,
            roomLights: action.payload,
        }),
        setUserProjects: (state, action) => ({
            ...state,
            userProjects: action.payload?.projects,
        }),
        setPersonalizedDefaults: (state) => ({
            ...state,
            roomId: '',
            projectId: '',
            project: null,
            room: null,
            projectRooms: [],
            attachments: [],
        }),
    },
});

export const {
    setProject,
    setAttachments,
    setLightSelections,
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
    setInactiveLights,
    setCatalogConnect,
    setYourProjects,
    setFilteredProjNone,
    setPersonalizedDefaults,
    setFilteredCatalogLights,
} = projectSlice.actions;
export default projectSlice.reducer;
