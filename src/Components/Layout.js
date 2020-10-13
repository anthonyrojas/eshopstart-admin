import React, { Component } from 'react'
import { connect } from 'react-redux';
import {Switch} from 'react-router-dom';
import Login from './Login/Login';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Category from './Category/Category';

class Layout extends Component {
    render() {
        return (
            <Switch>
                <PrivateRoute exact path='/' component={Category} />
                <PublicRoute path='/login' component={Login} />
            </Switch>
        )
    }
}

const mapStateToProps = (state) => ({
    authenticated: state.login.authenticated
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)
