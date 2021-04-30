import React, { Component } from 'react'
import { connect } from 'react-redux'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Email from './UserFormFields/Email';
import FirstName from './UserFormFields/FirstName';
import LastName from './UserFormFields/LastName';
import Password from './UserFormFields/Password';
import BirthDate from './UserFormFields/BirthDate';
import Role from './UserFormFields/Role';
import MiddleInitial from './UserFormFields/MiddleInitial';
import SaveButton from './UserFormFields/SaveButton';
import UserFormAlert from './UserFormFields/UserFormAlert';
import {
    addUser,
} from '../../Actions/Users';

class UserForm extends Component {
    handleCloseAlert = (e) => {
        this.props.resetUserStatusMessage('');
    }
    handleOnSubmit = (e) =>{
        e.preventDefault();
        this.props.addUser({
            birthdate: this.props.birthdate,
            email: this.props.email,
            firstName: this.props.firstName,
            lastName: this.props.lastName,
            password: this.props.password,
            middleInitial: this.props.middleInitial,
            role: this.props.role
        })
    }
    render() {
        return (
            <Grid container
                direction='row'
                alignContent='center'
                alignItems='center'
                justify='center'
                spacing={2}
            >
                <Grid item xs={12}>
                    <Typography variant='h3' align='center' gutterBottom>
                        User Form
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Paper style={{padding: 16}}>
                        <Grid container
                            direction='row'
                            alignContent='center'
                            alignItems='center'
                            justify='center'
                            spacing={2}
                            component='form'
                            method='POST'
                            action='/'
                            onSubmit={this.handleOnSubmit}
                        >
                            <Grid item xs={12}>
                                <UserFormAlert />
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <FirstName />
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <LastName />
                            </Grid>
                            <Grid item xs={12} lg={1}>
                                <MiddleInitial />
                            </Grid>
                            <Grid item xs={12} lg={11}>
                                <Email />
                            </Grid>
                            <Grid item xs={12}>
                                <Password />
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <BirthDate />
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <Role />
                            </Grid>
                            <Grid item xs={12} style={{textAlign: 'center'}}>
                                <SaveButton />
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => ({
    birthdate: state.users.birthdate,
    email: state.users.email,
    firstName: state.users.firstName,
    lastName: state.users.lastName,
    middleInitial: state.users.middleInitial,
    password: state.users.password,
    role: state.users.role,
})

const mapDispatchToProps = {
    addUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(UserForm)
