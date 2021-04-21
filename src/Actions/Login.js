import {
    LOGIN_EMAIL_CHANGED,
    LOGIN_PASSWORD_CHANGED,
    LOGIN_SUBMIT,
    LOGIN_SUBMIT_FAILED,
    LOGIN_SUBMIT_SUCCESS,
    LOGOUT,
    REFRESH_LOGIN,
    REFRESH_LOGIN_FAILURE,
    REFRESH_LOGIN_SUCCESS,
    GET_ACCOUNT,
    GET_ACCOUNT_SUCCESS,
    GET_ACCOUNT_FAILURE
} from '../Types';
import client from '../axiosClient';
import { isNullOrEmpty } from '../helpers';
import axios from 'axios';

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
            const userRes = await axios.get(`${process.env.REACT_APP_API_URI}/api/user`, {
                headers: {
                    authorization: res.data.accessToken
                }
            });
            const user = userRes.data.user;
            if(user.role === 'Customer' || user.role.toLowerCase() === 'customer'){
                return dispatch({
                    type: LOGIN_SUBMIT_FAILED,
                    payload: {
                        statusMessage: 'You are not authorized to access this site.',
                        errors: {},
                        errorExists: true
                    }
                });
            }
            localStorage.setItem('accessToken', res.data.accessToken);
            localStorage.setItem('refreshToken', res.data.refreshToken);
            localStorage.setItem('expiresAt', res.data.expiresAt);
            localStorage.setItem('refreshBy', res.data.refreshBy);
            dispatch({
                type: LOGIN_SUBMIT_SUCCESS,
                payload: res.data
            })
        }catch(e){
            if(!e.response.data.errors){
                e.response.data.errors = {};
            }
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

export const logout = (data) => {
    localStorage.clear();
    return({
        type: LOGOUT,
        payload: false
    })
}

export const refreshLogin = (data) => {
    return async(dispatch) => {
        dispatch({
            type: REFRESH_LOGIN,
            payload: true
        })
        try{
            const res = await axios.post(`${process.env.REACT_APP_API_URI}/api/user/refresh`, {
            }, {
                headers: {
                    authorization: data
                }
            });
            localStorage.setItem('accessToken', res.data.accessToken);
            localStorage.setItem('refreshToken', res.data.refreshToken);
            localStorage.setItem('expiresAt', res.data.expiresAt);
            localStorage.setItem('refreshBy', res.data.refreshBy);
            dispatch({
                type: REFRESH_LOGIN_SUCCESS,
                payload: res.data
            })
        }catch(e){
            localStorage.clear();
            dispatch({
                type: REFRESH_LOGIN_FAILURE,
                payload: e.response.data
            })
        }
    }
}

export const getAccount = (data) => {
    return async(dispatch) => {
        try{
            const res = await client.get(`${process.env.REACT_APP_API_URI}/api/user`);
            dispatch({
                type: GET_ACCOUNT_SUCCESS,
                payload: res.data
            })
        }catch(e){
            dispatch({
                type: GET_ACCOUNT_FAILURE,
                payload: e.repsonse.data
            })
        }
    }
}