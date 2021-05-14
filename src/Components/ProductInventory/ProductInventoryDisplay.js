import React from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Skeleton from '@material-ui/lab/Skeleton';
import Typography from '@material-ui/core/Typography';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import {
    toggleEditProductInventory
} from '../../Actions/ProductInventory'
import {useSelector, useDispatch} from 'react-redux'
export default function ProductInventoryDisplay() {
    const productInventory = useSelector(state => state.productInventory.productInventory);
    const loadingInventory = useSelector(state => state.productInventory.loadingInventory)
    const loadingGet = useSelector(state => state.product.loadingGet);
    const dispatch = useDispatch();
    return (
        <React.Fragment>
            <ListItem>
                <ListItemText
                    primary={
                        <Typography variant='h5'>
                            Inventory
                        </Typography>
                    }
                />
            </ListItem>
            <ListItem>
                <ListItemText
                    primary={
                        loadingGet || loadingInventory ?
                        <Skeleton />
                        :
                        <Typography variant='body1'>
                            {productInventory.amount}
                        </Typography>
                    }
                    secondary='Inventory Amount'
                />
                <ListItemSecondaryAction>
                    {
                        loadingGet || loadingInventory ?
                        null
                        :
                        <IconButton edge='end' color='primary' aria-label='edit' onClick={e => dispatch(toggleEditProductInventory(productInventory.amount))}>
                            <EditIcon />
                        </IconButton>
                    }
                </ListItemSecondaryAction>
            </ListItem>
            <Divider variant='middle'/>
        </React.Fragment>
    )
}
