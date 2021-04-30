import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';

class SaveButton extends Component {
    render() {
        return (
            <Button
                color='primary'
                variant='contained'
                type='submit'
                disabled={this.props.savingUser}
            >
                Save
            </Button>
        )
    }
}

const mapStateToProps = (state) => ({
    savingUser: state.users.savingUser
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(SaveButton)
