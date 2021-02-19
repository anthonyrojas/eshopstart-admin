import React, { Component } from 'react'
import { connect } from 'react-redux';
import {withStyles} from '@material-ui/core'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import {
    getProduct,
    getProductBySlug
} from '../../Actions/Product';
import {withRouter} from 'react-router-dom';

const styles = theme => ({
    paper: {
        padding: theme.spacing(2)
    },
})


class Product extends Component {
    componentDidMount(){
        this.props.getProduct({id: this.props.match.params.id});
    }
    render() {
        const {classes} = this.props;
        return (
            <Paper elevation={6} className={classes.paper}>
                <Grid 
                    container 
                    direction='row' 
                    alignContent='center' 
                    alignItems='center' 
                    justify='center'
                    spacing={3}
                >
                    <Grid item xs={12} md={4}>
                        <Typography variant='body1'>
                            ID: {this.props.product.id}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Typography variant='body1'>
                            Slug: {this.props.product.slug}
                        </Typography>
                    </Grid>
                    <Divider />
                    <Grid item xs={12}>
                        <Typography variant='h4'>
                            {this.props.product.name}
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>
        )
    }
}

const mapStateToProps = (state) => ({
    product: state.product.product
})

const mapDispatchToProps = {
    getProduct,
    getProductBySlug
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(Product)))
