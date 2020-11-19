import React, { Component } from 'react'
import { connect } from 'react-redux';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import {
    productIsDeliverableChanged
} from '../../../Actions/Product'
import { isNullOrEmpty } from '../../../helpers';

class IsDeliverable extends Component {
    handleIsDeliverableChanged = (e) => {
        this.props.productIsDeliverableChanged(e.target.checked);
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
                            name='is-deliverable-input'
                            checked={this.props.isDeliverable}
                            onChange={this.handleIsDeliverableChanged.bind(this)}
                        />
                    }
                    label='Is Deliverable'
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
    isDeliverable: state.product.isDeliverable,
    error: state.product.errors.isDeliverable
})

const mapDispatchToProps = {
    productIsDeliverableChanged
}

export default connect(mapStateToProps, mapDispatchToProps)(IsDeliverable)
