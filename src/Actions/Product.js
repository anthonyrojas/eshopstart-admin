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
    PRODUCT_WIDTH_CHANGED,
    EDIT_PRODUCT,
    CANCEL_EDIT_PRODUCT,
    PRODUCT_FILE_CHANGED,
    PRODUCT_RESET_STATUS_MESSAGE
} from '../Types/Product';
import client from '../axiosClient';
import {
    isUndefinedOrNull,
    isUndefinedOrNullOrEmpty,
    validateProduct
} from '../helpers';
import {
    uploadProductImage
} from './ProductImage'

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
            payload: data
        })
        try{
            let limit = isUndefinedOrNull(data.limit) ? 20 : data.limit;
            let skip = isUndefinedOrNull(data.skip) ? 0 : data.skip;
            let orderBy = isUndefinedOrNull(data.orderBy) ? '' : `&orderBy=${data.orderBy}`;
            let sort = isUndefinedOrNull(data.sort) ? '' : `&sort=${data.sort}`
            const res = await client.get(`/product?limit=${limit}&skip=${skip}${orderBy}${sort}`);
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
            const res = await client.get(`/product/id/${data.id}`);
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

export const addProduct = (d) => {
    return async(dispatch) => {
        dispatch({
            type: ADD_PRODUCT,
            payload: true
        });
        try{
            let data = d.product;
            let productImage = d.productImage;
            let res = null;
            const validation = await validateProduct(data);
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
                const formData = new FormData();
                formData.append('name', data.name);
                formData.append('description', data.description);
                formData.append('price', data.price);
                formData.append('isDeliverable', data.isDigital ? false : data.isDeliverable);
                formData.append('isDigital', data.isDigital);
                formData.append('downloadsPermitted', data.downloadsPermitted);
                formData.append('weight', 0);
                formData.append('height', 0);
                formData.append('length', 0);
                formData.append('width', 0);
                formData.append('upc', data.upc);
                formData.append('sku', data.sku);
                formData.append('isbn', data.isbn);
                formData.append('isActive', data.isActive);
                formData.append('productFile', data.file);
                res = await client.post('/product/digital', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            }else{
                data.isDeliverable = !data.isDigital;
                res = await client.post('/product', data);
            }
            if(!isUndefinedOrNull(productImage) && productImage !== ''){
                dispatch(uploadProductImage({
                    productId: res.data.product.id,
                    productImage: productImage
                }))
            }
            dispatch({
                type: ADD_PRODUCT_SUCCESS,
                payload: res.data
            });
        }catch(e){
            console.error(e);
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
                data.isDeliverable = !data.isDigital;
                res = await client.put(`/product/${data.id}`, data);
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

export const editProduct = (data) => {
    return({
        type: EDIT_PRODUCT,
        payload: data
    })
}

export const cancelEditProduct = (data) => {
    return({
        type: CANCEL_EDIT_PRODUCT,
        payload: data
    });
}

export const productFileChanged = (data) => {
    return({
        type: PRODUCT_FILE_CHANGED,
        payload: data
    });
}

export const resetStatusMessage = (data) =>{
    return({
        type: PRODUCT_RESET_STATUS_MESSAGE,
        payload: data
    })
}