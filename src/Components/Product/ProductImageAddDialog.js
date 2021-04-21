import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close'
import ImageLabel from './ProductFormFields/ImageLabel';
import ProductImageInput from './ProductFormFields/ProductImage';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Slide from '@material-ui/core/Slide';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import {connect} from 'react-redux';
import {
    uploadProductImage,
    resetProductImageStatusMessage
} from '../../Actions/ProductImage'
import { isUndefinedOrNull, isUndefinedOrNullOrEmpty } from '../../helpers';
import Snackbar from '@material-ui/core/Snackbar';

const Transition = React.forwardRef(function Transition(props, ref){
    return <Slide direction='up' ref={ref} {...props} />
})

class ProductImageAddDialog extends Component{
    handleClose = () => {
        if(!this.props.uploadingImage){
            this.props.setOpenImageDialog(false);
        }
    }
    handleSnackbarClose = () => {
        this.props.resetProductImageStatusMessage('');
    }
    handleUploadImage = () => {
        if(!isUndefinedOrNull(this.props.productImage) && this.props.productImage !== ''){
            this.props.uploadProductImage({
                productId: this.props.product.id,
                label: this.props.label,
                productImage: this.props.productImage
            })
        }
    }
    render(){
        return(
            <Dialog
                fullScreen
                TransitionComponent={Transition}
                open={this.props.opened}
                onClose={this.handleClose}
            >
                <Snackbar 
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center'
                    }}
                    open={!isUndefinedOrNullOrEmpty(this.props.statusMessage)}
                    message={this.props.statusMessage}
                    onClose={this.handleSnackbarClose}
                    action={
                        <IconButton onClick={this.handleSnackbarClose} color='secondary'>
                            <CloseIcon />
                        </IconButton>
                    }
                />
                <AppBar position='relative' color='default'>
                    <ToolBar>
                        <IconButton edge='start' color='secondary' aria-label='close' onClick={this.handleClose}>
                            <CloseIcon />
                        </IconButton>
                        <Typography variant='h6' component='h'>Add Product Image</Typography>
                    </ToolBar>
                </AppBar>
                {
                    this.props.uploadingImage ?
                    <LinearProgress color='primary' />
                    :
                    null
                }
                <ToolBar />
                <Container maxWidth='md'>
                    <Grid container
                        justify='center'
                        alignItems='center'
                        alignContent='center'
                        spacing={2}
                    >
                        <Grid item xs={12}>
                            <ProductImageInput />
                        </Grid>
                        <ImageLabel />
                        <Grid item xs={12}>
                            <Button 
                                variant='contained' 
                                color='primary' 
                                disabled={this.props.uploadingImage}
                                onClick={this.handleUploadImage}
                            >
                                Upload Image
                            </Button>
                        </Grid>
                    </Grid>
                </Container>
            </Dialog>
        );
    }
}

const mapStateToProps = (state) => ({
    product: state.product.product,
    productImage: state.productImage.productImage,
    label: state.productImage.label,
    uploadingImage: state.productImage.uploadingImage,
    statusMessage: state.productImage.statusMessage
})
const mapDispatchToProps = {
    uploadProductImage,
    resetProductImageStatusMessage
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductImageAddDialog);