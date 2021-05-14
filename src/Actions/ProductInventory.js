import client from '../axiosClient';
import {
    PRODUCT_INVENTORY_AMOUNT_CHANGED,
    GET_PRODUCT_INVENTORY,
    GET_PRODUCT_INVENTORY_FAILURE,
    GET_PRODUCT_INVENTORY_SUCCESS,
    UPDATE_PRODUCT_INVENTORY_FAILURE,
    UPDATE_PRODUCT_INVENTORY_SUCCESS,
    UPDATE_PRODUCT_INVENTORY,
    ADD_PRODUCT_INVENTORY,
    ADD_PRODUCT_INVENTORY_FAILURE,
    ADD_PRODUCT_INVENTORY_SUCCESS,
    TOGGLE_EDIT_PRODUCT_INVENTORY
} from '../Types/ProductInventory';

const pathPrefix = '/inventory';

export const toggleEditProductInventory = (data) => {
    return({
        type: TOGGLE_EDIT_PRODUCT_INVENTORY,
        payload: data
    })
}
export const productInventoryAmountChanged = (data) => {
    return({
        type: PRODUCT_INVENTORY_AMOUNT_CHANGED,
        payload: data
    })
}

export const getProductInventory = (data) => {
    return async (dispatch) => {
        dispatch({
            type: GET_PRODUCT_INVENTORY,
            payload: data
        });
        try{
            const res = await client.get(`${pathPrefix}/${data.productId}`);
            dispatch({
                type: GET_PRODUCT_INVENTORY_SUCCESS,
                payload: res.data
            })
        }catch(e){
            dispatch({
                type: GET_PRODUCT_INVENTORY_FAILURE,
                payload: e.response.data
            })
        }
    }
}

export const addProductInventory = (data) => {
    return async (dispatch) => {
        dispatch({
            type: ADD_PRODUCT_INVENTORY,
            payload: data
        });
        try{
            const res = await client.post(`${pathPrefix}`, {
                productId: data.productId,
                amount: data.inventoryAmount
            });
            dispatch({
                type: ADD_PRODUCT_INVENTORY_SUCCESS,
                payload: res.data
            })
        }catch(e){
            dispatch({
                type: ADD_PRODUCT_INVENTORY_FAILURE,
                payload: e.response.data
            })
        }
    }
}

export const updateProductInventory = (data) => {
    return async (dispatch) => {
        dispatch({
            type: UPDATE_PRODUCT_INVENTORY,
            payload: data
        });
        try{
            const res = await client.put(`${pathPrefix}/${data.productId}`, {
                amount: data.inventoryAmount,
                productId: data.productId
            });
            dispatch({
                type: UPDATE_PRODUCT_INVENTORY_SUCCESS,
                payload: res.data
            })
        }catch(e){
            dispatch({
                type: UPDATE_PRODUCT_INVENTORY_FAILURE,
                payload: e.response.data
            })
        }
    }
}