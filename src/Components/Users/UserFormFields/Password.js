import React, { Component } from 'react'
import { connect } from 'react-redux'
import TextField from '@material-ui/core/TextField';
import {
    userPasswordChanged
} from '../../../Actions/Users';

class Password extends Component {
    handleInputChanged(e){
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
            />
        )
    }
}

const mapStateToProps = (state) => ({
    password: state.users.password
})

const mapDispatchToProps = {
    userPasswordChanged
}

export default connect(mapStateToProps, mapDispatchToProps)(Password)
