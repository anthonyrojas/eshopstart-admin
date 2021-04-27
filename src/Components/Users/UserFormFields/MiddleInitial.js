import React, { Component } from 'react'
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import {
    userMiddleInitialChanged
} from '../../../Actions/Users'

class MiddleInitial extends Component {
    handleInputChanged(e){
        if(e.target.value.length <= 1){
            this.props.userMiddleInitialChanged(e.target.value)
        }
    }
    render() {
        return (
            <TextField 
                fullWidth
                label='MiddleInitial'
                variant='outlined'
                value={this.props.middleInitial}
                onChange={this.handleInputChanged}
            />
        )
    }
}

const mapStateToProps = (state) => ({
    middleInitial: state.users.middleInitial
})

const mapDispatchToProps = {
    userMiddleInitialChanged
}

export default connect(mapStateToProps, mapDispatchToProps)(MiddleInitial)
