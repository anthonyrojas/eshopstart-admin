import React, { Component } from 'react'
import { connect } from 'react-redux';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {userRoleChanged} from '../../../Actions/Users'
import { isUndefinedOrNullOrEmpty } from '../../../helpers';

export class Role extends Component {
    handleInputChange = (e) =>{
        this.props.userRoleChanged(e.target.value);
    }
    render() {
        return (
            <FormControl variant='outlined' 
                fullWidth 
                //required 
                error={!isUndefinedOrNullOrEmpty(this.props.errorMessage) && this.props.errorExistsAddUser}
            >
                <InputLabel variant='outlined' id='role-select-input-label'>
                    Role
                </InputLabel>
                <Select
                    labelId='role-select-input-label'
                    id='role-select-input'
                    value={this.props.role}
                    variant='outlined'
                    label='Role'
                    onChange={this.handleInputChange}
                >
                    {
                        this.props.roles.map((roleOption, i) => (
                            <MenuItem value={roleOption} key={i}>{roleOption}</MenuItem>
                        ))
                    }
                </Select>
                <FormHelperText>{this.props.errorMessage}</FormHelperText>
            </FormControl>
        )
    }
}

const mapStateToProps = (state) => ({
    role: state.users.role,
    roles: state.users.roles,
    errorExistsAddUser: state.users.errorExistsAddUser,
    errorMessage: state.users.errors.role
})

const mapDispatchToProps = {
    userRoleChanged   
}

export default connect(mapStateToProps, mapDispatchToProps)(Role)
