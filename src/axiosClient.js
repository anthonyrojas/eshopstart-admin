import axios from 'axios';
const client = axios.create({
    baseURL: `${process.env.REACT_APP_API_URI}/api`
});
client.interceptors.request.use((config)=>{
    config.headers.Authorization = `${localStorage.getItem('accessToken')}`;
    return config;
}, (err)=>{
    return Promise.reject(err);
});
export default client;