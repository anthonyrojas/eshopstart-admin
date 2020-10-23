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
                <PrivateRoute path='/products' component={ProductForm} />
                <PublicRoute path='/login' component={Login} />
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
