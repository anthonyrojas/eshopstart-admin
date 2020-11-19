import React, { Component } from 'react'
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField'
import {
    productUpcChanged
} from '../../../Actions/Product'
import { isNullOrEmpty } from '../../../helpers';

class Upc extends Component {
    handleUpcChanged = (e) => {
        this.props.productUpcChanged(e.target.value);
    }
    render() {
        return (
            <TextField
                variant='outlined'
                label='UPC'
                fullWidth
                value={this.props.upc}
                onChange={this.handleUpcChanged.bind(this)}
                error={!isNullOrEmpty(this.props.error)}
                helperText={this.props.error}
            />
        )
    }
}

const mapStateToProps = (state) => ({
    upc: state.product.upc,
    error: state.product.errors.upc
})

const mapDispatchToProps = {
    productUpcChanged
}

export default connect(mapStateToProps, mapDispatchToProps)(Upc)
