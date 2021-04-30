import React, { Component } from 'react'
import { connect } from 'react-redux';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import {
    userBirthDateChanged
} from '../../../Actions/Users'
import { isUndefinedOrNullOrEmpty } from '../../../helpers';

class BirthDate extends Component {
    handleDateChanged(date, e){
        console.log(date);
        this.props.userBirthDateChanged(date);
    }
    render() {
        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker 
                    margin='normal'
                    inputVariant='outlined'
                    format='MM/dd/yyyy'
                    id='birth-date-input'
                    label='Birth Date'
                    KeyboardButtonProps={{
                        'aria-label': 'change birth date'
                    }}
                    //required
                    fullWidth
                    value={this.props.birthdate}
                    clearable
                    onChange={this.handleDateChanged.bind(this)}
                    error={!isUndefinedOrNullOrEmpty(this.props.errorMessage) && this.props.errorExistsAddUser}
                    helperText={this.props.errorMessage}
                />
            </MuiPickersUtilsProvider>
        )
    }
}

const mapStateToProps = (state) => ({
    birthdate: state.users.birthdate,
    errorExistsAddUser: state.users.errorExistsAddUser,
    errorMessage: state.users.errors.birthdate
})

const mapDispatchToProps = {
    userBirthDateChanged
}

export default connect(mapStateToProps, mapDispatchToProps)(BirthDate)
