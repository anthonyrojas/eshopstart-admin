import React, { Component } from 'react'
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import {
    productIsbnChanged
} from '../../../Actions/Product'
import { isNullOrEmpty } from '../../../helpers';

class ISBN extends Component {
    handleIsbnChanged = (e) => {
        this.props.productIsbnChanged(e.target.value);
    }
    render() {
        return (
            <TextField 
                label='ISBN'
                fullWidth
                variant='outlined'
                value={this.props.isbn}
                onChange={this.handleIsbnChanged.bind(this)}
                error={!isNullOrEmpty(this.props.error)}
                helperText={this.props.error}
            />
        )
    }
}

const mapStateToProps = (state) => ({
    isbn: state.product.isbn,
    error: state.product.errors.isbn
})

const mapDispatchToProps = {
    productIsbnChanged
}

export default connect(mapStateToProps, mapDispatchToProps)(ISBN)
