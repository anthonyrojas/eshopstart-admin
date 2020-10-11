import {combineReducers} from 'redux';
import Category from './Category';
import Login from './Login';
export default combineReducers({
    category: Category,
    login: Login
});