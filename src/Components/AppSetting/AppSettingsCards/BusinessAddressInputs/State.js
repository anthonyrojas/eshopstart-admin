import React, {useState} from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { useSelector, useDispatch } from 'react-redux';
import { STATE_OPTIONS } from '../../../../constants';
import { changeBusinessAddressState } from '../../../../Actions/AppSetting'

export default function State() {
    const businessAddress = useSelector(state => state.appSetting.businessAddress);
    const dispatch = useDispatch();
    return(
        <FormControl
            variant='outlined'
            fullWidth
        >
            <InputLabel id='business-state-input-label' variant='outlined'>State</InputLabel>
            <Select
                id='business-state-input'
                labelId='business-state-input-label'
                value={businessAddress.state}
                fullWidth
                onChange={(e) => dispatch(changeBusinessAddressState(e.target.value))}
            >
                {
                    STATE_OPTIONS.map((state, i) => (
                        <MenuItem
                            key={state.name}
                            value={state.abbreviation}
                        >
                            {state.abbreviation}
                        </MenuItem>
                    ))
                }
            </Select>

        </FormControl>
    )
}
