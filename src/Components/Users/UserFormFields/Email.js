import React, { Component } from 'react'
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import {
    userEmailChanged
} from '../../../Actions/Users'

class Email extends Component {
    handleInputChanged(e){
        this.props.userEmailChanged(e.target.value);
    }
    render() {
        return (
            <TextField 
                variant='outlined'
                fullWidth
                label='Email'
                value={this.props.email}
                onChange={this.handleInputChanged}
            />
        )
    }
}

const mapStateToProps = (state) => ({
    email: state.users.email
})

const mapDispatchToProps = {
    userEmailChanged
}

export default connect(mapStateToProps, mapDispatchToProps)(Email)
