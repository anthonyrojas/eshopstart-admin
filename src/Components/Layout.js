import React, { Component } from 'react'
import { connect } from 'react-redux';
import SiteBar from './SiteBar';
import Navigation from './NavMenu/Navigation';
import Login from './Login/Login';
import Main from './Main';

class Layout extends Component {
    render() {
        return (
            <React.Fragment>
                {
                    this.props.authenticated ?
                    <React.Fragment>
                        <SiteBar />
                        <Navigation />
                        <Main />
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <SiteBar />
                        <Login />
                    </React.Fragment>
                }
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    authenticated: state.login.authenticated
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)
