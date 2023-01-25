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
    let token = '';

    const state = store.getState();
    if (state) {
        token = state.auth.user.token;

        console.log('axiosPrivate token: ', token);
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
                console.log(error);
                return error;
            }
        );

        return axiosAuth;
    } else {
        throw Error('axiosPrivate call error');
    }
};

export const axiosFileUpload = async () => {
    let token = '';

    const state = store.getState();
    if (state) {
        token = state.auth.user.token;
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
                console.log(error);
                return error;
            }
        );
        return axiosFile;
    } else {
        throw Error('axiosFILEupload call error');
    }
};
