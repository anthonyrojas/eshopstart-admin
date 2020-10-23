import React, { Component } from 'react'
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';

class Length extends Component {
    render() {
        return (
            <TextField
                variant='outlined'
                label='Packaging Length'
                required
                fullWidth
                type='number'
            />
        )
    }
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(Length)