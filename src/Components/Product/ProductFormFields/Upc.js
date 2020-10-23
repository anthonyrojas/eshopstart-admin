import React, { Component } from 'react'
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField'

class Upc extends Component {
    render() {
        return (
            <TextField
                variant='outlined'
                label='UPC'
                fullWidth
            />
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Upc)
