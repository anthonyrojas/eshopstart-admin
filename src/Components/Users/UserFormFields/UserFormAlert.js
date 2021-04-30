import React from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {makeStyles} from '@material-ui/core/styles'
import Alert from '@material-ui/lab/Alert';
import Collapse from '@material-ui/core/Collapse';
import Grid from '@material-ui/core/Grid';
import {resetUserStatusMessage} from '../../../Actions/Users';
import { isUndefinedOrNullOrEmpty } from '../../../helpers';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }));

export default function UserFormAlert(props) {
    const errorExistsAddUser = useSelector(state => state.users.errorExistsAddUser);
    const statusMessage = useSelector(state => state.users.statusMessage);
    const dispatch = useDispatch();
    const classes = useStyles();
    if(errorExistsAddUser && !isUndefinedOrNullOrEmpty(statusMessage)){
        return (
            <Collapse in={!isUndefinedOrNullOrEmpty(statusMessage)}>
                <Alert severity='error' variant='filled' onClose={() => dispatch(resetUserStatusMessage(''))}>
                    {statusMessage}
                </Alert>
            </Collapse>
        )
    }else if(!errorExistsAddUser && !isUndefinedOrNullOrEmpty(statusMessage)){
        return(
            <Collapse in={!isUndefinedOrNullOrEmpty(statusMessage)}>
                <Alert severity='success' variant='filled' onClose={() => dispatch(resetUserStatusMessage(''))}>
                    {statusMessage}
                </Alert>
            </Collapse>
        )
    }else{
        return (
            <Collapse in={!isUndefinedOrNullOrEmpty(statusMessage)}>
                {null}
            </Collapse>
        )
    }
}
