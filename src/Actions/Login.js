import {
    LOGIN_EMAIL_CHANGED,
    LOGIN_PASSWORD_CHANGED,
    LOGIN_SUBMIT,
    LOGIN_SUBMIT_FAILED,
    LOGIN_SUBMIT_SUCCESS
} from '../Types';
import client from '../axiosClient';
import { isNullOrEmpty } from '../helpers';

export const login = (data) => {
    return async(dispatch)=>{
        dispatch({
            type: LOGIN_SUBMIT,
            payload: true
        });
        let errorExists = false;
        let errors = {
            email: '',
            password: ''
        };
        if(isNullOrEmpty(data.email)){
            errors.email = 'Email is required.';
            errorExists = true;
        }
        if(isNullOrEmpty(data.password)){
            errors.password = 'Password is required.';
            errorExists = true;
        }
        if(errorExists){
            let statusMessage = 'Login failed. Make sure all required fields are provided.';
            dispatch({
                type: LOGIN_SUBMIT_FAILED,
                payload: {
                    statusMessage,
                    errorExists,
                    errors
                }
            });
            return;
        }
        try{
            const res = await client.post('/user/login', {
                email: data.email,
                password: data.password
            });
            localStorage.setItem('accessToken', res.data.accessToken);
            localStorage.setItem('refreshToken', res.data.refreshToken);
            localStorage.setItem('expiresAt', res.data.expiresAt);
            localStorage.setItem('refreshBy', res.data.refershBy);
            dispatch({
                type: LOGIN_SUBMIT_SUCCESS,
                payload: res.data
            })
        }catch(e){
            dispatch({
                type: LOGIN_SUBMIT_FAILED,
                payload: e.response.data
            })
        }
    }
}

export const loginEmailChanged = (data) =>{
    return({
        type: LOGIN_EMAIL_CHANGED,
        payload: data
    })
}

export const loginPasswordChanged = (data) => {
    return({
        type: LOGIN_PASSWORD_CHANGED,
        payload: data
    })
}