import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import UserDataGrid from './UserDataGrid';

export default function Users() {
    return (
        <Grid container
            direction='row'
            alignContent='center'
            alignItems='center'
            justify='center'
            spacing={2}
        >
            <Grid item xs={12}>
                <Typography align='center' variant='h3' gutterBottom>
                    Users
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <UserDataGrid />
            </Grid>
        </Grid>
    )
}
