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
import {
    EMPTY_STRING
} from '../constants';

const initialState = {
    id: -1,
    name: EMPTY_STRING,
    description: EMPTY_STRING,
    price: 0.00,
    isDeliverable: false,
    isDigital: false,
    downloadsPermitted: 0,
    weight: 0.00,
    height: 0.0,
    length: 0.0,
    width: 0.0,
    upc: EMPTY_STRING,
    sku: EMPTY_STRING,
    isbn: EMPTY_STRING,
    isActive: false,
    filename: EMPTY_STRING,
    file: EMPTY_STRING,
    statusMessage: EMPTY_STRING,
    errorExists: true,
    errors: {
        name: EMPTY_STRING,
        description: EMPTY_STRING,
        price: EMPTY_STRING,
        isDeliverable: EMPTY_STRING,
        isDigital: EMPTY_STRING,
        downloadsPermitted: EMPTY_STRING,
        weight: EMPTY_STRING,
        height: EMPTY_STRING,
        length: EMPTY_STRING,
        width: EMPTY_STRING,
        upc: EMPTY_STRING,
        sku: EMPTY_STRING,
        isbn: EMPTY_STRING,
        isActive: EMPTY_STRING
    },
    loadingGet: false,
    loadingUpdate: false,
    loadingAdd: false,
    loadingDelete: false,
    products: [],
    rowCount: 0,
    limit: 25,
    skip: 0,
    orderBy: 'id',
    sort: 'asc',
    product: EMPTY_STRING,
    editing: false
}
export default (state=initialState, action) => {
    switch(action.type){
        case PRODUCT_NAME_CHANGED:
            return{
                ...state,
                name: action.payload
            }
        case PRODUCT_DESCRIPTION_CHANGED:
            return{
                ...state,
                description: action.payload
            }
        case PRODUCT_PRICE_CHANGED:
            return{
                ...state,
                price: action.payload
            }
        case PRODUCT_HEIGHT_CHANGED:
            return{
                ...state,
                height: action.payload
            }
        case PRODUCT_WEIGHT_CHANGED:
            return{
                ...state,
                weight: action.payload
            }
        case PRODUCT_WIDTH_CHANGED:
            return{
                ...state,
                width: action.payload
            }
        case PRODUCT_LENGTH_CHANGED:
            return{
                ...state,
                length: action.payload
            }
        case PRODUCT_IS_DIGITAL_CHANGED:
            return{
                ...state,
                isDigital: action.payload
            }
        case PRODUCT_IS_DELIVERABLE_CHANGED:
            return{
                ...state,
                isDeliverable: action.payload
            }
        case PRODUCT_DOWNLOADS_PERMITTED_CHANGED:
            return{
                ...state,
                downloadsPermitted: action.payload
            }
        case PRODUCT_UPC_CHANGED:
            return{
                ...state,
                upc: action.payload
            }
        case PRODUCT_SKU_CHANGED:
            return{
                ...state,
                sku: action.payload
            }
        case PRODUCT_ISBN_CHANGED:
            return{
                ...state,
                isbn: action.payload
            }
        case PRODUCT_IS_ACTIVE_CHANGED:
            return{
                ...state,
                isActive: action.payload
            }
        case GET_PRODUCT:
            return{
                ...state,
                loadingGet: true,
                errorExists: false,
                product: initialState.product
            }
        case GET_PRODUCT_SUCCESS:
            return{
                ...state,
                product: action.payload.product,
                statusMessage: action.payload.statusMessage,
                errorExists: false,
                loadingGet: false
            }
        case GET_PRODUCT_FAILURE:
            return{
                ...state,
                errorExists: true,
                statusMessage: action.payload.statusMessage,
                loadingGet: false
            }
        case GET_PRODUCTS:
            return{
                ...state,
                errorExists: false,
                loadingGet: true,
                statusMessage: EMPTY_STRING,
                orderBy: action.payload.orderBy,
                sort: action.payload.sort,
                limit: action.payload.limit,
                skip: action.payload.skip
            }
        case GET_PRODUCTS_SUCCESS:
            return{
                ...state,
                erorrExists: false,
                statusMessage: '',
                products: action.payload.products,
                loadingGet: false,
                rowCount: action.payload.total,
                limit: action.payload.limit,
                skip: action.payload.skip                
            }
        case GET_PRODUCTS_FAILURE:
            return{
                ...state,
                errorExists: true,
                statusMessage: action.payload.statusMessage,
                products: [],
                loadingGet: false
            }
        case ADD_PRODUCT:
            return{
                ...state,
                errorExists: false,
                statusMessage: EMPTY_STRING,
                loadingAdd: true,
                errors: {
                    ...initialState.errors
                }
            }
        case ADD_PRODUCT_SUCCESS:
            return{
                ...state,
                errorExists: false,
                statusMessage: action.payload.statusMessage,
                product: action.payload.product,
                id: -1,
                name: EMPTY_STRING,
                description: EMPTY_STRING,
                price: 0.00,
                isDeliverable: false,
                isDigital: false,
                downloadsPermitted: 0,
                weight: 0.00,
                height: 0.0,
                length: 0.0,
                width: 0.0,
                upc: EMPTY_STRING,
                sku: EMPTY_STRING,
                isbn: EMPTY_STRING,
                isActive: false,
                loadingAdd: false,
                file: EMPTY_STRING
            }
        case ADD_PRODUCT_FAILURE:
            return{
                ...state,
                errors: {
                    ...state.errors,
                    ...action.payload.errors
                },
                statusMessage: action.payload.statusMessage,
                errorExists: true,
                loadingAdd: false
            }
        case UPDATE_PRODUCT:
            return{
                ...state,
                errors: {
                    ...initialState.errors
                },
                statusMessage: EMPTY_STRING,
                errorExists: false,
                loadingUpdate: true
            }
        case UPDATE_PRODUCT_FAILURE:
            return{
                ...state,
                errors: {
                    ...initialState.errors,
                    ...action.payload.errors
                },
                statusMessage: action.payload.statusMessage,
                errorExists: true,
                loadingUpdate: false
            }
        case UPDATE_PRODUCT_SUCCESS:
            const i = state.products.findIndex(p => p.id === action.payload.product.id);
            state.products[i] = action.payload.product;
            return{
                ...state,
                errors: {
                    ...initialState.errors
                },
                loadingUpdate: false,
                products: state.products,
                product: action.payload.product,
                statusMessage: action.payload.statusMessage,
                id: -1,
                name: EMPTY_STRING,
                description: EMPTY_STRING,
                price: 0.00,
                isDeliverable: false,
                isDigital: false,
                downloadsPermitted: 0,
                weight: 0.00,
                height: 0.0,
                length: 0.0,
                width: 0.0,
                upc: EMPTY_STRING,
                sku: EMPTY_STRING,
                isbn: EMPTY_STRING,
                isActive: false,
                editing: false,
                file: EMPTY_STRING
            }
        case DELETE_PRODUCT:
            return{
                ...state,
                loadingDelete: true,
                statusMessage: EMPTY_STRING,
                errorExists: false
            }
        case DELETE_PRODUCT_SUCCESS:
            return{
                ...state,
                loadingDelete: false,
                statusMessage: action.payload.statusMessage,
                products: state.products.filter(p => p.id !== action.payload.id)
            }
        case DELETE_PRODUCT_FAILURE:
            return{
                ...state,
                loadingDelete: false,
                statusMessage: action.payload.statusMessage,
                errorExists: true
            }
        case EDIT_PRODUCT:
            return{
                ...state,
                editing: true
            }
        case CANCEL_EDIT_PRODUCT:
            return{
                ...state,
                editing: false
            }
        case PRODUCT_FILE_CHANGED:
            return{
                ...state,
                filename: action.payload.filename,
                file: action.payload.file
            }
        case PRODUCT_RESET_STATUS_MESSAGE:
            return{
                ...state,
                statusMessage: EMPTY_STRING
            }
        default: return state;
    }
}