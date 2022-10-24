import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:1337/api',
});

const axiosAuth = axios.create({
    baseURL: 'http://localhost:1337/api',
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
});

const axiosFile = axios.create({
    baseURL: 'http://localhost:1337/api',
    headers: { 'Content-Type': 'multipart/form-data' },
    withCredentials: true,
});

export const axiosPrivate = async () => {
    const token = localStorage.getItem('token');
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
};

export const axiosFileUpload = async () => {
    const token = localStorage.getItem('token');
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
};
