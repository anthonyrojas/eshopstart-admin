import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import {connect} from 'react-redux';
import {
    changeName
} from '../../Actions/Category';

// export default function CategoryNameField() {
//     const dispatch = useDispatch()
//     const name = useSelector(state => state.category.name);
//     const setName = (e) => {
//         dispatch(setName(e));
//     }
//     return (
//         <TextField
//             label='Category Name'
//             fullWidth
//             variant='outlined'
//             required
//             value={name}
//             onChange={setName(e.target.value)}
//         />
//     )
// }

class CategoryNameField extends Component {
    render() {
        return (
            <TextField
                label='Category Name'
                fullWidth
                variant='outlined'
                required
                value={this.props.name}
                onChange={e => this.props.changeName(e.target.value)}
                error={this.props.errorExists}
                helperText={this.props.error}
                disabled={this.props.loadingAdd}
            />
        )
    }
}
const mapStateToProps = state => ({
    name: state.category.name,
    error: state.category.errors.name,
    errorExists: state.category.errorExists,
    loadingAdd: state.category.loadingAdd
})
const mapDispatchToProps = {
    changeName
}
export default connect(mapStateToProps, mapDispatchToProps)(CategoryNameField);
