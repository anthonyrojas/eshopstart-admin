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

const styles = theme => ({
    paper: {
        padding: theme.spacing(2)
    }
})

class ProductForm extends Component {
    render() {
        const {classes} = this.props;
        return (
            <Paper
                className={classes.paper}
                elevation={4}
            >
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
                    <Grid item xs={12}>
                        <Typography variant='h4' align='center'>Add Product</Typography>
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
                </Grid>
            </Paper>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ProductForm))
