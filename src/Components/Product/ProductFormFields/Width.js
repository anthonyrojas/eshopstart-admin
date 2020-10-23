import React, { Component } from 'react'
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';

class Width extends Component {
    render() {
        return (
            <TextField
                variant='outlined'
                label='Packaging Width'
                fullWidth
                required
                type='number'
            />
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Width)
