import React, { Component } from 'react'
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import {
    productWidthChanged
} from '../../../Actions/Product'
import { isNullOrEmpty } from '../../../helpers';

class Width extends Component {
    handleWidthChanged = (e) => {
        this.props.productWidthChanged(e.target.value);
    }
    render() {
        return (
            <TextField
                variant='outlined'
                label='Packaging Width (inches)'
                fullWidth
                required
                type='number'
                value={this.props.width}
                onChange={this.handleWidthChanged.bind(this)}
                error={!isNullOrEmpty(this.props.error)}
                helperText={this.props.error}
            />
        )
    }
}

const mapStateToProps = (state) => ({
    width: state.product.width,
    error: state.product.errors.width
})

const mapDispatchToProps = {
    productWidthChanged
}

export default connect(mapStateToProps, mapDispatchToProps)(Width)
