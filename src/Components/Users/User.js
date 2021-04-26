import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withRouter, Link as RouterLink} from 'react-router-dom'
import {
    getUser
} from '../../Actions/Users'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Skeleton from '@material-ui/lab/Skeleton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

class User extends Component {
    componentDidMount(){
        this.props.getUser({
            id: this.props.match.params.id
        });
    }
    renderUserDetail(val, type=null){
        //check if type is specified
        if(type){
            switch(type){
                case 'Date':
                    return new Date(val).toLocaleDateString('en-US')
                case 'DateTime':
                    return `${new Date(val).toLocaleDateString('en-US')} ${new Date(val).toLocaleTimeString('en-US')}`
                default: return val
            }
        }else{
            return val;
        }
    }
    render() {
        const cells = [
            {
                label: 'ID#',
                field: 'id'
            },
            {
                label: 'First Name',
                field: 'firstName'
            },
            {
                label: 'Last Name',
                field: 'lastName'
            },
            {
                label: 'Email',
                field: 'email'
            },
            {
                label: 'DOB',
                field: 'birthdate',
                type: 'Date'
            },
            {
                label: 'Role',
                field: 'role'
            },
            {
                label: 'Created At',
                field: 'createdAt',
                type: 'DateTime'
            }
        ]
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
                        User Details
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Button variant='text' color='primary' component={RouterLink} to='/users'>
                        Return to Users
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Paper elevation={4}>
                        <TableContainer>
                            <Table>
                                <TableBody>
                                    {
                                        cells.map((row, i) => (
                                            <TableRow key={i}>
                                                <TableCell>
                                                    <Typography variant='body2' color='textSecondary'>
                                                        {row.label}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    {
                                                        this.props.loadingUser || this.props.errorExistsGetUser ?
                                                        <Skeleton variant='text' height={15} />
                                                        :
                                                        <Typography variant='body1'>
                                                            {this.renderUserDetail(this.props.user[row.field], row.type)}
                                                        </Typography>
                                                    }
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>
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
    getUser
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(User))
