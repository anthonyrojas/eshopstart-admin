import React, { Component } from 'react'
import { connect } from 'react-redux';
import Modal from '@material-ui/core/Modal';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import {withStyles} from '@material-ui/core';

const styles = theme => ({
    cardContent: {
        textAlign: 'center'
    },
    card: {
        outline: 'none',
    },
    modal: {
        outline: 'none',
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

class LoadingModal extends Component {
    render() {
        const msg = this.props.loadingAdd ? 'Adding Product' : 'Updating Product';
        const {classes} = this.props;
        return (
            <Modal
                open={this.props.loadingAdd || this.props.loadingUpdate}
                aria-labelledby='loading-modal-title'
                aria-describedby='loading-modal-description'
                className={classes.modal}
            >
                <Card className={classes.card}>
                    <CardContent className={classes.cardContent}>
                        <Typography
                            variant='h5'
                            id='loading-modal-description'
                        >
                            {msg}
                        </Typography>
                        <br></br>
                        <CircularProgress color='primary' />
                    </CardContent>
                </Card>
            </Modal>
        )
    }
}

const mapStateToProps = (state) => ({
    loadingAdd: state.product.loadingAdd,
    loadingUpdate: state.product.loadingUpdate
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LoadingModal));
