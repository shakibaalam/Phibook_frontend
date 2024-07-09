import axios from 'axios'
import { Url } from './MyServer'


const axiosInstance = axios.create({
    baseURL: Url
})

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            config.headers['Authorization'] = `Token ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
export default axiosInstance;


