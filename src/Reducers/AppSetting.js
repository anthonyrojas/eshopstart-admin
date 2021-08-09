import {
    ADD_APP_SETTING,
    ADD_APP_SETTING_FAILURE,
    ADD_APP_SETTING_SUCCESS,
    UPDATE_APP_SETTING,
    UPDATE_APP_SETTING_FAILURE,
    UPDATE_APP_SETTING_SUCCESS,
    GET_APP_SETTINGS,
    GET_APP_SETTINGS_SUCCESS,
    GET_APP_SETTINGS_FAILURE,
    GET_APP_SETTING,
    GET_APP_SETTING_FAILURE,
    GET_APP_SETTING_SUCCESS,
    GET_APP_SETTING_CATEGORIES,
    GET_APP_SETTING_CATEGORIES_FAILURE,
    GET_APP_SETTING_CATEGORIES_SUCCESS,
    CHANGE_BUSINESS_ADDRESS_CITY,
    CHANGE_BUSINESS_ADDRESS_NAME,
    CHANGE_BUSINESS_ADDRESS_STATE,
    CHANGE_BUSINESS_ADDRESS_STREET,
    CHANGE_BUSINESS_ADDRESS_ZIP,
    CHANGE_BUSINESS_ADDRESS
} from '../Types/AppSetting';

const initialState = {
    getting: false,
    gettingAll: false,
    updating: false,
    adding: false,
    appSettingCategories: [],
    appSettings: [],
    appSetting: '',
    errorExists: false,
    statusMessage: '',
    businessAddress: {
        name: '',
        street: '',
        city: '',
        state: '',
        zip: ''
    }
}
export default (state=initialState, action) => {
    switch(action.type){
        case GET_APP_SETTING:
            return{
                ...state,
                errorExists: false,
                statusMessage: '',
                getting: true
            }
        case GET_APP_SETTING_SUCCESS:
            return{
                ...state,
                getting: false,
                appSetting: action.payload.appSetting,
                errorExists: false
            }
        case GET_APP_SETTING_FAILURE:
            return{
                ...state,
                getting: false,
                appSetting: '',
                statusMessage: action.payload.statusMessage,
                errorExists: true
            }
        case GET_APP_SETTINGS:
            return{
                ...state,
                gettingAll: true,
                errorExists: false,
                statusMessage: ''
            }
        case GET_APP_SETTINGS_SUCCESS:
            return{
                ...state,
                gettingAll: false,
                errorExists: false,
                appSettings: action.payload.appSettings
            }
        case GET_APP_SETTINGS_FAILURE:
            return{
                ...state,
                gettingAll: false,
                errorExists: true,
                statusMessage: action.payload.statusMessage
            }
        case GET_APP_SETTING_CATEGORIES:
            return{
                ...state,
                gettingAll: true,
                errorExists: false,
                statusMessage: ''
            }
        case GET_APP_SETTING_CATEGORIES_SUCCESS:
            return{
                ...state,
                gettingAll: false,
                errorExists: false,
                appSettingCategories: action.payload.categories
            }
        case GET_APP_SETTING_CATEGORIES_FAILURE:
            return{
                ...state,
                gettingAll: false,
                errorExists: true,
                statusMessage: action.payload.statusMessage
            }
        case ADD_APP_SETTING:
            return{
                ...state,
                adding: true,
                errorExists: false,
                statusMessage: initialState.statusMessage
            }
        case ADD_APP_SETTING_SUCCESS:
            return{
                ...state,
                adding: false,
                errorExists: false,
                statusMessage: initialState.statusMessage,
                appSettings: [...state.appSettings, action.payload.appSetting]
            }
        case ADD_APP_SETTING_FAILURE:
            return{
                ...state,
                adding: false,
                errorExists: true,
                statusMessage: action.payload.statusMessage
            }
        case UPDATE_APP_SETTING:
            return{
                ...state,
                updating: true,
                errorExists: false,
                statusMessage: initialState.statusMessage
            }
        case UPDATE_APP_SETTING_SUCCESS:
            const appSettingsCopy = state.appSettings;
            const i = appSettingsCopy.findIndex((appSetting) => appSetting.category === action.payload.appSetting.category);
            appSettingsCopy[i] = action.payload.appSetting;
            return{
                ...state,
                updating: false,
                errorExists: false,
                appSettings: [...appSettingsCopy]
            }
        case UPDATE_APP_SETTING_FAILURE:
            return{
                ...state,
                updating: false,
                errorExists: true,
                statusMessage: action.payload.statusMessage
            }
        case CHANGE_BUSINESS_ADDRESS_CITY:
            return{
                ...state,
                businessAddress: {
                    ...state.businessAddress,
                    city: action.payload
                }
            }
        case CHANGE_BUSINESS_ADDRESS_NAME:
            return{
                ...state,
                businessAddress: {
                    ...state.businessAddress,
                    name: action.payload
                }
            }
        case CHANGE_BUSINESS_ADDRESS_STATE:
            return{
                ...state,
                businessAddress: {
                    ...state.businessAddress,
                    state: action.payload
                }
            }
        case CHANGE_BUSINESS_ADDRESS_STREET:
            return{
                ...state,
                businessAddress: {
                    ...state.businessAddress,
                    street: action.payload
                }
            }
        case CHANGE_BUSINESS_ADDRESS_ZIP:
            return{
                ...state,
                businessAddress: {
                    ...state.businessAddress,
                    zip: action.payload
                }
            }
        case CHANGE_BUSINESS_ADDRESS:
            return{
                ...state,
                businessAddress: {
                    ...action.payload
                }
            }
        default: return state;
    }
}