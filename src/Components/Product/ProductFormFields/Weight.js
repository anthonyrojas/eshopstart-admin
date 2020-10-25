import React, { Component } from 'react'
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';

class Weight extends Component {
    render() {
        return (
            <TextField 
                type='number'
                label='Weight (Ounces)'
                required
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

export default connect(mapStateToProps, mapDispatchToProps)(Weight)
