import React, { Component } from 'react'
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import {
    productWeightChanged
} from '../../../Actions/Product'
import { isNullOrEmpty } from '../../../helpers';

class Weight extends Component {
    handleWeightChanged = (e) => {
        this.props.productWeightChanged(e.target.value);
    }
    render() {
        return (
            <TextField 
                type='number'
                label='Weight (Ounces)'
                required
                fullWidth
                variant='outlined'
                value={this.props.weight}
                onChange={this.handleWeightChanged.bind(this)}
                error={!isNullOrEmpty(this.props.error)}
                helperText={this.props.error}
            />
        )
    }
}

const mapStateToProps = (state) => ({
    weight: state.product.weight,
    error: state.product.errors.weight
})

const mapDispatchToProps = {
    productWeightChanged
}

export default connect(mapStateToProps, mapDispatchToProps)(Weight)
