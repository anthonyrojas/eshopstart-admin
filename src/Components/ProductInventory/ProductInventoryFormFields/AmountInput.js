import React, { Component } from 'react'
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import {productInventoryAmountChanged} from '../../../Actions/ProductInventory'

class AmountInput extends Component {
    handleOnChange = (e) => {
        this.props.productInventoryAmountChanged(e.target.value);
    }
    render() {
        return (
            <TextField 
                variant='outlined'
                label='Amount'
                type='number'
                value={this.props.inventoryAmount}
                onChange={this.handleOnChange}
                error={this.props.errorExists}
                fullWidth
                disabled={this.props.loadingInventory}
            />
        )
    }
}

const mapStateToProps = (state) => ({
    product: state.product.product,
    inventoryAmount: state.productInventory.inventoryAmount,
    loadingInventory: state.productInventory.loadingInventory,
    errorExists: state.productInventory.errorExists
})

const mapDispatchToProps = {
    productInventoryAmountChanged
}

export default connect(mapStateToProps, mapDispatchToProps)(AmountInput)
