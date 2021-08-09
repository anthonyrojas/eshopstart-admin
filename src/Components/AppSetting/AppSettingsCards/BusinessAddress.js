import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Skeleton from '@material-ui/lab/Skeleton';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button';
import { isUndefinedOrNull } from '../../../helpers';
import CardContent from '@material-ui/core/CardContent';
import {
    changeBusinessAddress
} from '../../../Actions/AppSetting';
import BusinessAddressDialog from './BusinessAddressInputs/BusinessAddressDialog';

const fieldMappings = [
    'street',
    'city',
    'state',
    'zip'
]

export default function BusinessAddress(){
    const gettingAll = useSelector(state => state.appSetting.gettingAll);
    const appSettings = useSelector(state => state.appSetting.appSettings);
    const businessAddress = appSettings.filter(appSetting => appSetting.category === 'from_address')[0];
    const [openEdit, setOpenEdit] = React.useState(false);
    const dispatch = useDispatch();
    const handleEditClick = () => {
        setOpenEdit(true);
    }
    useEffect(()=>{
        if(businessAddress !== undefined && Object.keys(businessAddress).length > 0){
            dispatch(changeBusinessAddress({
                name: businessAddress.content.name,
                street: businessAddress.content.street,
                city: businessAddress.content.city,
                state: businessAddress.content.state,
                zip: businessAddress.content.zip
            }))
        }
    }, [businessAddress]);
    return(
        <React.Fragment>
            <Card>
                <CardHeader 
                    style={{textAlign: 'center'}}
                    title='Business Address'
                />
                <CardContent>
                    {
                        gettingAll || isUndefinedOrNull(businessAddress) || Object.keys(businessAddress.content).length < 1 ?
                        <React.Fragment>
                            <Skeleton />
                            <Skeleton />
                            <Skeleton />
                            <Skeleton />
                            <Skeleton />
                        </React.Fragment>
                        :
                        <React.Fragment>
                            <Typography variant='h6' component='p'>
                                {businessAddress.content.name}
                            </Typography>
                            {
                                fieldMappings.map((key, i) => (
                                    <Typography key={i} variant='body1'>{businessAddress.content[key]}</Typography>
                                ))
                            }
                        </React.Fragment>
                    }
                </CardContent>
                <CardActions>
                    <Button 
                        color='primary'
                        onClick={handleEditClick}
                    >
                        Edit
                    </Button>
                </CardActions>
            </Card>
            <BusinessAddressDialog
                openEdit={openEdit}
                setOpenEdit={setOpenEdit}
            />
        </React.Fragment>
    );
}