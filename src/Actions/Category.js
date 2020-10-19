import {
    ADD_CATEGORY,
    ADD_CATEGORY_FAILURE,
    ADD_CATEGORY_SUCCESS,
    DELETE_CATEGORY,
    DELETE_CATEGORY_FAILURE,
    DELETE_CATEGORY_SUCCESS,
    GET_CATEGORIES,
    GET_CATEGORIES_FAILURE,
    GET_CATEGORIES_SUCCESS,
    GET_CATEGORY,
    GET_CATEGORY_FAILURE,
    GET_CATEGORY_SUCCESS,
    UPDATE_CATEGORY,
    UPDATE_CATEGORY_FAILURE,
    UPDATE_CATEGORY_SUCCESS,
    CATEGORY_NAME_CHANGED,
    EDIT_CATEGORY,
    CANCEL_EDIT_CATEGORY
}
from '../Types';
import client from '../axiosClient';
import { isNullOrEmpty } from '../helpers';

export const changeName = (data) => {
    return ({
        type: CATEGORY_NAME_CHANGED,
        payload: data
    });
}

export const getCategory = (data) => {
    return async(dispatch) => {
        dispatch({
            type: GET_CATEGORY,
            payload: true
        });
        try{
            const res = await client.get(`/category/${data}`);
            dispatch({
                type: GET_CATEGORY_SUCCESS,
                payload: res.data
            })
        }catch(e){
            dispatch({
                type: GET_CATEGORY_FAILURE,
                payload: e.response.data
            })
        }
    }
}

export const getCategories = (data) => {
    return async(dispatch) => {
        dispatch({
            type: GET_CATEGORIES,
            payload: true
        });
        try{
            const res = await client.get('/category');
            dispatch({
                type: GET_CATEGORIES_SUCCESS,
                payload: res.data
            })
        }catch(e){
            dispatch({
                type: GET_CATEGORIES_FAILURE,
                payload: e.response.data
            })
        }
    }
}

export const addCategory = (data) => {
    return async(dispatch) => {
        dispatch({
            type: ADD_CATEGORY,
            payload: true
        });
        try{
            if(isNullOrEmpty(data.name)){
                return dispatch({
                    type: ADD_CATEGORY_FAILURE,
                    payload: {
                        statusMessage: 'There are errors in your submission. Fill out all required fields.',
                        errors: {
                            name: 'Name is required'
                        },
                        errorExists: true
                    }
                })
            }
            const res = await client.post('/category', {
                name: data.name
            });
            dispatch({
                type: ADD_CATEGORY_SUCCESS,
                payload: res.data
            })
        }catch(e){
            // let errorPayload = {...e.response.data}
            // if(!e.response.data.errors){
            //     errorPayload.errors={
            //         name: ''
            //     }
            // }
            // dispatch({
            //     type: ADD_CATEGORY_FAILURE,
            //     payload: errorPayload
            // });
            dispatch({
                type: ADD_CATEGORY_FAILURE,
                payload: e.response.data
            })
        }
    }
}

export const deleteCategory = (data) => {
    return async(dispatch) => {
        dispatch({
            type: DELETE_CATEGORY,
            paylod: true
        });
        try{
            const res = await client.delete(`/category/${data}`);
            const payload = res.data;
            payload.id = data;
            dispatch({
                type: DELETE_CATEGORY_SUCCESS,
                payload: payload
            })
        }catch(e){
            dispatch({
                type: DELETE_CATEGORY_FAILURE,
                payload: e.response.data
            })
        }
    }
}

export const updateCategory = (data) => {
    return async(dispatch) => {
        dispatch({
            type: UPDATE_CATEGORY,
            payload: true
        });
        try{
            if(isNullOrEmpty(data.name)){
                return dispatch({
                    type: ADD_CATEGORY_FAILURE,
                    payload: {
                        statusMessage: 'There are errors in your submission. Fill out all required fields.',
                        errors: {
                            name: 'Name is required'
                        },
                        errorExists: true
                    }
                })
            }
            const res = await client.put(`/category/${data.id}`, {
                name: data.name
            });
            dispatch({
                type: UPDATE_CATEGORY_SUCCESS,
                payload: res.data
            });
        }catch(e){
            dispatch({
                type: UPDATE_CATEGORY_FAILURE,
                payload: e.response.data
            })
        }
    }
}

export const editCategory = (data) => {
    return({
        type: EDIT_CATEGORY,
        payload: data
    })
}

export const cancelEditCategory = () => {
    return({
        type: CANCEL_EDIT_CATEGORY,
        payload: false
    })
}