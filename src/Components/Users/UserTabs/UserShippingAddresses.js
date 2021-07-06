import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {DataGrid} from '@material-ui/data-grid';
import Alert from '@material-ui/lab/Alert'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {
    getUserShippingAddresses
} from '../../../Actions/ShippingAddress';
import { isUndefinedOrNullOrEmpty } from '../../../helpers';

const useStyles = makeStyles({
    dataGrid: {
        '& .MuiDataGrid-columnsContainer': {
            backgroundColor: '#111'
        },
        height: 500,
    }
});

const cols = [
    {
        field: 'id',
        headerName: 'ID',
        type: 'number',
        width: 100
    },
    {
        field: 'street',
        headerName: 'Street',
        width: 200
    },
    {
        field: 'apt',
        headerName: 'Apt',
        width: 100
    },
    {
        field: 'city',
        headerName: 'City',
        width: 200
    },
    {
        field: 'state',
        headerName: 'State',
        width: 150
    },
    {
        field: 'zip',
        headerName: 'Zipcode',
        width: 150
    },
    {
        field: 'createdAt',
        headerName: 'Created At',
        renderCell: (params) => new Date(params.value).toLocaleDateString(),
        type: 'date'
    }
]

export default function UserShippingAddresses(props) {
    const loading = useSelector(state => state.shippingAddress.loadingUserAddresses);
    const dispatch = useDispatch();
    const errorExists = useSelector(state => state.shippingAddress.errorExists);
    const statusMessage = useSelector(state => state.shippingAddress.statusMessage);
    const addresses = useSelector(state => state.shippingAddress.shippingAddresses);
    const {id} = useParams();
    const classes = useStyles();
    const { value, index, ...other } = props;
    useEffect(() => {
        dispatch(getUserShippingAddresses({
            userId: id
        }));
    }, [])
    return (
        <Grid item xs={12}
            role='tabpanel'
            hidden={index !== value}
            id={`user-tabpanel-${index}`}
            aria-labelledby={`user-tab-${index}`}
            {...other}
        >
            <Grid container
                direction='row'
                alignContent='center'
                alignItems='center'
                justify='center'
            >
                {
                    errorExists && !isUndefinedOrNullOrEmpty(statusMessage) ?
                    <Grid item xs={12}>
                        <Alert variant='filled' severity='error'>{statusMessage}</Alert>
                    </Grid>
                    :
                    null
                }
                <Grid item xs={12}>
                    <Paper className={classes.dataGrid} elevation={4}>
                        <DataGrid 
                            columns={cols}
                            rowsPerPageOptions={[10, 15, 25]}
                            loading={loading || errorExists}
                            rows={addresses}
                            disableSelectionOnClick
                        />
                    </Paper>
                </Grid>
            </Grid>
        </Grid>
    )
}
