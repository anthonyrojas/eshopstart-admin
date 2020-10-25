import axios from 'axios';
const client = axios.create({
    baseURL: `${process.env.REACT_APP_API_URI}/api`
});
client.interceptors.request.use((config)=>{
    config.headers.authorization = `${localStorage.getItem('accessToken')}`;
    return config;
}, (err)=>{
    if(err.response.status === 401){
        localStorage.clear();
    }
    return Promise.reject(err);
});
export default client;