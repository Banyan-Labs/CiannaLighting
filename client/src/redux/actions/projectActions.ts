import { Dispatch } from 'redux';
import { createHttpRequest } from '../../api/requestTypes';
import { setProject, setProjectError, setRoom } from '../reducers/projectSlice';
import { baseUrl } from './authActions';
import { ProjectType, RoomType } from '../reducers/projectSlice';

export const createProjectAction =
    (payload: ProjectType) =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            const response = await createHttpRequest(
                baseUrl + 'projects/create-project/',
                payload
            );
            dispatch(setProject(response.data.project));
        } catch (error: any) {
            dispatch(setProjectError(error.response.data));
        }
    };

export const createRoomAction =
    (payload: RoomType) =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            const response = await createHttpRequest(
                baseUrl + 'rooms/create-room/',
                payload
            );
            dispatch(setRoom(response.data.room));
        } catch (error: any) {
            dispatch(setProjectError(error.response.data));
        }
    };
