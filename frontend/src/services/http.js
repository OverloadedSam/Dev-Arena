import axios from "axios";
import auth from "./authService";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.response.use(null, (error) => {
    return Promise.reject(error);
});

axios.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${auth.getAuthToken()}`;
    return config;
});

const http = {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
};

export default http;
