import React, { Component } from 'react'
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Skeleton from '@material-ui/lab/Skeleton';
import CircularProgress from '@material-ui/core/CircularProgress';
import CardHeader from '@material-ui/core/CardHeader';
import {
    getAppSettingCategories,
    getAppSettings
} from '../../Actions/AppSetting';
import Logo from './AppSettingsCards/Logo';
import BusinessAddress from './AppSettingsCards/BusinessAddress';

class AppSettings extends Component {
    componentDidMount(){
        this.props.getAppSettingCategories();
        this.props.getAppSettings();
    }
    renderContent = () => {
        return(
            <React.Fragment>
                <Grid item xs={12} lg={6}>
                    <BusinessAddress />
                </Grid>
                <Grid item xs={12} lg={6}>
                    <Logo />
                </Grid>
                <Grid item xs={12}>
                </Grid>
            </React.Fragment>
        )
    }
    render() {
        return (
            <Grid container
                direction='row'
                alignContent='center'
                alignItems='stretch'
                justify='center'
                wrap='wrap'
                spacing={2}
            >
                <Grid item xs={12}>
                    <Typography variant='h3'>App Settings</Typography>
                </Grid>
                {
                    this.props.gettingAll ? 
                    <CircularProgress />
                    :
                    this.renderContent()
                }
            </Grid>
        );
    }
}

const mapStateToProps = (state) => ({
    gettingAll: state.appSetting.gettingAll,
    appSettingCategories: state.appSetting.appSettingCategories,
    appSettings: state.appSetting.appSettings,
    errorExists: state.appSetting.errorExists,
    statusMessage: state.appSetting.statusMessage
})

const mapDispatchToProps = {
    getAppSettingCategories,
    getAppSettings
}

export default connect(mapStateToProps, mapDispatchToProps)(AppSettings)
