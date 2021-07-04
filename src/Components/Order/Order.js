import React, { Component } from 'react'
import { connect } from 'react-redux';
import {Link as RouterLink, withRouter} from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Overview from './OrderViewSections/Overview';
import OrderUser from './OrderViewSections/OrderUser';
import OrderProductList from './OrderViewSections/OrderProductList';
import {
    getOrder
} from '../../Actions/Order';
import Alert from '@material-ui/lab/Alert';
import { isUndefinedOrNullOrEmpty } from '../../helpers';

class Order extends Component {
    componentDidMount(){
        this.props.getOrder({
            orderId: this.props.match.params.id
        })
    }
    render() {
        return (
            <Grid
                container
                direction='row'
                alignContent='center'
                alignItems='center'
                justify='center'
                spacing={2}
            >
                <Grid item xs={12}>
                    <Typography variant='h3'>
                        Order
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant='text'
                        color='primary'
                        component={RouterLink}
                        to='/orders'
                    >
                        View Orders
                    </Button>
                </Grid>
                {
                    this.props.errorExists && !isUndefinedOrNullOrEmpty(this.props.statusMessage) ?
                    <Grid item xs={12}>
                        <Alert variant='filled' severity='error'>{this.props.statusMessage}</Alert>
                    </Grid>
                    :
                    null
                }
                <Grid item xs={12} lg={6}>
                    <Paper elevation={2}>
                        <Overview />
                    </Paper>
                </Grid>
                <Grid item xs={12} lg={6}>
                    <Paper elevation={2}>
                        <OrderUser />
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper elevation={2}>
                        <OrderProductList />
                    </Paper>
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => ({
    order: state.order.order,
    statusMessage: state.order.statusMessage,
    errorExists: state.order.errorExists
})

const mapDispatchToProps = {
    getOrder
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Order));

/*
sample response:
------------------
order: {
    id: 0,
    total: 50.00,
    stripePaymentId: 'stripe_asdjvhasvbdbkjas',
    paymentStatus: 'Completed',
    User: {
        id: 1,
        email: 'bob@gmail.com',
        firstName: 'Bob',
        lastName: 'Smith'
    },
    Products: [
        {
            id: 0,
            name: 'Hat',
            description: 'A really cool hat!',
            price: 25.00,
            slug: 'hat',
            isDeliverable: true,
            isDigital: false,
            digitalPath: null,
            downloadsPermitted: 0,
            weight: .20,
            height: 1,
            width: 1,
            length: 1,
            sku: 'AS56855168',
            upc: 84165165192,
            isbn: null,
            isActive: true,
            createdAt: '06/01/2021',
            updatedAt: '06/01/2021',
            OrderProduct: {
                orderStatus: 'Completed',
                amount: 2,
                downloadsRemaining: 0,
            }
        }
    ]
}
 */