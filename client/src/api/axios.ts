import axios from 'axios';
import { store } from '../redux/store';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export default axios.create({
    baseURL: BACKEND_URL,
});

const axiosAuth = axios.create({
    baseURL: BACKEND_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
});

const axiosFile = axios.create({
    baseURL: BACKEND_URL,
    headers: { 'Content-Type': 'multipart/form-data' },
    withCredentials: true,
});

export const axiosPrivate = () => {
    const state = store.getState();

    if (state) {
        const token = state.auth.user.token;

        axiosAuth.interceptors.request.use(
            (config: any) => {
                config.headers['authorization'] = `Bearer ${token}`;

                return config;
            },
            (error) => Promise.reject(error)
        );

        axiosAuth.interceptors.response.use(
            (response) => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.repsonse?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newToken = await axiosAuth.get('rf/refresh');
                    prevRequest.headers['authorization'] = `Bearer ${newToken}`;
                    return axiosAuth(prevRequest);
                }
                return error;
            }
        );

        return axiosAuth;
    } else {
        throw Error('axiosPrivate call error');
    }
};

export const axiosFileUpload = async () => {
    const state = store.getState();

    if (state) {
        const token = state.auth.user.token;

        axiosFile.interceptors.request.use(
            (config: any) => {
                config.headers['authorization'] = `Bearer ${token}`;

                return config;
            },
            (error) => Promise.reject(error)
        );

        axiosFile.interceptors.response.use(
            (response) => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.repsonse?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newToken = await axiosFile.get('rf/refresh');
                    prevRequest.headers['authorization'] = `Bearer ${newToken}`;
                    return axiosFile(prevRequest);
                }
                return error;
            }
        );
        return axiosFile;
    } else {
        throw Error('axiosFILEupload call error');
    }
};
