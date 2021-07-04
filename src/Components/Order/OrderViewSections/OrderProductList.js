import React from 'react';
import {useSelector} from 'react-redux'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid';
import {DataGrid} from '@material-ui/data-grid';
import {makeStyles} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import {Link} from 'react-router-dom'
import { isUndefinedOrNull } from '../../../helpers';

const useStyles = makeStyles({
    dataGrid: {
        '& .MuiDataGrid-columnsContainer': {
            backgroundColor: '#111'
        },
        height: 600,
    },
    cardHeader: {
        background: '#111',
        padding: 10
    }
})
export default function OrderProductList(props) {
    const classes = useStyles();
    const loadingOrder = useSelector(state => state.order.loadingOrder);
    const errorExists = useSelector(state => state.order.errorExists);
    const order = useSelector(state => state.order.order);
    const cols = [
        {
            field: 'id',
            headerName: 'ID',
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
            width: 150
        },
        {
            field: 'price',
            headerName: 'Price',
            width: 150,
            type: 'number',
            valueFormatter: (params) => `$${params.value}`
        },
        {
            field: 'upc',
            headerName: 'UPC',
            width: 150
        },
        {
            field: 'isDigital',
            headerName: 'Digital',
            width: 100,
            renderCell: (params) => params.value ? 'True' : 'False'
        },
        {
            field: 'quantity',
            headerName: 'Quantity',
            type: 'number',
            width: 150,
            valueGetter: (params) => params.row.OrderProduct.amount
        },
        {
            field: 'downloadsRemaining',
            headerName: 'Downloads Remaining',
            type: 'number',
            width: 150,
            valueGetter: (params) => isUndefinedOrNull(params.row.OrderProduct.downloadsRemaining) ? 0 : params.row.OrderProduct.downloadsRemaining
        },
    ]
    return (
        <Grid 
            container
            direction='row'
            justify='center'
            alignItems='center'
            alignContent='center'
        >
            <Grid item xs={12} className={classes.cardHeader}>
                <Typography variant='h5' align='center'>
                    Order Products
                </Typography>
            </Grid>
            <Grid item xs={12} className={classes.dataGrid}>
                <DataGrid
                    columns={cols}
                    rows={order.Products || []}
                    loading={loadingOrder || order === '' || errorExists}
                    disableSelectionOnClick
                />
            </Grid>
        </Grid>
    )
}
