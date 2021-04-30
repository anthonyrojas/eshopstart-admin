import {
    GET_USERS,
    GET_USERS_FAILURE,
    GET_USERS_SUCCESS,
    GET_USER,
    GET_USER_FAILURE,
    GET_USER_SUCCESS,
    USER_BIRTH_DATE_CHANGED,
    USER_EMAIL_CHANGED,
    USER_FIRST_NAME_CHANGED,
    USER_LAST_NAME_CHANGED,
    USER_MIDDLE_INITIAL_CHANGED,
    USER_PASSWORD_CHANGED,
    USER_ROLE_CHANGED,
    ADD_USER,
    ADD_USER_FAILURE,
    ADD_USER_SUCCESS,
    EDIT_USER_CHANGED,
    RESET_USER_STATUS_MESSAGE
} from '../Types/Users';
const initialState = {
    users: [],
    loadingUsers: false,
    errorExistsGetUsers: false,
    statusMessage: '',
    usersCount: 0,
    limit: 25,
    skip: 0,
    loadingUser: false,
    savingUser: false,
    errorExistsGetUser: false,
    errorExistsAddUser: false,
    errorExistsUpdateUser: false,
    user: '',
    birthdate: null,
    email: '',
    firstName: '',
    lastName: '',
    middleInitial: '',
    password: '',
    role: '',
    roles: ['SuperAdmin', 'Admin', 'Customer'],
    editing: false,
    errors: {
        birthdate: '',
        email: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: ''
    }
}

export default (state=initialState, action) => {
    switch(action.type){
        case GET_USERS:
            return{
                ...state,
                loadingUsers: true,
                errorExistsGetUsers: false,
                limit: action.payload.limit,
                skip: action.payload.skip
            }
        case GET_USERS_SUCCESS:
            return{
                ...state,
                users: action.payload.users,
                usersCount: action.payload.total,
                errorExistsGetUsers: false,
                loadingUsers: false
            }
        case GET_USERS_FAILURE:
            return{
                ...state,
                users: [],
                errorExistsGetUsers: true,
                statusMessage: action.payload.statusMessage
            }
        case GET_USER:
            return{
                ...state,
                user: '',
                loadingUser: true,
                errorExistsGetUser: false
            }
        case GET_USER_SUCCESS:
            return{
                ...state,
                user: action.payload.user,
                loadingUser: false
            }
        case GET_USER_FAILURE:
            return{
                ...state,
                loadingUser: false,
                errorExistsGetUser: true,
                statusMessage: action.payload.statusMessage || 'Unable to load user.'
            }
        case USER_BIRTH_DATE_CHANGED:
            return{
                ...state,
                birthdate: action.payload
            }
        case USER_FIRST_NAME_CHANGED:
            return{
                ...state,
                firstName: action.payload
            }
        case USER_LAST_NAME_CHANGED:
            return{
                ...state,
                lastName: action.payload
            }
        case USER_EMAIL_CHANGED:
            return{
                ...state,
                email: action.payload
            }
        case USER_ROLE_CHANGED:
            return{
                ...state,
                role: action.payload
            }
        case USER_PASSWORD_CHANGED:
            return{
                ...state,
                password: action.payload
            }
        case USER_MIDDLE_INITIAL_CHANGED:
            return{
                ...state,
                middleInitial: action.payload
            }
        case ADD_USER:
            return{
                ...state,
                savingUser: true,
                editing: false,
                statusMessage: '',
                errorExistsAddUser: false,
                errors: {
                    ...initialState.errors
                }
            }
        case ADD_USER_SUCCESS:
            return{
                ...state,
                savingUser: false,
                users: [action.payload.user, ...state.users],
                birthdate: null,
                email: '',
                firstName: '',
                lastName: '',
                middleInitial: '',
                password: '',
                role: '',
                errors: {
                    ...initialState.errors
                },
                statusMessage: action.payload.statusMessage
            }
        case ADD_USER_FAILURE:
            return{
                ...state,
                savingUser: false,
                errorExistsAddUser: true,
                statusMessage: action.payload.statusMessage,
                errors: {
                    ...state.errors,
                    ...action.payload.errors
                }
            }
        case RESET_USER_STATUS_MESSAGE:
            return{
                ...state,
                statusMessage: ''
            }
        default: return state;
    }
}