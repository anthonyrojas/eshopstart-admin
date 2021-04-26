import {
    GET_USERS,
    GET_USERS_FAILURE,
    GET_USERS_SUCCESS,
    GET_USER,
    GET_USER_FAILURE,
    GET_USER_SUCCESS
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
    errorExistsGetUser: false,
    user: ''
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
        default: return state;
    }
}