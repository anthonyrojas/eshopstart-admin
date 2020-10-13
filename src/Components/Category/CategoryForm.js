import React, { Component } from 'react';
import CategoryNameField from './CategoryNameField';
import {withStyles} from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {connect} from 'react-redux';
import {
    addCategory,
    updateCategory,
    cancelEditCategory
} from '../../Actions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
    paper: {
        padding: theme.spacing(2)
    },
    buttonContainer: {
        textAlign: 'center'
    },
    centerAlign: {
        textAlign: 'center'
    }
})

class CategoryForm extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        if(this.props.editing){
            this.props.updateCategory({
                id: this.props.category.id,
                name: this.props.name
            })
        }else{
            this.props.addCategory({
                name: this.props.name
            });
        }
    }
    render() {
        const {classes} = this.props;
        const loadingIndicator = (
            this.props.loading || this.props.loadingUpdate ? 
            <Grid item xs={12} className={classes.centerAlign}>
                <CircularProgress />
            </Grid>
            :
            null
        );
        return (
            <Paper 
                className={classes.paper}
                elevation={4}
            >
                <Grid 
                    container 
                    spacing={2} 
                    direction='row' 
                    alignContent='center' 
                    justify='center' 
                    alignItems='center'
                    component='form'
                >
                    <Grid item xs={12}>
                        <Typography 
                            align='center' 
                            variant='h5'
                        >
                            {
                                this.props.editing ?
                                <React.Fragment>Update Category</React.Fragment>
                                :
                                <React.Fragment>Add Category</React.Fragment>
                            }
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <CategoryNameField />
                    </Grid>
                    <Grid className={classes.buttonContainer} item xs={12}>
                        <Button 
                            variant='contained'
                            color='primary'
                            type='submit'
                            disabled={this.props.loading || this.props.loadingUpdate}
                            onClick={this.handleSubmit.bind(this)}
                        >
                            {
                                this.props.editing ? 
                                <React.Fragment>Update</React.Fragment>
                                :
                                <React.Fragment>Add</React.Fragment>
                            }
                        </Button>
                        {
                            this.props.editing ?
                            <React.Fragment>
                                &nbsp;
                                <Button
                                    variant='contained'
                                    color='secondary'
                                    disabled={this.props.loadingUpdate}
                                    onClick={e => this.props.cancelEditCategory()}
                                >
                                    Cancel
                                </Button>
                            </React.Fragment>
                            :
                            null
                        }
                    </Grid>
                    {loadingIndicator}
                </Grid>
            </Paper>
        )
    }
}
const mapStateToProps = (state) => ({
    name: state.category.name,
    loading: state.category.loadingAdd,
    editing: state.category.editing,
    loadingUpdate: state.category.loadingUpdate,
    category: state.category.category
})

const mapDispatchToProps = {
    addCategory,
    updateCategory,
    cancelEditCategory
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CategoryForm));
