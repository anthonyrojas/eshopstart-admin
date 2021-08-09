import React, {useEffect, useRef} from 'react';
import {
    addAppSetting, 
    updateAppSetting, 
} from '../../../../Actions/AppSetting';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import {
    useSelector,
    useDispatch
} from 'react-redux';
import Name from './Name';
import Street from './Street';
import City from './City';
import State from './State';
import Zip from './Zip';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { isUndefinedOrNull, isUndefinedOrNullOrEmpty } from '../../../../helpers';
import LinearProgress from '@material-ui/core/LinearProgress';
import Alert from '@material-ui/lab/Alert';

export default function BusinessAddressDialog(props){
    const prevAddingRef = useRef();
    const prevUpdatingRef = useRef();
    const dispatch = useDispatch();
    const adding = useSelector(state => state.appSetting.adding);
    const updating = useSelector(state => state.appSetting.updating);
    const businessAddressInput = useSelector(state => state.appSetting.businessAddress);
    const appSettings = useSelector(state => state.appSetting.appSettings);
    const businessAddress = appSettings.filter(appSetting => appSetting.category === 'from_address')[0];
    const statusMessage = useSelector(state => state.appSetting.statusMessage);
    const errorExists = useSelector(state => state.appSetting.errorExists);
    useEffect(() => {
        if((prevAddingRef.current !== adding || prevUpdatingRef.current !== updating) && !errorExists){
            props.setOpenEdit(false);
        }
    }, [adding, updating])
    useEffect(()=>{
        prevAddingRef.current = adding;
        prevUpdatingRef.current = updating;
    });
    const handleSubmit = () => {
        //validate address fields
        let error = false;
        Object.keys(businessAddressInput).forEach((key) => {
            if(isUndefinedOrNullOrEmpty(businessAddressInput[key])){
                error = true;
            }
            if(key === 'zip' && !(/^\d{5}$/.test(businessAddressInput[key]))){
                //zip is not formatted correctly
                error = true;
            }
        });
        if(!error && isUndefinedOrNull(businessAddress)){
            //add the new address
            dispatch(addAppSetting({
                category: 'from_address',
                content: {
                    ...businessAddressInput,
                    country: 'US'
                }
            }))
        }else if(!error){
            //update the current address,
            dispatch(updateAppSetting({
                id: businessAddress.id,
                category: 'from_address',
                content: {
                    id: businessAddress.id,
                    ...businessAddressInput,
                    country: 'US'
                }
            }));
        }
    }
    return(
        <Dialog 
            open={props.openEdit} 
            fullWidth={true}
            maxWidth='md'
        >
            {
                adding || updating ?
                <LinearProgress />
                :
                null
            }
            <DialogTitle>Business Address Form</DialogTitle>
            <DialogContent>
                {
                    errorExists && !isUndefinedOrNullOrEmpty(statusMessage) ?
                    <Alert severity='error' variant='filled'>{statusMessage}</Alert>
                    :
                    null
                }
                <DialogContentText>
                    Provide the business address that will appear on the shipping labels of order shipments.
                </DialogContentText>
                <Grid container
                    direction='row'
                    alignContent='center'
                    alignItems='center'
                    justify='center'
                    spacing={2}
                >
                    <Grid item xs={12}>
                        <Name />
                    </Grid>
                    <Grid item xs={12}>
                        <Street />
                    </Grid>
                    <Grid item xs={12}>
                        <City />
                    </Grid>
                    <Grid item xs={12}>
                        <State />
                    </Grid>
                    <Grid item xs={12}>
                        <Zip />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button 
                    variant='text'
                    color='secondary'
                    onClick={() => props.setOpenEdit(false)}
                    disabled={adding || updating}
                >
                    Cancel
                </Button>
                <Button 
                    variant='text'
                    color='primary'
                    onClick={handleSubmit}
                    disabled={adding || updating}
                >
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
}