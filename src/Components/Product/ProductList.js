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

const styles = theme => ({
    dataGrid: {
        '& .MuiDataGrid-columnsContainer': {
            backgroundColor: '#000'
        }
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
        this.props.getProducts({
            limit: this.props.limit,
            skip: (e.page-1)*this.props.limit,
            orderBy: this.props.orderBy,
            sort: this.props.sort
        })
    }
    pageSizeChanged = (e) => {
        let page = this.props.skip;
        while(this.props.productsCount < (page * e.pageSize)){
            page -= 1;
        }
        this.props.getProducts({
            limit: e.pageSize,
            skip: page,
            orderBy: this.props.orderBy,
            sort: this.props.sort
        })
    }
    render() {
        const cols = [
            {
                field: 'id',
                headerName: 'ID',
                type: 'number'
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
                    <Grid item xs={12} style={{height: 500}} className={classes.dataGrid}>
                        <DataGrid
                            columns={cols}
                            rows={this.props.products}
                            rowsPerPageOptions={[25, 50, 100]}
                            paginationMode='server'
                            rowCount={this.props.productsCount}
                            pageSize={this.props.limit}
                            page={(this.props.skip/this.props.limit) + 1}
                            onPageSizeChange={this.pageSizeChanged.bind(this)}
                            onSortModelChange={this.filterModelChanged.bind(this)}
                            onPageChange={this.pageChanged.bind(this)}
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
