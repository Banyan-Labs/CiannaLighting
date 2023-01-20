import axios from 'axios';
import { store } from '../redux/store';
const state = store.getState()
console.log(state)

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export default axios.create({
    baseURL: BACKEND_URL,
});

const axiosAuth = axios.create({
    baseURL: BACKEND_URL,
    headers: { 'Content-Type': 'application/json', 'accept': 'application/json' },
    data: {},
    withCredentials: true,
});

const axiosFile = axios.create({
    baseURL: BACKEND_URL,
    headers: { 'Content-Type': 'mapplication/json', 'accept': 'multipart/form-data' },
    withCredentials: true,
});

export const axiosPrivate = async () => {
    // const token = localStorage.getItem('token');
    const token = state.auth.user.token;
    if(token){
    console.log("axiosPrivate token: ",token)
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
                if(newToken){
                prevRequest.headers['authorization'] = `Bearer ${newToken}`;
                return axiosAuth(prevRequest);
                }else{throw Error('Axios Private Error')}
            }
            console.log(error);
            return error;
        }
    );

    return axiosAuth;
}else{
    throw Error('Waiting on user token in axios')
}
};

export const axiosFileUpload = async () => {
    // const token = localStorage.getItem('token');
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
                if(newToken){
                console.log("token in File", newToken)
                prevRequest.headers['authorization'] = `Bearer ${newToken}`;
                return axiosFile(prevRequest);
                }else{
                    throw Error('Axios File error')
                }
            }
            console.log(error);
            return error;
        }
    );
        console.log("axiosFile: ",axiosFile.interceptors)
    return axiosFile;
};
