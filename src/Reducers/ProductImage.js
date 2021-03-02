import {
    PRODUCT_IMAGE_CHANGED,
    PRODUCT_IMAGE_UPLOAD,
    PRODUCT_IMAGE_UPLOAD_FAILURE,
    PRODUCT_IMAGE_UPLOAD_SUCCESS
} from '../Types';

const initialState = {
    productId: -1,
    productImage: '',
    uploadingImage: false,
    statusMessage: '',
    errorExists: false 
}

export default (state=initialState, action) => {
    switch(action.type){
        case PRODUCT_IMAGE_CHANGED:
            return{
                ...state,
                productImage: action.payload.productImage,
            }
        case PRODUCT_IMAGE_UPLOAD:
            return{
                ...state,
                uploadingImage: true,
                errorExists: false
            }
        case PRODUCT_IMAGE_UPLOAD_SUCCESS:
            return{
                ...initialState,
                statusMessage: 'Product image saved.'
            }
        case PRODUCT_IMAGE_UPLOAD_FAILURE:
            return{
                ...state,
                uploadingImage: false,
                errorExists: true,
                statusMessage: 'Unable to upload product image.'
            }
        default: return state
    }
}