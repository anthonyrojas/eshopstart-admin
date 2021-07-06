import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom'
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import {
    getUser
} from '../../../Actions/Users';
import Alert from '@material-ui/lab/Alert';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { isUndefinedOrNullOrEmpty } from '../../../helpers';

const renderUserDetail = (val, type=null) => {
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
export default function UserOverview(props) {
    const loadingUser = useSelector(state => state.users.loadingUser);
    const user = useSelector(state => state.users.user);
    const errorExists = useSelector(state => state.users.errorExistsGetUser);
    const statusMessage = useSelector(state => state.users.statusMessage);
    const dispatch = useDispatch();
    const {id} = useParams();
    const { value, index, ...other } = props;
    useEffect(() => {
        dispatch(getUser({
            id: id
        }));
    }, []);
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
                                                        loadingUser || errorExists ?
                                                        <Skeleton variant='text' height={15} />
                                                        :
                                                        <Typography variant='body1'>
                                                            {renderUserDetail(user[row.field], row.type)}
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
        </Grid>
    );
}
