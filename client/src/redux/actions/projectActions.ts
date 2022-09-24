import { Dispatch } from 'redux';
import { axiosPrivate } from '../../api/axios';
import { setUserProjects } from '../reducers/projectSlice';

export const getUserProjects =
    (userId: string) =>
    async (dispatch: Dispatch): Promise<void> => {
        const axioscall = await axiosPrivate();
        try {
            const projects = await axioscall.post('/account-projects', {
                clientId: userId,
            });
            dispatch(setUserProjects(projects.data));
        } catch (err) {
            console.log(err);
        }
    };
