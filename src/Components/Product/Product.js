import React, { Component } from 'react'
import { connect } from 'react-redux';
import {withStyles} from '@material-ui/core'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {
    getProduct,
    getProductBySlug
} from '../../Actions/Product';
import {withRouter} from 'react-router-dom';
import {
    isUndefinedOrNull,
    isUndefinedOrNullOrEmpty
} from '../../helpers';
import ProductImageSlider from './ProductImageSlider';
import Skeleton from '@material-ui/lab/Skeleton';
import Button from '@material-ui/core/Button';
import {Link as RouterLink} from 'react-router-dom'

const styles = theme => ({
    paper: {
        padding: theme.spacing(2)
    },
})


class Product extends Component {
    componentDidMount(){
        this.props.getProduct({id: this.props.match.params.id});
    }
    renderProductField(val, fieldType=null){
        if(isUndefinedOrNull(val)){
            return 'N/A';
        }
        if(fieldType !== null){
            switch(fieldType){
                case 'Currency':
                    return `$${val}`
                case 'Date':
                    return new Date(val).toLocaleDateString('en-US')
                case 'Boolean': 
                    return val ? 'True' : 'False'
                default: return val;
            }
        }
        else{
            return val;
        }
    }
    render() {
        const {classes} = this.props;
        const listItems = [
            {
                field: 'id',
                label: 'ID#'
            },
            {
                field: 'slug',
                label: 'Slug'
            },
            {
                field: 'name',
                label: 'Name'
            },
            {
                field: 'description',
                label: 'Description'
            },
            {
                field: 'price',
                label: 'Price',
                type: 'Currency'
            },
            {
                field: 'isActive',
                label: 'Is Active',
                type: 'Boolean'
            },
            {
                field: 'isDigital',
                label: 'Is Digital',
                type: 'Boolean'
            },
            {
                field: 'sku',
                label: 'SKU'
            },
            {
                field: 'upc',
                label: 'UPC'
            },
            {
                field: 'isbn',
                label: 'ISBN'
            }
        ];
        const digitalRender = (
            <React.Fragment>
                <ListItem>
                    <ListItemText 
                        primary={
                            this.props.loadingGet ? 
                            <Skeleton />
                            :
                            <Typography variant='body1'>
                                {this.props.product.downloadsPermitted}
                            </Typography>
                        }
                        secondary='Downloads Permitted'
                    />
                </ListItem>
                <Divider variant='middle' />
                <ListItem>
                    <ListItemText 
                        primary={
                            this.props.loadingGet ? 
                            <Skeleton />
                            :
                            <Typography variant='body1'>
                                {this.props.product.digitalPath}
                            </Typography>
                        }
                        secondary='Digital Path'
                    />
                </ListItem>
            </React.Fragment>
        );
        const physicalRender = (
            <React.Fragment>
                <ListItem>
                    <ListItemText 
                        primary={
                            this.props.loadingGet ? 
                            <Skeleton />
                            :
                            <Typography>
                                {this.props.product.height}in. X {this.props.product.width}in. X {this.props.product.length}in.
                            </Typography>
                        }
                        secondary='Dimensions (HxWxL)'
                    />
                </ListItem>
                <Divider variant='middle'/>
                <ListItem>
                    <ListItemText 
                        primary={
                            this.props.loadingGet ? 
                            <Skeleton/>
                            :
                            <Typography>
                                {this.props.product.weight}oz.
                            </Typography>
                        }
                        secondary='Weight (ounces)'
                    />
                </ListItem>
                <Divider variant='middle' />
                <ListItem>
                    <ListItemText 
                        primary={
                            this.props.loadingGet ?
                            <Skeleton />
                            :
                            <Typography>
                                {new String(this.props.product.isDeliverable).toUpperCase()}
                            </Typography>
                        }
                        secondary='Is Deliverable'
                    />
                </ListItem>
                <Divider variant='middle' />
            </React.Fragment>
        );
        return (
            <Grid container
                direction='row'
                alignContent='center'
                alignItems='center'
                justify='center'
                spacing={2}
            >
                <Grid item xs={12}>
                    <Typography variant='h3' gutterBottom>
                        Product Details
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Button variant='text' color='primary' component={RouterLink} to='/products'>
                        Return to Products
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Paper elevation={6}>
                        <Grid 
                            container 
                            direction='row' 
                            alignContent='center' 
                            alignItems='center' 
                            justify='center'
                        >
                            <Grid item xs={12} lg={5}>
                                {
                                    this.props.loadingGet || isUndefinedOrNull(this.props.product) || this.props.product === ''? 
                                    <Skeleton style={{margin: 'auto'}} variant='rect' width='100%' height={300} /> :
                                    <ProductImageSlider productImages={this.props.product.ProductImages} label={this.props.product.name}/>

                                }
                            </Grid>
                            <Grid item xs={12} lg={7}>
                                <List>
                                    {
                                        listItems.map((productField, i) => (
                                            <React.Fragment key={i}>
                                                <ListItem>
                                                    <ListItemText 
                                                        primary={
                                                            this.props.loadingGet ?
                                                            <Skeleton />
                                                            :
                                                            <Typography variant='body1'>
                                                                {this.renderProductField(this.props.product[productField.field], productField.type)}
                                                            </Typography>
                                                        }
                                                        secondary={productField.label}
                                                    />
                                                </ListItem>
                                                <Divider variant='middle' />
                                            </React.Fragment>
                                        ))
                                    }
                                {
                                    this.props.product.isDigital ? digitalRender : physicalRender
                                }
                                </List>
                            </Grid>
                        </Grid>
                    </Paper>
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
    getProduct,
    getProductBySlug
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(Product)))
