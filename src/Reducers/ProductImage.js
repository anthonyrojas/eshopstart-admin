import {
    GET_PRODUCT,
    PRODUCT_IMAGE_CHANGED,
    PRODUCT_IMAGE_UPLOAD,
    PRODUCT_IMAGE_UPLOAD_FAILURE,
    PRODUCT_IMAGE_UPLOAD_SUCCESS,
    PRODUCT_IMAGE_LABEL_CHANGED,
    PRODUCT_IMAGE_SINGLE_CHANGED,
    PRODUCT_IMAGE_UPDATE_SINGLE,
    PRODUCT_IMAGE_UPDATE_SINGLE_FAILURE,
    PRODUCT_IMAGE_UPDATE_SINGLE_SUCCESS,
    PRODUCT_IMAGE_UPDATE,
    PRODUCT_IMAGE_EDIT_SINGLE,
    PRODUCT_IMAGE_ORDER_UPDATE,
    PRODUCT_IMAGE_ORDER_UPDATE_FAILURE,
    PRODUCT_IMAGE_ORDER_UPDATE_SUCCESS,
    PRODUCT_IMAGE_RESET_STATUS_MESSAGE
} from '../Types';

const initialState = {
    productId: -1,
    productImage: '',
    productImageObj: '',
    productImages: [],
    label: '',
    uploadingImage: false,
    statusMessage: '',
    updating: false,
    orderUpdating: false,
    errorExists: false,
    errorUpdating: false,
    errorOrderUpdating: false
}

export default (state=initialState, action) => {
    switch(action.type){
        case GET_PRODUCT:
            return{
                ...state,
                statusMessage: ''
            }
        case PRODUCT_IMAGE_CHANGED:
            return{
                ...state,
                productImage: action.payload.productImage,
            }
        case PRODUCT_IMAGE_EDIT_SINGLE:
            return{
                ...state,
                productImageObj: action.payload
            }
        case PRODUCT_IMAGE_LABEL_CHANGED:
            return{
                ...state,
                label: action.payload
            }
        case PRODUCT_IMAGE_UPLOAD:
            return{
                ...state,
                statusMessage: '',
                uploadingImage: true,
                errorExists: false
            }
        case PRODUCT_IMAGE_UPLOAD_SUCCESS:
            return{
                ...initialState,
                statusMessage: 'Product image uploaded.',
            }
        case PRODUCT_IMAGE_UPLOAD_FAILURE:
            return{
                ...state,
                uploadingImage: false,
                errorExists: true,
                statusMessage: 'Unable to upload product image.'
            }
        case PRODUCT_IMAGE_UPDATE_SINGLE:
            return{
                ...state,
                updating: true,
                errorUpdating: false
            }
        case PRODUCT_IMAGE_UPDATE_SINGLE_FAILURE:
            return{
                ...state,
                updating: false,
                statusMessage: action.payload.statusMessage,
                errorUpdating: true
            }
        case PRODUCT_IMAGE_UPDATE_SINGLE_SUCCESS:
            return{
                ...state,
                updating: false,
                statusMessage: action.payload.statusMessage,
                errorUpdating: false
            }
        case PRODUCT_IMAGE_ORDER_UPDATE:
            return{
                ...state,
                orderUpdating: true,
                productImages: action.payload.productImages,
                statusMessage: '',
                errorOrderUpdating: false
            }
        case PRODUCT_IMAGE_ORDER_UPDATE_SUCCESS:
            return{
                ...state,
                orderUpdating: false,
                errorOrderUpdating: false,
                statusMessage: action.payload.statusMessage
            }
        case PRODUCT_IMAGE_ORDER_UPDATE_FAILURE:
            return{
                ...state,
                orderUpdating: false,
                errorOrderUpdating: true,
                statusMessage: 'Failed to update product images.'
            }
        case PRODUCT_IMAGE_RESET_STATUS_MESSAGE:
            return{
                ...state,
                statusMessage: action.payload
            }
        default: return state
    }
}