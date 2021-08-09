import {combineReducers} from 'redux';
import Category from './Category';
import Login from './Login';
import Product from './Product';
import ProductImage from './ProductImage';
import Users from './Users';
import ProductInventory from './ProductInventory';
import Order from './Order';
import ShippingAddress from './ShippingAddress';
import AppSetting from './AppSetting';
export default combineReducers({
    category: Category,
    login: Login,
    product: Product,
    productImage: ProductImage,
    users: Users,
    productInventory: ProductInventory,
    order: Order,
    shippingAddress: ShippingAddress,
    appSetting: AppSetting
});