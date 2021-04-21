import React, { Component } from 'react'
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import {
    updateProductImages
} from '../../../Actions/ProductImage';
import {withRouter} from 'react-router-dom';

class SubmitButton extends Component {
    handleOnClick = (e) => {
        this.props.updateProductImages({
            productImages: this.props.productImages,
            id: this.props.match.params.id
        });
    }
    render() {
        return (
            <Button
                variant='contained'
                color='primary'
                disabled={this.props.orderUpdating}
                onClick={this.handleOnClick}
            >
                Save
            </Button>
        )
    }
}

const mapStateToProps = (state) => ({
    orderUpdating: state.productImage.orderUpdating,
    errorExists: state.productImage.errorOrderUpdating
})

const mapDispatchToProps = {
    updateProductImages
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SubmitButton))
