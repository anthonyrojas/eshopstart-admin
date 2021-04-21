import React, { Component } from 'react'
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {
    productImageChanged
} from '../../../Actions/ProductImage';
import Typography from '@material-ui/core/Typography';

class ProductImage extends Component {
    constructor(props) {
        super(props);
        this.fileInputRef = React.createRef();
    }
    handleFileChanged = (e) => {
        const fileInput = e.target.files[0];
        this.props.productImageChanged({
            productImage: fileInput
        });
    }
    render() {
        return (
            <Grid
                container
                component='form'
                spacing={2}
                direction='row'
                justify='center'
                alignContent='center'
                alignItems='center'
                method='POST'
            >
                <Grid item xs={12}>
                    <FormControl variant='outlined'>
                        <InputLabel
                            shrink
                            htmlFor='product-image-input'
                            variant='outlined'
                        >
                            Product Image
                        </InputLabel>
                        <OutlinedInput
                            id='product-image-input'
                            type='file'
                            label='Product Image'
                            intputRef={this.fileInputRef}
                            notched
                            onChange={this.handleFileChanged.bind(this)}
                        />
                    </FormControl>
                </Grid>
                {
                    this.props.file ?
                        <Grid item xs={12}>
                            &nbsp;
                        <IconButton
                                color='secondary'
                                onClick={this.handleFileCleared.bind(this)}
                            >
                                <CloseIcon />
                            </IconButton>
                        </Grid>
                        :
                        null
                }
                <Grid item xs={12}>
                    <Typography variant='body2'>
                        Add a product image with a label to be used by the ecommerce site. Make sure the label is short, but descriptive enough for the image.
                    </Typography>
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => ({
    productImage: state.productImage.productImage
})

const mapDispatchToProps = {
    productImageChanged
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductImage)
