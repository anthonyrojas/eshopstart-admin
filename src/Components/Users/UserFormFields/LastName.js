import React, { Component } from 'react'
import { connect } from 'react-redux';
import TextFeild from '@material-ui/core/TextField';
import {
    userLastNameChanged
} from '../../../Actions/Users'
import { isUndefinedOrNullOrEmpty } from '../../../helpers';

class LastName extends Component {
    handleInputChanged = (e) =>{
        this.props.userLastNameChanged(e.target.value)
    }
    render() {
        return (
            <TextFeild
                label='Last Name'
                fullWidth
                variant='outlined'
                //required
                value={this.props.lastName}
                onChange={this.handleInputChanged}
                error={!isUndefinedOrNullOrEmpty(this.props.errorMessage) && this.props.errorExistsAddUser}
                helperText={this.props.errorMessage}
            />
        )
    }
}

const mapStateToProps = (state) => ({
    lastName: state.users.lastName,
    errorExistsAddUser: state.users.errorExistsAddUser,
    errorMessage: state.users.errors.lastName
})

const mapDispatchToProps = {
    userLastNameChanged
}

export default connect(mapStateToProps, mapDispatchToProps)(LastName)
