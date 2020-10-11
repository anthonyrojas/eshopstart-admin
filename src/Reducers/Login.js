import { EMPTY_STRING } from '../constants';
import {
    LOGIN_EMAIL_CHANGED,
    LOGIN_PASSWORD_CHANGED,
    LOGIN_SUBMIT,
    LOGIN_SUBMIT_FAILED,
    LOGIN_SUBMIT_SUCCESS
} from '../Types';

const intitialState = {
    authenticated: localStorage.getItem('accessToken') || false,
    accessToken: localStorage.getItem('accessToken') || EMPTY_STRING,
    refreshToken: localStorage.getItem('refreshToken') || EMPTY_STRING,
    email: EMPTY_STRING,
    password: EMPTY_STRING,
    loading: false,
    errorExists: false,
    statusMessage: EMPTY_STRING,
    errors: {
        email: EMPTY_STRING,
        password: EMPTY_STRING
    }
}
export default (state=intitialState, action) => {
    switch(action.type){
        case LOGIN_EMAIL_CHANGED:
            return{
                ...state,
                email: action.payload
            }
        case LOGIN_PASSWORD_CHANGED:
            return{
                ...state,
                password: action.payload
            }
        case LOGIN_SUBMIT:
            return{
                ...state,
                loading: true,
                errorExists: false,
                statusMessage: EMPTY_STRING,
                errors: intitialState.errors
            }
        case LOGIN_SUBMIT_FAILED:
            return{
                ...state,
                loading: false,
                errorExists: true,
                statusMessage: action.payload.statusMessage,
                errors: {
                    email: action.payload.errors.email || EMPTY_STRING,
                    password: action.payload.errors.password || EMPTY_STRING
                },
                authenticated: false
            }
        case LOGIN_SUBMIT_SUCCESS:
            return{
                ...state,
                loading: false,
                errorExists: false,
                statusMessage: action.payload.statusMessage,
                errors: intitialState.errors,
                authenticated: true,
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken
            }
        default: return state
    }
}