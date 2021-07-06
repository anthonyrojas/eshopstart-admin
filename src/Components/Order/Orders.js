import React, { Component } from 'react'
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import OrderList from './OrderList';
import { isUndefinedOrNullOrEmpty } from '../../helpers';

const styles = theme => ({
    dataGrid: {
        '& .MuiDataGrid-columnsContainer': {
            backgroundColor: '#111'
        },
        height: 1000,
    }
});


class Orders extends Component {
    render() {
        const {classes} = this.props;
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
                    <Typography align='center' variant='h3' gutterBottom>
                        Orders
                    </Typography>
                </Grid>
                {
                    this.props.errorExists && !isUndefinedOrNullOrEmpty(this.props.statusMessage) ?
                    <Grid item xs={12}>
                        <Alert variant='filled' severity='error'>{this.props.statusMessage}</Alert>
                    </Grid>
                    :
                    null
                }
                <Paper
                    elevation={4}
                    style={{width: '100%'}}
                >
                    <Grid item xs={12} className={classes.dataGrid}>
                        <OrderList />
                    </Grid>
                </Paper>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => ({
    errorExists: state.order.errorExists,
    statusMessage: state.order.statusMessage
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Orders));
