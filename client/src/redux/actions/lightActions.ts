import { Dispatch } from 'redux';
import { setRoomLights, setProjectError } from '../reducers/projectSlice';
import { axiosPrivate } from '../../api/axios';

export const getRoomLights =
    (roomId: string) =>
    async (dispatch: Dispatch): Promise<void> => {
        const axiosPriv = await axiosPrivate();
        try {
            const response = await axiosPriv.post('/get-lightSelections', {
                roomId: roomId,
            });
            dispatch(setRoomLights(response.data.lights));
        } catch (error: any) {
            dispatch(setProjectError(error.response.data));
        }
    };
