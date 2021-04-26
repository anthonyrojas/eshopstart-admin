import client from '../axiosClient';
import { isUndefinedOrNull } from '../helpers';
import {
    GET_USERS,
    GET_USERS_FAILURE,
    GET_USERS_SUCCESS,
    GET_USER,
    GET_USER_SUCCESS,
    GET_USER_FAILURE
} from '../Types/Users';

export const getUsers = (data) => {
    return async(dispatch) => {
        dispatch({
            type: GET_USERS,
            payload: data
        });
        try{
            let limit = isUndefinedOrNull(data.limit) ? 20 : data.limit;
            let skip = isUndefinedOrNull(data.skip) ? 0 : data.skip;
            const res = await client.get(`/user/all?limit=${limit}&skip=${skip}`);
            dispatch({
                type: GET_USERS_SUCCESS,
                payload: res.data
            });
        }catch(e){
            dispatch({
                type: GET_USERS_FAILURE,
                payload: e.response.data
            })
        }
    }
}

export const getUser = (data) => {
    return async(dispatch) => {
        dispatch({
            type: GET_USER,
            payload: true
        });
        try{
            const res = await client.get(`/user/${data.id}`);
            dispatch({
                type: GET_USER_SUCCESS,
                payload: res.data
            })
        }catch(e){
            dispatch({
                type: GET_USER_FAILURE,
                payload: e.response.data
            })
        }
    }
}