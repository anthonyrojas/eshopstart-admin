import React, { Component } from 'react'
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';

class Description extends Component {
    render() {
        return (
            <TextField
                label='Description'
                fullWidth
                required
                variant='outlined'
                multiline
                rows={10}
            />
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Description)
