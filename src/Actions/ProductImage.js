import {
    PRODUCT_IMAGE_CHANGED,
    PRODUCT_IMAGE_LABEL_CHANGED,
    PRODUCT_IMAGE_UPLOAD,
    PRODUCT_IMAGE_UPLOAD_FAILURE,
    PRODUCT_IMAGE_UPLOAD_SUCCESS,
    PRODUCT_IMAGE_EDIT_SINGLE,
    PRODUCT_IMAGE_UPDATE_SINGLE,
    PRODUCT_IMAGE_UPDATE_SINGLE_FAILURE,
    PRODUCT_IMAGE_UPDATE_SINGLE_SUCCESS,
    PRODUCT_IMAGE_ORDER_UPDATE,
    PRODUCT_IMAGE_ORDER_UPDATE_SUCCESS,
    PRODUCT_IMAGE_ORDER_UPDATE_FAILURE,
    PRODUCT_IMAGE_RESET_STATUS_MESSAGE
} from '../Types';
import client from '../axiosClient';

export const productImageChanged = (data) => {
    return({
        type: PRODUCT_IMAGE_CHANGED,
        payload: data
    })
}

export const productImageEditSingle = (data) => {
    return({
        type: PRODUCT_IMAGE_EDIT_SINGLE,
        payload: data
    })
}

export const productImageLabelChanged = (data) => {
    return({
        type: PRODUCT_IMAGE_LABEL_CHANGED,
        payload: data
    })
}

export const uploadProductImage = (data) => {
    return async(dispatch)=>{
        dispatch({
            type: PRODUCT_IMAGE_UPLOAD,
            payload: data
        })
        try{
            const formData = new FormData();
            formData.append('productId', data.productId);
            formData.append('label', data.label)
            formData.append('productImage', data.productImage);
            const res = await client.post(`/product-image/${data.productId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            dispatch({
                type: PRODUCT_IMAGE_UPLOAD_SUCCESS,
                payload: res.data
            })
        }catch(e){
            dispatch({
                type: PRODUCT_IMAGE_UPLOAD_FAILURE,
                payload: e.response.data
            })
        }
    }
}

export const updateSingleProductImage = (data) => {
    return async(dispatch) => {
        dispatch({
            type: PRODUCT_IMAGE_UPDATE_SINGLE,
            payload: data
        });
        try{
            const res = await client.put(`/product-image/${data.id}`, data);
            dispatch({
                type: PRODUCT_IMAGE_UPDATE_SINGLE_SUCCESS,
                payload: res.data
            })
        }catch(e){
            dispatch({
                type: PRODUCT_IMAGE_UPDATE_SINGLE_FAILURE,
                payload: e.reponse.data
            })
        }
    }
}

export const updateProductImages = (data) => {
    return async(dispatch) => {
        dispatch({
            type: PRODUCT_IMAGE_ORDER_UPDATE,
            payload: data
        });
        try{
            data.productImages.forEach((productImage, i)=> {
                productImage.order = i;
            });
            const res = await client.put(`/product-image/images/${data.id}`, data);
            dispatch({
                type: PRODUCT_IMAGE_ORDER_UPDATE_SUCCESS,
                payload: res.data
            })
        }catch(e){
            dispatch({
                type: PRODUCT_IMAGE_ORDER_UPDATE_FAILURE,
                payload: e.reponse.data
            })
        }
    }
}

export const resetProductImageStatusMessage = (data) => {
    return({
        type: PRODUCT_IMAGE_RESET_STATUS_MESSAGE,
        payload: data
    })
}