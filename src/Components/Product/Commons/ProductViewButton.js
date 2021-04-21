import React from 'react';
import Button from '@material-ui/core/Button';
import {Link as RouterLink} from 'react-router-dom';

export default function ProductViewButton(props) {
    return (
        <Button variant='contained' component={RouterLink} to={`/products/${props.productId}`}>
            View Product
        </Button>
    )
}
