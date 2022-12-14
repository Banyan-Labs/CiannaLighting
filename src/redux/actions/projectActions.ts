import { Dispatch } from 'redux';
import {
    setProposals,
    setRfp,
    setProject,
    setProjectError,
    setRoom,
    setRoomId,
    setProjectId,
    setAllProjects,
    setFilteredProjects,
    setProjectRooms,
    setUserProjects,
    setYourProjects
} from '../reducers/projectSlice';
import { ProjectType, RoomType } from '../reducers/projectSlice';
import { axiosPrivate } from '../../api/axios';

export const createProjectAction =
    (payload: ProjectType) =>
    async (dispatch: Dispatch): Promise<void> => {
        const axiosPriv = await axiosPrivate();
        try {
            const response = await axiosPriv.post('/create-project', payload);
            if(response){
                dispatch(setProjectId(response.data.project));
                dispatch(setProject(response.data.project));
                const getRfp = await axiosPriv.post('/get-rfps', {projectId: response.data.project._id})
                if(getRfp){
                    console.log("RFP RESPONSE: ", getRfp.data)
                    dispatch(setRfp(getRfp.data.rfp[0]))
                }
            }
        } catch (error: any) {
            dispatch(setProjectError(error.response.data));
        }
    };

export const createRoomAction =
    (payload: RoomType) =>
    async (dispatch: Dispatch): Promise<void> => {
        const axiosPriv = await axiosPrivate();
        try {
            const response = await axiosPriv.post('/create-room', payload);
            dispatch(setRoomId(response.data.room._id));
            dispatch(setRoom(response.data.room));
        } catch (error: any) {
            dispatch(setProjectError(error.response.data));
        }
    };

export const setTheRoom =
    (roomId: string) =>
    async (dispatch: Dispatch): Promise<void> => {
        const axiosPriv = await axiosPrivate();
        try {
            const response = await axiosPriv.post('/find-room', {
                _id: roomId,
            });
            dispatch(setRoomId(response.data.room._id));
            dispatch(setRoom(response.data.room));
        } catch (error: any) {
            dispatch(setProjectError(error.message));
        }
    };

export const getAllProjectRoomsAction =
    (projectId: string) =>
    async (dispatch: Dispatch): Promise<void> => {
        const axioscall = await axiosPrivate();
        try {
            const response = await axioscall.post('/get-rooms', {
                projectId: projectId,
            });
            dispatch(setProjectRooms(response.data.rooms));
        } catch (error: any) {
            dispatch(setProjectError(error.response.data));
        }
    };

export const getUserProjects =
    (userId: string) =>
    async (dispatch: Dispatch): Promise<void> => {
        const axiosPriv = await axiosPrivate();
        try {
            const projects = await axiosPriv.post('/account-projects', {
                clientId: userId,
            });
            await dispatch(setUserProjects(projects.data));
        } catch (err) {
            console.log(err);
        }
    };

    export const setTheYourProjects =
    (payload: boolean) =>
    async (dispatch: Dispatch): Promise<void> => {
        await dispatch(setYourProjects(payload));
    };

export const getProject =
    (payload: any) =>
    async (dispatch: Dispatch): Promise<void> => {
        const axioscall = await axiosPrivate();
        try {
            console.log("payload get proj: ",payload)
            const project = await axioscall.post('/find-project', payload);
            console.log("foundproj: ",project)
            if(project){
            dispatch(setProject(project.data.project));
            dispatch(setProjectId(project.data.project));
                const proposalSet = await axioscall.post('/get-proposals',{
                    projectId: project.data.project._id
                })
                if(proposalSet){
                    console.log("PROPOSAL STUFF: ", proposalSet)
                    dispatch(setProposals(proposalSet.data.proposal))
                    const getRfp = await axioscall.post('/get-rfps', {projectId: project.data.project._id})
                    if(getRfp){
                        console.log("RFP RESPONSE in createLight: ", getRfp.data)
                        dispatch(setRfp(getRfp.data.rfp[0]))
                    }
                }
            }
        } catch (err) {
            console.log(err);
        }
    };

export const getAllProjects =
    () =>
    async (dispatch: Dispatch): Promise<void> => {
        const axioscall = await axiosPrivate();
        try {
            const projects = await axioscall.post('/get-projects');
            dispatch(setAllProjects(projects.data));
        } catch (err) {
            console.log(err);
        }
    };
export const getFilteredProjects =
    (payload: any) =>
    async (dispatch: Dispatch): Promise<void> => {
        const axioscall = await axiosPrivate();
        try {
            const projects = await axioscall.post('/get-projects', payload);
            dispatch(setFilteredProjects(projects.data));
            return projects.data;
        } catch (err) {
            console.log(err);
        }
    };

export const viewProjectRooms =
    (projectId: string) =>
    async (dispatch: Dispatch): Promise<void> => {
        const axioscall = await axiosPrivate();
        try {
            const response = await axioscall.post('/get-rooms', {
                projectId: projectId,
            });
            return response.data.rooms;
        } catch (error: any) {
            dispatch(setProjectError(error.response.data));
        }
    };

export const viewRoomLights =
    (roomId: string) =>
    async (dispatch: Dispatch): Promise<any> => {
        const axiosPriv = await axiosPrivate();
        try {
            const response = await axiosPriv.post('/get-lightSelections', {
                roomId: roomId,
            });
            return response.data.lights;
        } catch (error: any) {
            dispatch(setProjectError(error.response.data));
        }
    };

export const deleteThisProject = (payload: any) => async () => {
    const axiosPriv = await axiosPrivate();
    try {
        const projects = await axiosPriv.post('/delete-project', payload);
        return projects.data;
    } catch (err) {
        console.log(err);
    }
};

export const deleteThisRoom = (payload: any) => async () => {
    const axiosPriv = await axiosPrivate();
    try {
        const room = await axiosPriv.post('/delete-room', payload);
        return room.data;
    } catch (err) {
        console.log(err);
    }
};

export const editThisRoom =
    (payload: any) =>
    async (dispatch: Dispatch): Promise<void> => {
        const axiosPriv = await axiosPrivate();
        try {
            const response = await axiosPriv.post('/find-room', payload);
            dispatch(setRoomId(response.data.room._id));
            dispatch(setRoom(response.data.room));
        } catch (error: any) {
            dispatch(setProjectError(error.response.data));
        }
    };

