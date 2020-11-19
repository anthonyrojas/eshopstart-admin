import React, { Component } from 'react'
import { connect } from 'react-redux';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import {
    productIsDigitalChanged
} from '../../../Actions/Product'
import { isNullOrEmpty } from '../../../helpers';

class IsDigital extends Component {
    handleIsDigitalChanged = (e) => {
        this.props.productIsDigitalChanged(e.target.checked);
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
                            name='is-digital-checkbox'
                            checked={this.props.isDigital}
                            onChange={this.handleIsDigitalChanged.bind(this)}
                        />
                    }
                    label='Is Digital'
                />
                {
                    isNullOrEmpty(this.props.error)
                    ?
                    null
                    :
                    <FormHelperText>
                        {this.props.error}
                    </FormHelperText>
                }
            </FormControl>
        )
    }
}

const mapStateToProps = (state) => ({
    isDigital: state.product.isDigital,
    error: state.product.errors.isDigital
})

const mapDispatchToProps = {
    productIsDigitalChanged
}

export default connect(mapStateToProps, mapDispatchToProps)(IsDigital)
