import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';

function ElevationScroll(props){
    const {children, window} = props;

    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window ? window() : undefined
    });
    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0
    });
}

ElevationScroll.propTypes = {
    children: PropTypes.element.isRequired,
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

const useStyles = makeStyles(theme => ({
    offset: theme.mixins.toolbar,
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        background: 'linear-gradient(to left, #0cebeb, #20e3b2, #29ffc6)',
        color: '#000'
    }
}))

const SiteBar = (props) => {
    const classes = useStyles();
    return (
        <React.Fragment>
            <CssBaseline />
            <ElevationScroll {...props}>
                <AppBar className={classes.appBar} position='fixed'>
                    <Toolbar>
                        <Typography variant='h6'>{process.env.REACT_APP_BUSINESS_NAME}</Typography>
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
            <Toolbar variant='dense' />
            <div className={classes.offset} />
        </React.Fragment>
    )
}
export default SiteBar;