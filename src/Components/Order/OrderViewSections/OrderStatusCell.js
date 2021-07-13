import React, {useState} from 'react';
import Chip from '@material-ui/core/Chip';
import {makeStyles} from '@material-ui/core/styles';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import {useSelector, useDispatch} from 'react-redux';
import {
    updateOrderProductStatus
} from '../../../Actions/Order';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles({
    fulfillingChip: {
        backgroundColor: '#2196f3'
    },
    processingChip: {
        backgroundColor: '#ff9800',
        color: '#000'
    },
    deliveredChip: {
        backgroundColor: '#4caf50',
        color: '#000'
    },
    deliverBtn: {
        backgroundColor: '#00e676',
        color: '#000'
    }
});

function ConfirmationDialog(props){
    const dispatch = useDispatch();
    const updating = useSelector(state => state.order.updatingOPStatus);
    const handleDeliverClick = (event) => {
        dispatch(updateOrderProductStatus({
            productId: props.row.id,
            id: props.row.OrderProduct.id,
            orderStatus: 'Delivered'
        }));
    }
    return(
        <Dialog
            open={props.open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            {
                updating ?
                <LinearProgress style={{width: '100%'}} color='primary' />
                :
                null
            }
            <DialogTitle id="alert-dialog-title">Confirm Update Status</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                You are about to update the order status of this item to delivered. Are you sure this is what you want to do?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button 
                    color='primary' 
                    variant='text'
                    onClick={handleDeliverClick}
                    disabled={updating}
                >
                    Confirm
                </Button>
                <Button 
                    color='secondary' 
                    variant='text'
                    onClick={() => props.setOpen(false)}
                    disabled={updating}
                >
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default function OrderStatusCell(props) {
    const orderStatus = props.row.orderStatus;
    const updating = useSelector(state => state.order.updatingOPStatus);
    const classes = useStyles();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const handleDeliverClick = (event) => {
        dispatch(updateOrderProductStatus({
            productId: props.row.id,
            id: props.row.OrderProduct.id,
            orderStatus: 'Delivered'
        }));
    }
    switch(orderStatus.toLowerCase()){
        case 'fulfilling':
            return(
                <React.Fragment>
                    <Chip className={classes.fulfilledChip}>
                        {orderStatus}
                    </Chip>
                    <Tooltip title="Update to delivered">
                        <IconButton className={classes.deliverBtn} onClick={handleDeliverClick} disabled={updating}>
                            <CheckCircleIcon />
                        </IconButton>
                    </Tooltip>
                    <ConfirmationDialog />
                </React.Fragment>
            )
        case 'delivered':
            setOpen(false);
            return(
                <React.Fragment>
                    <Chip className={classes.deliveredChip}>
                        {orderStatus}
                    </Chip>
                    <ConfirmationDialog open={false} />
                </React.Fragment>
            )
        default:
            return(
                <Chip className={classes.processingChip}>
                    Processing
                </Chip>
            );
    }
}
