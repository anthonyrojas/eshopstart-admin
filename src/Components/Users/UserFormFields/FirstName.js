import React, { Component } from 'react'
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import {
    userFirstNameChanged
} from '../../../Actions/Users'
import { isUndefinedOrNullOrEmpty } from '../../../helpers';

class FirstName extends Component {
    handleInputChanged = (e) =>{
        this.props.userFirstNameChanged(e.target.value)
    }
    render() {
        return (
            <TextField
                variant='outlined'
                label='First Name'
                //required
                value={this.props.firstName}
                onChange={this.handleInputChanged}
                fullWidth
                error={!isUndefinedOrNullOrEmpty(this.props.errorMessage) && this.props.errorExistsAddUser}
                helperText={this.props.errorMessage}
            />
        )
    }
}

const mapStateToProps = (state) => ({
    firstName: state.users.firstName,
    errorExistsAddUser: state.users.errorExistsAddUser,
    errorMessage: state.users.errors.firstName
})

const mapDispatchToProps = {
    userFirstNameChanged
}

export default connect(mapStateToProps, mapDispatchToProps)(FirstName)
