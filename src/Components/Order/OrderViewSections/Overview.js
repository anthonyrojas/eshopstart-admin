import React from 'react'
import { useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Skeleton from '@material-ui/lab/Skeleton';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
    cardHeader: {
        background: '#111',
        padding: 10
    }
})

export default function Overview(props) {
    const classes = useStyles();
    const order = useSelector(state => state.order.order);
    const errorExists = useSelector(state => state.order.errorExists);
    const loadingOrder = useSelector(state => state.order.loadingOrder);
    const fieldMappings = [
        {
            field: 'id',
            label: 'ID' 
        },
        {
            field: 'total',
            label: 'Total'
        },
        {
            field: 'stripePaymentId',
            label: 'Stripe ID'
        },
        {
            field: 'paymentStatus',
            label: 'Payment Status'
        },
    ]
    return (
        <Grid
            container
            direction='row'
            alignContent='center'
            alignItems='center'
            justify='center'
        >
            <Grid item xs={12}>
                <Typography variant='h5' className={classes.cardHeader} align='center'>
                    Order Overview
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <List>
                    {
                        fieldMappings.map((field, i) => 
                            <React.Fragment key={`${i}_${field}`}>
                                <ListItem>
                                    <ListItemText 
                                        primary={
                                            <Typography variant='body2' color='textSecondary'>
                                                {field.label}
                                            </Typography>
                                        }
                                        secondary={
                                            loadingOrder || errorExists || order === '' ? 
                                            <Skeleton />
                                            :
                                            <Typography variant='body1' color='textPrimary'>
                                                {order[field.field]}
                                            </Typography>
                                        }
                                    />
                                </ListItem>
                                <Divider variant='fullWidth' />
                            </React.Fragment>
                        )
                    }
                </List>
            </Grid>
        </Grid>
    )
}