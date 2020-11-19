import React, { Component } from 'react'
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import {
    productLengthChanged
} from '../../../Actions/Product'
import { isNullOrEmpty } from '../../../helpers';

class Length extends Component {
    handleLengthChanged = (e) => {
        this.props.productLengthChanged(e.target.value);
    }
    render() {
        return (
            <TextField
                variant='outlined'
                label='Packaging Length (inches)'
                required
                fullWidth
                type='number'
                value={this.props.length}
                error={!isNullOrEmpty(this.props.error)}
                helperText={this.props.error}
                onChange={this.handleLengthChanged.bind(this)}
            />
        )
    }
}

const mapStateToProps = (state) => ({
    length: state.product.length,
    error: state.product.errors.length
})

const mapDispatchToProps = {
    productLengthChanged
}

export default connect(mapStateToProps, mapDispatchToProps)(Length)
