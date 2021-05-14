import React, { Component } from 'react'
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AmountInput from './ProductInventoryFormFields/AmountInput';
import SaveButton from './ProductInventoryFormFields/SaveButton';

class ProductInventoryForm extends Component {
    render() {
        return (
            <Grid container
                justify='center'
                alignItems='center'
                alignContent='center'
                direction='row'
                wrap='wrap'
            >
                <Grid item xs={12}>
                    <Typography
                        variant='h5'
                        align='center'
                    >
                        Inventory Form
                    </Typography>
                </Grid>
                <Grid item xs={12} lg={10}>
                    <AmountInput />
                </Grid>
                <Grid item xs={12} lg={2}>
                    <SaveButton />
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => ({
    product: state.product.product,
    loadingGet: state.product.loadingGet
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductInventoryForm)
