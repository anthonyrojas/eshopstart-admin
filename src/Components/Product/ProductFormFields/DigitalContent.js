import React, { Component } from 'react'
import { connect } from 'react-redux';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import {    
    productFileChanged
} from '../../../Actions/Product'
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { EMPTY_STRING } from '../../../constants';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

class DigitalContent extends Component {
    constructor(props){
        super(props);
        this.fileInputRef = React.createRef();
    }
    handleFileChanged = (e) => {
        const fileInput = e.target.files[0];
        this.props.productFileChanged({
            filename: fileInput.name,
            file: fileInput
        });
    }
    handleFileCleared = (e) => {
        this.props.productFileChanged({
            filename: EMPTY_STRING,
            file: EMPTY_STRING
        });
        this.fileInputRef.current.value = EMPTY_STRING;
    }
    render() {
        return (
            <React.Fragment>
                <FormControl
                    variant='outlined'
                >
                    <InputLabel
                        shrink
                        htmlFor='digital-file-input'
                        variant='outlined'
                    >
                        Digital Content
                    </InputLabel>
                    <OutlinedInput 
                        id='digital-file-input'
                        type='file'
                        label='Digital Content'
                        inputRef={this.fileInputRef}
                        notched
                        onChange={this.handleFileChanged.bind(this)}
                    />
                </FormControl>
                {
                    this.props.file ?
                    <React.Fragment>
                        &nbsp;
                        <IconButton
                            color='secondary'
                            onClick={this.handleFileCleared.bind(this)}
                        >
                            <CloseIcon />
                        </IconButton>
                    </React.Fragment>
                    :
                    null
                }
            </React.Fragment>

        )
    }
}

const mapStateToProps = (state) => ({
    filename: state.product.filename,
    file: state.product.file
})

const mapDispatchToProps = {
    productFileChanged
}

export default connect(mapStateToProps, mapDispatchToProps)(DigitalContent)
