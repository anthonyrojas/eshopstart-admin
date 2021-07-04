import React, { Component } from 'react'
import { connect } from 'react-redux';
import {Switch} from 'react-router-dom';
import Login from './Login/Login';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Category from './Category/Category';
import {
    refreshLogin,
    logout
} from '../Actions/Login'
import ProductForm from './Product/ProductForm';
import Product from './Product/Product';
import ProductList from './Product/ProductList';
import ProductImagesEditForm from './Product/ProductImagesEditForm';
import Users from './Users/Users';
import User from './Users/User';
import UserForm from './Users/UserForm';
import Orders from './Order/Orders';
import Order from './Order/Order';
class Layout extends Component {
    componentDidMount(){
        if(this.props.authenticated){
            document.addEventListener('visibilitychange', this.refreshTokens.bind(this));
        }
    }

    refreshTokens(e){
        if(this.props.authenticated && document.visibilityState === 'visible'){
            if(this.props.expiresAt - 500 < Date.now()){
                this.props.refreshLogin(this.props.refreshToken);
            }
            else if(this.props.refreshBy < Date.now()){
                this.props.logout();
            }
        }else if(!this.props.authenticated && document.visibilityState === 'visible'){
        }
    }

    componentDidUpdate(prevProps){
        if(prevProps.authenticated && !this.props.authenticated){
            document.removeEventListener('visibilitychange', this.refreshTokens.bind(this));
        }else if(!prevProps.authenticated && this.props.authenticated){
            document.addEventListener('visibilitychange', this.refreshTokens.bind(this));
        }
    }

    componentWillUnmount(){
        document.removeEventListener('visibilitychange', this.refreshTokens.bind(this));
    }

    render() {
        return (
            <Switch>
                <PrivateRoute exact path='/' component={Category} />
                <PrivateRoute exact path='/products' component={ProductList} />
                <PrivateRoute exact path='/product' component={ProductForm} />
                <PrivateRoute exact path='/products/:id' component={Product} />
                <PrivateRoute exact path='/products/:id/edit' component={ProductForm} />
                <PublicRoute path='/login' component={Login} />
                <PrivateRoute path='/product-image-edit/:id' component={ProductImagesEditForm} />
                <PrivateRoute exact path='/users' component={Users} />
                <PrivateRoute exact path='/users/add' component={UserForm} />
                <PrivateRoute path='/user/:id' component={User} />
                <PrivateRoute exact path='/orders' component={Orders}/>
                <PrivateRoute exact path='/order/:id' component={Order} />
            </Switch>
        )
    }
}

const mapStateToProps = (state) => ({
    authenticated: state.login.authenticated,
    refreshBy: state.login.refreshBy,
    expiresAt: state.login.expiresAt,
    refreshToken: state.login.refreshToken
})

const mapDispatchToProps = {
    refreshLogin,
    logout
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)
