import React, { Component } from 'react'
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import {
    logout
} from '../../Actions/Login';
import {withRouter} from 'react-router-dom';

class LogoutButton extends Component {
    handleLogout = (e) => {
        this.props.logout();
        this.props.history.push('/login');
    }
    render() {
        return (
            <Button
                variant='text'
                color='secondary'
                onClick={this.handleLogout.bind(this)}
            >
                Logout
            </Button>
        )
    }
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = {
    logout
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LogoutButton))
