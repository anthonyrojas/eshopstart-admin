import axios from 'axios';
const client = axios.create({
    baseURL: `${process.env.REACT_APP_API_URI}/api`
});
client.interceptors.request.use(async(config)=>{
    if(localStorage.getItem('expiresAt') && Date.now() - 300 > localStorage.getItem('expiresAt')){
        const res = await axios.post(`${process.env.REACT_APP_API_URI}/api/user/refresh`, {
        }, {
            headers: {
                authorization: localStorage.getItem('refreshToken')
            }
        });
        localStorage.setItem('accessToken', res.data.accessToken);
        localStorage.setItem('refreshToken', res.data.refreshToken);
        localStorage.setItem('expiresAt', res.data.expiresAt);
        localStorage.setItem('refreshBy', res.data.refreshBy);
    }
    config.headers.authorization = `${localStorage.getItem('accessToken')}`;
    return config;
}, (err)=>{
    if(err.response.status === 401){
        localStorage.clear();
    }
    return Promise.reject(err);
});
export default client;