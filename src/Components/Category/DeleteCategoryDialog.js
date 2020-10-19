import React, { Component } from 'react'
import { connect } from 'react-redux';
import {
    deleteCategory
} from '../../Actions/Category';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';

class DeleteCategoryDialog extends Component {
    handleDeleteCategory = (id) => {
        this.props.deleteCategory(id);
        this.props.handleClose();
    }
    render() {
        return (
            <Dialog open={this.props.open} onClose={this.props.handleClose}>
                {
                    this.props.loadingDelete ?
                    <LinearProgress />
                    :
                    null
                }
                <DialogTitle id='delete-category-title'>Confirm Delete Action</DialogTitle>
                <DialogContent id='delete-category-dialog-content'>
                    <DialogContentText id='delete-category-dialog-text'>
                        Confirm you are deleting the category:&nbsp;
                        <strong>{this.props.category.name}</strong>. Deleting this category will result in it being unbound from any product it may be associated with.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button disabled={this.props.loadingDelete} color='secondary' variant='text' onClick={this.handleDeleteCategory.bind(this, this.props.category.id)}>Delete</Button>
                    <Button disabled={this.props.loadingDelete} color='default' variant='text' onClick={this.props.handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        )
    }
}

const mapStateToProps = (state) => ({
    loadingDelete: state.category.loadingDelete
})

const mapDispatchToProps = {
    deleteCategory
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteCategoryDialog)
