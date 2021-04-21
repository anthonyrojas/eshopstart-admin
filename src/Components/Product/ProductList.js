import React, { Component } from 'react'
import { connect } from 'react-redux';
import {DataGrid} from '@material-ui/data-grid';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {withStyles} from '@material-ui/core/styles'
import {
    getProducts
} from '../../Actions/Product';
import { Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import {Link} from 'react-router-dom';

const styles = theme => ({
    dataGrid: {
        '& .MuiDataGrid-columnsContainer': {
            backgroundColor: '#000'
        },
        height: 1000,
    }
});

class ProductList extends Component {
    componentDidMount(){
        this.props.getProducts({
            limit: this.props.limit,
            skip: this.props.skip
        });
    }
    filterModelChanged = (e) => {
        this.props.getProducts({
            limit: this.props.limit,
            skip: this.props.skip,
            orderBy: e.sortModel[0] ? e.sortModel[0].field : '',
            sort: e.sortModel[0] ? e.sortModel[0].sort : ''
        });
    }
    pageChanged = (e) => {
        //check to make sure page value is changing to prevent rerender and subsequent api calls
        if(this.props.skip !== (e.page)*this.props.limit){
            this.props.getProducts({
                limit: this.props.limit,
                skip: (e.page)*this.props.limit,
                orderBy: this.props.orderBy,
                sort: this.props.sort
            })
        }
    }
    pageSizeChanged = (e) => {
        let page = this.props.skip;
        while(this.props.productsCount < (page * e.pageSize) && page > 0){
            page -= 1;
        }
        //check to make sure next page size is different to prevent rerender and subsequent api call
        if(this.props.limit !== e.pageSize){
            this.props.getProducts({
                limit: e.pageSize,
                skip: page,
                orderBy: this.props.orderBy,
                sort: this.props.sort
            })
        }
    }
    render() {
        const cols = [
            {
                field: 'id',
                headerName: 'ID',
                type: 'number',
                width: 100,
                renderCell: (params) => (
                    <strong>
                        <IconButton
                            color='primary'
                            component={Link}
                            to={`/products/${params.value}`}
                        >
                            <VisibilityIcon />
                        </IconButton>
                        {params.value}
                    </strong>
                )
            },
            {
                field: 'name',
                headerName: 'Name',
                width: 350,
            },
            {
                field: 'price',
                headerName: 'Price',
                width: 150,
                type: 'number'
            },
            {
                field: 'slug',
                headerName: 'Slug',
                width: 300,
            },
            {
                field: 'isActive',
                headerName: 'Active',
                width: 150
            }
        ]
        const {classes} = this.props;
        return (
            <Grid 
                container
                direction='row'
                alignContent='center'
                alignItems='center'
                justify='center'
            >
                <Grid item xs={12}>
                    <Typography align='center' variant='h3' gutterBottom>
                        Products
                    </Typography>
                </Grid>
                <Paper
                    elevation={4}
                    style={{width: '100%'}}
                >
                    <Grid item xs={12} 
                        className={classes.dataGrid}
                    >
                        <DataGrid
                            columns={cols}
                            rows={this.props.products}
                            rowsPerPageOptions={[3, 25, 50, 100]}
                            paginationMode='server'
                            //total number of products
                            rowCount={this.props.productsCount}
                            //number of rows per page
                            pageSize={this.props.limit}
                            page={(this.props.skip/this.props.limit)}
                            onPageSizeChange={this.pageSizeChanged.bind(this)}
                            onSortModelChange={this.filterModelChanged.bind(this)}
                            onPageChange={this.pageChanged.bind(this)}
                            disableSelectionOnClick
                            pagination={!this.props.loadingGet}
                            loading={this.props.loadingGet}
                        />
                    </Grid>
                </Paper>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => ({
    loadingGet: state.product.loadingGet,
    products: state.product.products,
    productsCount: state.product.rowCount,
    limit: state.product.limit,
    skip: state.product.skip,
    orderBy: state.product.orderBy,
    sort: state.product.sort
})

const mapDispatchToProps = {
    getProducts
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ProductList))
