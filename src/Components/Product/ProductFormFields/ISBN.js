import React, { Component } from 'react'
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';

class ISBN extends Component {
    render() {
        return (
            <TextField 
                label='ISBN'
                fullWidth
                variant='outlined'
            />
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(ISBN)
