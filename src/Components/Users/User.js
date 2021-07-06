import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link as RouterLink } from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import UserOverview from './UserTabs/UserOverview';
import UserShippingAddresses from './UserTabs/UserShippingAddresses';
import UserOrders from './UserTabs/UserOrders';
import {withStyles} from '@material-ui/core'

const styles = theme => ({
    tab: {
        '&:hover': {
            color: '#40a9ff',
            opacity: 1,
        },
    }
})

class User extends Component {
    state = {
        value: 0
    }
    handleChangeTabs(e, newTab) {
        this.setState({
            value: newTab
        });
    }
    render() {
        const {classes} = this.props;
        return (
            <Grid container
                direction='row'
                wrap='wrap'
                justify='center'
                alignContent='center'
                alignItems='center'
                spacing={2}
            >
                <Grid item xs={12}>
                    <Typography variant='h3'>
                        User
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Button variant='text' color='primary' component={RouterLink} to='/users'>
                        Return to Users
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Tabs value={this.state.value} onChange={this.handleChangeTabs.bind(this)} aria-label='user tabs'>
                        <Tab className={classes.tab} label='Overview' />
                        <Tab className={classes.tab} label='Addresses' />
                        <Tab className={classes.tab} label='Orders' />
                    </Tabs>
                </Grid>
                <UserOverview value={this.state.value} index={0} />
                <UserShippingAddresses value={this.state.value} index={1} />
                <UserOrders value={this.state.value} index={2} />
            </Grid>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.users.user,
    loadingUser: state.users.loadingUser,
    errorExistsGetUser: state.users.errorExistsGetUser,
    statusMessage: state.users.statusMessage
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(User)))
