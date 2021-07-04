import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    login
} from '../../Actions/Login';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import EmailInput from './EmailInput';
import PasswordInput from './PasswordInput';
import {withStyles} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import { isUndefinedOrNullOrEmpty } from '../../helpers';

const styles = theme => ({
    paper: {
        padding: theme.spacing(2)
    },
    buttonContainer: {
        textAlign: 'center'
    }
})

class Login extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.login({
            email: this.props.email,
            password: this.props.password
        })
    }
    render() {
        const {classes} = this.props;
        return (
            <Container maxWidth='md'>
                <Paper 
                    className={classes.paper}
                    elevation={4}
                >
                    <Grid container
                        direction='row'
                        spacing={4}
                        alignContent='center'
                        justify='center'
                        alignItems='center'
                        component='form'
                    >
                        <Grid item xs={12}>
                            {
                                isUndefinedOrNullOrEmpty(this.props.statusMessage) ?
                                null
                                :
                                <Alert variant='filled' color={this.props.errorExists ? 'error' : 'info'}>
                                    {this.props.statusMessage}
                                </Alert>

                            }
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant='h4' align='center'>Login</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <EmailInput />
                        </Grid>
                        <Grid item xs={12}>
                            <PasswordInput />
                        </Grid>
                        <Grid item xs={12} className={classes.buttonContainer}>
                            <Button
                                variant='contained'
                                type='submit'
                                color='primary'
                                onClick={this.handleSubmit.bind(this)}
                            >
                                Login
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({
    email: state.login.email,
    password: state.login.password,
    loading: state.login.loading,
    errorExists: state.login.errorExists,
    statusMessage: state.login.statusMessage
})

const mapDispatchToProps = {
    login
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login))
