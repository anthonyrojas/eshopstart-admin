import React from 'react';
import { useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import OrderList from '../../Order/OrderList';
import { isUndefinedOrNullOrEmpty } from '../../../helpers';

const useStyles = makeStyles({
    dataGrid: {
        '& .MuiDataGrid-columnsContainer': {
            backgroundColor: '#111'
        },
        height: 1000,
    }
});


export default function UserOrders(props) {
    const classes = useStyles();
    const {id} = useParams();
    const errorExists = useSelector(state => state.order.errorExists);
    const statusMessage = useSelector(state => state.order.statusMessage);
    const { value, index, ...other } = props;
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
                    <Paper elevation={4} style={{width: '100%'}} className={classes.dataGrid}>
                        <OrderList userId={id} />
                    </Paper>
                </Grid>
            </Grid>
        </Grid>
    )
}
