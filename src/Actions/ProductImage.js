import {
    PRODUCT_IMAGE_CHANGED,
    PRODUCT_IMAGE_UPLOAD,
    PRODUCT_IMAGE_UPLOAD_FAILURE,
    PRODUCT_IMAGE_UPLOAD_SUCCESS
} from '../Types';
import client from '../axiosClient';

export const productImageChanged = (data) => {
    return({
        type: PRODUCT_IMAGE_CHANGED,
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