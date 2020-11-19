import React, { Component } from 'react'
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import {
    productHeightChanged
} from '../../../Actions/Product';
import {
    isUndefinedOrNullOrEmpty
} from '../../../helpers'

class Height extends Component {
    handleProductHeightChanged = (e) => {
        this.props.productHeightChanged(e.target.value)
    }
    render() {
        return (
            <TextField 
                type='number'
                label='Packaging Height (inches)'
                required
                fullWidth
                variant='outlined'
                value={this.props.height}
                onChange={this.handleProductHeightChanged.bind(this)}
                error={!isUndefinedOrNullOrEmpty(this.props.error)}
                helperText={this.props.error}
            />
        )
    }
}

const mapStateToProps = (state) => ({
    height: state.product.height,
    error: state.product.errors.height
})

const mapDispatchToProps = {
    productHeightChanged
}

export default connect(mapStateToProps, mapDispatchToProps)(Height)
