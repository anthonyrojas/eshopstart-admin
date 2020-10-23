import React, { Component } from 'react'
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';

class Price extends Component {
    render() {
        return (
            <TextField
                variant='outlined'
                label='Price'
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

export default connect(mapStateToProps, mapDispatchToProps)(Price)
