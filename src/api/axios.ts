import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:1337/api',
});

const axiosAuth = axios.create({
    baseURL: 'http://localhost:1337/api',
    headers: { 'Content-Type': 'application/json' },
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
                const newToken = await axiosAuth.get('refresh');
                prevRequest.headers['authorization'] = `Bearer ${newToken}`;
                return axiosAuth(prevRequest);
            }
            return error;
        }
    );

    return axiosAuth;
};
