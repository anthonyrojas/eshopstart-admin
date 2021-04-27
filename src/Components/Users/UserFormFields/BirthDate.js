import React, { Component } from 'react'
import { connect } from 'react-redux';
import MomentUtils from '@date-io/moment';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import {
    userBirthDateChanged
} from '../../../Actions/Users'

class BirthDate extends Component {
    handleDateChanged(date){
        this.props.userBirthDateChanged(date);
    }
    render() {
        return (
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <KeyboardDatePicker 
                    margin='normal'
                    inputVariant='outlined'
                    format='MM/dd/yyyy'
                    id='birth-date-input'
                    label='Birth Date'
                    KeyboardButtonProps={{
                        'aria-label': 'change birth date'
                    }}
                    fullWidth
                    value={this.props.birthDate}
                    onChange={this.handleDateChanged}
                />
            </MuiPickersUtilsProvider>
        )
    }
}

const mapStateToProps = (state) => ({
    birthDate: state.users.birthDate
})

const mapDispatchToProps = {
    userBirthDateChanged
}

export default connect(mapStateToProps, mapDispatchToProps)(BirthDate)
