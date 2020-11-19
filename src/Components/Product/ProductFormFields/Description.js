import React, { Component } from 'react'
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import {    
    productDescriptionChanged
} from '../../../Actions/Product'
import { isNullOrEmpty } from '../../../helpers';

class Description extends Component {
    handleDescriptionChanged = (e) => {
        this.props.productDescriptionChanged(e.target.value);
    }
    render() {
        return (
            <TextField
                label='Description'
                fullWidth
                required
                variant='outlined'
                multiline
                rows={10}
                value={this.props.description}
                onChange={this.handleDescriptionChanged.bind(this)}
                error={!isNullOrEmpty(this.props.error)}
                helperText={this.props.error}
            />
        )
    }
}

const mapStateToProps = (state) => ({
    description: state.product.description,
    error: state.product.errors.description
})

const mapDispatchToProps = {
    productDescriptionChanged
}

export default connect(mapStateToProps, mapDispatchToProps)(Description)
