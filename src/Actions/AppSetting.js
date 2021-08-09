import {
    ADD_APP_SETTING,
    ADD_APP_SETTING_FAILURE,
    ADD_APP_SETTING_SUCCESS,
    UPDATE_APP_SETTING,
    UPDATE_APP_SETTING_FAILURE,
    UPDATE_APP_SETTING_SUCCESS,
    GET_APP_SETTINGS,
    GET_APP_SETTINGS_SUCCESS,
    GET_APP_SETTINGS_FAILURE,
    GET_APP_SETTING,
    GET_APP_SETTING_FAILURE,
    GET_APP_SETTING_SUCCESS,
    GET_APP_SETTING_CATEGORIES,
    GET_APP_SETTING_CATEGORIES_FAILURE,
    GET_APP_SETTING_CATEGORIES_SUCCESS,
    CHANGE_BUSINESS_ADDRESS_CITY,
    CHANGE_BUSINESS_ADDRESS_NAME,
    CHANGE_BUSINESS_ADDRESS_STATE,
    CHANGE_BUSINESS_ADDRESS_STREET,
    CHANGE_BUSINESS_ADDRESS_ZIP,
    CHANGE_BUSINESS_ADDRESS
} from '../Types/AppSetting';
import client from '../axiosClient';
import { isNullOrEmpty } from '../helpers';
export const getAppSettingCategories = (data) => {
    return async(dispatch) => {
        dispatch({
            type: GET_APP_SETTING_CATEGORIES,
            payload: data
        })
        try{
            const res = await client.get(`/app-settings/categories`);
            dispatch({
                type: GET_APP_SETTING_CATEGORIES_SUCCESS,
                payload: res.data
            })
        }catch(e){
            dispatch({
                type: GET_APP_SETTING_CATEGORIES_FAILURE,
                payload: e.response.data
            })
        }
    }
}

export const getAppSettings = (data) => {
    return async(dispatch) => {
        dispatch({
            type: GET_APP_SETTINGS,
            payload: data
        });
        try{
            const res = await client.get(`/app-settings`);
            dispatch({
                type: GET_APP_SETTINGS_SUCCESS,
                payload: res.data
            })
        }catch(e){
            dispatch({
                type: GET_APP_SETTINGS_FAILURE,
                payload: e.response.data
            });
        }
    }
}
export const getAppSetting = (data) => {
    return async(dispatch) => {
        dispatch({
            type: GET_APP_SETTING,
            payload: data
        });
        try{
            const res = await client.get(`/app-settings/${data.id}`);
            dispatch({
                type: GET_APP_SETTING_SUCCESS,
                payload: res.data
            })
        }catch(e){
            dispatch({
                type: GET_APP_SETTING_FAILURE,
                payload: e.response.data
            })
        }
    }
}
export const addAppSetting = (data) => {
    return async(dispatch) => {
        dispatch({
            type: ADD_APP_SETTING,
            payload: data
        })
        try{
            const res = await client.post(`/app-settings`, data);
            dispatch({
                type: ADD_APP_SETTING_SUCCESS,
                payload: res.data
            })
        }catch(e){
            console.log(e);
           dispatch({
               type: ADD_APP_SETTING_FAILURE,
               payload: e.response.data
           }) 
        }
    }
}
export const updateAppSetting = (data) => {
    return async(dispatch) => {
        dispatch({
            type: UPDATE_APP_SETTING,
            payload: data
        })
        try{
            const res = await client.put(`/app-settings/${data.id}`, data);
            dispatch({
                type: UPDATE_APP_SETTING_SUCCESS,
                payload: res.data
            })
        }catch(e){
            dispatch({
                type: UPDATE_APP_SETTING_FAILURE,
                payload: e.response.data
            })
        }
    }
}
export const changeBusinessAddressName = (data) => {
    return({
        type: CHANGE_BUSINESS_ADDRESS_NAME,
        payload: data
    })
}
export const changeBusinessAddressStreet = (data) => {
    return({
        type: CHANGE_BUSINESS_ADDRESS_STREET,
        payload: data
    })
}
export const changeBusinessAddressCity = (data) =>{
    return({
        type: CHANGE_BUSINESS_ADDRESS_CITY,
        payload: data
    })
}
export const changeBusinessAddressState = (data) => {
    return({
        type: CHANGE_BUSINESS_ADDRESS_STATE,
        payload: data
    })
}
export const changeBusinessAddressZip = (data) => {
    return({
        type: CHANGE_BUSINESS_ADDRESS_ZIP,
        payload: data
    })
}
export const changeBusinessAddress = (data) => {
    return({
        type: CHANGE_BUSINESS_ADDRESS,
        payload: data
    })
}