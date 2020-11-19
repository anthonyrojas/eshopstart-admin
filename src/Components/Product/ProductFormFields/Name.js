import React, { Component } from 'react'
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import {
    productNameChanged
} from '../../../Actions/Product';
import { isNullOrEmpty } from '../../../helpers';


class Name extends Component {
    handleNameChanged = (e) => {
        this.props.productNameChanged(e.target.value);
    }
    render() {
        return (
            <TextField 
                variant='outlined'
                label='Product Name'
                required
                fullWidth
                value={this.props.name}
                onChange={this.handleNameChanged.bind(this)}
                error={!isNullOrEmpty(this.props.error)}
                helperText={this.props.error}
            />
        )
    }
}

const mapStateToProps = (state) => ({
    name: state.product.name,
    error: state.product.errors.name
})

const mapDispatchToProps = {
    productNameChanged
}

export default connect(mapStateToProps, mapDispatchToProps)(Name);