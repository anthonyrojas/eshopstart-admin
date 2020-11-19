import React, { Component } from 'react'
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import {
    productSkuChanged
} from '../../../Actions/Product'
import { isNullOrEmpty } from '../../../helpers';

class Sku extends Component {
    handleSkuChanged = (e) => {
        this.props.productSkuChanged(e.target.value);
    }
    render() {
        return (
            <TextField
                label='SKU'
                fullWidth
                variant='outlined'
                value={this.props.sku}
                onChange={this.handleSkuChanged.bind(this)}
                error={!isNullOrEmpty(this.props.error)}
                helperText={this.props.error}
            />
        )
    }
}

const mapStateToProps = (state) => ({
    sku: state.product.sku,
    error: state.product.errors.sku
})

const mapDispatchToProps = {
    productSkuChanged
}

export default connect(mapStateToProps, mapDispatchToProps)(Sku)
