import React from 'react';
import Button from '@material-ui/core/Button';
import {Link as RouterLink} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import Orange from '@material-ui/core/colors/orange'

const useStyles = makeStyles({
    btn: {
        backgroundColor: Orange[400],
        "&:hover": {
            backgroundColor: Orange[600]
        }
    }
})

export default function ProductListButton() {
    const classes = useStyles();
    return (
        <Button className={classes.btn} variant='contained' component={RouterLink} to={`/products`}>
            Product List
        </Button>
    )
}
