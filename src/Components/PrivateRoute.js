import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Redirect, Route} from 'react-router-dom';
import Navigation from './NavMenu/Navigation';
import {withStyles} from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import {
    refreshLogin,
    logout,
    getAccount
} from '../Actions/Login'

const styles = theme => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing(3)
    }
})

class PrivateRoute extends Component {
    constructor(props){
        super(props);
        this.timer = null;
    }

    fetchAccount(){
        if(this.props.account === ''){
            this.props.getAccount();
        }
    }

    componentDidMount(){
        if(Number(this.props.refreshBy) < Date.now()){
            clearTimeout(this.timer);
            this.props.logout();
        }
        else if(Number(this.props.expiresAt) < Date.now() - 2000){
            clearTimeout(this.timer);
            this.props.refreshLogin(this.props.refreshToken);
            this.timer = setTimeout(this.refreshTokens.bind(this), this.props.expiresAt - Date.now() - 3500);
            this.fetchAccount();
        }else{
            clearTimeout(this.timer);
            this.timer = setTimeout(this.refreshTokens.bind(this), this.props.expiresAt - Date.now() - 3500);
            this.fetchAccount();
        }
    }
    componentDidUpdate(){
        if(Number(this.props.refreshBy) < Date.now()){
            clearTimeout(this.timer);
            this.props.logout();
        }
        else if(Number(this.props.expiresAt) < Date.now() - 2000){
            clearTimeout(this.timer);
            this.props.refreshLogin(this.props.refreshToken);
            this.timer = setTimeout(this.refreshTokens.bind(this), this.props.expiresAt - Date.now() - 3500);
        }else{
            clearTimeout(this.timer);
            this.timer = setTimeout(this.refreshTokens.bind(this), this.props.expiresAt - Date.now() - 3500);
        }
    }
    componentWillUnmount(){
        clearTimeout(this.timer)
    }

    refreshTokens(){
        if(localStorage.getItem('expiresAt') - 300 < Date.now()){
            this.props.refreshLogin(localStorage.getItem("refreshToken"));
        }
        else if(localStorage.getItem('refreshBy') < Date.now()){
            this.props.logout();
        }
    }
    render() {
        const {classes} = this.props;
        const {component: Component, ...props} = this.props;
        return (
            <Route
                exact
                {...props}
                render={
                    props=>(
                        this.props.authenticated ?
                        <React.Fragment>
                            <Navigation location={this.props.location} />
                            <main className={classes.content}>
                                <Toolbar />
                                <Component {...props} />
                            </main>
                        </React.Fragment>
                        :
                        <Redirect to='/login' />
                    )
                }
            />
        )
    }
}
const mapStateToProps = state => ({
    authenticated: state.login.authenticated,
    expiresAt: state.login.expiresAt,
    refreshBy: state.login.refreshBy,
    refreshToken: state.login.refreshToken,
    account: state.login.account
})
export default connect(mapStateToProps, {
    refreshLogin,
    logout,
    getAccount
})(withStyles(styles)(PrivateRoute));