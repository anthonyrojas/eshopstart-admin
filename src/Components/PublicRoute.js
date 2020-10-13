import React, { Component } from 'react'
import { connect } from 'react-redux';
import {Redirect, Route} from 'react-router-dom'
import {withStyles} from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';

const styles = theme => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing(3)
    }
})

class PublicRoute extends Component {
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
                        <Redirect to='/' />
                        :
                        <main className={classes.content}>
                            <Toolbar />
                            <Component {...props} />
                        </main>
                    )
                }
            />
        )
    }
}

const mapStateToProps = (state) => ({
    authenticated: state.login.authenticated
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PublicRoute))
