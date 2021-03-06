import React, { Component } from 'react'
import { connect } from 'react-redux';
import {withStyles} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Name from './ProductFormFields/Name';
import Description from './ProductFormFields/Description';
import Height from './ProductFormFields/Height';
import Width from './ProductFormFields/Width';
import Length from './ProductFormFields/Length';
import IsDeliverable from './ProductFormFields/IsDeliverable';
import IsDigital from './ProductFormFields/IsDigital';
import ISBN from './ProductFormFields/ISBN';
import SKU from './ProductFormFields/Sku';
import UPC from './ProductFormFields/Upc';
import DownloadsPermitted from './ProductFormFields/DownloadsPermitted';
import Price from './ProductFormFields/Price';
import Weight from './ProductFormFields/Weight';
import IsActive from './ProductFormFields/IsActive';
import LoadingModal from './LoadingModal';
import SubmitButton from './SubmitButton';
import DigitalContent from './ProductFormFields/DigitalContent';
import Collapse from '@material-ui/core/Collapse';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { isUndefinedOrNullOrEmpty } from '../../helpers';
import {
    resetStatusMessage,
    editProduct,
    getProduct,
    cancelEditProduct
} from '../../Actions/Product';
import Button from '@material-ui/core/Button';
import ProductImage from './ProductFormFields/ProductImage';
import ProductImageLabel from './ProductFormFields/ImageLabel';
import {withRouter, Link as RouterLink} from 'react-router-dom'

const styles = theme => ({
    paper: {
        padding: theme.spacing(2)
    },
    alert: {
        width: '100%'
    },
    collapse: {
        width: '100%'
    }
})

class ProductForm extends Component {
    componentDidMount(){
        this.props.resetStatusMessage(false);
        if(this.props.match.params.id !== undefined && this.props.location.pathname.includes('edit')){
            if(!this.props.editing){
                this.props.editProduct({id: this.props.match.params.id});
            }
        }else{
            //reset any update product values
            this.props.cancelEditProduct();
        }
    }
    componentDidUpdate(prevProps){
        if(prevProps.editing && !this.props.match.params.id){
            this.props.cancelEditProduct();
        }
    }
    resetStatusMessage(data){
        this.props.resetStatusMessage(false);
    }
    render() {
        const digitalRender = this.props.isDigital ? 
            (<React.Fragment>
                <Grid item xs={12}>
                    <DownloadsPermitted />
                </Grid>
                <Grid item xs={12}>
                    <DigitalContent />
                </Grid>
            </React.Fragment>)
            :
            (<React.Fragment>
                <Grid item xs={12}>
                    <IsDeliverable />
                </Grid>
                <Grid item xs={12}>
                    <Weight />
                </Grid>
                <Grid item xs={12}>
                    <Height />
                </Grid>
                <Grid item xs={12}>
                    <Length />
                </Grid>
                <Grid item xs={12}>
                    <Width />
                </Grid>
            </React.Fragment>)
        const {classes} = this.props;
        return (
            <Paper
                className={classes.paper}
                elevation={4}
            >
                <LoadingModal />
                <Grid
                    container
                    direction='row'
                    spacing={2}
                    alignContent='center'
                    alignItems='center'
                    justify='center'
                    component='form'
                    method='POST'
                >
                    <Collapse className={classes.collapse} in={!isUndefinedOrNullOrEmpty(this.props.statusMessage)}>
                        <Grid item xs={12}>
                            <Alert
                                className={classes.alert}
                                severity={this.props.errorExists ? 'error' : 'success'}
                                action={
                                    <React.Fragment>
                                        {
                                            this.props.errorExists ? 
                                            null:
                                            <Button
                                                color='inherit'
                                                variant='outlined'
                                                to={`/products/${this.props.productId}`}
                                                component={RouterLink}
                                            >
                                                View
                                            </Button>
                                        }
                                        &nbsp;
                                        <IconButton
                                            aria-label='close'
                                            color='inherit'
                                            size='small'
                                            onClick={()=>{this.resetStatusMessage(false)}}
                                        >
                                            <CloseIcon fontSize='inherit' />
                                        </IconButton>
                                    </React.Fragment>
                                }
                            >
                                {this.props.statusMessage}
                            </Alert>
                        </Grid>
                    </Collapse>
                    <Grid item xs={12}>
                        <Typography variant='h4' align='center'>
                            {this.props.editing ? 'Update Product' : 'Add Product'}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Name />
                    </Grid>
                    <Grid item xs={12}>
                        <Description />
                    </Grid>
                    <Grid item xs={12}>
                        <Price />
                    </Grid>
                    <Grid item xs={12}>
                        <SKU />
                    </Grid>
                    <Grid item xs={12}>
                        <UPC />
                    </Grid>
                    <Grid item xs={12}>
                        <ISBN />
                    </Grid>
                    <Grid item xs={12}>
                        <IsActive />
                    </Grid>
                    <Grid item xs={12}>
                        <IsDigital />
                    </Grid>
                    {
                        digitalRender
                    }
                    {
                        this.props.editing ? 
                        null
                        :
                        <React.Fragment>
                            <Grid item xs={12}>
                                <ProductImage />
                            </Grid>
                            <Grid item xs={12}>
                                <ProductImageLabel />
                            </Grid>
                        </React.Fragment>
                    }
                    <Grid item xs={12} style={{textAlign: 'center'}}>
                        <SubmitButton />
                    </Grid>
                </Grid>
            </Paper>
        )
    }
}

const mapStateToProps = (state) => ({
    isDigital: state.product.isDigital,
    editing: state.product.editing,
    statusMessage: state.product.statusMessage,
    errorExists: state.product.errorExists,
    productId: state.product.id
})

const mapDispatchToProps = {
    resetStatusMessage,
    getProduct,
    editProduct,
    cancelEditProduct
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withRouter(ProductForm)))
