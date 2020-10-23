import React, { Component } from 'react'
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';

class Name extends Component {
    render() {
        return (
            <TextField 
                variant='outlined'
                label='Product Name'
                required
                fullWidth
            />
        )
    }
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Name)
