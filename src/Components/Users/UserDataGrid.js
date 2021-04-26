import React, { Component } from 'react'
import { connect } from 'react-redux';
import {DataGrid} from '@material-ui/data-grid';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {withStyles} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import {Link} from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import {
    getUsers
} from '../../Actions/Users'

const styles = theme => ({
    dataGrid: {
        '& .MuiDataGrid-columnsContainer': {
            backgroundColor: '#000'
        },
        height: 1000
    }
})

class UserDataGrid extends Component {
    componentDidMount(){
        this.props.getUsers({
            limit: this.props.limit,
            skip: this.props.skip
        })
    }

    handlePageSizeChanged = (e) => {
        let page = this.props.skip;
        while(this.props.usersCount < (page * e.pageSize) && page > 0){
            page -= 1;
        }
        if(this.props.limit !== e.pageSize){
            this.props.getUsers({
                limit: e.pageSize,
                skip: page,
            })
        }
    }

    handlePageChanged = (e) => {
        if(this.props.skip !== (e.page)*this.props.limit){
            this.props.getUsers({
                limit: this.props.limit,
                skip: (e.page)*this.props.limit
            })
        }
    }

    render() {
        const {classes} = this.props;
        const cols = [
            {
                field: 'id',
                headerName: 'ID',
                type: 'number',
                width: 100,
                renderCell: (params) => (
                    <strong>
                        <IconButton
                            color='primary'
                            component={Link}
                            to={`/user/${params.value}`}
                        >
                            <VisibilityIcon />
                        </IconButton>
                        {params.value}
                    </strong>
                )
            },
            {
                field: 'firstName',
                headerName: 'First Name',
                width: 350
            },
            {
                field: 'lastName',
                headerName: 'Last Name',
                width: 350
            },
            {
                field: 'email',
                headerName: 'Email',
                width: 350
            },
            {
                field: 'createdAt',
                headerName: 'Created At',
                width: 200,
                renderCell: (params) => (
                    <React.Fragment>
                        {new Date(params.value).toLocaleDateString('en-US')} {new Date(params.value).toLocaleTimeString('en-US')}
                    </React.Fragment>
                )
            }
        ];
        return (
            <Grid container
                direction='row'
                alignContent='center'
                alignItems='center'
                justify='center'
            >
                <Paper elevation={4} style={{width: '100%'}}>
                    <Grid item xs={12} className={classes.dataGrid}>
                        <DataGrid 
                            columns={cols}
                            rows={this.props.users}
                            rowsPerPageOptions={[25, 50, 100]}
                            paginationMode='server'
                            rowCount={this.props.usersCount}
                            pageSize={this.props.limit}
                            page={(this.props.skip/this.props.limit)}
                            pagination={!this.props.loadingUsers}
                            loading={this.props.loadingUsers}
                            onPageSizeChange={this.handlePageSizeChanged.bind(this)}
                            onPageChange={this.handlePageChanged.bind(this)}
                            disableSelectionOnClick
                        />
                    </Grid>
                </Paper>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => ({
    users: state.users.users,
    loadingUsers: state.users.loadingUsers,
    errorExistsGetUsers: state.users.errorExistsGetUsers,
    usersCount: state.users.usersCount,
    limit: state.users.limit,
    skip: state.users.skip
})

const mapDispatchToProps = {
    getUsers
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(UserDataGrid))
