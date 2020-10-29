import {
    ADD_PRODUCT,
    ADD_PRODUCT_FAILURE,
    ADD_PRODUCT_SUCCESS,
    UPDATE_PRODUCT,
    UPDATE_PRODUCT_FAILURE,
    UPDATE_PRODUCT_SUCCESS,
    GET_PRODUCT,
    GET_PRODUCTS,
    GET_PRODUCTS_FAILURE,
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCT_FAILURE,
    GET_PRODUCT_SUCCESS,
    DELETE_PRODUCT,
    DELETE_PRODUCT_FAILURE,
    DELETE_PRODUCT_SUCCESS,
    PRODUCT_NAME_CHANGED,
    PRODUCT_DESCRIPTION_CHANGED,
    PRODUCT_PRICE_CHANGED,
    PRODUCT_DOWNLOADS_PERMITTED_CHANGED,
    PRODUCT_HEIGHT_CHANGED,
    PRODUCT_ISBN_CHANGED,
    PRODUCT_IS_ACTIVE_CHANGED,
    PRODUCT_IS_DELIVERABLE_CHANGED,
    PRODUCT_IS_DIGITAL_CHANGED,
    PRODUCT_LENGTH_CHANGED,
    PRODUCT_SKU_CHANGED,
    PRODUCT_UPC_CHANGED,
    PRODUCT_WEIGHT_CHANGED,
    PRODUCT_WIDTH_CHANGED
} from '../Types/Product';
import client from '../axiosClient';
import {
    isUndefinedOrNull,
    isUndefinedOrNullOrEmpty,
    validateProduct
} from '../helpers'
import Axios from 'axios';

export const productNameChanged = (data) => {
    return({
        type: PRODUCT_NAME_CHANGED,
        payload: data
    })
}

export const productDescriptionChanged = (data) =>{
    return({
        type: PRODUCT_DESCRIPTION_CHANGED,
        payload: data
    })
}

export const productPriceChanged = (data) => {
    return({
        type: PRODUCT_PRICE_CHANGED,
        payload: data
    })
}

export const productDownloadsPermittedChanged = (data) => {
    return({
        type: PRODUCT_DOWNLOADS_PERMITTED_CHANGED,
        payload: data
    })
}

export const productHeightChanged = (data) => {
    return({
        type: PRODUCT_HEIGHT_CHANGED,
        payload: data
    })
}

export const productWeightChanged = (data) => {
    return({
        type: PRODUCT_WEIGHT_CHANGED,
        payload: data
    })
}

export const productWidthChanged = (data) => {
    return({
        type: PRODUCT_WIDTH_CHANGED,
        payload: data
    })
}

export const productLengthChanged = (data) => {
    return({
        type: PRODUCT_LENGTH_CHANGED,
        payload: data
    })
}

export const productIsDigitalChanged = (data) => {
    return({
        type: PRODUCT_IS_DIGITAL_CHANGED,
        payload: data
    })
}
export const productIsDeliverableChanged = (data) => {
    return({
        type: PRODUCT_IS_DELIVERABLE_CHANGED,
        payload: data
    })
}

export const productUpcChanged = (data) => {
    return({
        type: PRODUCT_UPC_CHANGED,
        payload: data
    })
}

export const productSkuChanged = (data) => {
    return({
        type: PRODUCT_SKU_CHANGED,
        payload: data
    })
}

export const productIsbnChanged = (data) => {
    return({
        type: PRODUCT_ISBN_CHANGED,
        payload: data
    })
}

export const productIsActiveChanged = (data) => {
    return({
        type: PRODUCT_IS_ACTIVE_CHANGED,
        payload: data
    })
}

export const getProducts = (data) => {
    return async(dispatch) => {
        dispatch({
            type: GET_PRODUCTS,
            payload: true
        })
        try{
            let limit = isUndefinedOrNull(data.limit) ? 20 : data.limit;
            let skip = isUndefinedOrNull(data.skip) ? 0 : data.skip;
            const res = await client.get(`/product?limit=${limit}&skip=${skip}`);
            dispatch({
                type: GET_PRODUCTS_SUCCESS,
                payload: res.data
            })
        }catch(e){
            dispatch({
                type: GET_PRODUCTS_FAILURE,
                payload: e.response.data
            })
        }
    }
}

export const getProduct = (data) => {
    return async(dispatch) => {
        dispatch({
            type: GET_PRODUCT,
            payload: true
        });
        try{
            const res = await client.get(`/product/${id}`);
            dispatch({
                type: GET_PRODUCT_SUCCESS,
                payload: res.data
            })
        }catch(e){
            dispatch({
                type: GET_PRODUCT_FAILURE,
                payload: e.response.data
            })
        }
    }
}

export const getProductBySlug = (data) => {
    return async(dispatch) => {
        dispatch({
            type: GET_PRODUCT,
            payload: true
        });
        try{
            const res = await client.get(`/product/slug/${data.slug}`);
            dispatch({
                type: GET_PRODUCT_SUCCESS,
                payload: res.data
            })
        }catch(e){
            dispatch({
                type: GET_PRODUCT_FAILURE,
                payload: e.response.data
            })
        }
    }
}

export const addProduct = (data) => {
    return async(dispatch) => {
        dispatch({
            type: ADD_PRODUCT,
            payload: true
        });
        try{
            let res = null;
            const validation = validateProduct(data);
            if(validation.errorExists){
                return dispatch({
                    type: ADD_PRODUCT_FAILURE,
                    payload: {
                        errorExists: validation.errorExists,
                        errors: validation.errors,
                        statusMessage: 'There were errors in your submission.'
                    }
                })
            }else if(data.isDigital){
                res = await client.post('/product/digital', data, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            }else{
                res = await client.post('/product', data);
            }
            dispatch({
                type: ADD_PRODUCT_SUCCESS,
                payload: res.data
            });
        }catch(e){
            dispatch({
                type: ADD_PRODUCT_FAILURE,
                payload: e.response.data
            })
        }
    }
}

export const updateProduct = (data) => {
    return async(dispatch) => {
        dispatch({
            type: UPDATE_PRODUCT,
            payload: true
        })
        try{
            const validation = validateProduct(data);
            let res = null;
            if(validation.errorExists){
                return dispatch({
                    type: UPDATE_PRODUCT_FAILURE,
                    payload: {
                        errorExists: validation.errorExists,
                        errors: validation.errors,
                        statusMessage: 'There are errors in your submission.'
                    }
                })
            }else if(data.isDigital){
                res = await client.put(`/product/${data.id}/digital`, data);
            }else{
                res = await client.put(`/product/${id}`, data);
            }
            dispatch({
                type: UPDATE_PRODUCT_SUCCESS,
                payload: res.data
            })
        }catch(e){
            dispatch({
                type: UPDATE_PRODUCT_FAILURE,
                payload: e.response.data
            });
        }
    }
}

export const deleteProduct = (data) => {
    return async(dispatch) => {
        dispatch({
            type: DELETE_PRODUCT,
            payload: true
        })
        try{
            const res = await client.delete(`/product/${data.id}`);
            dispatch({
                type: DELETE_PRODUCT_SUCCESS,
                payload: {
                    ...res.data,
                    id: data.id
                }
            })
        }catch(e){
            dispatch({
                type: DELETE_PRODUCT_FAILURE,
                payload: e.response.data
            });
        }
    }
}