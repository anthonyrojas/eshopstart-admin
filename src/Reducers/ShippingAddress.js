import {
    GET_USER_SHIPPING_ADDRESSES,
    GET_USER_SHIPPING_ADDRESSES_FAILURE,
    GET_USER_SHIPPING_ADDRESSES_SUCCESS
} from '../Types/ShippingAddress';

const initialState = {
    loadingUserAddresses: false,
    shippingAddresses: [],
    errorExists: false,
    statusMessage: ''
}
export default (state=initialState, action) => {
    switch(action.type){
        case GET_USER_SHIPPING_ADDRESSES:
            return{
                ...state,
                loadingUserAddresses: true,
                errorExists: false,
                statusMessage: ''
            }
        case GET_USER_SHIPPING_ADDRESSES_SUCCESS:
            return{
                ...state,
                loadingUserAddresses: false,
                errorExists: false,
                shippingAddresses: action.payload.addresses || []
            }
        case GET_USER_SHIPPING_ADDRESSES_FAILURE:
            return{
                ...state,
                errorExists: true,
                statusMessage: action.payload.statusMessage,
                shippingAddresses: initialState.shippingAddresses,
                loadingUserAddresses: false
            }
        default: return state;
    }
}