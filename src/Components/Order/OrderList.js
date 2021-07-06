import React, { Component } from 'react'
import { connect } from 'react-redux';
import {DataGrid} from '@material-ui/data-grid';
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import {withStyles} from '@material-ui/core/styles';
import {Link as RouterLink} from 'react-router-dom';
import {getOrders} from '../../Actions/Order';

const styles = theme => ({
    dataGrid: {
        '& .MuiDataGrid-columnsContainer': {
            backgroundColor: '#111'
        },
        height: 1000,
    }
});


class Orders extends Component {
    componentDidMount(){
        this.props.getOrders({
            userId: this.props.userId || null,
            limit: this.props.limit,
            skip: this.props.skip
        })
    }
    filterModelChanged = (e) => {
        this.props.getOrders({
            userId: this.props.userId || null,
            limit: this.props.limit,
            skip: this.props.skip
        })
    }

    pageChanged = (e) => {
        //check to make sure page vlue is changing to prevent rerender and subsquent api calls
        if(this.props.skip !== (e.page)*this.props.limit){
            this.props.getOrders({
                userId: this.props.userId || null,
                limit: this.props.limit,
                skip: (e.page)*this.props.limit,
                orderBy: this.props.orderBy,
                sort: this.props.sort
            })
        }
    }

    pageSizeChanged = (e) => {
        let nextSkip = this.props.skip;
        while(this.props.productsCount < (nextSkip * e.page) && nextSkip > 0){
            nextSkip -= 1;
        }
        //check to make sure the next page size is different to prevent rerender and subsequent api call
        if(this.props.limit !== e.pageSize){
            this.props.getOrders({
                userId: this.props.userId || null,
                limit: e.pageSize,
                skip: nextSkip,
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
                width: 125,
                renderCell: (params) => (
                    <strong>
                        <IconButton
                            color='primary'
                            component={RouterLink}
                            to={`/orders/${params.value}`}
                        >
                            <VisibilityIcon />
                        </IconButton>
                        {params.value}
                    </strong>
                )
            },
            {
                field: 'total',
                headerName: 'Total',
                type: 'number',
                width: 150,
                renderCell: (params) => (
                    <>${params.value}</>
                )
            },
            {
                field: 'stripePaymentId',
                headerName: 'Stripe ID',
                width: 200
            },
            {
                field: 'paymentStatus',
                headerName: 'Payment Status',
                width: 200
            },
            {
                field: 'userId',
                headerName: 'User Id',
                type: 'number',
                width: 125
            },
            {
                field: 'createdAt',
                headerName: 'Placed On',
                type: 'date',
                width: 200
            },
            {
                field: 'updatedAt',
                headerName: 'Last Updated',
                type: 'date',
                width: 200
            }
        ]
        const {classes} = this.props;
        return (
            <DataGrid
                columns={cols}
                rows={this.props.orders}
                rowsPerPageOptions={[50, 100, 150]}
                paginationMode='server'
                rowCount={this.props.ordersCount}
                pageSize={this.props.limit}
                page={(this.props.skip/this.props.limit)}
                onPageSizeChange={this.pageSizeChanged.bind(this)}
                onSortModelChange={this.filterModelChanged.bind(this)}
                onPageChange={this.pageChanged.bind(this)}
                disableSelectionOnClick
                pagination={!this.props.loadingOrders}
                loading={this.props.loadingOrders || this.props.errorExists}
            />
        )
    }
}

const mapStateToProps = (state) => ({
    orders: state.order.orders,
    loadingOrders: state.order.loadingOrders,
    errorExists: state.order.errorExists,
    limit: state.order.limit,
    ordersCount: state.order.rowCount,
    skip: state.order.skip,
    orderBy: state.order.orderBy,
    sort: state.order.sort
})

const mapDispatchToProps = {
    getOrders
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Orders));
