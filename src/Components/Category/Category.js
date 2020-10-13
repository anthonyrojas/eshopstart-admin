import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CategoryTable from './CategoryTable';
import CategoryForm from './CategoryForm';

class Category extends Component {
    render() {
        return (
            <React.Fragment>
                <Grid 
                    container
                    direction='row'
                    alignContent='center'
                    alignItems='center'
                    justify='center'
                    spacing={4}
                >
                    <Grid item xs={12}>
                        <Typography align='center' variant='h2'>Categories</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <CategoryForm />
                    </Grid>
                    <Grid item xs={12}>
                        <CategoryTable />
                    </Grid>
                </Grid>
            </React.Fragment>
        )
    }
}

// const mapStateToProps = (state) => ({
    
// })

// const mapDispatchToProps = {
    
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Category)
export default Category;
