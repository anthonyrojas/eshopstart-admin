import { EMPTY_STRING } from '../constants';
import { isUndefinedOrNullOrEmpty } from '../helpers';
import {
    LOGIN_EMAIL_CHANGED,
    LOGIN_PASSWORD_CHANGED,
    LOGIN_SUBMIT,
    LOGIN_SUBMIT_FAILED,
    LOGIN_SUBMIT_SUCCESS,
    LOGOUT,
    REFRESH_LOGIN,
    REFRESH_LOGIN_FAILURE,
    REFRESH_LOGIN_SUCCESS,
    GET_ACCOUNT,
    GET_ACCOUNT_FAILURE,
    GET_ACCOUNT_SUCCESS
} from '../Types';

const intitialState = {
    authenticated: !isUndefinedOrNullOrEmpty(localStorage.getItem('accessToken')),
    accessToken: localStorage.getItem('accessToken') || EMPTY_STRING,
    refreshToken: localStorage.getItem('refreshToken') || EMPTY_STRING,
    expiresAt: localStorage.getItem('expiresAt') || 0,
    refreshBy: localStorage.getItem('refreshBy') || 0,
    email: EMPTY_STRING,
    password: EMPTY_STRING,
    loading: false,
    refreshing: false,
    errorExists: false,
    statusMessage: EMPTY_STRING,
    accountErrorExists: false,
    fetchingAccount: false,
    account: '',
    errors: {
        email: EMPTY_STRING,
        password: EMPTY_STRING
    }
}
export default (state = intitialState, action) => {
    switch (action.type) {
        case LOGIN_EMAIL_CHANGED:
            return {
                ...state,
                email: action.payload
            }
        case LOGIN_PASSWORD_CHANGED:
            return {
                ...state,
                password: action.payload
            }
        case LOGIN_SUBMIT:
            return {
                ...state,
                loading: true,
                errorExists: false,
                statusMessage: EMPTY_STRING,
                errors: intitialState.errors
            }
        case LOGIN_SUBMIT_FAILED:
            return {
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
            return {
                ...state,
                loading: false,
                errorExists: false,
                statusMessage: action.payload.statusMessage,
                errors: intitialState.errors,
                authenticated: true,
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken,
                expiresAt: action.payload.expiresAt,
                refreshBy: action.payload.refreshBy,
                email: EMPTY_STRING,
                password: EMPTY_STRING
            }
        case LOGOUT:
            return {
                ...state,
                authenticated: false,
                email: EMPTY_STRING,
                password: EMPTY_STRING
            }
        case REFRESH_LOGIN:
            return {
                ...state,
                refreshing: true
            }
        case REFRESH_LOGIN_FAILURE:
            return {
                ...state,
                refreshing: false,
                statusMessage: action.payload.statusMessage,
                authenticated: false,
                refreshToken: EMPTY_STRING,
                accessToken: EMPTY_STRING,
                refreshBy: EMPTY_STRING,
                expiresAt: EMPTY_STRING
            }
        case REFRESH_LOGIN_SUCCESS:
            return {
                ...state,
                authenticated: true,
                expiresAt: action.payload.expiresAt,
                refreshBy: action.payload.refreshBy,
                refreshToken: action.payload.refreshToken,
                accessToken: action.payload.accessToken
            }
        case GET_ACCOUNT:
            return{
                ...state,
                accountErrorExists: false,
                fetchingAccount: true
            }
        case GET_ACCOUNT_SUCCESS:
            return{
                ...state,
                accountErrorExists: false,
                fetchingAccount: false,
                account: action.payload.user
            }
        case GET_ACCOUNT_FAILURE:
            return{
                ...state,
                accountErrorExists: true,
                fetchingAccount: false
            }
        default: return state
    }
}