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
const initialState = {
    loadingInventory: false,
    errorExists: false,
    statusMessage: '',
    productInventory: '',
    inventoryAmount: 0,
    productId: 0,
    editing: false
}

export default(state=initialState, action) => {
    switch(action.type){
        case TOGGLE_EDIT_PRODUCT_INVENTORY:
            return{
                ...state,
                editing: !state.editing,
                inventoryAmount: action.payload
            }
        case PRODUCT_INVENTORY_AMOUNT_CHANGED:
            return{
                ...state,
                inventoryAmount: action.payload,
            }
        case GET_PRODUCT_INVENTORY:
            return{
                ...state,
                loadingInventory: true,
                errorExists: false,
                statusMessage: '',
                productId: action.payload.productId
            }
        case GET_PRODUCT_INVENTORY_SUCCESS:
            return{
                ...state,
                loadingInventory: false,
                errorExists: false,
                statusMessage: '',
                productInventory: action.payload.inventory,
            }
        case GET_PRODUCT_INVENTORY_FAILURE:
            return{
                ...state,
                loadingInventory: false,
                errorExists: true,
                statusMessage: action.payload.statusMessage
            }
        case ADD_PRODUCT_INVENTORY:
            return{
                ...state,
                loadingInventory: true,
                errorExists: false,
                statusMessage: '',
                productId: action.payload.productId,
                inventoryAmount: action.payload.inventoryAmount
            }
        case ADD_PRODUCT_INVENTORY_SUCCESS:
            return{
                ...state,
                loadingInventory: false,
                errorExists: false,
                statusMessage: action.payload.statusMessage,
                productInventory: action.payload.inventory,
                inventoryAmount: 0,
                productId: 0
            }
        case ADD_PRODUCT_INVENTORY_FAILURE:
            return{
                ...state,
                loadingInventory: false,
                errorExists: true,
                statusMessage: action.payload.statusMessage
            }
        case UPDATE_PRODUCT_INVENTORY:
            return{
                ...state,
                loadingInventory: true,
                errorExists: false,
                statusMessage: '',
                productId: action.payload.productId,
                inventoryAmount: action.payload.inventory
            }
        case UPDATE_PRODUCT_INVENTORY_SUCCESS:
            return{
                ...state,
                loadingInventory: false,
                errorExists: false,
                statusMessage: action.payload.statusMessage,
                productId: 0,
                inventoryAmount: 0,
                productInventory: action.payload.inventory,
                editing: false
            }
        case UPDATE_PRODUCT_INVENTORY_FAILURE:
            return{
                ...state,
                loadingInventory: false,
                errorExists: true,
                statusMessage: action.payload.statusMessage
            }
        default: return state;
    }
}