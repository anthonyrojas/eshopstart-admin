import React, { Component } from 'react';
import {connect} from 'react-redux';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import {
    getCategories,
    editCategory
} from '../../Actions/Category'
import CircularProgress from '@material-ui/core/CircularProgress';
import {withStyles} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import EditSharp from '@material-ui/icons/EditSharp';
import DeleteForeverSharpIcon from '@material-ui/icons/DeleteForeverSharp';
import TablePagination from '@material-ui/core/TablePagination';
import Tooltip from '@material-ui/core/Tooltip';

const styles = theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white
    },
    pagination: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white
    }
})


class CategoryTable extends Component {
    constructor(props){
        super(props);
        // this.paginatioRef = React.createRef();
        this.state = {
            page: 0,
            rowsPerPage: 10
        }
    }
    componentDidMount(){
        this.props.getCategories();
    }
    handleEditCategory = (category) => {
        this.props.editCategory({
            id: category.id,
            name: category.name
        });
    }
    handleChangePage = (e, p) => {
        this.setState({
            page: p
        })
    }
    handleChangeRowsPerPage = (e) => {
        this.setState({
            rowsPerPage: e.target.value
        })
    }
    
    render() {
        const {classes} = this.props;
        const {page, rowsPerPage} = this.state;
        return (
            <React.Fragment>
            <TableContainer component={Paper} elevation={4}>
                <Table aria-label='category table'>
                    <TableHead className={classes.head}>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            this.props.loading ?
                            <TableRow>
                                <TableCell colSpan={2}>
                                    <CircularProgress />
                                </TableCell>
                            </TableRow>
                            :
                            this.props.categories
                            .slice(rowsPerPage * page, rowsPerPage * page + rowsPerPage)
                            .map(category => (
                                <TableRow key={category.id}>
                                    <TableCell>{category.name}</TableCell>
                                    <TableCell>
                                        <Tooltip title='Edit' aria-label='Add Category' placement='top'>
                                            <IconButton color='default' onClick={this.handleEditCategory.bind(this, category)}>
                                                <EditSharp />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title='Delete' aria-label='Delete Category' placement='top'>
                                            <IconButton color='secondary'>
                                                <DeleteForeverSharpIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
                <TablePagination
                className={classes.pagination}
                rowsPerPageOptions={[5, 10, 25, 50]}
                component="div"
                count={this.props.categories.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={this.handleChangePage.bind(this)}
                onChangeRowsPerPage={this.handleChangeRowsPerPage.bind(this)}
            />
            </TableContainer>
          </React.Fragment>
        )
    }
}
const mapStateToProps = state => ({
    categories: state.category.categories,
    loading: state.category.loadingGet,
    errorExists: state.category.errorExists,
    statusMessage: state.category.statusMessage
});
const mapDispatchToProps = {
    getCategories,
    editCategory
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CategoryTable));