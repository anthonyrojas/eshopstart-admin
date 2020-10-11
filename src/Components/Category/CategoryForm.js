import React, { Component } from 'react';
import CategoryNameField from './CategoryNameField';
import {withStyles} from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {connect} from 'react-redux';
import {
    addCategory,
    updateCategory
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
    }
})

class CategoryForm extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.addCategory({
            name: this.props.name
        });
    }
    render() {
        const {classes} = this.props;
        const loadingIndicator = (
            this.props.loading ? 
            <Grid item xs={12}>
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
                            Add Category
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
                            disabled={this.props.loading}
                            onClick={this.handleSubmit.bind(this)}
                        >
                            Add
                        </Button>
                    </Grid>
                    {loadingIndicator}
                </Grid>
            </Paper>
        )
    }
}
const mapStateToProps = (state) => ({
    name: state.category.name,
    loading: state.category.loadingAdd
})

const mapDispatchToProps = {
    addCategory,
    updateCategory
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CategoryForm));
