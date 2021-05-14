import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {useTheme} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import {useDispatch, useSelector} from 'react-redux';
import {
    toggleEditProductInventory
} from '../../Actions/ProductInventory';
import AmountInput from './ProductInventoryFormFields/AmountInput';
import SaveButton from './ProductInventoryFormFields/SaveButton';
export default function ProductInventoryFormDialog() {
    const theme = useTheme();
    const editing = useSelector(state => state.productInventory.editing);
    const dispatch = useDispatch();
    const loadingInventory = useSelector(state => state.productInventory.loadingInventory);
    const fullscreen = useMediaQuery(theme.breakpoints.down('sm'));
    return (
        <Dialog
            fullScreen={fullscreen}
            open={editing}
            aria-labelledby='product-inventory-dialog'
        >
            {
                loadingInventory ?
                <LinearProgress color='primary' />
                :
                null
            }
            <DialogTitle id='product-inventory-dialog-title'>
                Edit Product Inventory
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Update the amount of inventory available for the current product. Adjust the value based on your real-world availability or feasible ability to obtain inventory. The inventory amount may be 0 when dropshipping, so long as you let the product remain as "Active".
                </DialogContentText>
                <DialogContentText>
                    <AmountInput />
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <SaveButton variant='text' />
                <Button color='secondary' disabled={loadingInventory} onClick={e => dispatch(toggleEditProductInventory(0))}>
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    )
}
