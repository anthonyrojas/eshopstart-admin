import React, { Component } from 'react';
import {connect} from 'react-redux';
import {
    loginPasswordChanged
} from '../../Actions/Login';
import {
    isNullOrEmpty
} from '../../helpers'
import TextField from '@material-ui/core/TextField';

class PasswordInput extends Component {
    render() {
        return (
            <TextField
                fullWidth
                variant='outlined'
                label='Password'
                type='password'
                required
                disabled={this.props.loading}
                value={this.props.password}
                onChange={e => this.props.loginPasswordChanged(e.target.value)
                }
                error={!isNullOrEmpty(this.props.error)}
                helperText={this.props.error}
            />
        )
    }
}

const mapStateToProps = (state) => ({
    password: state.login.password,
    error: state.login.errors.password,
    errorExists: state.login.errorExists,
    loading: state.login.loading
});

const mapDispatchToProps = {
   loginPasswordChanged 
}

export default connect(mapStateToProps, mapDispatchToProps)(PasswordInput);
