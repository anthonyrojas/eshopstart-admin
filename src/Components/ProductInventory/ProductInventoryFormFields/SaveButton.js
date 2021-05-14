import React, { Component } from 'react'
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import {
    updateProductInventory
} from '../../../Actions/ProductInventory'

class SaveButton extends Component {
    handleOnClick = (e) => {
        this.props.updateProductInventory({
            inventoryAmount: Number(this.props.inventoryAmount),
            productId: this.props.product.id
        })
    }
    render() {
        return (
            <Button
                variant={this.props.buttonVariant}
                color='primary'
                disabled={this.props.loadingInventory}
                onClick={this.handleOnClick}
            >
                Save
            </Button>
        )
    }
}

const mapStateToProps = (state) => ({
    loadingInventory: state.productInventory.loadingInventory,
    product: state.product.product,
    inventoryAmount: state.productInventory.inventoryAmount
})

const mapDispatchToProps = {
    updateProductInventory
}

export default connect(mapStateToProps, mapDispatchToProps)(SaveButton)
