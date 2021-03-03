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
            <Paper elevation={6} className={classes.paper}>
                <Grid 
                    container 
                    direction='row' 
                    alignContent='center' 
                    alignItems='center' 
                    justify='center'
                    spacing={2}
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
                        <ListItem>
                            <ListItemText 
                                primary={
                                    this.props.loadingGet ? 
                                    <Skeleton />
                                    :
                                    <Typography variant='body1'>
                                        {this.props.product.id}
                                    </Typography>
                                }
                                secondary='ID'
                            />
                        </ListItem>
                        <Divider variant='middle'/>
                        <ListItem>
                            <ListItemText 
                                primary={
                                    this.props.loadingGet ? 
                                    <Skeleton />
                                    :
                                    <Typography variant='body1'>
                                        {this.props.product.slug}
                                    </Typography>
                                }
                                secondary='Slug'
                            />
                        </ListItem>
                        <Divider variant='middle'/>
                        <ListItem>
                            <ListItemText 
                                primary={
                                    this.props.loadingGet ? 
                                    <Skeleton />
                                    :
                                    <Typography variant='h5'>
                                        {this.props.product.name}
                                    </Typography>                                    
                                }
                                secondary='Name'
                            />
                        </ListItem>
                        <Divider variant='middle'/>
                        <ListItem>
                            <ListItemText 
                                primary={
                                    this.props.loadingGet ? 
                                    <Skeleton />
                                    :
                                    <Typography variant='body1'>
                                        {this.props.product.description}
                                    </Typography>
                                }
                                secondary='Description'
                            />
                        </ListItem>
                        <Divider variant='middle'/>
                        <ListItem>
                            <ListItemText 
                                primary={
                                    this.props.loadingGet ? 
                                    <Skeleton />
                                    :
                                    <Typography variant='body1'>
                                        ${this.props.product.price}
                                    </Typography>
                                }
                                secondary='Price'
                            />
                        </ListItem>
                        <Divider variant='middle'/>
                        <ListItem>
                            <ListItemText 
                                primary={
                                    this.props.loadingGet ?
                                    <Skeleton />
                                    :
                                    <Typography variant='body1'>
                                        {new String(this.props.product.isActive).toUpperCase()}
                                    </Typography>
                                }
                                secondary='Is Active'
                            />
                        </ListItem>
                        <Divider variant='middle'/>
                        <ListItem>
                            <ListItemText
                                primary={
                                    this.props.loadingGet ? 
                                    <Skeleton />
                                    :
                                    <Typography variant='body1'>
                                        {new String(this.props.product.isDigital).toUpperCase()}
                                    </Typography>
                                }
                                secondary='Is Digital'
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
                                        {isUndefinedOrNullOrEmpty(this.props.product.sku) ? 'N/A' : this.props.product.sku}
                                    </Typography>
                                }
                                secondary='SKU'
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
                                        {
                                            isUndefinedOrNullOrEmpty(this.props.product.upc) ? 'N/A' : this.props.product.upc
                                        }
                                    </Typography>
                                }
                                secondary='UPC'
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
                                        {
                                            isUndefinedOrNullOrEmpty(this.props.product.isbn) ? 'N/A' : this.props.product.isbn
                                        }
                                    </Typography>
                                }
                                secondary='ISBN'
                            />
                        </ListItem>
                        <Divider variant='middle'/>
                        {
                            this.props.product.isDigital ? digitalRender : physicalRender
                        }
                    </List>
                    </Grid>
                </Grid>
            </Paper>
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
