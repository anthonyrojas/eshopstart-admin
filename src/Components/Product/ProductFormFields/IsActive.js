import React, { Component } from 'react'
import { connect } from 'react-redux';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import {
    productIsActiveChanged
} from '../../../Actions/Product'
import { isNullOrEmpty } from '../../../helpers';

class IsActive extends Component {
    handleIsActiveChanged = (e) => {
        this.props.productIsActiveChanged(e.target.checked)
    }
    render() {
        return (
            <FormControl
                error={!isNullOrEmpty(this.props.error)}
            >
                <FormControlLabel
                    control={
                        <Checkbox
                            color='primary'
                            name='is-active-input'
                            checked={this.props.isActive}
                            onChange={this.handleIsActiveChanged.bind(this)}
                        />
                    }
                    label='Is Active'  
                />
                {
                    isNullOrEmpty(this.props.error)
                    ?
                    null
                    :
                    <FormHelperText>{this.props.error}</FormHelperText>
                }
            </FormControl>
        )
    }
}

const mapStateToProps = (state) => ({
    isActive: state.product.isActive,
    error: state.product.errors.isActive
})

const mapDispatchToProps = {
    productIsActiveChanged
}

export default connect(mapStateToProps, mapDispatchToProps)(IsActive)
