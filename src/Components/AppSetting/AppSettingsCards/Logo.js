import React, {useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Skeleton from '@material-ui/lab/Skeleton';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button';
import { isUndefinedOrNull } from '../../../helpers';
import CardContent from '@material-ui/core/CardContent';
import {
    addAppSetting,
    updateAppSetting
} from '../../../Actions/AppSetting';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
    img: {
        height: 300
    }
}))

export default function Logo() {
    const classes = useStyles();
    const gettingAll = useSelector(state => state.appSetting.gettingAll);
    const appSettings = useSelector(state => state.appSetting.appSettings);
    const logo = appSettings.filter(appSetting => appSetting.category === 'logo')[0];
    const dispatch = useDispatch();
    const fileInputRef = useRef(null);
    const onChangeClick = () => {
        fileInputRef.current.click();
    }
    const onFileChange = (e) => {
        const file = e.target.files[0];
        console.log(file)
        function getBase64(fileInput){
            const reader = new FileReader();
            reader.readAsDataURL(fileInput);
            reader.onload = function(){
                const res = reader.result;
                //check if the logo is already set
                if(!isUndefinedOrNull(logo)){
                    dispatch(updateAppSetting({
                        id: logo.id,
                        category: 'logo',
                        content: {
                            data: res.toString()
                        }
                    }))
                }else{
                    dispatch(addAppSetting({
                        category: 'logo',
                        content: {
                            data: res.toString()
                        }
                    }))
                }
            }
            reader.onerror = function(e){
                console.log(e)
            }
        }
        if(file){
            getBase64(file);
        }
        if(!isUndefinedOrNull(logo)){
            //update the logo
        }
    }
    return (

        <Card>
            <CardHeader
                style={{textAlign:'center'}}
                title='Logo'
            />
            {
                gettingAll || isUndefinedOrNull(logo) ?
                <CardContent>
                    <Skeleton  variant='rectangle' />
                </CardContent>
                :
                <CardMedia 
                    className={classes.img}
                    image={logo.content.data}
                />
            }
            <CardActions>
                <Button 
                    variant='text' 
                    color='primary'
                    onClick={onChangeClick}
                >
                    Change
                </Button>
                <input 
                    type='file'
                    style={{display: 'none'}}
                    ref={fileInputRef}
                    onChange={onFileChange}
                />
            </CardActions>
        </Card>
    )
}
