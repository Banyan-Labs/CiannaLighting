import { createSlice } from '@reduxjs/toolkit';

export interface ProjectStateType {
    proposal: Proposal[] | [];
    rfp: RFP | null;
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
    attachments: any[];
    catalogConnectLight: any[] | null;
    yourProjects: boolean;
}

type Activity = {
    createUpdate: string;
    rooms: string[];
    archiveRestore: string[];
    status: string[];
};

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

export type Proposal = {
    _id: any;
    sub: string;
    projectId: string;
    itemID: string; // changes on first insertion
    description: string; // updates on first light insertion
    lampType: string; // changes on first light insertion
    lampColor: string; // changes first light insertion
    lightQuantity: number; // increases on each room
    price: number;
    wattsPer: number; // changes on first light insertion
    totalWatts: number; // increases with each "power in watts" coming in
    numberOfLamps: number; // increases with each "number of lights"
    totalLumens: number; // increases with each light insertion
    finishes: any; // changes on first light insertion
    rooms: any[]; // updates each time a room is added, and updates lightQuantity
    subTableRow: string[];
};
export type RFP = {
    header: string; // project name && creates rfp
    projectId: string; //projectId
    clientId: string;
    clientName: string;
    tableRow: string[];
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
    proposal: [],
    rfp: null,
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
    attachments: [],
    catalogConnectLight: null,
    yourProjects: false,
};

export const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        setProposals: (state, action) => ({...state, proposal: action.payload}),
        setRfp: (state, action) => ({...state, rfp: action.payload}),
        setProject: (state, action) => ({ ...state, project: action.payload }),
        setAttachments: (state, action) => ({
            ...state,
            attachments: action.payload,
        }),
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
    setProposals,
    setRfp,
    setProject,
    setAttachments,
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
    setCatalogConnect,
    setYourProjects,
} = projectSlice.actions;
export default projectSlice.reducer;
