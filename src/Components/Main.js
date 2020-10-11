import React from 'react';
import {makeStyles} from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar'

const useStyles = makeStyles(theme => ({
    content: {
      flexGrow: 1,
      padding: theme.spacing(3)
    }
}));
export default function Main(props) {
    const classes = useStyles();
    return (
        <main className={classes.content}>
            <Toolbar />
            {props.children}
        </main>
    )
}
