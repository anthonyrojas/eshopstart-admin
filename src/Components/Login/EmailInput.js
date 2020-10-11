import React, { Component } from 'react';
import {connect} from 'react-redux';
import {
    loginEmailChanged
} from '../../Actions/Login';
import {
    isNullOrEmpty
} from '../../helpers'
import TextField from '@material-ui/core/TextField';

class EmailInput extends Component {
    render() {
        return (
            <TextField
                fullWidth
                variant='outlined'
                label='Email'
                required
                disabled={this.props.loading}
                value={this.props.email}
                onChange={e => this.props.loginEmailChanged(e.target.value)
                }
                error={!isNullOrEmpty(this.props.error)}
                helperText={this.props.error}
            />
        )
    }
}
const mapStateToProps = state => ({
    email: state.login.email,
    error: state.login.errors.email,
    loading: state.login.loading
});
const mapDispatchToProps = {
    loginEmailChanged
}
export default connect(mapStateToProps, mapDispatchToProps)(EmailInput);