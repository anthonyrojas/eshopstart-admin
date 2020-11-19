import React, { Component } from 'react'
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import {
    productDownloadsPermittedChanged
} from '../../../Actions/Product'
import { isNullOrEmpty } from '../../../helpers';

class DownloadsPermitted extends Component {
    handleDownloadsPermittedChanged = (e) => {
        this.props.productDownloadsPermittedChanged(e.target.value);
    }
    render() {
        return (
            <TextField
                required
                fullWidth
                label='Downloads Permitted'
                type='number'
                variant='outlined'
                value={this.props.downloadsPermitted}
                onChange={this.handleDownloadsPermittedChanged.bind(this)}
                error={!isNullOrEmpty(this.props.error)}
                helperText={this.props.error}
            />
        )
    }
}

const mapStateToProps = (state) => ({
    downloadsPermitted: state.product.downloadsPermitted,
    error: state.product.errors.downloadsPermitted
});

const mapDispatchToProps = {
    productDownloadsPermittedChanged
}

export default connect(mapStateToProps, mapDispatchToProps)(DownloadsPermitted)
