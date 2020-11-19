import React, { Component } from 'react'
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import {
    productPriceChanged
} from '../../../Actions/Product'
import { isNullOrEmpty } from '../../../helpers';

class Price extends Component {
    handlePriceChanged = (e) => {
        this.props.productPriceChanged(e.target.value);
    }
    render() {
        return (
            <TextField
                variant='outlined'
                label='Price ($)'
                fullWidth
                required
                type='number'
                value={this.props.price}
                onChange={this.handlePriceChanged.bind(this)}
                error={!isNullOrEmpty(this.props.error)}
                helperText={this.props.error}
            />
        )
    }
}

const mapStateToProps = (state) => ({
    price: state.product.price,
    error: state.product.errors.price
})

const mapDispatchToProps = {
    productPriceChanged
}

export default connect(mapStateToProps, mapDispatchToProps)(Price)
