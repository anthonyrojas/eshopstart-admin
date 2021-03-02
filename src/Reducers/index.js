import {combineReducers} from 'redux';
import Category from './Category';
import Login from './Login';
import Product from './Product';
import ProductImage from './ProductImage';
export default combineReducers({
    category: Category,
    login: Login,
    product: Product,
    productImage: ProductImage
});