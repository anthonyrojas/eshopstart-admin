import {
    GET_USER_SHIPPING_ADDRESSES,
    GET_USER_SHIPPING_ADDRESSES_FAILURE,
    GET_USER_SHIPPING_ADDRESSES_SUCCESS
} from '../Types/ShippingAddress';
import client from '../axiosClient';

export const getUserShippingAddresses = (data) => {
    return async(dispatch) => {
        dispatch({
            type: GET_USER_SHIPPING_ADDRESSES,
            payload: data
        });
        try{
            const res = await client.get(`/shipping-address/user/${data.userId}`);
            dispatch({
                type: GET_USER_SHIPPING_ADDRESSES_SUCCESS,
                payload: res.data
            })
        }catch(e){
            dispatch({
                type: GET_USER_SHIPPING_ADDRESSES_FAILURE,
                payload: e.response.data
            })
        }
    }
}