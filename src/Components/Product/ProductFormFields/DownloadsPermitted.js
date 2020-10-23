import React, { Component } from 'react'
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';

class DownloadsPermitted extends Component {
    render() {
        return (
            <TextField
                required
                fullWidth
                label='Downloads Permitted'
                type='number'
                variant='outlined'
            />
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(DownloadsPermitted)
