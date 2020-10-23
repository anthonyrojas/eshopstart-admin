import React, { Component } from 'react'
import { connect } from 'react-redux';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

class IsDeliverable extends Component {
    render() {
        return (
            <FormControlLabel
                control={
                    <Checkbox
                        color='primary'
                        name='is-deliverable-input'
                    />
                }
                label='Is Deliverable'
            />
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(IsDeliverable)
