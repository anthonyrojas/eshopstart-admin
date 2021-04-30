import React, { Component } from 'react'
import { connect } from 'react-redux'
import TextField from '@material-ui/core/TextField';
import {
    userPasswordChanged
} from '../../../Actions/Users';
import { isUndefinedOrNullOrEmpty } from '../../../helpers';

class Password extends Component {
    handleInputChanged = (e) =>{
        this.props.userPasswordChanged(e.target.value)
    }
    render() {
        return (
            <TextField 
                variant='outlined'
                label='Password'
                fullWidth
                value={this.props.password}
                onChange={this.handleInputChanged}
                //required
                error={!isUndefinedOrNullOrEmpty(this.props.errorMessage) && this.props.errorExistsAddUser}
                helperText={this.props.errorMessage}
                type='password'
            />
        )
    }
}

const mapStateToProps = (state) => ({
    password: state.users.password,
    errorExistsAddUser: state.users.errorExistsAddUser,
    errorMessage: state.users.errors.password
})

const mapDispatchToProps = {
    userPasswordChanged
}

export default connect(mapStateToProps, mapDispatchToProps)(Password)
