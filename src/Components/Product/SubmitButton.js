import React, { Component } from 'react'
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import {
    addProduct,
    updateProduct,
    cancelEditProduct
} from '../../Actions/Product'

class SubmitButton extends Component {
    onClickSubmitBtn = (e) => {
        e.preventDefault();
        let data = {
            name: this.props.name,
            description: this.props.description,
            price: this.props.price,
            isDeliverable: this.props.isDeliverable,
            isDigital: this.props.isDigital,
            downloadsPermitted: this.props.downloadsPermitted,
            weight: this.props.weight,
            height: this.props.height,
            length: this.props.length,
            width: this.props.width,
            upc: this.props.upc,
            sku: this.props.sku,
            isbn: this.props.isbn,
            isActive: this.props.isActive,
            file: this.props.file
        }
        if(this.props.editing){
            //updating a product
            this.props.updateProduct({
                id: this.props.id,
                ...data
            })
        }else{
            this.props.addProduct(data);
        }
    }
    onClickCancelEditBtn = (e) => {
        this.props.cancelEditProduct(false);
    }
    render() {
        const msg = this.props.editing ? 'Update Product' : 'Add Product';
        return (
            <React.Fragment>
                <Button
                    color='primary'
                    variant='contained'
                    disabled={this.props.loadingUpdate || this.props.loadingAdd}
                    type='submit'
                    onClick={this.onClickSubmitBtn.bind(this)}
                >
                    {msg}
                </Button>
                {
                    this.props.editing ? 
                    <React.Fragment>
                        &nbsp;
                        <Button
                            color='secondary'
                            variant='contained'
                            disabled={this.props.loadingUpdate || this.props.loadingAdd}
                            onClick={this.cancelEditProduct.bind(this)}
                        >
                            Cancel
                        </Button>
                    </React.Fragment>
                    :
                    null
                }
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    loadingAdd: state.product.loadingAdd,
    loadingUpdate: state.product.loadingUpdate,
    editing: state.product.editing,
    id: state.product.id,
    name: state.product.name,
    description: state.product.description,
    price: state.product.price,
    isDeliverable: state.product.isDeliverable,
    isDigital: state.product.isDigital,
    downloadsPermitted: state.product.downloadsPermitted,
    weight: state.product.weight,
    height: state.product.height,
    length: state.product.length,
    width: state.product.width,
    upc: state.product.upc,
    sku: state.product.sku,
    isbn: state.product.isbn,
    isActive: state.product.isActive,
    file: state.product.file
})

const mapDispatchToProps = {
    addProduct,
    updateProduct,
    cancelEditProduct
}

export default connect(mapStateToProps, mapDispatchToProps)(SubmitButton);
