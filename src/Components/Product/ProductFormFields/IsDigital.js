import React, { Component } from 'react'
import { connect } from 'react-redux';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

class IsDigital extends Component {
    render() {
        return (
            <FormControlLabel
                control={
                    <Checkbox
                        color='primary'
                        name='is-digital-checkbox'
                    />
                }
                label='Is Digital'
            />
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(IsDigital)
