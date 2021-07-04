import { EMPTY_STRING } from '../constants';
import {
    GET_ORDER,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAILURE,
    GET_ORDERS,
    GET_ORDERS_FAILURE,
    GET_ORDERS_SUCCESS,
    ORDER_RESET_STATUS_MESSAGE
} from '../Types/Order';
const initialState = {
    loadingOrders: false,
    loadingOrder: false,
    statusMessage: '',
    orderId: -1,
    userId: -1,
    orders: [],
    order: '',
    errorExists: false,
    limit: 100,
    skip: 0,
    orderBy: 'id',
    sort: 'desc',
    rowCount: 0
};
export default (state=initialState, action) => {
    switch(action.type){
        case GET_ORDERS:
            return{
                ...state,
                errorExists: false,
                loadingOrders: true,
                userId: action.payload.userId,
                statusMessage: EMPTY_STRING,
                orderBy: action.payload.orderBy,
                sort: action.payload.sort,
                limit: action.payload.limit,
                skip: action.payload.skip
            }
        case GET_ORDERS_SUCCESS:
            return{
                ...state,
                orders: action.payload.orders,
                loadingOrders: false,
                errorExists: false,
                statusMessage: action.payload.statusMessage,
                rowCount: action.payload.total
            }
        case GET_ORDERS_FAILURE:
            return{
                ...state,
                loadingOrders: false,
                errorExists: true,
                statusMessage: action.payload.statusMessage
            }
        case GET_ORDER: 
            return{
                ...state,
                loadingOrder: true,
                errorExists: false,
                orderId: action.payload.orderId
            }
        case GET_ORDER_SUCCESS:
            return{
                ...state,
                loadingOrder: false,
                errorExists: false,
                order: action.payload.order
            }
        case GET_ORDER_FAILURE:
            return{
                ...state,
                loadingOrder: false,
                order: initialState.order,
                errorExists: true,
                statusMessage: action.payload.statusMessage
            }
        default: return state;
    }
}