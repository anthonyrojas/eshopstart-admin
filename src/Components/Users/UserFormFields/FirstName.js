import React, { Component } from 'react'
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import {
    userFirstNameChanged
} from '../../../Actions/Users'

class FirstName extends Component {
    handleInputChanged(e){
        this.props.userFirstNameChanged(e.target.value)
    }
    render() {
        return (
            <TextField
                variant='outlined'
                label='First Name'
                value={this.props.firstName}
                onChange={this.handleInputChanged}
                fullWidth
            />
        )
    }
}

const mapStateToProps = (state) => ({
    firstName: state.users.firstName
})

const mapDispatchToProps = {
    userFirstNameChanged
}

export default connect(mapStateToProps, mapDispatchToProps)(FirstName)
