import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import {
    changeBusinessAddressZip
} from '../../../../Actions/AppSetting'

export default function Zip() {
    const businessAddress = useSelector(state => state.appSetting.businessAddress);
    const dispatch = useDispatch();
    const handleZipChange = (e) => {
        const regExp = /^\d*$/;
        if(regExp.test(e.target.value) && e.target.value.length <= 5){
            dispatch(changeBusinessAddressZip(e.target.value))
        }
    }
    return (
        <TextField 
            fullWidth
            variant='outlined'
            label='Zip'
            value={businessAddress.zip}
            onChange={handleZipChange}
        />
    )
}
