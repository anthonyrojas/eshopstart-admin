import client from '../axiosClient';
import { isUndefinedOrNull } from '../helpers';
import {
    GET_ORDER,
    GET_ORDERS,
    GET_ORDERS_FAILURE,
    GET_ORDERS_SUCCESS,
    GET_ORDER_FAILURE,
    GET_ORDER_SUCCESS
} from '../Types/Order';

export const getOrders = (data) => {
    return async(dispatch) => {
        dispatch({
            type: GET_ORDERS,
            payload: data
        });
        try{
            let limit = isUndefinedOrNull(data.limit) ? 100 : data.limit;
            let skip = isUndefinedOrNull(data.skip) ? 0 : data.skip;
            let orderBy = isUndefinedOrNull(data.orderBy) ? '' : `&orderBy=${data.orderBy}`;
            let sort = isUndefinedOrNull(data.sort) ? '' : `&sort=${data.sort}`;
            const queryString = `?limit=${limit}&skip=${skip}${orderBy}${sort}`;
            let res = null;
            if(isUndefinedOrNull(data.userId)){
                res = await client.get(`/order/all${queryString}&view=all`);
            }else{
                res = await client.get(`/order/all/${data.userId}${queryString}`);
            }
            dispatch({
                type: GET_ORDERS_SUCCESS,
                payload: res.data
            })
        }catch(e){
            dispatch({
                type: GET_ORDERS_FAILURE,
                payload: e.response.data
            })
        }
    }
}

export const getOrder = (data) => {
    return async(dispatch) => {
        dispatch({
            type: GET_ORDER,
            payload: data
        });
        try{
            const res = await client.get(`/order/single/${data.orderId}`);
            dispatch({
                type: GET_ORDER_SUCCESS,
                payload: res.data
            })
        }catch(e){
            dispatch({
                type: GET_ORDER_FAILURE,
                payload: e.response.data
            })
        }
    }
}