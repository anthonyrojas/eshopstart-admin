import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import { useSelector, useDispatch } from 'react-redux';
import {
    changeBusinessAddressStreet
} from '../../../../Actions/AppSetting'

export default function Street() {
    const businessAddress = useSelector(state => state.appSetting.businessAddress);
    const dispatch = useDispatch();
    return (
        <TextField 
            fullWidth
            variant='outlined'
            label='Street'
            value={businessAddress.street}
            onChange={(e) => dispatch(changeBusinessAddressStreet(e.target.value))}
        />
    )
}
