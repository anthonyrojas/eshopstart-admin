import {
    ADD_CATEGORY,
    ADD_CATEGORY_FAILURE,
    ADD_CATEGORY_SUCCESS,
    DELETE_CATEGORY,
    DELETE_CATEGORY_FAILURE,
    DELETE_CATEGORY_SUCCESS,
    GET_CATEGORIES,
    GET_CATEGORIES_FAILURE,
    GET_CATEGORIES_SUCCESS,
    GET_CATEGORY,
    GET_CATEGORY_FAILURE,
    GET_CATEGORY_SUCCESS,
    UPDATE_CATEGORY,
    UPDATE_CATEGORY_FAILURE,
    UPDATE_CATEGORY_SUCCESS,
    CATEGORY_NAME_CHANGED, EDIT_CATEGORY, CANCEL_EDIT_CATEGORY
}
from '../Types';
import {
    EMPTY_STRING
} from '../constants';
const initialState = {
    categories: [],
    category: EMPTY_STRING,
    loadingGet: false,
    loadingDelete: false,
    loadingUpdate: false,
    loadingAdd: false,
    name: EMPTY_STRING,
    errors: {
        name: EMPTY_STRING
    },
    errorExists: false,
    statusMessage: EMPTY_STRING,
    editing: false
}

export default (state = initialState, action) => {
    switch(action.type){
        case CATEGORY_NAME_CHANGED:
            return{
                ...state,
                name: action.payload,
                errors: {
                    ...state.errors,
                    name: EMPTY_STRING
                }
            }
        case ADD_CATEGORY:
            return {
                ...state,
                loadingAdd: true,
                errorExists: false,
                statusMessage: EMPTY_STRING
            }
        case ADD_CATEGORY_FAILURE:
            return{
                ...state,
                loadingAdd: false,
                errors: {
                    name: action.payload.errors.name
                },
                errorExists: true,
                statusMessage: action.payload.statusMessage
            }
        case ADD_CATEGORY_SUCCESS:
            return{
                ...state,
                loadingAdd: false,
                errors: initialState.errors,
                name: EMPTY_STRING,
                errorExists: false,
                statusMessage: action.payload.statusMessage,
                categories: [...state.categories, action.payload.category]
            }
        case DELETE_CATEGORY:
            return{
                ...state,
                loadingDelete: true,
                errorExists: false,
                errors: initialState.errors,
                statusMessage: EMPTY_STRING
            }
        case DELETE_CATEGORY_FAILURE:
            return{
                ...state,
                loadingDelete: false,
                errorExists: true,
                errors: {
                    name: action.payload.errors.name
                },
                statusMessage: action.payload.statusMessage
            }
        case DELETE_CATEGORY_SUCCESS:
            return{
                ...state,
                loadingDelete: false,
                errorExists: false,
                errors: initialState.errors,
                categories: state.categories.filter(c => c.id !== action.payload.id),
                statusMessage: action.payload.statusMessage
            }
        case GET_CATEGORIES:
            return{
                ...state,
                errorExists: false,
                loadingGet: true,
                statusMessage: EMPTY_STRING
            }
        case GET_CATEGORIES_FAILURE:
            return{
                ...state,
                errorExists: true,
                loadingGet: false,
                categories: [],
                statusMessage: action.payload.statusMessage
            }
        case GET_CATEGORIES_SUCCESS:
            return{
                ...state,
                errorExists: false,
                loadingGet: false,
                categories: action.payload.categories,
                statusMessage: action.payload.statusMessage
            }
        case GET_CATEGORY:
            return{
                ...state,
                category: EMPTY_STRING,
                loadingGet: true,
                errorExists: false,
                statusMessage: EMPTY_STRING
            }
        case GET_CATEGORY_FAILURE:
            return{
                ...state,
                category: EMPTY_STRING,
                errorExists: true,
                loadingGet: false,
                statusMessage: action.payload.statusMessage
            }
        case GET_CATEGORY_SUCCESS:
            return{
                ...state,
                category: action.payload.category,
                errorExists: false,
                loadingGet: false,
                statusMessage: action.payload.statusMessage
            }
        case UPDATE_CATEGORY:
            return{
                ...state,
                loadingUpdate: true,
                errorExists: false,
                errors: initialState.errors,
                statusMessage: EMPTY_STRING
            }
        case UPDATE_CATEGORY_FAILURE:
            return{
                ...state,
                loadingUpdate: false,
                errorExists: true,
                errors: {
                    name: action.payload.errors.name
                },
                statusMessage: action.payload.statusMessage
            }
        case UPDATE_CATEGORY_SUCCESS:
            const i = state.categories.findIndex(c => c.id === action.payload.category.id);
            const uCategories = state.categories;
            uCategories[i] = action.payload.category
            return{
                ...state,
                loadingUpdate: false,
                errorExists: false,
                errors: initialState.errors,
                categories: uCategories,
                statusMessage: action.payload.statusMessage,
                name: EMPTY_STRING,
                editing: false,
                category: EMPTY_STRING
            }
        case EDIT_CATEGORY:
            return{
                ...state,
                editing: true,
                name: action.payload.name,
                category: action.payload
            }
        case CANCEL_EDIT_CATEGORY:
            return{
                ...state,
                editing: false,
                name: EMPTY_STRING,
                category: EMPTY_STRING
            }
        default: return state
    }
}