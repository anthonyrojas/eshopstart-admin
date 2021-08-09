import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import { useSelector, useDispatch } from 'react-redux';
import {
    changeBusinessAddressName
} from '../../../../Actions/AppSetting'

export default function Name() {
    const businessAddress = useSelector(state => state.appSetting.businessAddress);
    const dispatch = useDispatch();
    return (
        <TextField 
            fullWidth
            variant='outlined'
            label='Name'
            value={businessAddress.name}
            onChange={(e) => dispatch(changeBusinessAddressName(e.target.value))}
        />
    )
}
