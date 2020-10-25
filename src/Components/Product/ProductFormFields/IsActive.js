import React, { Component } from 'react'
import { connect } from 'react-redux';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

class IsActive extends Component {
    render() {
        return (
            <FormControlLabel
                control={
                    <Checkbox
                        color='primary'
                        name='is-active-input'
                    />
                }
                label='Is Active'
            />
        )
    }
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(IsActive)
