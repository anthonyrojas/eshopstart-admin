import React, { Component } from 'react'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import {
    productImageLabelChanged
} from '../../../Actions/ProductImage'

class ImageLabel extends Component {
    handleLabelChanged = (e) => {
        this.props.productImageLabelChanged(e.target.value)
    }
    render() {
        return (
            <Grid item xs={12}>
                <TextField
                    variant='outlined'
                    fullWidth
                    label='Product Image Label'
                    value={this.props.imageLabel}
                    onChange={this.handleLabelChanged.bind(this)}
                />
            </Grid>
        )
    }
}

const mapStateToProps = (state) => ({
    imageLabel: state.productImage.label
})

const mapDispatchToProps = {
    productImageLabelChanged
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageLabel)
