import React, { Component } from 'react'
import { connect } from 'react-redux';
import TextFeild from '@material-ui/core/TextField';
import {
    userLastNameChanged
} from '../../../Actions/Users'

class LastName extends Component {
    handleInputChanged(e){
        this.props.userLastNameChanged(e.target.value)
    }
    render() {
        return (
            <TextFeild
                label='Last Name'
                fullWidth
                variant='outlined'
                value={this.props.lastName}
                onChange={this.handleInputChanged}
            />
        )
    }
}

const mapStateToProps = (state) => ({
    lastName: state.users.lastName
})

const mapDispatchToProps = {
    userLastNameChanged
}

export default connect(mapStateToProps, mapDispatchToProps)(LastName)
