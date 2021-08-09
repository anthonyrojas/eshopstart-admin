import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TextField from '@material-ui/core/TextField'
import {
    changeBusinessAddressCity
} from '../../../../Actions/AppSetting'

export default function City() {
    const businessAddress = useSelector(state => state.appSetting.businessAddress);
    const dispatch = useDispatch();
    return (
        <TextField 
            fullWidth
            variant='outlined'
            label='City'
            value={businessAddress.city}
            onChange={(e) => dispatch(changeBusinessAddressCity(e.target.value))}
        />
    )
}
