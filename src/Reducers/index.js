import {combineReducers} from 'redux';
import Category from './Category';
import Login from './Login';
import Product from './Product';
export default combineReducers({
    category: Category,
    login: Login,
    product: Product
});